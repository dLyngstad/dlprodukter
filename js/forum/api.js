const API_BASE_URL = 'https://forum.dlprodukter.com/api';

const escapeHTML = (str) => {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str || ""));
    return p.innerHTML;
};

// Kategorier
export const fetchCategories = async () => {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error('Kunne ikke hente kategorier.');
    return res.json();
};

// Tråder
export const fetchThreadsByCategory = async (categoryId) => {
    const res = await fetch(`${API_BASE_URL}/threads/category/${categoryId}`);
    if (!res.ok) throw new Error('Kunne ikke hente tråder.');
    return res.json();
};

export const createThread = async (title, content, categoryId, token) => {
    const res = await fetch(`${API_BASE_URL}/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title, content, categoryId }),
    });
    if (!res.ok) throw new Error('Kunne ikke opprette tråd.');
    return res.json();
};

// Innlegg
export const fetchPostsByThread = async (threadId) => {
    const res = await fetch(`${API_BASE_URL}/posts/thread/${threadId}`);
    if (!res.ok) throw new Error('Kunne ikke hente innlegg.');
    return res.json();
};

export const createPost = async (content, threadId, token) => {
    const res = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ content, threadId }),
    });
    if (!res.ok) throw new Error('Kunne ikke poste innlegg.');
    return res.json();
};

// Autentisering
export const registerUser = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return await response.json();
};

export const loginUser = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Innlogging feilet.');
    return data;
};

export { escapeHTML, API_BASE_URL };
