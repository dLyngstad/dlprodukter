// Fil: app.js
// Versjon: Forenklet og korrekt med handlevogn

/**
 * Laster inn gjenbrukbare HTML-deler som header og footer.
 */
const loadHTML = (filePath, elementId) => {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) element.innerHTML = data;
        });
};

/**
 * Bygger et detaljert og egendefinert produktkort.
 */
const createProductHTML = (product) => {
    if (!product.ecwidId || product.ecwidId.includes('YOUR_ECWID_ID')) {
        console.warn(`Produktet "${product.name}" mangler en gyldig ecwidId og vil ikke bli vist.`);
        return '';
    }

    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">kr ${product.price}</p>
                
                <div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${product.ecwidId}" 
                     itemtype="http://schema.org/Product" 
                     data-single-product-id="${product.ecwidId}">
                    <div customprop="addtobag"></div>
                </div>
            </div>
        </div>
    `;
};

/**
 * Viser alle produktene fra products.js på siden.
 */
const renderProducts = () => {
    const productGrid = document.getElementById('product-grid');
    if (productGrid && typeof products !== 'undefined') {
        productGrid.innerHTML = '';
        products.forEach(product => {
            productGrid.innerHTML += createProductHTML(product);
        });
    }
};

// --- Hovedskriptet kjører når siden er ferdig lastet ---
document.addEventListener("DOMContentLoaded", () => {
    loadHTML('partials/header.html', 'header-placeholder');
    renderProducts();

    // Laster Ecwid-scriptet. Det vil automatisk finne
    // produkt-plassholderne og handlevogn-widgeten.
    const ecwidScript = document.createElement('script');
    ecwidScript.setAttribute('data-cfasync', 'false');
    ecwidScript.setAttribute('type', 'text/javascript');
    ecwidScript.setAttribute('src', 'https://app.ecwid.com/script.js?123196506&data_platform=singleproduct_v2');
    ecwidScript.setAttribute('charset', 'utf-8');
    document.body.appendChild(ecwidScript);
});
