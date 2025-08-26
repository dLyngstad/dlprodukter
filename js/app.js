// This function loads reusable HTML parts like your header
const loadHTML = (filePath, elementId) => {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) element.innerHTML = data;
        });
};

// This function builds one product card with a real Ecwid button
const createProductHTML = (product) => {
    const ecwidButtonCode = `
        <div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${product.ecwidId}" 
             itemtype="http://schema.org/Product" 
             data-single-product-id="${product.ecwidId}">
            <div customprop="addtobag"></div>
        </div>
    `;

    return `
        <div class="product-card group-box">
            <span class="group-box-legend">${product.name}</span>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <p><strong>Price:</strong> ${product.price} NOK</p>
                <p><strong>Description:</strong> ${product.description}</p>
                ${ecwidButtonCode}
            </div>
        </div>
    `;
};

// This function displays all your products on the page
const renderProducts = () => {
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        productGrid.innerHTML = ''; // Clear existing content
        products.forEach(product => {
            productGrid.innerHTML += createProductHTML(product);
        });
    }
};

// This is the main function that runs when your page loads
document.addEventListener("DOMContentLoaded", () => {
    loadHTML('partials/header.html', 'header-placeholder');
    renderProducts();
    
    // Add Ecwid's main script to the page once
    const ecwidScript = document.createElement('script');
    ecwidScript.setAttribute('data-cfasync', 'false');
    ecwidScript.setAttribute('type', 'text/javascript');
    ecwidScript.setAttribute('src', 'https://app.ecwid.com/script.js?123196506&data_platform=singleproduct_v2');
    ecwidScript.setAttribute('charset', 'utf-8');
    document.body.appendChild(ecwidScript);

    // Add the activation script once
    const xProductScript = document.createElement('script');
    xProductScript.setAttribute('type', 'text/javascript');
    xProductScript.innerText = 'xProduct()';
    document.body.appendChild(xProductScript);
});
