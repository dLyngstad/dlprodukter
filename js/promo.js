// promo.js - Oppdatert

window.addEventListener('load', function() {
  // VIKTIG: Kjør kun promo-sjekken HVIS cookies er akseptert
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    
    // Sjekk for 25% sjanse
    if (Math.random() < 0.99) {
      createPromoPopup();
    }
  }
});

function createPromoPopup() {
  const promoDiv = document.createElement('div');
  // Bruker den generelle klassen + den unike blinke-klassen
  promoDiv.className = 'classic-window promo-blink';

  const closeButton = document.createElement('button');
  closeButton.className = 'classic-window-close-btn'; // Oppdatert klassenavn
  closeButton.innerHTML = '&times;';

  const title = document.createElement('h3');
  title.textContent = 'TILBUD!';
  
  const text = document.createElement('p');
  text.textContent = 'Du er heldig! Få 10% rabatt på din neste bestilling med koden under:';
  
  const code = document.createElement('div');
  code.className = 'promo-code';
  code.textContent = 'HØSTTILBUD10';

  promoDiv.appendChild(closeButton);
  promoDiv.appendChild(title);
  promoDiv.appendChild(text);
  promoDiv.appendChild(code);

  document.body.appendChild(promoDiv);

  closeButton.addEventListener('click', function() {
    document.body.removeChild(promoDiv);
  });
}
