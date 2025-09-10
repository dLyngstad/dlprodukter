// This script will create and add the Google Analytics tags to the <head>

// Create the first script tag (gtag.js)
const gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-MK725C6EGB';

// Create the second script tag (the inline configuration)
const configScript = document.createElement('script');
configScript.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MK725C6EGB');
`;

// Append both scripts to the document's head
document.head.appendChild(gtagScript);
document.head.appendChild(configScript);
