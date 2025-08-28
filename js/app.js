// Fil: app.js
// Versjon: Added "Mer Info" Modal Functionality

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
        return '';
    }

    const imageSlides = product.images.map(imgSrc => 
        `<img src="${imgSrc}" alt="${product.name}" class="carousel-image">`
    ).join('');

    // --- NEW: Conditionally create the "Mer info" button ---
    const infoButtonHTML = product.moreInfo 
        ? `<button class="info-btn" data-product-id="${product.id}">Mer info</button>` 
        : '';

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
                    ${infoButtonHTML}
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
    // ... (This function remains exactly the same as before)
    const carousels = document.querySelectorAll('.image-carousel');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
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

// --- Hovedskriptet kjører når siden er ferdig lastet ---
document.addEventListener("DOMContentLoaded", () => {
    loadHTML('partials/header.html', 'header-placeholder');
    loadHTML('partials/footer.html', 'footer-placeholder');
    
    renderProducts();
    initializeCarousels();

    // --- NEW: MODAL LOGIC ---
    const modalOverlay = document.getElementById('info-modal-overlay');
    const modalTitle = document.getElementById('info-modal-title');
    const modalBody = document.getElementById('info-modal-body');
    const closeModalBtn = document.getElementById('info-modal-close-btn');
    const productGrid = document.getElementById('product-grid');

    const openModal = (product) => {
        modalTitle.textContent = product.name;
        modalBody.innerHTML = product.moreInfo;
        modalOverlay.classList.remove('hidden');
    };

    const closeModal = () => {
        modalOverlay.classList.add('hidden');
    };

    // Event listener for all "Mer info" buttons using event delegation
    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('info-btn')) {
            const productId = event.target.dataset.productId;
            const product = products.find(p => p.id === productId);
            if (product) {
                openModal(product);
            }
        }
    });
    
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) { // Only close if clicking the background
            closeModal();
        }
    });
    // --- END OF NEW MODAL LOGIC ---


    // Create the Ecwid script tag
    const ecwidScript = document.createElement('script');
    ecwidScript.setAttribute('data-cfasync', 'false');
    ecwidScript.setAttribute('type', 'text/javascript');
    ecwidScript.setAttribute('src', 'https://app.ecwid.com/script.js?123196506&data_platform=singleproduct_v2');
    ecwidScript.setAttribute('charset', 'utf-8');
    
    // Set up the function that will run AFTER the script has loaded
    ecwidScript.onload = () => {
        // ... (This section remains exactly the same as before)
        if (typeof Ecwid !== 'undefined' && Ecwid.OnAPILoaded) {
            Ecwid.OnAPILoaded.add(function() {
                if (typeof xProduct === 'function') {
                    xProduct();
                }
                if (Ecwid.Minicart) {
                    Ecwid.Minicart.insertTo('my-cart');
                }
            });
        }
    };
    
    // Add the script to the page to start loading it
    document.body.appendChild(ecwidScript);
});
