import * as api from './api.js';
import * as auth from './auth.js';
import * as ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Referanser til alle elementer som håndteres her
    const mainContent = document.querySelector('main');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');

    // --- RUTER-LOGIKK ---
    // Denne funksjonen leser URL-en og bestemmer hva som skal vises på siden
    const router = async () => {
        const hash = window.location.hash || '#/';
        
        try {
            if (hash.startsWith('#category/')) {
                const categoryId = hash.substring(10);
                // Henter både tråder og kategorier samtidig for effektivitet
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
                // Standardvisning hvis ingen spesifikk rute er valgt
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
    
   // En hoved-lytter for alle 'submit'-hendelser inne i <main>
mainContent.addEventListener('submit', async (event) => {
    event.preventDefault(); // Forhindrer at siden laster på nytt for alle skjemaer

    // Håndterer opprettelse av ny tråd
    if (event.target.id === 'new-thread-form') {
        const token = auth.getToken(); // Sjekker for token kun for denne handlingen
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

    // Håndterer svar på en tråd
    if (event.target.id === 'reply-form') {
        const token = auth.getToken(); // Sjekker for token kun for denne handlingen
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

    // Innlogging
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

    // Registrering
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

    // Utlogging
    logoutBtn.addEventListener('click', () => {
        auth.removeToken();
        ui.updateAuthUI();
        router();
    });

    // --- INITIERING ---
    window.addEventListener('hashchange', router); // Lytt etter URL-endringer
    router(); // Kjør ruter når siden lastes for første gang
    ui.updateAuthUI(); // Sjekk innloggingsstatus
});
