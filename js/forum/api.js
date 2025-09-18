// Denne filen er vår "kommunikasjonssjef" med serveren.

const API_BASE_URL = 'https://forum.dlprodukter.com';

// Hjelpefunksjon for å escape HTML
const escapeHTML = (str) => {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str || ""));
    return p.innerHTML;
};

// Henter alle poster
export const fetchPosts = async () => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error('Nettverksfeil ved henting av poster.');
    return await response.json();
};

// Registrerer en ny bruker
export const registerUser = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return await response.json();
};

// Logger inn en bruker
export const loginUser = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Innlogging feilet.');
    return data;
};

// Poster et nytt innlegg
export const createPost = async (content, token) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error('Kunne ikke poste innlegg.');
    return await response.json();
};

export { escapeHTML };
