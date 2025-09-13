// Fil: app.js
// Versjon: Added Image Lightbox Functionality

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
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const lightboxNextBtn = document.querySelector('#image-lightbox-box .lightbox-arrow.right');
    const lightboxPrevBtn = document.querySelector('#image-lightbox-box .lightbox-arrow.left');

    let currentLightboxProduct = null;
    let currentLightboxIndex = 0;

    const showLightboxImage = () => {
        const images = currentLightboxProduct.images;
        lightboxImage.src = images[currentLightboxIndex];
        lightboxTitle.textContent = currentLightboxProduct.name;
        lightboxCounter.textContent = `Bilde ${currentLightboxIndex + 1} av ${images.length}`;
        const display = images.length > 1 ? 'flex' : 'none';
        lightboxNextBtn.style.display = display;
        lightboxPrevBtn.style.display = display;
    };

    const openLightbox = (productId, imageIndex) => {
        currentLightboxProduct = products.find(p => p.id === productId);
        if (!currentLightboxProduct) return;
        currentLightboxIndex = parseInt(imageIndex, 10);
        showLightboxImage();
        lightboxOverlay.classList.remove('hidden');
    };

    const closeLightbox = () => {
        lightboxOverlay.classList.add('hidden');
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
    lightboxOverlay.addEventListener('click', (event) => {
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
            Ewid.OnAPILoaded.add(function() {
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
