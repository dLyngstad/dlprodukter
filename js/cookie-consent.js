// cookie-consent.js

document.addEventListener('DOMContentLoaded', function() {
  // Sjekk om 'cookiesAccepted' allerede er lagret som 'true'
  if (localStorage.getItem('cookiesAccepted') !== 'true') {
    createCookieBanner();
  }
});

function createCookieBanner() {
  const cookieDiv = document.createElement('div');
  // Bruker den nye generelle klassen
  cookieDiv.className = 'classic-window';

  const title = document.createElement('h3');
  title.textContent = 'Informasjonskapsler';
  
  const text = document.createElement('p');
  text.textContent = 'Denne nettsiden bruker informasjonskapsler (cookies) for å sikre at du får den beste opplevelsen. Ved å fortsette å bruke siden, godtar du vår bruk av cookies.';
  
  const acceptButton = document.createElement('button');
  acceptButton.className = 'window-button';
  acceptButton.textContent = 'Jeg forstår og godtar';

  cookieDiv.appendChild(title);
  cookieDiv.appendChild(text);
  cookieDiv.appendChild(acceptButton);

  document.body.appendChild(cookieDiv);

  // Hva skjer når man klikker "Godta"
  acceptButton.addEventListener('click', function() {
    // Lagre valget i nettleserens minne
    localStorage.setItem('cookiesAccepted', 'true');
    // Fjern banneret fra siden
    document.body.removeChild(cookieDiv);
  });
}
