// Function to load HTML content from a file into an element
const loadHTML = (filePath, elementId) => {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching HTML:', error);
        });
};

// When the DOM is fully loaded, load the header and footer
document.addEventListener("DOMContentLoaded", () => {
    loadHTML('partials/header.html', 'header-placeholder');
    loadHTML('partials/footer.html', 'footer-placeholder');
    
    // We will put the Auth0 code here later, after the header is loaded
});

// --- Your Auth0 configuration and functions will go below this line ---
// (We can re-integrate this in the next step)



// --- Product Listing Logic ---

// Function to generate the HTML for a single product
const createProductHTML = (product) => {
    return `
        <div class="product-card group-box">
            <span class="group-box-legend">${product.name}</span>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <p><strong>Price:</strong> ${product.price} NOK</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <button class="product-button" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
};

// Function to display all products on the page
const renderProducts = () => {
    // Find the container on the page where we want to put the products
    const productGrid = document.getElementById('product-grid');
    
    // Only run this code if we are on a page that actually has a product-grid
    if (productGrid) {
        // Clear any existing content
        productGrid.innerHTML = ''; 
        
        // Loop through our products array (from products.js) and generate HTML for each one
        products.forEach(product => {
            productGrid.innerHTML += createProductHTML(product);
        });
    }
};

// When the DOM is fully loaded, in addition to loading the header, also render the products
document.addEventListener("DOMContentLoaded", () => {
    loadHTML('partials/header.html', 'header-placeholder');
    // We can remove the footer for now to match the classic UI
    // loadHTML('partials/footer.html', 'footer-placeholder');
    
    renderProducts(); // <-- ADD THIS LINE
    
    // We will put the Auth0 code here later
});
