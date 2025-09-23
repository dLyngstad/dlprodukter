import * as api from './api.js';
import * as auth from './auth.js';
import * as ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // ... (referanser uendret) ...
    const mainContent = document.querySelector('main');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');

    // --- RUTER-LOGIKK --- (uendret)
    const router = async () => {
        const hash = window.location.hash || '#/';
        
        try {
            if (hash.startsWith('#category/')) {
                const categoryId = hash.substring(10);
                const [threads, categories] = await Promise.all([
                    api.fetchThreadsByCategory(categoryId),
                    api.fetchCategories()
                ]);
                const currentCategory = categories.find(c => c.id === categoryId);
                ui.renderThreads(threads, currentCategory);
                ui.showView('thread-view');
            } else if (hash.startsWith('#thread/')) {
                const threadId = hash.substring(8);
                const posts = await api.fetchPostsByThread(threadId);
                ui.renderPosts(posts, threadId);
                ui.showView('post-view');
            } else {
                const categories = await api.fetchCategories();
                ui.renderCategories(categories);
                ui.showView('category-view');
            }
        } catch (error) {
            console.error(error);
            mainContent.innerHTML = `<p>Noe gikk galt: ${error.message}</p>`;
        }
    };

    // --- EVENT LISTENERS ---
    
   // Hoved-lytter (uendret)
    mainContent.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (event.target.id === 'new-thread-form') {
            const token = auth.getToken();
            if (!token) {
                alert("Du må være logget inn for å opprette en tråd.");
                return;
            }
    
            const title = document.getElementById('thread-title').value;
            const content = document.getElementById('thread-content').value;
            const categoryId = document.getElementById('categoryId').value;
    
            try {
                const newThread = await api.createThread(title, content, categoryId, token);
                window.location.hash = `#thread/${newThread.id}`;
            } catch (error) {
                alert(`Kunne ikke opprette tråd: ${error.message}`);
            }
        }

        if (event.target.id === 'reply-form') {
            const token = auth.getToken();
            if (!token) {
                alert("Du må være logget inn for å sende et svar.");
                return;
            }
    
            const content = document.getElementById('reply-content').value;
            const threadId = document.getElementById('threadId').value;
    
            try {
                await api.createPost(content, threadId, token);
                router(); // Laster visningen på nytt
            } catch (error) {
                alert(`Kunne ikke sende svar: ${error.message}`);
            }
        }
    });

    // Innlogging (ENDRING: Kaller nå den nye async-funksjonen)
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        try {
            const result = await api.loginUser(username, password);
            auth.saveToken(result.token);
            loginForm.reset();
            await ui.updateAuthUI(); // Venter på at all UI er klar
            router();
        } catch (error) {
            alert(`Innlogging feilet: ${error.message}`);
        }
    });

    // Registrering (uendret)
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-password-confirm').value;
        const errorElement = document.getElementById('password-error');

        if (password !== confirmPassword) {
            errorElement.textContent = 'Passordene er ikke like.';
            errorElement.classList.remove('hidden');
            return;
        }
        if (password.length < 6) {
            errorElement.textContent = 'Passordet må være minst 6 tegn langt.';
            errorElement.classList.remove('hidden');
            return;
        }
        if (!/\d/.test(password)) {
            errorElement.textContent = 'Passordet må inneholde minst ett tall.';
            errorElement.classList.remove('hidden');
            return;
        }
        errorElement.classList.add('hidden');

        try {
            const result = await api.registerUser(username, password);
            alert(result.message);
            registerForm.reset();
        } catch (error) {
            alert(`Registrering feilet: ${error.message}`);
        }
    });

    // Utlogging (ENDRING: Blitt async for å håndtere await)
    logoutBtn.addEventListener('click', async () => {
        auth.removeToken();
        await ui.updateAuthUI(); // Venter på at all UI er klar
        router();
    });

    // --- INITIERING --- (ENDRING: Mer robust initialisering)
    const initializePage = async () => {
        try {
            await ui.updateAuthUI();
        } catch (error) {
            console.error("Feil under initialisering av UI:", error);
        } finally {
            // Denne koden kjører uansett om try-blokken lyktes eller feilet
            window.addEventListener('hashchange', router);
            router();
        }
    };

    initializePage();
});

