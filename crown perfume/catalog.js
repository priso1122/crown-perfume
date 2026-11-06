function createFragranceCard(id, fragrance, index) {
    const link = document.createElement("a");
    link.className = "catalog-card-link";
    link.href = `product.html?id=${encodeURIComponent(id)}`;
    link.setAttribute("aria-label", `View ${fragrance.name} details`);

    const card = document.createElement("article");
    card.className = "catalog-card";

    const imagePanel = document.createElement("div");
    imagePanel.className = "catalog-image";

    const number = document.createElement("span");
    number.className = "catalog-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const image = document.createElement("img");
    image.src = fragrance.image;
    image.alt = fragrance.alt;
    image.loading = "lazy";
    imagePanel.append(number, image);

    const info = document.createElement("div");
    info.className = "catalog-info";

    const brand = document.createElement("p");
    brand.className = "catalog-brand";
    brand.textContent = fragrance.brand;

    const name = document.createElement("h3");
    name.textContent = fragrance.name;

    info.append(brand, name);
    card.append(imagePanel, info);
    link.append(card);
    return link;
}

function renderFragranceCategory(gender) {
    const container = document.querySelector(`#${gender}-products`);
    const products = Object.entries(fragrances)
        .filter(([, fragrance]) => fragrance.gender === gender);
    const brands = new Map();

    products.forEach(([id, fragrance]) => {
        const group = brands.get(fragrance.brand) || [];
        group.push({ id, fragrance });
        brands.set(fragrance.brand, group);
    });

    let number = gender === "men" ? 0 : Object.values(fragrances).filter((item) => item.gender === "men").length;
    let singleProducts;
    brands.forEach((items, brandName) => {
        const group = document.createElement("section");
        group.className = "brand-group";

        if (items.length > 1) {
            const heading = document.createElement("h3");
            heading.className = "brand-group-title";
            heading.textContent = brandName;
            group.append(heading);
        } else {
            if (!singleProducts) {
                singleProducts = document.createElement("div");
                singleProducts.className = "catalog-products";
                container.append(singleProducts);
            }
            items.forEach(({ id, fragrance }) => {
                singleProducts.append(createFragranceCard(id, fragrance, number));
                number += 1;
            });
            return;
        }

        const grid = document.createElement("div");
        grid.className = "catalog-products";
        items.forEach(({ id, fragrance }) => {
            grid.append(createFragranceCard(id, fragrance, number));
            number += 1;
        });
        group.append(grid);
        container.append(group);
    });

    const countElement = document.querySelector(`#${gender}-count`);
    if (countElement) {
        countElement.textContent = `${products.length} fragrance${products.length === 1 ? "" : "s"}`;
    }
}

const selectedGender = document.body.dataset.gender;
const fragranceCount = selectedGender
    ? Object.values(fragrances).filter((fragrance) => fragrance.gender === selectedGender).length
    : Object.keys(fragrances).length;
document.querySelector("#catalog-count").textContent = `${String(fragranceCount).padStart(2, "0")} FRAGRANCES`;
if (selectedGender) {
    renderFragranceCategory(selectedGender);
} else {
    renderFragranceCategory("men");
    renderFragranceCategory("women");
}
