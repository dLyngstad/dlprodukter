// Fil: app.js
// Versjon: Endelig, korrekt initialisering

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
        <div class="group-box">
            <span class="group-box-legend">${product.name}</span>
            
            <div class="product-content-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                
                <div class="product-details-retro">
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">kr ${product.price}</p>
                    
                    <div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${product.ecwidId}" 
                         itemtype="http://schema.org/Product" 
                         data-single-product-id="${product.ecwidId}">
                        <div customprop="addtobag"></div>
                    </div>
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

    const ecwidScript = document.createElement('script');
    ecwidScript.setAttribute('data-cfasync', 'false');
    ecwidScript.setAttribute('type', 'text/javascript');
    ecwidScript.setAttribute('src', 'https://app.ecwid.com/script.js?123196506&data_platform=singleproduct_v2');
    ecwidScript.setAttribute('charset', 'utf-8');
    
    // DENNE FUNKSJONEN ER NØDVENDIG FOR Å AKTIVERE KNAPPENE
    ecwidScript.onload = () => {
        if (typeof xProduct === 'function') {
            xProduct();
        }
    };
    
    document.body.appendChild(ecwidScript);
});
