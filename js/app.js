/**
 * Bygger et detaljert og egendefinert produktkort.
 * Dette er din "designer" - endre HTML og klasser her for å style med CSS.
 * @param {object} product - Et produktobjekt fra din products.js-fil.
 * @returns {string} - HTML-strengen for det komplette produktkortet.
 */
const createProductHTML = (product) => {
    // Sjekker om produktet har en gyldig Ecwid-ID før det vises.
    if (!product.ecwidId || product.ecwidId.includes('YOUR_ECWID_ID')) {
        console.warn(`Produktet "${product.name}" mangler en gyldig ecwidId og vil ikke bli vist.`);
        return '';
    }

    // Dette er den nye, detaljerte malen for hvert produkt.
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">kr ${product.price}</p>

                <div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${product.ecwidId}" 
                     itemtype="http://schema.org/Product" 
                     data-single-product-id="${product.ecwidId}">
                    <div customprop="addtobag"></div>
                </div>
            </div>
        </div>
    `;
};
