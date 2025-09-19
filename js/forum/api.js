const SITE_BASE_URL = 'https://forum.dlprodukter.com';
const API_BASE_URL = `${SITE_BASE_URL}/api`;

const escapeHTML = (str) => {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str || ""));
    return p.innerHTML;
};

// Kategorier
const fetchCategories = async () => {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error('Kunne ikke hente kategorier.');
    return res.json();
};

// Tråder
const fetchThreadsByCategory = async (categoryId) => {
    const res = await fetch(`${API_BASE_URL}/threads/category/${categoryId}`);
    if (!res.ok) throw new Error('Kunne ikke hente tråder.');
    return res.json();
};

const createThread = async (title, content, categoryId, token) => {
    const res = await fetch(`${API_BASE_URL}/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title, content, categoryId }),
    });
    if (!res.ok) throw new Error('Kunne ikke opprette tråd.');
    return res.json();
};

// Innlegg
const fetchPostsByThread = async (threadId) => {
    const res = await fetch(`${API_BASE_URL}/posts/thread/${threadId}`);
    if (!res.ok) throw new Error('Kunne ikke hente innlegg.');
    return res.json();
};

const createPost = async (content, threadId, token) => {
    const res = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ content, threadId }),
    });
    if (!res.ok) throw new Error('Kunne ikke poste innlegg.');
    return res.json();
};

// Autentisering
const registerUser = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return await response.json();
};

const loginUser = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Innlogging feilet.');
    return data;
};

// Profil
const fetchProfile = async (username) => {
    const response = await fetch(`${API_BASE_URL}/profile/${username}`);
    if (!response.ok) throw new Error('Fant ikke brukerprofil.');
    return await response.json();
};

const updateProfile = async (bio, token) => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ bio }),
    });
    if (!response.ok) throw new Error('Kunne ikke oppdatere profil.');
    return await response.json();
};

const uploadAvatar = async (formData, token) => {
    const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
    });
    if (!response.ok) throw new Error('Kunne ikke laste opp bilde.');
    return await response.json();
};

// KORRIGERT EKSPORT-BLOKK: Inkluderer nå ALLE funksjonene
export {
    SITE_BASE_URL,
    API_BASE_URL,
    escapeHTML,
    fetchCategories,
    fetchThreadsByCategory,
    createThread,
    fetchPostsByThread,
    createPost,
    registerUser,
    loginUser,
    fetchProfile,
    updateProfile,
    uploadAvatar
};
