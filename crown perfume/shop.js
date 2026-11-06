const fragrances = {
    "silver-scent": {
        gender: "men",
        brand: "Jacques Bogart",
        name: "Silver Scent",
        image: "../images/silver%20scent.webp",
        alt: "Jacques Bogart Silver Scent eau de toilette",
        description: "A bold, polished fragrance that opens bright and settles into a warm, confident trail. Made for anyone who likes their presence to be remembered.",
        character: "Fresh citrus with aromatic and warm woody depth",
        notes: "Citrus, aromatic herbs, woods and amber",
        occasion: "Evenings, celebrations and a confident everyday signature",
        quote: "Make an entrance with a scent that stays in the room."
    },
    "montblanc-explorer": {
        gender: "men",
        brand: "Montblanc",
        name: "Explorer",
        image: "../images/mont%20blanc%20explorer.webp",
        alt: "Montblanc Explorer eau de parfum",
        description: "A modern, adventurous composition pairing a crisp bergamot opening with earthy woods and a refined leathery finish.",
        character: "Citrus, woody and leathery",
        notes: "Bergamot, vetiver, patchouli and leather accord",
        occasion: "Daytime wear, travel and everyday exploration",
        quote: "For the curious spirit: your next great story starts with a first impression."
    },
    "montblanc-signature": {
        gender: "women",
        brand: "Montblanc",
        name: "Signature",
        image: "../images/R.jpg",
        alt: "Montblanc Signature eau de parfum",
        description: "A smooth, elegant fragrance with a luminous citrus touch, soft florals and a comforting vanilla-musk finish.",
        character: "Soft, warm and gently floral",
        notes: "Citrus, white florals, vanilla and musk",
        occasion: "Close moments, special occasions and elegant daily wear",
        quote: "A graceful signature is remembered for its warmth, not its volume."
    },
    "kayali-eden-juicy-apple": {
        gender: "women",
        brand: "Kayali",
        name: "Eden Juicy Apple | 01",
        image: "../images/kayali%20eden.webp",
        alt: "Kayali Eden Juicy Apple fragrance",
        description: "A playful, fruit-forward scent that balances juicy apple with bright berries, delicate florals and a soft, sweet dry-down.",
        character: "Juicy, fruity and bright",
        notes: "Red apple, berries, florals and musk",
        occasion: "Brunch, daytime plans and whenever you want a cheerful lift",
        quote: "Bring a little sparkle to the everyday—and let the compliments follow."
    },
    "hugo-boss-the-scent": {
        gender: "men",
        brand: "Hugo Boss",
        name: "The Scent",
        image: "../images/hugo%20boss.webp",
        alt: "Hugo Boss The Scent eau de toilette",
        description: "A magnetic blend that layers a fresh, spicy opening over a smooth, warm base for an easy sense of sophistication.",
        character: "Spicy, warm and refined",
        notes: "Ginger, aromatic fruit and leather accord",
        occasion: "Evenings out, date nights and polished everyday wear",
        quote: "Let the right impression linger long after the introduction."
    },
    "davidoff-cool-water": {
        gender: "men",
        brand: "Davidoff",
        name: "Cool Water",
        image: "../images/davidoff-cool-water-125ml_1024x1024.webp",
        alt: "Davidoff Cool Water eau de toilette",
        description: "An invigorating aquatic classic with crisp freshness, aromatic herbs and a clean, quietly confident finish.",
        character: "Fresh, aquatic and aromatic",
        notes: "Marine accords, mint, lavender and woods",
        occasion: "Warm days, casual wear and a refreshing post-shower feel",
        quote: "A breath of open air—fresh, effortless and always in good taste."
    },
    "stronger-with-you-intensely": {
        gender: "men",
        brand: "Emporio Armani",
        name: "Stronger With You Intensely",
        image: "../images/a4707211-82e7-408e-8897-a7470176b6c8.f775365349e598c88241e40b604bcad4.avif",
        alt: "Emporio Armani Stronger With You Intensely eau de parfum",
        description: "A rich, enveloping scent with spicy warmth and a sweet, inviting finish that feels especially memorable after dark.",
        character: "Warm, spicy and sweet",
        notes: "Pink pepper, amber, vanilla and warm woods",
        occasion: "Cool evenings, celebrations and bold nights out",
        quote: "Turn an unforgettable moment into a feeling that stays with you."
    },
    "lacoste-l1212-blanc": {
        gender: "men",
        brand: "Lacoste",
        name: "L.12.12 Blanc Pure",
        image: "../images/00073705289604l.avif",
        alt: "Lacoste L.12.12 Blanc Pure eau de toilette",
        description: "Clean and energetic, this fresh woody profile combines bright citrus and aromatic notes with an easy, smooth finish.",
        character: "Crisp, clean and woody",
        notes: "Citrus, aromatic herbs and soft woods",
        occasion: "Daily wear, warm weather and relaxed weekends",
        quote: "Keep it classic, keep it fresh, and make every day feel effortless."
    },
    "montblanc-legend": {
        gender: "men",
        brand: "Montblanc",
        name: "Legend",
        image: "../images/mont%20blanc%20legend.webp",
        alt: "Montblanc Legend eau de parfum",
        description: "A confident aromatic fragrance that balances fresh brightness with smooth woods and a warm, refined base.",
        character: "Aromatic, fresh and woody",
        notes: "Fresh aromatic notes, woods and warm accords",
        occasion: "Workdays, evenings and everyday wear",
        quote: "A timeless signature makes its mark without saying a word."
    },
    "azzaro-most-wanted": {
        gender: "men",
        brand: "Azzaro",
        name: "The Most Wanted Parfum",
        image: "../images/Azzaro-Most-Wanted-Parfum-100ml.jpg",
        alt: "Azzaro The Most Wanted Parfum",
        description: "A bold, warm fragrance with a striking spicy character and a rich, lingering finish.",
        character: "Spicy, warm and sensual",
        notes: "Spices, warm woods and amber-like accords",
        occasion: "Evenings, special occasions and cooler weather",
        quote: "For the moments when being remembered is part of the plan."
    },
    "azzaro-wanted-eau-de-parfum": {
        gender: "men",
        brand: "Azzaro",
        name: "Wanted Eau de Parfum",
        image: "../images/Azzaro-Wanted-Eau-de-Parfum-100ml.jpg",
        alt: "Azzaro Wanted eau de parfum",
        description: "An energetic, modern scent with a bright opening and a confident woody warmth.",
        character: "Fresh, spicy and woody",
        notes: "Citrus, spices and woods",
        occasion: "Daytime, nights out and confident everyday wear",
        quote: "A lively first impression, with the confidence to carry it through."
    },
    "jean-paul-gaultier-le-male-le-parfum": {
        gender: "men",
        brand: "Jean Paul Gaultier",
        name: "Le Male Le Parfum",
        image: "../images/71oGDPmn2GL._AC_SL1500_.jpg",
        alt: "Jean Paul Gaultier Le Male Le Parfum",
        description: "A polished, intense take on a classic masculine style, pairing aromatic freshness with rich, comforting warmth.",
        character: "Warm, aromatic and ambery",
        notes: "Cardamom, lavender, iris and vanilla",
        occasion: "Evenings, formal occasions and cooler days",
        quote: "Classic character, turned up just enough to make it unforgettable."
    },
    "dior-sauvage-parfum": {
        gender: "men",
        brand: "Dior",
        name: "Sauvage Parfum",
        image: "../images/OIP%20(1).webp",
        alt: "Dior Sauvage Parfum",
        description: "A bold, smooth interpretation of fresh, rugged style, with crisp aromatic facets and a rich, warm base.",
        character: "Fresh, aromatic and woody",
        notes: "Bergamot, aromatic notes and warm woods",
        occasion: "Day-to-night wear and special occasions",
        quote: "Let fresh confidence do the talking, from first meeting to last impression."
    },
    "valentino-uomo-born-in-roma": {
        gender: "men",
        brand: "Valentino",
        name: "Uomo Born in Roma",
        image: "../images/OIP.webp",
        alt: "Valentino Uomo Born in Roma eau de toilette",
        description: "A contemporary blend of aromatic freshness and smooth woods with a distinctive, modern edge.",
        character: "Aromatic, woody and modern",
        notes: "Aromatic notes, vetiver and woods",
        occasion: "Everyday wear, evenings and city nights",
        quote: "Make the city yours with a signature that feels unmistakably individual."
    },
    "giorgio-armani-my-way-parfum": {
        gender: "women",
        brand: "Giorgio Armani",
        name: "My Way Parfum",
        image: "../images/Giorgio-Armani-My-Way-Parfum-30ml-Pack-Shot.webp",
        alt: "Giorgio Armani My Way Parfum",
        description: "A luminous floral fragrance with a radiant opening and a smooth, enveloping finish.",
        character: "Floral, bright and elegant",
        notes: "Citrus, white florals and warm vanilla",
        occasion: "Daytime, celebrations and personal signature wear",
        quote: "Follow your own path, and leave a beautiful impression along the way."
    },
    "dior-jadore": {
        gender: "women",
        brand: "Dior",
        name: "J'adore",
        image: "../images/j'adore%20dior.avif",
        alt: "Dior J'adore eau de parfum",
        description: "A radiant floral bouquet with a graceful, golden character and a soft, elegant trail.",
        character: "Floral, radiant and refined",
        notes: "A bouquet of luminous florals",
        occasion: "Celebrations, evenings and elegant everyday wear",
        quote: "A graceful bouquet turns an ordinary moment into something unforgettable."
    },
    "kayali-boujee-marshmallow": {
        gender: "women",
        brand: "Kayali",
        name: "Boujee Marshmallow | 81",
        image: "../images/kayali%20boujee%20marshmallow.avif",
        alt: "Kayali Boujee Marshmallow fragrance",
        description: "A playful gourmand scent with a fluffy, sweet character and a soft, cozy finish.",
        character: "Sweet, soft and gourmand",
        notes: "Marshmallow, fruits and creamy vanilla",
        occasion: "Day-to-night wear, gifting and cozy moments",
        quote: "A little sweetness makes every entrance feel more inviting."
    },
    "kayali-vanilla-28": {
        gender: "women",
        brand: "Kayali",
        name: "Vanilla | 28",
        image: "../images/kayali%20vanilla%2028.webp",
        alt: "Kayali Vanilla 28 eau de parfum",
        description: "A warm, enveloping vanilla fragrance layered with soft sweetness and a smooth, sensual depth.",
        character: "Warm, sweet and comforting",
        notes: "Vanilla, brown sugar and amber",
        occasion: "Evenings, layering and a cozy everyday signature",
        quote: "Wrap yourself in a scent that feels as captivating as it smells."
    },
    "lattafa-yara": {
        gender: "women",
        brand: "Lattafa",
        name: "Yara",
        image: "../images/lattafe%20yara.avif",
        alt: "Lattafa Yara eau de parfum",
        description: "A soft, inviting fragrance with a sweet fruity-floral character and a creamy, comforting finish.",
        character: "Fruity, floral and creamy",
        notes: "Fruits, florals and soft vanilla",
        occasion: "Everyday wear, brunch and relaxed evenings",
        quote: "A soft, memorable trail is the perfect finishing touch to your day."
    },
    "chanel-no-5": {
        gender: "women",
        brand: "Chanel",
        name: "N°5",
        image: "../images/n5%20channel%20paris.webp",
        alt: "Chanel N°5 eau de parfum",
        description: "An iconic, sophisticated floral bouquet with a polished character and a timeless finish.",
        character: "Floral, aldehydic and elegant",
        notes: "Aldehydes, florals and warm woods",
        occasion: "Evenings, special occasions and timeless daily wear",
        quote: "Some signatures never go out of style."
    },
    "prada-paradoxe": {
        gender: "women",
        brand: "Prada",
        name: "Paradoxe",
        image: "../images/paradoxe%20prada.webp",
        alt: "Prada Paradoxe eau de parfum",
        description: "A modern, luminous fragrance that balances bright florals with a smooth, warm and sensual base.",
        character: "Bright, floral and warm",
        notes: "Citrus, white florals and amber",
        occasion: "Day-to-evening wear and special occasions",
        quote: "Celebrate every side of you with a scent that refuses to be ordinary."
    },
    "giorgio-armani-si-intense": {
        gender: "women",
        brand: "Giorgio Armani",
        name: "Sì Intense",
        image: "../images/si%20intense.webp",
        alt: "Giorgio Armani Sì Intense eau de parfum",
        description: "A deep, expressive fragrance with a rich fruity-floral heart and a warm, elegant finish.",
        character: "Deep, fruity and floral",
        notes: "Blackcurrant, rose and warm vanilla",
        occasion: "Evenings, celebrations and confident wear",
        quote: "Say yes to a bold signature that stays with you."
    },
    "giorgio-armani-si-passione": {
        gender: "women",
        brand: "Giorgio Armani",
        name: "Sì Passione",
        image: "../images/si%20passione.jpg",
        alt: "Giorgio Armani Sì Passione eau de parfum",
        description: "A vibrant, passionate blend with bright fruit, elegant florals and a confident, warm trail.",
        character: "Vibrant, fruity and floral",
        notes: "Pear, rose and vanilla",
        occasion: "Date nights, celebrations and everyday confidence",
        quote: "Wear your passion openly, and let your signature follow."
    },
    "ysl-libre": {
        gender: "women",
        brand: "Yves Saint Laurent",
        name: "Libre",
        image: "../images/ysl%20libre.webp",
        alt: "Yves Saint Laurent Libre eau de parfum",
        description: "A bold floral fragrance balancing aromatic lavender with luminous orange blossom and warm vanilla.",
        character: "Floral, aromatic and warm",
        notes: "Lavender, orange blossom and vanilla",
        occasion: "Day-to-night wear and moments worth celebrating",
        quote: "The freedom to be entirely yourself is always in style."
    },
    "ysl-libre-vanille-couture": {
        gender: "women",
        brand: "Yves Saint Laurent",
        name: "Libre Vanille Couture",
        image: "../images/ysl%20libre%20couture.webp",
        alt: "Yves Saint Laurent Libre Vanille Couture eau de parfum",
        description: "A rich, dressed-up floral vanilla interpretation with a warm, smooth and statement-making finish.",
        character: "Warm, floral and vanilla-rich",
        notes: "Lavender, orange blossom and vanilla",
        occasion: "Evenings, special occasions and cooler weather",
        quote: "A couture finish for the moments you want to make your own."
    }
};

