// promo.js

// Vent til hele nettsiden er lastet inn før vi kjører koden
window.addEventListener('load', function() {

  // Sjekk for 25% sjanse
  if (Math.random() < 0.25) {
    
    // Hvis vi "vinner", kjør funksjonen som lager dialogboksen
    createPromoPopup();
  }

});

function createPromoPopup() {
  // 1. Lag HTML-elementene fra bunnen av
  const promoDiv = document.createElement('div');
  promoDiv.className = 'promo-popup'; // Gir den CSS-klassen

  const closeButton = document.createElement('button');
  closeButton.className = 'promo-close-btn';
  closeButton.innerHTML = '&times;'; // &times; er et "X"-symbol

  const title = document.createElement('h3');
  title.textContent = 'TILBUD!';
  
  const text = document.createElement('p');
  text.textContent = 'Du er heldig! Få 10% rabatt på din neste bestilling med koden under:';
  
  const code = document.createElement('div');
  code.className = 'promo-code';
  code.textContent = 'HØSTTILBUD10';

  // 2. Legg alle elementene inni hverandre
  promoDiv.appendChild(closeButton);
  promoDiv.appendChild(title);
  promoDiv.appendChild(text);
  promoDiv.appendChild(code);

  // 3. Legg hele dialogboksen til på nettsiden
  document.body.appendChild(promoDiv);

  // 4. Legg til funksjonalitet for lukkeknappen
  closeButton.addEventListener('click', function() {
    // Fjern dialogboksen fra siden når man klikker på X
    document.body.removeChild(promoDiv);
  });
}
