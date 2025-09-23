import * as api from './api.js';
import * as auth from './auth.js';
import * as ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // Referanser til alle elementer som håndteres her
    const mainContent = document.querySelector('main');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');
        ui.renderProfileLink(); // rendrer en profillink hvis man er innlogget

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
    
   // En hoved-lytter for alle 'submit'-hendelser inne i <main>
mainContent.addEventListener('submit', async (event) => {
    event.preventDefault(); // Forhindrer at siden laster på nytt for alle skjemaer

    // Håndterer opprettelse av ny tråd
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

    // Håndterer svar på en tråd
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
        const confirmPassword = document.getElementById('register-password-confirm').value;
        const errorElement = document.getElementById('password-error');

        // Valideringssjekk 1: Passordene må være like
        if (password !== confirmPassword) {
            errorElement.textContent = 'Passordene er ikke like.';
            errorElement.classList.remove('hidden');
            return;
        }

        // Valideringssjekk 2: Passordlengde
        if (password.length < 6) {
            errorElement.textContent = 'Passordet må være minst 6 tegn langt.';
            errorElement.classList.remove('hidden');
            return;
        }

        // Valideringssjekk 3: Passordet må inneholde et tall
        if (!/\d/.test(password)) {
            errorElement.textContent = 'Passordet må inneholde minst ett tall.';
            errorElement.classList.remove('hidden');
            return;
        }

        errorElement.classList.add('hidden'); // Skjul feilmeldingen hvis alt er ok

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
    window.addEventListener('hashchange', router);
    router();
    ui.updateAuthUI();

});

