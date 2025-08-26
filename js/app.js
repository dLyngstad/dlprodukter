// Fil: app.js
// Versjon: Minimalistisk (kun navn og kjøp-knapp)

/**
 * Laster inn gjenbrukbare HTML-deler som header og footer.
 * @param {string} filePath - Stien til HTML-filen (f.eks. 'partials/header.html').
 * @param {string} elementId - ID-en til elementet der innholdet skal plasseres.
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
 * Bygger HTML for ett enkelt produkt med kun navn og "Kjøp nå"-knapp.
 * Dette er den minimalistiske malen din.
 * @param {object} product - Et produktobjekt fra din products.js-fil.
 * @returns {string} - HTML-strengen for produkt-raden.
 */
const createProductHTML = (product) => {
    // Sjekker om produktet har en gyldig Ecwid-ID før det vises.
    if (!product.ecwidId || product.ecwidId.includes('YOUR_ECWID_ID')) {
        console.warn(`Produktet "${product.name}" mangler en gyldig ecwidId og vil ikke bli vist.`);
        return ''; // Returnerer en tom streng for å ikke vise produktet.
    }

    // Returnerer en enkel container med produktnavn og knappe-koden.
    // Du kan style ".buy-container" med CSS for å endre ut
