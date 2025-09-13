// Fil: app.js
// Versjon: Added Image Lightbox with Product Info and Ecwid Button

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

    // Added data-attributes to each image to make them clickable for the lightbox
    const imageSlides = product.images.map((imgSrc, index) => 
        `<img src="${imgSrc}" alt="${product.name}" class="carousel-image" data-product-id="${product.id}" data-image-index="${index}">`
    ).join('');

    // Conditionally create the "Mer info" button
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

    const productGrid = document.getElementById('product-grid');

    // --- LOGIC FOR "MER INFO" MODAL ---
    const modalOverlay = document.getElementById('info-modal-overlay');
    const modalTitle = document.getElementById('info-modal-title');
    const modalBody = document.getElementById('info-modal-body');
    const closeModalBtn = document.getElementById('info-modal-close-btn');

    const openModal = (product) => {
        modalTitle.textContent = product.name;
        modalBody.innerHTML = product.moreInfo;
        modalOverlay.classList.remove('hidden');
    };

    const closeModal = () => {
        modalOverlay.classList.add('hidden');
    };

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
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // --- LOGIC FOR IMAGE LIGHTBOX ---
    const lightboxOverlay = document.getElementById('image-lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title'); // Main title bar
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxNextBtn = document.querySelector('#image-lightbox-box .lightbox-arrow.right');
    const lightboxPrevBtn = document.querySelector('#image-lightbox-box .lightbox-arrow.left');

    // New elements for product info section
    const lightboxProductName = document.getElementById('lightbox-product-name');
    const lightboxProductDescription = document.getElementById('lightbox-product-description');
    const lightboxProductPrice = document.getElementById('lightbox-product-price');
    const lightboxEcwidBuyButtonContainer = document.getElementById('lightbox-ecwid-buy-button');
    const lightboxMoreInfoButton = document.getElementById('lightbox-more-info-btn');


    let currentLightboxProduct = null;
    let currentLightboxIndex = 0;

    const showLightboxImage = () => {
        const images = currentLightboxProduct.images;
        lightboxImage.src = images[currentLightboxIndex];
        lightboxCounter.textContent = `Bilde ${currentLightboxIndex + 1} av ${images.length}`;
        const display = images.length > 1 ? 'flex' : 'none';
        lightboxNextBtn.style.display = display;
        lightboxPrevBtn.style.display = display;
    };

    const openLightbox = (productId, imageIndex) => {
        currentLightboxProduct = products.find(p => p.id === productId);
        if (!currentLightboxProduct) return;
        
        // Update main lightbox title bar
        lightboxTitle.textContent = currentLightboxProduct.name;

        // Update product info section
        lightboxProductName.textContent = currentLightboxProduct.name;
        lightboxProductDescription.textContent = currentLightboxProduct.description;
        lightboxProductPrice.textContent = `kr ${currentLightboxProduct.price}`;
        
        // Setup Ecwid buy button
        lightboxEcwidBuyButtonContainer.innerHTML = `
            <div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${currentLightboxProduct.ecwidId}" 
                 itemtype="http://schema.org/Product" 
                 data-single-product-id="${currentLightboxProduct.ecwidId}">
                <div customprop="addtobag"></div>
            </div>
        `;

        // Conditionally show/hide "Mer info" button
        if (currentLightboxProduct.moreInfo) {
            lightboxMoreInfoButton.style.display = 'block';
            lightboxMoreInfoButton.dataset.productId = currentLightboxProduct.id;
        } else {
            lightboxMoreInfoButton.style.display = 'none';
            delete lightboxMoreInfoButton.dataset.productId;
        }

        currentLightboxIndex = parseInt(imageIndex, 10);
        showLightboxImage();
        lightboxOverlay.classList.remove('hidden');

        // Re-initialize Ecwid widgets inside the lightbox if xProduct is available
        if (typeof xProduct === 'function') {
            xProduct();
        }
    };

    const closeLightbox = () => {
        lightboxOverlay.classList.add('hidden');
        // Clear Ecwid button container to prevent re-initialization issues
        lightboxEcwidBuyButtonContainer.innerHTML = ''; 
    };

    const nextLightboxImage = () => {
        const images = currentLightboxProduct.images;
        currentLightboxIndex = (currentLightboxIndex + 1) % images.length;
        showLightboxImage();
    };

    const prevLightboxImage = () => {
        const images = currentLightboxProduct.images;
        currentLightboxIndex = (currentLightboxIndex - 1 + images.length) % images.length;
        showLightboxImage();
    };

    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('carousel-image')) {
            const productId = event.target.dataset.productId;
            const imageIndex = event.target.dataset.imageIndex;
            openLightbox(productId, imageIndex);
        }
    });

    lightboxCloseBtn.addEventListener('click', closeLightbox);
    lightboxNextBtn.addEventListener('click', nextLightboxImage);
    lightboxPrevBtn.addEventListener('click', prevLightboxImage);
    
    // Event listener for "Mer info" button inside the lightbox
    lightboxMoreInfoButton.addEventListener('click', (event) => {
        if (currentLightboxProduct && currentLightboxProduct.moreInfo) {
            closeLightbox(); // Close lightbox before opening info modal
            openModal(currentLightboxProduct);
        }
    });

    lightboxOverlay.addEventListener('click', (event) => {
        // Only close if clicking the actual overlay background, not the box itself
        if (event.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    // Create the Ecwid script tag
    const ecwidScript = document.createElement('script');
    ecwidScript.setAttribute('data-cfasync', 'false');
    ecwidScript.setAttribute('type', 'text/javascript');
    ecwidScript.setAttribute('src', 'https://app.ecwid.com/script.js?123196506&data_platform=singleproduct_v2');
    ecwidScript.setAttribute('charset', 'utf-8');
    
    ecwidScript.onload = () => {
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
    
    document.body.appendChild(ecwidScript);
});
