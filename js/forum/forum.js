import * as api from './api.js';
import * as auth from './auth.js';
import * as ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Forum-skript lastet og klar."); // SJEKKPUNKT 1

    const mainContent = document.querySelector('main');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');

    const router = async () => {
        // ... (resten av router-funksjonen er uendret) ...
        const hash = window.location.hash || '#/';
        try {
            if (hash.startsWith('#category/')) {
                const categoryId = hash.substring(10);
                const [threads, categories] = await Promise.all([ api.fetchThreadsByCategory(categoryId), api.fetchCategories() ]);
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

    mainContent.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log("Submit-event fanget opp for skjema med ID:", event.target.id); // SJEKKPUNKT 2

        const token = auth.getToken();

        if (event.target.id === 'new-thread-form') {
            // ... (denne koden er uendret) ...
        }

        if (event.target.id === 'reply-form') {
            console.log("Svar-skjemaet ble sendt. Prøver å lage post..."); // SJEKKPUNKT 3
            
            const content = document.getElementById('reply-content').value;
            const threadId = document.getElementById('threadId').value;
            
            console.log("Sender data:", { content, threadId }); // SJEKKPUNKT 4

            try {
                await api.createPost(content, threadId, token);
                console.log("Post ble sendt til API uten feil."); // SJEKKPUNKT 5
                router();
            } catch (error) {
                alert(`Kunne ikke sende svar: ${error.message}`);
            }
        }
    });

    // ... (resten av event listeners for login, register, logout er uendret) ...
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        try {
            const result = await api.loginUser(username, password);
            auth.saveToken(result.token);
            loginForm.reset();
            ui.updateAuthUI();
            router();
        } catch (error) {
            alert(`Innlogging feilet: ${error.message}`);
        }
    });
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        try {
            const result = await api.registerUser(username, password);
            alert(result.message);
            registerForm.reset();
        } catch (error) {
            alert(`Registrering feilet: ${error.message}`);
        }
    });
    logoutBtn.addEventListener('click', () => {
        auth.removeToken();
        ui.updateAuthUI();
        router();
    });

    // --- INITIERING ---
    window.addEventListener('hashchange', router);
    router();
    ui.updateAuthUI();
});
