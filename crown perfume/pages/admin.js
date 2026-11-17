const adminMessage = document.querySelector("#admin-message");
const productForm = document.querySelector("#product-form");
const categoryForm = document.querySelector("#category-form");
const categorySelect = document.querySelector("#product-category");
const productList = document.querySelector("#product-list");
const loginPanel = document.querySelector("#login-panel");
const adminWorkspace = document.querySelector("#admin-workspace");
const loginForm = document.querySelector("#login-form");
let categories = [];
let editingId = null;

function showAdminMessage(message, isError = false) {
    adminMessage.textContent = message;
    adminMessage.classList.toggle("is-error", isError);
}

function showWorkspace(isAuthenticated) {
    loginPanel.hidden = isAuthenticated;
    adminWorkspace.hidden = !isAuthenticated;
}

async function loadCategories() {
    const savedCategories = await requestApi("/api/categories");
    if (!Array.isArray(savedCategories)) {
        throw new Error("The server returned invalid category data.");
    }
    categories = savedCategories;
}

function renderCategories() {
    const categoryList = document.querySelector("#category-list");
    categoryList.replaceChildren();
    categorySelect.replaceChildren();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Use brand as category";
    categorySelect.append(defaultOption);

    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.append(option);

        const item = document.createElement("li");
        const label = document.createElement("span");
        label.textContent = category;
        const remove = document.createElement("button");
        remove.className = "text-button";
        remove.type = "button";
        remove.textContent = "Remove";
        remove.addEventListener("click", () => removeCategory(category));
        item.append(label, remove);
        categoryList.append(item);
    });

    if (categories.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty-list";
        empty.textContent = "No custom categories yet.";
        categoryList.append(empty);
    }
}

function renderProducts() {
    productList.replaceChildren();
    const entries = Object.entries(fragrances).sort(([, first], [, second]) => first.name.localeCompare(second.name));
    document.querySelector("#product-total").textContent = `(${entries.length})`;

    if (entries.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-list";
        empty.textContent = "No fragrances have been added yet.";
        productList.append(empty);
        return;
    }

    entries.forEach(([id, fragrance]) => {
        const item = document.createElement("article");
        item.className = "product-list-item";
        const details = document.createElement("div");
        const title = document.createElement("h3");
        title.textContent = fragrance.name;
        const meta = document.createElement("p");
        meta.textContent = `${fragrance.brand} · ${fragrance.gender === "men" ? "For Him" : "For Her"} · ${id}`;
        details.append(title, meta);

        const actions = document.createElement("div");
        actions.className = "product-list-actions";
        const edit = document.createElement("button");
        edit.className = "text-button";
        edit.type = "button";
        edit.textContent = "Edit";
        edit.addEventListener("click", () => editProduct(id));
        const remove = document.createElement("button");
        remove.className = "text-button danger-button";
        remove.type = "button";
        remove.textContent = "Delete";
        remove.addEventListener("click", () => deleteProduct(id));
        actions.append(edit, remove);
        item.append(details, actions);
        productList.append(item);
    });
}

function clearProductForm() {
    productForm.reset();
    editingId = null;
    productForm.elements.id.readOnly = false;
    document.querySelector("#product-form-title").textContent = "Add a fragrance";
    productForm.querySelector('[type="submit"]').textContent = "Save fragrance";
}

