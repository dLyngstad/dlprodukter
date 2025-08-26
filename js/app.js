/**
 * Bygger KUN en "Kjøp nå"-knapp for et produkt.
 * @param {object} product - Et produktobjekt fra din products.js-fil.
 * @returns {string} - HTML-strengen for kun knappen.
 */
const createProductHTML = (product) => {
    // Sjekker om produktet har en gyldig Ecwid-ID.
    if (!product.ecwidId || product.ecwidId.includes('YOUR_ECWID_ID')) {
        console.warn(`Produktet "${product.name}" mangler en gyldig ecwidId.`);
        return ''; // Returnerer ingenting hvis ID mangler.
    }

    // Returnerer KUN den HTML-koden som trengs for knappen.
    return `
        <div class="ecsp ecsp-SingleProduct-v2 ecsp-Product ec-Product-${product.ecwidId}" 
             itemtype="http://schema.org/Product" 
             data-single-product-id="${product.ecwidId}">
            <div customprop="addtobag"></div>
        </div>
    `;
};
