// --- START: CLEAN APP.JS CODE (NO AUTH0) ---

// This function loads reusable HTML parts like your header
const loadHTML = (filePath, elementId) => {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) element.innerHTML = data;
        });
};

// This function builds one product card with the Ecwid placeholder
const createProductHTML = (product) => {
    if (!product.ecwidId || product.ecwidId.includes('YOUR_ECWID_ID')) {
        console.warn(`Product "${product.name}" is missing a valid ecwidId.`);
        return ''; // Don't render products without a valid ID
    }

    return `
        <div class="product-card group-box">
            <span class="group-box-legend">${product.name}</span>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <p><strong>Price:</strong> ${product.price} NOK</p>
                <p><strong>Description:</strong> ${product.description}</p>
                
                <div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${product.ecwidId}" 
                     itemtype="http://schema.org/Product" 
                     data-single-product-id="${product.ecwidId}">
                    <div customprop="addtobag"></div>
                </div>
            </div>
        </div>
    `;
};

// This function displays all your products on the page
const renderProducts = () => {
    const productGrid = document.getElementById('product-grid');
    if (productGrid && typeof products !== 'undefined') {
        productGrid.innerHTML = '';
        products.forEach(product => {
            productGrid.innerHTML += createProductHTML(product);
        });
    }
};

// --- Main execution starts here ---
document.addEventListener("DOMContentLoaded", () => {
    loadHTML('partials/header.html', 'header-placeholder');
    renderProducts();

    // The safest way to load and initialize Ecwid
    window.ec = window.ec || {};
    window.ec.config = window.ec.config || {};
    window.ec.config.store_main_page_url = window.location.href;

    const ecwidScript = document.createElement('script');
    ecwidScript.setAttribute('data-cfasync', 'false');
    ecwidScript.setAttribute('type', 'text/javascript');
    ecwidScript.setAttribute('src', 'https://app.ecwid.com/script.js?123196506&data_platform=singleproduct_v2');
    ecwidScript.setAttribute('charset', 'utf-8');
    
    ecwidScript.onload = () => {
        if(typeof Ecwid != 'undefined'){
            Ecwid.init();
        }
    };

    document.body.appendChild(ecwidScript);
});
