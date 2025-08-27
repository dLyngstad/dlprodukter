// Fil: app.js
// Versjon: Med bildekarusell

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
 * Bygger et produktkort med en bildekarusell.
 */
const createProductHTML = (product) => {
    if (!product.ecwidId || !product.images || product.images.length === 0) {
        return ''; // Don't render if there's no ecwidId or no images
    }

    // Create image slides from the product.images array
    const imageSlides = product.images.map(imgSrc => 
        `<img src="${imgSrc}" alt="${product.name}" class="carousel-image">`
    ).join('');

    return `
        <div class="group-box">
            <span class="group-box-legend">${product.name}</span>
            <div class="product-content-wrapper">
                
                <div class="image-carousel">
                    <div class="carousel-track">${imageSlides}</div>
                    <div class="carousel-arrow left">&lt;</div>
                    <div class="carousel-arrow right">&gt;</div>
                </div>
                
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

/**
 * Adds click functionality to all carousels on the page.
 */
const initializeCarousels = () => {
    const carousels = document.querySelectorAll('.image-carousel');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        if (slides.length <= 1) { // Hide arrows if only one image
            carousel.querySelector('.left').style.display = 'none';
            carousel.querySelector('.right').style.display = 'none';
            return;
        }

        const nextButton = carousel.querySelector('.carousel-arrow.right');
        const prevButton = carousel.querySelector('.carousel-arrow.left');
        const slideWidth = slides[0].getBoundingClientRect().width;

        let currentIndex = 0;

        // Function to move to a specific slide
        const moveToSlide = (targetIndex) => {
            track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
            currentIndex = targetIndex;
        };

        // When I click the right arrow, move slides to the left
        nextButton.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0; // Loop back to the start
            }
            moveToSlide(nextIndex);
        });

        // When I click the left arrow, move slides to the right
        prevButton.addEventListener('click', () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1; // Loop back to the end
            }
            moveToSlide(prevIndex);
        });
    });
};

// --- Hovedskriptet kjører når siden er ferdig lastet ---
document.addEventListener("DOMContentLoaded", () => {
    loadHTML('partials/header.html', 'header-placeholder');
    loadHTML('partials/footer.html', 'footer-placeholder');
    
    renderProducts();
    initializeCarousels(); // IMPORTANT: Call the new function here

    window.Ecwid.OnAPILoaded.add(function() {
        if (typeof xProduct === 'function') {
            xProduct();
        }
        Ecwid.Minicart.insertTo('my-cart');
    });

    const ecwidScript = document.createElement('script');
    ecwidScript.setAttribute('data-cfasync', 'false');
    ecwidScript.setAttribute('type', 'text/javascript');
    ecwidScript.setAttribute('src', 'https://app.ecwid.com/script.js?123196506&data_platform=singleproduct_v2');
    ecwidScript.setAttribute('charset', 'utf-8');
    document.body.appendChild(ecwidScript);
});
