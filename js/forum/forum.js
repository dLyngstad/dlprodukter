import * as api from './api.js';
import * as auth from './auth.js';
import * as ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('main');
    
    // Referanser til skjemaer vi trenger her
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');

    // --- RUTER-LOGIKK ---
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
    
    // Lytter på 'submit' i hele <main>-elementet for dynamiske skjemaer
    mainContent.addEventListener('submit', async (event) => {
        event.preventDefault(); // Forhindrer at siden laster på nytt for alle skjemaer

        const token = auth.getToken();

        // Ny tråd
        if (event.target.id === 'new-thread-form') {
            const title = document.getElementById('thread-title').value;
            const content = document.getElementById('thread-content').value;
            const categoryId = document.getElementById('categoryId').value;
            
            try {
                const newThread = await api.createThread(title, content, categoryId, token);
                window.location.hash = `#thread/${newThread.id}`; // Gå til den nye tråden
            } catch (error) {
                alert(`Kunne ikke opprette tråd: ${error.message}`);
            }
        }

        // Svar på tråd
        if (event.target.id === 'reply-form') {
            const content = document.getElementById('reply-content').value;
            const threadId = document.getElementById('threadId').value;
            
            try {
                await api.createPost(content, threadId, token);
                router(); // Last visningen på nytt for å se det nye svaret
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
            router(); // Kjør ruter på nytt for å vise innhold for innloggede
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
    router(); // Kjør ruter når siden lastes
    ui.updateAuthUI(); // Sjekk innloggingsstatus
});