function editProduct(id) {
    const fragrance = fragrances[id];
    if (!fragrance) return;
    editingId = id;
    productForm.elements.id.value = id;
    productForm.elements.id.readOnly = true;
    productForm.elements.gender.value = fragrance.gender;
    productForm.elements.brand.value = fragrance.brand;
    productForm.elements.name.value = fragrance.name;
    productForm.elements.category.value = fragrance.category || "";
    productForm.elements.image.value = fragrance.image;
    productForm.elements.alt.value = fragrance.alt;
    productForm.elements.description.value = fragrance.description;
    productForm.elements.character.value = fragrance.character;
    productForm.elements.notes.value = fragrance.notes;
    productForm.elements.occasion.value = fragrance.occasion;
    productForm.elements.quote.value = fragrance.quote;
    document.querySelector("#product-form-title").textContent = "Edit fragrance";
    productForm.querySelector('[type="submit"]').textContent = "Save changes";
    productForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function refreshCatalog() {
    await loadFragrances();
    renderProducts();
}

async function deleteProduct(id) {
    const fragrance = fragrances[id];
    if (!fragrance || !window.confirm(`Delete "${fragrance.name}" from the catalog?`)) return;
    try {
        await requestApi(`/api/products/${encodeURIComponent(id)}`, { method: "DELETE" });
        if (editingId === id) clearProductForm();
        await refreshCatalog();
        showAdminMessage(`${fragrance.name} was removed from the database.`);
    } catch (error) {
        showAdminMessage(error.message, true);
    }
}

async function removeCategory(category) {
    if (!window.confirm(`Remove "${category}"? Products using it will return to brand grouping.`)) return;
    try {
        await requestApi(`/api/categories/${encodeURIComponent(category)}`, { method: "DELETE" });
        await loadCategories();
        renderCategories();
        await refreshCatalog();
        showAdminMessage(`Category "${category}" was removed.`);
    } catch (error) {
        showAdminMessage(error.message, true);
    }
}

categoryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = categoryForm.elements.category;
    const category = input.value.trim();
    if (!category) return;
    if (categories.some((item) => item.toLowerCase() === category.toLowerCase())) {
        showAdminMessage("That category already exists.", true);
        return;
    }
    try {
        await requestApi("/api/categories", { method: "POST", body: JSON.stringify({ name: category }) });
        categoryForm.reset();
        await loadCategories();
        renderCategories();
        showAdminMessage(`Category "${category}" was added. Assign it to a fragrance to display it in the collection.`);
    } catch (error) {
        showAdminMessage(error.message, true);
    }
});

productForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!productForm.reportValidity()) return;

    const formData = new FormData(productForm);
    const id = formData.get("id").trim();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
        showAdminMessage("Product ID must use lowercase letters, numbers, and hyphens.", true);
        return;
    }
    if (!editingId && fragrances[id]) {
        showAdminMessage("That product ID already exists. Choose a different ID.", true);
        return;
    }

    const fragrance = {
        gender: formData.get("gender"),
        brand: formData.get("brand").trim(),
        name: formData.get("name").trim(),
        image: formData.get("image").trim(),
        alt: formData.get("alt").trim(),
        description: formData.get("description").trim(),
        character: formData.get("character").trim(),
        notes: formData.get("notes").trim(),
        occasion: formData.get("occasion").trim(),
        quote: formData.get("quote").trim()
    };
    const category = formData.get("category");
    if (category) fragrance.category = category;

    try {
        const isEditing = Boolean(editingId);
        await requestApi(
            isEditing ? `/api/products/${encodeURIComponent(editingId)}` : "/api/products",
            { method: isEditing ? "PUT" : "POST", body: JSON.stringify({ id, ...fragrance }) }
        );
        clearProductForm();
        await refreshCatalog();
        showAdminMessage(`${fragrance.name} was saved to the database.`);
    } catch (error) {
        showAdminMessage(error.message, true);
    }
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    try {
        await requestApi("/api/login", {
            method: "POST",
            body: JSON.stringify({
                username: formData.get("username").trim(),
                password: formData.get("password")
            })
        });
        loginForm.reset();
        loginForm.elements.username.value = "peter";
        showWorkspace(true);
        await loadCategories();
        renderCategories();
        renderProducts();
        showAdminMessage("Signed in. Changes are saved to the shared catalog database.");
    } catch (error) {
        showAdminMessage(error.message, true);
    }
});

document.querySelector("#logout-button").addEventListener("click", async () => {
    try {
        await requestApi("/api/logout", { method: "POST", body: "{}" });
        showWorkspace(false);
        showAdminMessage("You have signed out.");
    } catch (error) {
        showAdminMessage(error.message, true);
    }
});

document.querySelector("#clear-product-form").addEventListener("click", clearProductForm);

async function initializeAdmin() {
    try {
        await catalogReady;
        const session = await requestApi("/api/session");
        if (!session.authenticated) {
            showWorkspace(false);
            return;
        }
        showWorkspace(true);
        await loadCategories();
        renderCategories();
        renderProducts();
    } catch (error) {
        showWorkspace(false);
        showAdminMessage("The database server could not be reached. Start the server and reload this page.", true);
        console.error("Unable to initialize the Crown Perfume administration page.", error);
    }
}

initializeAdmin();
