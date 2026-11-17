import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import time
from contextlib import contextmanager
from http.cookies import CookieError, SimpleCookie
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent
DATABASE_DIR = ROOT / "data"
DATABASE_PATH = DATABASE_DIR / "catalog.sqlite3"
COOKIE_NAME = "crown_admin_session"
SESSION_SECONDS = 8 * 60 * 60
MAX_REQUEST_BYTES = 1_000_000
PASSWORD_ITERATIONS = 310_000
PRODUCT_FIELDS = (
    "gender",
    "brand",
    "name",
    "image",
    "alt",
    "description",
    "character",
    "notes",
    "occasion",
    "quote",
)

admin_username = os.environ.get("ADMIN_USERNAME", "")
admin_password = os.environ.get("ADMIN_PASSWORD", "")
if not admin_username or not admin_password:
    raise SystemExit("Set ADMIN_USERNAME and ADMIN_PASSWORD before starting the server.")
password_salt = secrets.token_bytes(16)
admin_password_hash = hashlib.pbkdf2_hmac(
    "sha256", admin_password.encode("utf-8"), password_salt, PASSWORD_ITERATIONS
)
del admin_password
os.environ.pop("ADMIN_PASSWORD", None)
sessions = {}
login_attempts = {}


@contextmanager
def connect_database():
    connection = sqlite3.connect(DATABASE_PATH, timeout=10)
    connection.row_factory = sqlite3.Row
    try:
        with connection:
            yield connection
    finally:
        connection.close()


