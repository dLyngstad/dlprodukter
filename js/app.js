// Fil: app.js
// Versjon: Reworked Zoom functionality based on a more reliable method.

/**
 * Laster inn gjenbrukbare HTML-deler som header og footer.
 */
import { renderProfileLink } from './ui.js';

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
    const imageSlides = product.images.map((imgSrc, index) => 
        `<img src="${imgSrc}" alt="${product.name}" class="carousel-image" data-product-id="${product.id}" data-image-index="${index}">`
    ).join('');
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
        // === VIKTIG ENDRING HER ===
        // GAMMEL METODE: productGrid.innerHTML += createProductHTML(product); i en løkke.
        // NY, MER ROBUST METODE: Bygg hele HTML-strengen først, og sett den inn én gang.
        
        const allProductsHTML = products.map(product => createProductHTML(product)).join('');
        productGrid.innerHTML = allProductsHTML;
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
    renderProfileLink();


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
    const lightboxProductName = document.getElementById('lightbox-product-name');
    const lightboxProductDescription = document.getElementById('lightbox-product-description');
    const lightboxProductPrice = document.getElementById('lightbox-product-price');
    const lightboxEcwidBuyButtonContainer = document.getElementById('lightbox-ecwid-buy-button');
    const lightboxMoreInfoButton = document.getElementById('lightbox-more-info-btn');
    
    // Zoom elements
    const zoomLens = document.getElementById('zoom-lens');
    const zoomResult = document.getElementById('zoom-result');
    const zoomedImage = document.getElementById('zoomed-image'); // The new <img> tag
    const imageSection = document.querySelector('.lightbox-image-section');

    let currentLightboxProduct = null;
    let currentLightboxIndex = 0;
    
    // --- REWORKED ZOOM LOGIC SECTION ---
    const initializeZoom = () => {
        // Clear old listeners
        imageSection.onmousemove = null;
        imageSection.onmouseenter = null;
        imageSection.onmouseleave = null;

        const sourceImage = lightboxImage;
        const resultPane = zoomResult;
        const lens = zoomLens;
        
        const zoomFactor = 2.5;

        // Ensure the source image is loaded before doing calculations
        sourceImage.onload = () => {
            // Set the size of the large, magnified image
            zoomedImage.style.width = `${sourceImage.offsetWidth * zoomFactor}px`;
            zoomedImage.style.height = `${sourceImage.offsetHeight * zoomFactor}px`;

            // Set the size of the lens based on the result pane (viewport)
            lens.style.width = `${resultPane.offsetWidth / zoomFactor}px`;
            lens.style.height = `${resultPane.offsetHeight / zoomFactor}px`;
        };
        // If image is cached, onload may not fire, so we call it manually
        if (sourceImage.complete) {
            sourceImage.onload();
        }

        const moveLens = (e) => {
            const sourceRect = sourceImage.getBoundingClientRect();

            // 1. Position the lens
            let cursorX = e.clientX - sourceRect.left;
            let cursorY = e.clientY - sourceRect.top;

            let lensX = cursorX - (lens.offsetWidth / 2);
            let lensY = cursorY - (lens.offsetHeight / 2);

            lensX = Math.max(0, Math.min(lensX, sourceImage.offsetWidth - lens.offsetWidth));
            lensY = Math.max(0, Math.min(lensY, sourceImage.offsetHeight - lens.offsetHeight));
            
            lens.style.left = `${lensX}px`;
            lens.style.top = `${lensY}px`;

            // 2. Position the zoomed image inside its viewport
            const ratioX = zoomedImage.offsetWidth / sourceImage.offsetWidth;
            const ratioY = zoomedImage.offsetHeight / sourceImage.offsetHeight;

            // Invert the position and apply the ratio
            zoomedImage.style.left = `-${lensX * ratioX}px`;
            zoomedImage.style.top = `-${lensY * ratioY}px`;
        };

        imageSection.onmousemove = moveLens;
        imageSection.onmouseenter = () => {
            lens.classList.remove('hidden');
            resultPane.classList.remove('hidden');
        };
        imageSection.onmouseleave = () => {
            lens.classList.add('hidden');
            resultPane.classList.add('hidden');
        };
    };
    // --- END OF ZOOM LOGIC SECTION ---

    const showLightboxImage = () => {
        const images = currentLightboxProduct.images;
        lightboxImage.src = images[currentLightboxIndex];
        zoomedImage.src = images[currentLightboxIndex]; // Set src for zoomed image as well
        lightboxCounter.textContent = `Bilde ${currentLightboxIndex + 1} av ${images.length}`;
        const display = images.length > 1 ? 'flex' : 'none';
        lightboxNextBtn.style.display = display;
        lightboxPrevBtn.style.display = display;
        
        initializeZoom();
    };

    const openLightbox = (productId, imageIndex) => {
        currentLightboxProduct = products.find(p => p.id === productId);
        if (!currentLightboxProduct) return;
        
        lightboxTitle.textContent = currentLightboxProduct.name;
        lightboxProductName.textContent = currentLightboxProduct.name;
        lightboxProductDescription.textContent = currentLightboxProduct.description;
        lightboxProductPrice.textContent = `kr ${currentLightboxProduct.price}`;
        
        lightboxEcwidBuyButtonContainer.innerHTML = `
            <div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${currentLightboxProduct.ecwidId}" 
                 itemtype="http://schema.org/Product" 
                 data-single-product-id="${currentLightboxProduct.ecwidId}">
                <div customprop="addtobag"></div>
            </div>`;

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

        if (typeof xProduct === 'function') {
            xProduct();
        }
    };

    const closeLightbox = () => {
        lightboxOverlay.classList.add('hidden');
        lightboxEcwidBuyButtonContainer.innerHTML = '';
        lens.classList.add('hidden');
        zoomResult.classList.add('hidden');
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
    
    lightboxMoreInfoButton.addEventListener('click', (event) => {
        if (currentLightboxProduct && currentLightboxProduct.moreInfo) {
            closeLightbox();
            openModal(currentLightboxProduct);
        }
    });

    lightboxOverlay.addEventListener('click', (event) => {
        if (event.target === lightboxOverlay) {
            closeLightbox();
        }
    });

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
