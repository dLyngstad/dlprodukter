// Fil: js/search.js
// Engine for the independent product search page

document.addEventListener("DOMContentLoaded", () => {
    
    // --- HELPER FUNCTIONS (Copied from app.js for independence & consistency) ---

    /**
     * Loads reusable HTML parts like header and footer.
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
     * Builds a product card with an image carousel.
     * This is an exact copy from your app.js to ensure visuals are identical.
     */
    const createProductHTML = (product) => {
        if (!product.ecwidId || !product.images || product.images.length === 0) {
            return '';
        }

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
     * Adds click functionality to all carousels on the page.
     * This is also an exact copy from app.js.
     */
    const initializeCarousels = () => {
        const carousels = document.querySelectorAll('.image-carousel');
        carousels.forEach(carousel => {
            const track = carousel.querySelector('.carousel-track');
            if (!track) return;
            const slides = Array.from(track.children);
            const nextButton = carousel.querySelector('.carousel-arrow.right');
            const prevButton = carousel.querySelector('.carousel-arrow.left');
            
            if (slides.length <= 1) {
                if (nextButton) nextButton.style.display = 'none';
                if (prevButton) prevButton.style.display = 'none';
                return;
            }

            const slideWidth = slides[0].getBoundingClientRect().width;
            let currentIndex = 0;

            const moveToSlide = (targetIndex) => {
                track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
                currentIndex = targetIndex;
            };

            nextButton.addEventListener('click', () => {
                const nextIndex = (currentIndex + 1) % slides.length;
                moveToSlide(nextIndex);
            });

            prevButton.addEventListener('click', () => {
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                moveToSlide(prevIndex);
            });
        });
    };

    // --- SEARCH PAGE SPECIFIC LOGIC ---

    const searchInput = document.getElementById('searchInput');
    const resultsGrid = document.getElementById('search-results-grid');

    /**
     * Renders a list of products, then initializes their carousels and Ecwid buttons.
     * @param {Array} productsToRender The array of product objects to display.
     */
    function renderResults(productsToRender) {
        if (!resultsGrid) return;
        
        if (productsToRender.length === 0) {
            resultsGrid.innerHTML = '<p style="text-align: center;">Ingen produkter funnet.</p>';
            return;
        }

        const resultsHTML = productsToRender.map(createProductHTML).join('');
        resultsGrid.innerHTML = resultsHTML;

        // CRITICAL: After rendering, make the new elements interactive.
        initializeCarousels();
        if (typeof Ecwid !== 'undefined' && typeof xProduct === 'function') {
            xProduct();
        }
    }
    
    /**
     * Filters the main products array based on the search term.
     */
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            resultsGrid.innerHTML = '<p style="text-align: center;">Skriv i søkefeltet for å se resultater.</p>';
            return;
        }

        const filteredProducts = products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchTerm);
            const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
            return nameMatch || descriptionMatch;
        });

        renderResults(filteredProducts);
    }
    
    // --- INITIALIZATION ---
    
    // 1. Load header/footer
    loadHTML('partials/header.html', 'header-placeholder');
    loadHTML('partials/footer.html', 'footer-placeholder');

    // 2. Set initial message and listen for search input
    resultsGrid.innerHTML = '<p style="text-align: center;">Skriv i søkefeltet for å se resultater.</p>';
    searchInput.addEventListener('input', handleSearch);

    // 3. Dynamically load and initialize Ecwid (copied from app.js)
    const ecwidScript = document.createElement('script');
    ecwidScript.setAttribute('data-cfasync', 'false');
    ecwidScript.setAttribute('type', 'text/javascript');
    // Using the same store ID and parameters from your app.js
    ecwidScript.setAttribute('src', 'https://app.ecwid.com/script.js?123196506&data_platform=singleproduct_v2');
    ecwidScript.setAttribute('charset', 'utf-8');
    
    ecwidScript.onload = () => {
        if (typeof Ecwid !== 'undefined' && Ecwid.OnAPILoaded) {
            Ecwid.OnAPILoaded.add(function() {
                // Initialize the cart once on page load.
                if (Ecwid.Minicart) {
                    Ecwid.Minicart.insertTo('my-cart');
                }
            });
        }
    };
    
    document.body.appendChild(ecwidScript);
});
