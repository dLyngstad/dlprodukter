// --- START: ECWID & PRODUCT DISPLAY CODE ---

// This function loads reusable HTML parts like your header
const loadHTML = (filePath, elementId) => {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            }
        });
};

// This function is the "factory" that builds one product card
const createProductHTML = (product) => {
    // This part generates the special div that Ecwid needs for the "Add to Bag" button
    const ecwidButtonCode = `
        <div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${product.ecwidId}" 
             itemtype="http://schema.org/Product" 
             data-single-product-id="${product.ecwidId}">
            <div customprop="addtobag"></div>
        </div>
    `;

    // This is the full HTML for one product card, including the Ecwid button code
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

// This function takes all your products and displays them on the page
const renderProducts = () => {
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        // The 'products' variable comes from the products.js file
        products.forEach(product => {
            productGrid.innerHTML += createProductHTML(product);
        });
    }
};

// This is the main function that runs when your page loads
document.addEventListener("DOMContentLoaded", () => {
    // Load the header
    loadHTML('partials/header.html', 'header-placeholder');
    
    // Build and display the product cards on the page
    renderProducts();
    
    // --- Ecwid's Main Scripts ---
    // This adds the main Ecwid script to your page. It only needs to be loaded once.
    const ecwidScript = document.createElement('script');
    ecwidScript.setAttribute('data-cfasync', 'false');
    ecwidScript.setAttribute('type', 'text/javascript');
    ecwidScript.setAttribute('src', 'https://app.ecwid.com/script.js?123196506&data_platform=singleproduct_v2');
    ecwidScript.setAttribute('charset', 'utf-8');
    document.body.appendChild(ecwidScript);

    // This small script is also needed to activate the buttons.
    const xProductScript = document.createElement('script');
    xProductScript.setAttribute('type', 'text/javascript');
    xProductScript.innerText = 'xProduct()';
    document.body.appendChild(xProductScript);
});


// --- NOTE: Your Auth0 login code should go below this line if you need it ---
