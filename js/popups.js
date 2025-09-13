// popups.js - Komplett skript for alle popups

// ==================================================================
// KONTROLLPANEL FOR POPUPS
// Alt du trenger å endre er her!
// ==================================================================
const POPUP_CONFIG = [
  {
    id: 'promo',
    enabled: true,
    chance: 99, // Sjanse i prosent (1-100)
    pages: ['index.html', 'products.html'], // Vises KUN på disse sidene. Tom liste [] betyr alle sider.
    position: 'left',
    options: {
      title: 'TILBUD!',
      blink: true,
      showCloseButton: true,
      contentHTML: `
        <p>Få 10% rabatt på din neste bestilling med koden under:</p>
        <div class="promo-code">HØSTTILBUD10</div>
      `
    }
  },
  {
    id: 'delivery',
    enabled: true,
    chance: 99,
    pages: ['products.html'], // Vises KUN på produktsiden
    position: 'right',
    options: {
      title: 'Gratis Levering!',
      showCloseButton: true,
      contentHTML: `
        <p style="text-align: center; font-size: 1.2em; padding-top: 15px;">
          Vi spanderer frakten på alle ordre til <strong>Trondheim</strong>!
        </p>
      `
    }
  },
  {
    id: 'contact-hours',
    enabled: true,
    chance: 100, // Vises alltid (hvis aktivert)
    pages: ['contact.html'], // Vises KUN på kontaktsiden
    position: 'right',
    options: {
      title: 'Åpningstider',
      showCloseButton: true,
      contentHTML: '<p>Vi svarer på henvendelser mellom kl. 09:00 og 16:00.</p>'
    }
  }
];

// ==================================================================
// HOVEDLOGIKK - DENNE TRENGER DU IKKE ENDRE
// ==================================================================

// Hent filnavnet til den nåværende siden
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Generell funksjon for å lage vindu
function createPopupWindow(options) {
  const windowDiv = document.createElement('div');
  windowDiv.className = 'classic-window';
  if (options.id) windowDiv.id = options.id;
  if (options.blink) windowDiv.classList.add('promo-blink');
  if (options.position) windowDiv.classList.add(`popup-position-${options.position}`);
  const title = document.createElement('h3');
  title.textContent = options.title || 'Melding';
  windowDiv.appendChild(title);
  if (options.showCloseButton) {
    const closeButton = document.createElement('button');
    closeButton.className = 'classic-window-close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => document.body.removeChild(windowDiv);
    windowDiv.appendChild(closeButton);
  }
  const content = document.createElement('div');
  content.innerHTML = options.contentHTML;
  windowDiv.appendChild(content);
  document.body.appendChild(windowDiv);
  return windowDiv;
}

// Hovedfunksjon som kjører når siden er lastet
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Cookie-banner har alltid prioritet
  if (localStorage.getItem('cookiesAccepted') !== 'true') {
    const cookieWindow = createPopupWindow({
      id: 'cookie-banner',
      title: 'Informasjonskapsler',
      position: 'left',
      options: { // Bruker 'options' for å være konsekvent, selv om det ikke er i config
        contentHTML: `
          <p>Denne nettsiden bruker informasjonskapsler for å sikre at du får den beste opplevelsen.</p>
          <button id="accept-cookies-btn" class="window-button">Jeg forstår og godtar</button>
        `
      }
    });
    document.getElementById('accept-cookies-btn').onclick = () => {
      localStorage.setItem('cookiesAccepted', 'true');
      document.body.removeChild(cookieWindow);
    };
    return; // Stopper videre kjøring
  }

  // 2. Gå gjennom alle popupene i kontrollpanelet
  POPUP_CONFIG.forEach(popup => {
    const isEnabled = popup.enabled;
    const canShowOnPage = popup.pages.length === 0 || popup.pages.includes(currentPage);
    const winsChance = (Math.random() * 100) < popup.chance;

    if (isEnabled && canShowOnPage && winsChance) {
      createPopupWindow({
        id: `${popup.id}-popup`,
        position: popup.position,
        ...popup.options
      });
    }
  });
});
