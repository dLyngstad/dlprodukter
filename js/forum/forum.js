import * as api from './api.js';
import * as auth from './auth.js';
import * as ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Forum-skript lastet og klar."); // SJEKKPUNKT 1

    const mainContent = document.querySelector('main');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');

    // --- RUTER-LOGIKK ---
    const router = async () => {
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

    // --- EVENT LISTENERS ---
    
    mainContent.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log("Submit-event fanget opp for skjema med ID:", event.target.id); // SJEKKPUNKT 2

        const token = auth.getToken();
        if (!token) {
            alert("Du må være logget inn.");
            return;
        }

        // Ny tråd
        if (event.target.id === 'new-thread-form') {
            console.log("Behandler 'new-thread-form'..."); // SJEKKPUNKT 3
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

        // Svar på tråd
        if (event.target.id === 'reply-form') {
            console.log("Behandler 'reply-form'..."); // SJEKKPUNKT 3
            const content = document.getElementById('reply-content').value;
            const threadId = document.getElementById('threadId').value;
            
            try {
                await api.createPost(content, threadId, token);
                router();
            } catch (error) {
                alert(`Kunne ikke sende svar: ${error.message}`);
            }
        }
    });

    // Innlogging
    loginForm.addEventListener('submit', async (event) => {
        // ... (denne koden er uendret) ...
    });

    // Registrering
    registerForm.addEventListener('submit', async (event) => {
        // ... (denne koden er uendret) ...
    });

    // Utlogging
    logoutBtn.addEventListener('click', () => {
        // ... (denne koden er uendret) ...
    });

    // --- INITIERING ---
    window.addEventListener('hashchange', router);
    router();
    ui.updateAuthUI();
});