const cartStorageKey = "crown-perfume-cart";

function showShopMessage(message) {
    const status = document.querySelector("#shop-message");
    if (status) {
        status.textContent = message;
        return;
    }
    window.alert(message);
}

function readCart() {
    try {
        const savedCart = localStorage.getItem(cartStorageKey);
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];
        if (!Array.isArray(parsedCart)) {
            throw new Error("Saved cart data is not a list.");
        }
        return parsedCart.filter((item) =>
            item &&
            fragrances[item.id] &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
    } catch (error) {
        showShopMessage("Your saved bag could not be read. Please try again or clear your browser's site data.");
        console.error("Unable to read the Crown Perfume cart.", error);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(cartStorageKey, JSON.stringify(cart));
        updateCartCount(cart);
        return true;
    } catch (error) {
        showShopMessage("Your browser could not save the bag. Check your browser storage settings and try again.");
        console.error("Unable to save the Crown Perfume cart.", error);
        return false;
    }
}

function updateCartCount(cart = readCart()) {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach((counter) => {
        counter.textContent = String(count).padStart(2, "0");
    });
}

function renderProduct() {
    const details = document.querySelector("#product-details");
    if (!details) return;

    const product = fragrances[new URLSearchParams(window.location.search).get("id")];
    if (!product) {
        details.hidden = true;
        document.querySelector("#product-not-found").hidden = false;
        return;
    }

    document.title = `${product.name} — Crown Perfume`;
    document.querySelector("#product-image").src = product.image;
    document.querySelector("#product-image").alt = product.alt;
    document.querySelector("#product-brand").textContent = product.brand;
    document.querySelector("#product-name").textContent = product.name;
    document.querySelector("#product-description").textContent = product.description;
    document.querySelector("#product-character").textContent = product.character;
    document.querySelector("#product-notes").textContent = product.notes;
    document.querySelector("#product-occasion").textContent = product.occasion;
    document.querySelector("#product-quote").textContent = `“${product.quote}”`;

    document.querySelector("#add-to-cart").addEventListener("click", () => {
        const cart = readCart();
        const existingItem = cart.find((item) => item.id === new URLSearchParams(window.location.search).get("id"));
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: new URLSearchParams(window.location.search).get("id"), quantity: 1 });
        }
        if (saveCart(cart)) {
            window.location.href = "cart.html";
        }
    });
}

