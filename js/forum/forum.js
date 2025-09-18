import * as api from './api.js';
import * as auth from './auth.js';
import * as ui from './ui.js';

// Denne filen er "sjefen" som delegerer oppgaver.

document.addEventListener('DOMContentLoaded', () => {
    // Hent referanser til skjemaer og knapper
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const postForm = document.getElementById('post-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Funksjon for å hente og vise poster
    const fetchAndRenderPosts = async () => {
        try {
            const posts = await api.fetchPosts();
            ui.renderPosts(posts);
        } catch (error) {
            console.error(error);
            document.getElementById('posts-container').innerHTML = '<h2>Innlegg</h2><p>Kunne ikke laste innlegg.</p>';
        }
    };

    // --- Event Listeners ---

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        try {
            const result = await api.registerUser(username, password);
            alert(result.message);
            ui.clearForm(registerForm);
        } catch (error) {
            alert(`Registrering feilet: ${error.message}`);
        }
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        try {
            const result = await api.loginUser(username, password);
            auth.saveToken(result.token);
            ui.clearForm(loginForm);
            ui.updateUI();
        } catch (error) {
            alert(`Innlogging feilet: ${error.message}`);
        }
    });
    
    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const content = document.getElementById('content').value;
        const token = auth.getToken();
        if (!token) {
            alert("Du må være logget inn for å poste.");
            return;
        }
        try {
            await api.createPost(content, token);
            ui.clearForm(postForm);
            fetchAndRenderPosts();
        } catch (error) {
            alert(`Kunne ikke poste: ${error.message}`);
        }
    });

    logoutBtn.addEventListener('click', () => {
        auth.removeToken();
        ui.updateUI();
    });

// ... (din eksisterende kode for registerForm, loginForm, postForm, etc. er her) ...

// NY EVENT LISTENER: Lytter etter klikk på sletteknapper
document.getElementById('posts-container').addEventListener('click', async (event) => {
    // Sjekk om det var en sletteknapp som ble trykket
    if (event.target.classList.contains('delete-btn')) {
        const postId = event.target.dataset.postId;

        // Spør brukeren om bekreftelse
        if (confirm('Er du sikker på at du vil slette dette innlegget?')) {
            try {
                const token = auth.getToken();
                if (!token) {
                    alert("Du må være logget inn for å slette.");
                    return;
                }
                await api.deletePost(postId, token);
                fetchAndRenderPosts(); // Last inn postene på nytt for å vise endringen
            } catch (error) {
                alert(`Kunne ikke slette innlegget: ${error.message}`);
            }
        }
    }
});

// --- Initialisering ---
    
 // --- Initialisering ---
    
    fetchAndRenderPosts(); // Hent poster når siden lastes
    ui.updateUI(); // Sjekk login-status og vis/skjul riktige elementer
});
