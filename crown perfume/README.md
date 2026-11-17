# Crown Perfume local server

The site now uses a SQLite database for its fragrance catalog and categories. Start it through the local server; opening `index.html` directly will not connect to the database.

## Run on Windows

1. Install Python 3.10 or newer and enable **Add Python to PATH**.
2. Open PowerShell in this folder and run:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\start-server.ps1
   ```

3. Enter the admin password when prompted. The configured username is `peter`.
4. Visit <http://127.0.0.1:8000/>. Open **Administration** and sign in.
5. Press Ctrl+C in PowerShell to stop the server.

The first launch creates `data\catalog.sqlite3` and copies the starter collection into it. Later edits persist in that database and are shown on the shop pages served by this computer. The password is not written to the source files or database.

This server binds only to this computer (`127.0.0.1`) and is intended for local use. It is not a public hosting setup; hosting the store online needs a hosted backend, HTTPS, and a database service.