function renderCart() {
    const itemsContainer = document.querySelector("#cart-items");
    if (!itemsContainer) return;

    const cart = readCart();
    itemsContainer.replaceChildren();
    document.querySelector("#cart-empty").hidden = cart.length > 0;
    document.querySelector("#checkout-section").hidden = cart.length === 0;
    document.querySelector("#cart-count-summary").textContent = cart.length
        ? `${cart.reduce((total, item) => total + item.quantity, 0)} item${cart.reduce((total, item) => total + item.quantity, 0) === 1 ? "" : "s"} in your bag`
        : "";

    cart.forEach((item) => {
        const product = fragrances[item.id];
        const row = document.createElement("article");
        row.className = "cart-row";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.alt;

        const info = document.createElement("div");
        const brand = document.createElement("p");
        brand.className = "cart-item-brand";
        brand.textContent = product.brand;
        const name = document.createElement("h2");
        name.className = "cart-item-name";
        name.textContent = product.name;
        info.append(brand, name);

        const controls = document.createElement("div");
        controls.className = "cart-item-controls";
        const decrease = document.createElement("button");
        decrease.className = "quantity-button";
        decrease.type = "button";
        decrease.textContent = "−";
        decrease.setAttribute("aria-label", `Remove one ${product.name}`);
        const quantity = document.createElement("span");
        quantity.className = "quantity-value";
        quantity.textContent = String(item.quantity);
        const increase = document.createElement("button");
        increase.className = "quantity-button";
        increase.type = "button";
        increase.textContent = "+";
        increase.setAttribute("aria-label", `Add one ${product.name}`);
        const remove = document.createElement("button");
        remove.className = "remove-button";
        remove.type = "button";
        remove.textContent = "Remove";
        controls.append(decrease, quantity, increase, remove);
        row.append(image, info, controls);
        itemsContainer.append(row);

        decrease.addEventListener("click", () => {
            const updatedCart = readCart();
            const currentItem = updatedCart.find((cartItem) => cartItem.id === item.id);
            if (!currentItem) return;
            if (currentItem.quantity === 1) {
                removeItem(item.id);
                return;
            }
            currentItem.quantity -= 1;
            if (saveCart(updatedCart)) renderCart();
        });
        increase.addEventListener("click", () => {
            const updatedCart = readCart();
            const currentItem = updatedCart.find((cartItem) => cartItem.id === item.id);
            if (!currentItem) return;
            currentItem.quantity += 1;
            if (saveCart(updatedCart)) renderCart();
        });
        remove.addEventListener("click", () => removeItem(item.id));
    });

    const checkoutForm = document.querySelector("#checkout-form");
    if (checkoutForm && !checkoutForm.dataset.bound) {
        checkoutForm.dataset.bound = "true";
        checkoutForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!checkoutForm.reportValidity()) return;

            const formData = new FormData(checkoutForm);
            const currentCart = readCart();
            if (currentCart.length === 0) {
                showShopMessage("Your bag is empty. Add a fragrance before placing an order.");
                renderCart();
                return;
            }

            const orderLines = currentCart.map((item) => {
                const product = fragrances[item.id];
                return `- ${product.name} x ${item.quantity}`;
            });
            const message = [
                "Hello Crown Perfume, I'd like to place an order.",
                "",
                "Order:",
                ...orderLines,
                "",
                `Name: ${formData.get("name").trim()}`,
                `Phone: ${formData.get("phone").trim()}`,
                `Delivery address: ${formData.get("address").trim()}`,
                `Order note: ${formData.get("note").trim() || "None"}`,
                "",
                "Please confirm availability, delivery, and the total price."
            ].join("\n");
            window.location.href = `https://wa.me/96170282390?text=${encodeURIComponent(message)}`;
        });
    }
}

function removeItem(id) {
    const updatedCart = readCart().filter((item) => item.id !== id);
    if (saveCart(updatedCart)) renderCart();
}

updateCartCount();
renderProduct();
renderCart();
