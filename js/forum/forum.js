import * as api from './api.js';
import * as auth from './auth.js';
import * as ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('main');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');

    // --- RUTER-LOGIKK ---
    const router = async () => {
        // ... (denne funksjonen er uendret) ...
    };

    // --- EVENT LISTENERS ---
    
    // Håndterer 'submit' for nye tråder og svar
    mainContent.addEventListener('submit', async (event) => {
        // ... (denne lytteren er uendret) ...
    });

    // NY LYTTER: Håndterer 'klikk' for sletteknapper
    mainContent.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const postId = event.target.dataset.postId;
            
            if (confirm('Er du sikker på at du vil slette dette innlegget?')) {
                try {
                    const token = auth.getToken();
                    if (!token) throw new Error("Du er ikke logget inn.");

                    // Her kaller vi på deletePost fra api.js
                    await api.deletePost(postId, token); 
                    router(); // Laster visningen på nytt
                } catch (error) {
                    alert(`Kunne ikke slette: ${error.message}`);
                }
            }
        }
    });

    // Innlogging
    loginForm.addEventListener('submit', async (event) => {
        // ... (denne lytteren er uendret) ...
    });

    // Registrering
    registerForm.addEventListener('submit', async (event) => {
        // ... (denne lytteren er uendret) ...
    });

    // Utlogging
    logoutBtn.addEventListener('click', () => {
        // ... (denne lytteren er uendret) ...
    });

    // --- INITIERING ---
    window.addEventListener('hashchange', router);
    router();
    ui.updateAuthUI();
});