def seed_catalog(connection):
    source = (ROOT / "shop.js").read_text(encoding="utf-8")
    match = re.search(r"const initialFragrances = (\{.*?\n\});", source, re.DOTALL)
    if not match:
        raise RuntimeError("Could not find the starter fragrance catalog in shop.js.")
    catalog_source = re.sub(
        r"(?m)^(\s*)([A-Za-z_]\w*):",
        r'\1"\2":',
        match.group(1),
    )
    initial_catalog = json.loads(catalog_source)
    for product_id, fragrance in initial_catalog.items():
        category = fragrance.get("category")
        if category:
            connection.execute(
                "INSERT OR IGNORE INTO categories (name) VALUES (?)", (category,)
            )
        values = [fragrance[field] for field in PRODUCT_FIELDS]
        connection.execute(
            """
            INSERT INTO products
                (id, gender, brand, name, image, alt, description, character, notes, occasion, quote, category)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (product_id, *values, category),
        )


def initialize_database():
    DATABASE_DIR.mkdir(exist_ok=True)
    with connect_database() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS categories (
                name TEXT PRIMARY KEY COLLATE NOCASE
            )
            """
        )
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS products (
                id TEXT PRIMARY KEY,
                gender TEXT NOT NULL CHECK (gender IN ('men', 'women')),
                brand TEXT NOT NULL,
                name TEXT NOT NULL,
                image TEXT NOT NULL,
                alt TEXT NOT NULL,
                description TEXT NOT NULL,
                character TEXT NOT NULL,
                notes TEXT NOT NULL,
                occasion TEXT NOT NULL,
                quote TEXT NOT NULL,
                category TEXT
            )
            """
        )
        count = connection.execute("SELECT COUNT(*) FROM products").fetchone()[0]
        if count == 0:
            seed_catalog(connection)


def product_dictionary(row):
    product = {field: row[field] for field in PRODUCT_FIELDS}
    if row["category"]:
        product["category"] = row["category"]
    return product


class CrownHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, status, value, extra_headers=None):
        payload = json.dumps(value, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        for name, value in (extra_headers or {}).items():
            self.send_header(name, value)
        self.end_headers()
        self.wfile.write(payload)

    def read_json(self):
        content_length = int(self.headers.get("Content-Length", "0"))
        if content_length < 1 or content_length > MAX_REQUEST_BYTES:
            raise ValueError("Request body is missing or too large.")
        if self.headers.get_content_type() != "application/json":
            raise ValueError("Request must use application/json.")
        try:
            value = json.loads(self.rfile.read(content_length))
        except (json.JSONDecodeError, UnicodeDecodeError) as error:
            raise ValueError("Request body must contain valid JSON.") from error
        if not isinstance(value, dict):
            raise ValueError("Request body must be a JSON object.")
        return value

    def request_origin_is_local(self):
        origin = self.headers.get("Origin")
        return origin == f"http://{self.headers.get('Host', '')}"

    def get_session(self):
        cookie_header = self.headers.get("Cookie", "")
        cookie = SimpleCookie()
        try:
            cookie.load(cookie_header)
        except CookieError:
            return None
        morsel = cookie.get(COOKIE_NAME)
        if morsel is None:
            return None
        session = sessions.get(morsel.value)
        if session is None:
            return None
        if session["expires"] < time.time():
            sessions.pop(morsel.value, None)
            return None
        return session

    def require_admin(self):
        if self.get_session() is None:
            self.send_json(401, {"error": "Please sign in to manage the catalog."})
            return False
        return True

    def validate_product(self, value):
        product_id = value.get("id")
        if not isinstance(product_id, str) or not re.fullmatch(
            r"[a-z0-9]+(?:-[a-z0-9]+)*", product_id
        ):
            raise ValueError("Product ID must use lowercase letters, numbers, and hyphens.")
        if value.get("gender") not in ("men", "women"):
            raise ValueError("Choose For Him or For Her.")
        product = {}
        for field in PRODUCT_FIELDS:
            field_value = value.get(field)
            if not isinstance(field_value, str) or not field_value.strip():
                raise ValueError(f"{field.capitalize()} is required.")
            if len(field_value) > 10_000:
                raise ValueError(f"{field.capitalize()} is too long.")
            product[field] = field_value.strip()
        category = value.get("category", "")
        if not isinstance(category, str) or len(category) > 60:
            raise ValueError("Category must be 60 characters or fewer.")
        product["category"] = category.strip() or None
        return product_id, product

    def do_GET(self):
        path = urlsplit(self.path).path
        if path == "/api/catalog":
            with connect_database() as connection:
                rows = connection.execute("SELECT * FROM products ORDER BY rowid").fetchall()
            self.send_json(200, {row["id"]: product_dictionary(row) for row in rows})
            return
        if path == "/api/categories":
            with connect_database() as connection:
                rows = connection.execute(
                    "SELECT name FROM categories ORDER BY name COLLATE NOCASE"
                ).fetchall()
            self.send_json(200, [row["name"] for row in rows])
            return
        if path == "/api/session":
            session = self.get_session()
            self.send_json(
                200,
                {"authenticated": session is not None, "username": admin_username if session else None},
            )
            return
        if path.startswith("/api/"):
            self.send_json(404, {"error": "API route not found."})
            return
        super().do_GET()

    def do_POST(self):
        path = urlsplit(self.path).path
        if not self.request_origin_is_local():
            self.send_json(403, {"error": "Request origin was not accepted."})
            return
        try:
            data = self.read_json()
        except (ValueError, TypeError) as error:
            self.send_json(400, {"error": str(error)})
            return

        if path == "/api/login":
            self.handle_login(data)
            return
        if path == "/api/logout":
            self.handle_logout()
            return
        if path == "/api/categories":
            if not self.require_admin():
                return
            name = data.get("name")
            if not isinstance(name, str) or not name.strip() or len(name.strip()) > 60:
                self.send_json(400, {"error": "Category name must be between 1 and 60 characters."})
                return
            try:
                with connect_database() as connection:
                    connection.execute(
                        "INSERT INTO categories (name) VALUES (?)", (name.strip(),)
                    )
            except sqlite3.IntegrityError:
                self.send_json(409, {"error": "That category already exists."})
                return
            self.send_json(201, {"name": name.strip()})
            return
        if path == "/api/products":
            if not self.require_admin():
                return
            try:
                product_id, product = self.validate_product(data)
                self.save_product(product_id, product, create_only=True)
            except ValueError as error:
                self.send_json(400, {"error": str(error)})
                return
            except sqlite3.IntegrityError:
                self.send_json(409, {"error": "Product ID already exists or the selected category is invalid."})
                return
            self.send_json(201, {"id": product_id})
            return
        self.send_json(404, {"error": "API route not found."})

    def handle_login(self, data):
        remote_address = self.client_address[0]
        attempts, retry_at = login_attempts.get(remote_address, (0, 0))
        if retry_at > time.time():
            self.send_json(429, {"error": "Too many sign-in attempts. Wait a minute and try again."})
            return

        username = data.get("username")
        password = data.get("password")
        if not isinstance(username, str) or not isinstance(password, str):
            self.send_json(400, {"error": "Enter a username and password."})
            return
        if len(username) > 256 or len(password) > 1024:
            self.send_json(400, {"error": "Username or password is too long."})
            return
        submitted_hash = hashlib.pbkdf2_hmac(
            "sha256", password.encode("utf-8"), password_salt, PASSWORD_ITERATIONS
        )
        if not (
            hmac.compare_digest(username.encode("utf-8"), admin_username.encode("utf-8"))
            and hmac.compare_digest(submitted_hash, admin_password_hash)
        ):
            attempts += 1
            login_attempts[remote_address] = (0, time.time() + 60) if attempts >= 5 else (attempts, 0)
            self.send_json(401, {"error": "Username or password is incorrect."})
            return

        login_attempts.pop(remote_address, None)
        token = secrets.token_urlsafe(32)
        sessions[token] = {"expires": time.time() + SESSION_SECONDS}
        cookie = (
            f"{COOKIE_NAME}={token}; HttpOnly; SameSite=Strict; "
            f"Path=/; Max-Age={SESSION_SECONDS}"
        )
        self.send_json(200, {"authenticated": True}, {"Set-Cookie": cookie})

    def handle_logout(self):
        cookie_header = self.headers.get("Cookie", "")
        cookie = SimpleCookie()
        try:
            cookie.load(cookie_header)
            morsel = cookie.get(COOKIE_NAME)
            if morsel:
                sessions.pop(morsel.value, None)
        except CookieError:
            pass
        self.send_json(
            200,
            {"authenticated": False},
            {"Set-Cookie": f"{COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0"},
        )

    def save_product(self, product_id, product, create_only):
        category = product["category"]
        with connect_database() as connection:
            if category and connection.execute(
                "SELECT 1 FROM categories WHERE name = ?", (category,)
            ).fetchone() is None:
                raise sqlite3.IntegrityError("Unknown category.")
            values = [product[field] for field in PRODUCT_FIELDS]
            if create_only:
                connection.execute(
                    """
                    INSERT INTO products
                        (id, gender, brand, name, image, alt, description, character, notes, occasion, quote, category)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (product_id, *values, category),
                )
            else:
                cursor = connection.execute(
                    """
                    UPDATE products SET
                        gender = ?, brand = ?, name = ?, image = ?, alt = ?, description = ?,
                        character = ?, notes = ?, occasion = ?, quote = ?, category = ?
                    WHERE id = ?
                    """,
                    (*values, category, product_id),
                )
                if cursor.rowcount == 0:
                    raise LookupError("Fragrance not found.")

    def do_PUT(self):
        if not self.request_origin_is_local():
            self.send_json(403, {"error": "Request origin was not accepted."})
            return
        if not self.require_admin():
            return
        try:
            data = self.read_json()
            product_id, product = self.validate_product(data)
        except ValueError as error:
            self.send_json(400, {"error": str(error)})
            return
        path_id = unquote(urlsplit(self.path).path.removeprefix("/api/products/"))
        if not path_id or product_id != path_id:
            self.send_json(400, {"error": "Product ID cannot be changed while editing."})
            return
        try:
            self.save_product(product_id, product, create_only=False)
        except sqlite3.IntegrityError:
            self.send_json(400, {"error": "The selected category does not exist."})
            return
        except LookupError as error:
            self.send_json(404, {"error": str(error)})
            return
        self.send_json(200, {"id": product_id})

    def do_DELETE(self):
        if not self.request_origin_is_local():
            self.send_json(403, {"error": "Request origin was not accepted."})
            return
        if not self.require_admin():
            return
        path = unquote(urlsplit(self.path).path)
        if path.startswith("/api/products/"):
            product_id = path.removeprefix("/api/products/")
            with connect_database() as connection:
                cursor = connection.execute("DELETE FROM products WHERE id = ?", (product_id,))
            if cursor.rowcount == 0:
                self.send_json(404, {"error": "Fragrance not found."})
                return
            self.send_json(200, {"deleted": product_id})
            return
        if path.startswith("/api/categories/"):
            category = path.removeprefix("/api/categories/")
            with connect_database() as connection:
                cursor = connection.execute("DELETE FROM categories WHERE name = ?", (category,))
                if cursor.rowcount:
                    connection.execute(
                        "UPDATE products SET category = NULL WHERE category = ?", (category,)
                    )
            if cursor.rowcount == 0:
                self.send_json(404, {"error": "Category not found."})
                return
            self.send_json(200, {"deleted": category})
            return
        self.send_json(404, {"error": "API route not found."})


if __name__ == "__main__":
    initialize_database()
    server = ThreadingHTTPServer(("127.0.0.1", 8000), CrownHandler)
    print("Crown Perfume is running at http://127.0.0.1:8000")
    print(f"SQLite database: {DATABASE_PATH}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nCrown Perfume server stopped.")
    finally:
        server.server_close()
