// popups.js - En fil for å styre alle popups

// ==================================================================
// GENERELL FUNKSJON FOR Å LAGE ET VINDU ("OPPSKRIFTEN")
// ==================================================================
function createPopupWindow(options) {
  // Lager hovedelementet og gir det den generelle stilen
  const windowDiv = document.createElement('div');
  windowDiv.className = 'classic-window';
  
  // Legg til unik ID hvis spesifisert
  if (options.id) {
    windowDiv.id = options.id;
  }

  // Legg til blinke-animasjon hvis spesifisert
  if (options.blink) {
    windowDiv.classList.add('promo-blink');
  }

  // Lag tittellinjen
  const title = document.createElement('h3');
  title.textContent = options.title || 'Melding'; // Standard tittel
  windowDiv.appendChild(title);

  // Legg til et lukkekryss hvis spesifisert
  if (options.showCloseButton) {
    const closeButton = document.createElement('button');
    closeButton.className = 'classic-window-close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => document.body.removeChild(windowDiv);
    windowDiv.appendChild(closeButton);
  }
  
  // Legg til hovedinnholdet (kan være tekst eller HTML)
  const content = document.createElement('div');
  content.innerHTML = options.contentHTML;
  windowDiv.appendChild(content);

  // Legg hele vinduet til på siden
  document.body.appendChild(windowDiv);
  
  // Returner vinduet i tilfelle vi vil gjøre mer med det
  return windowDiv;
}


// ==================================================================
// LOGIKK FOR HVILKET VINDU SOM SKAL VISES
// ==================================================================
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Sjekk for cookie-banner først. Dette har høyest prioritet.
  if (localStorage.getItem('cookiesAccepted') !== 'true') {
    const cookieWindow = createPopupWindow({
      id: 'cookie-banner',
      title: 'Informasjonskapsler',
      contentHTML: `
        <p>Denne nettsiden bruker informasjonskapsler for å sikre at du får den beste opplevelsen.</p>
        <button id="accept-cookies-btn" class="window-button">Jeg forstår og godtar</button>
      `
    });
    // Legg til lytter for knappen
    document.getElementById('accept-cookies-btn').onclick = () => {
      localStorage.setItem('cookiesAccepted', 'true');
      document.body.removeChild(cookieWindow);
    };
  } 
  
  // 2. Hvis cookies er akseptert, sjekk for andre popups.
  else {
    const randomNumber = Math.random(); // Vi genererer ett tilfeldig tall

    // 25% sjanse for tilbudet
    if (randomNumber < 0.99) { 
      createPopupWindow({
        id: 'promo-popup',
        title: 'TILBUD!',
        blink: true,
        showCloseButton: true,
        contentHTML: `
          <p>Du er heldig! Få 10% rabatt på din neste bestilling med koden under:</p>
          <div class="promo-code">HØSTTILBUD10</div>
        `
      });
    } 
    // Ytterligere 25% sjanse (mellom 0.25 og 0.50) for leveringsinfo
    else if (randomNumber < 0.99) { 
      createPopupWindow({
        id: 'delivery-popup',
        title: 'Gratis Levering!',
        showCloseButton: true,
        contentHTML: `
          <p style="text-align: center; font-size: 1.2em; padding-top: 15px;">
            Vi spanderer frakten på alle ordre til <strong>Trondheim</strong>!
          </p>
        `
      });
    }
    // De resterende 50% av tiden vises ingen popup.
  }
});
