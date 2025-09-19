import { getUserFromToken } from './auth.js';
// ENDRING: Importerer SITE_BASE_URL i stedet for API_BASE_URL for bilder
import { escapeHTML, SITE_BASE_URL } from './api.js';

// Referanser til alle elementer som skal manipuleres
const categoryView = document.getElementById('category-view');
const threadView = document.getElementById('thread-view');
const postView = document.getElementById('post-view');
const breadcrumbs = document.getElementById('breadcrumbs');
const postsContainer = document.getElementById('posts-container'); // Denne er fra gammel kode, kan fjernes senere
const postFormContainer = document.getElementById('post-form-container'); // Denne er fra gammel kode
const authContainer = document.getElementById('auth-container');
const userStatus = document.getElementById('user-status');
const usernameDisplay = document.getElementById('username-display');

// Hjelpefunksjon for å bytte mellom hovedvisningene
export const showView = (viewId) => {
    // Sørger for at alle visninger er definert før vi prøver å skjule dem
    if (categoryView && threadView && postView) {
        [categoryView, threadView, postView].forEach(view => view.classList.add('hidden'));
        document.getElementById(viewId).classList.remove('hidden');
    }
};

// Viser/skjuler innlogging vs. innlogget status
export const updateAuthUI = () => {
    const user = getUserFromToken();
    if (user) {
        authContainer.classList.add('hidden');
        userStatus.classList.remove('hidden');
        usernameDisplay.textContent = user.username;
    } else {
        authContainer.classList.remove('hidden');
        userStatus.classList.add('hidden');
    }
};

// Rendrer kategorilisten
export const renderCategories = (categories) => {
    categoryView.innerHTML = '<h2>Kategorier</h2>';
    categories.forEach(cat => {
        categoryView.innerHTML += `
            <div class="post">
                <div class="post-main">
                    <h3><a href="#category/${cat.id}">${escapeHTML(cat.title)}</a></h3>
                    <p>${escapeHTML(cat.description)}</p>
                </div>
                <div style="text-align: right;">
                    <p>Tråder: ${cat.threadCount}</p>
                    <p>Innlegg: ${cat.postCount}</p>
                </div>
            </div>
        `;
    });
    breadcrumbs.innerHTML = `<a href="#/">Forum</a>`;
};

// Rendrer trådlisten
export const renderThreads = (threads, category) => {
    threadView.innerHTML = `<h2>Tråder i ${escapeHTML(category.title)}</h2>`;
    threads.forEach(thread => {
        threadView.innerHTML += `
            <div class="post">
                <div class="post-main">
                    <p><a href="#thread/${thread.id}">${escapeHTML(thread.title)}</a></p>
                    <small>Startet av: ${escapeHTML(thread.author)}</small>
                </div>
                <div style="text-align: right;">
                    <p>Svar: ${thread.replyCount}</p>
                </div>
            </div>
        `;
    });
    
    if (getUserFromToken()) {
        threadView.innerHTML += `
            <div class="group-box" style="margin-top: 20px;">
                <span class="group-box-legend">Start en ny tråd</span>
                <form id="new-thread-form">
                    <input type="hidden" id="categoryId" value="${category.id}">
                    <div class="form-group">
                        <label for="thread-title">Tittel:</label>
                        <input type="text" id="thread-title" required>
                    </div>
                    <div class="form-group">
                        <label for="thread-content">Innlegg:</label>
                        <textarea id="thread-content" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Opprett tråd</button>
                </form>
            </div>
        `;
    }
    breadcrumbs.innerHTML = `<a href="#/">Forum</a> &gt; ${escapeHTML(category.title)}`;
};

// Rendrer innleggslisten
export const renderPosts = (posts, threadId) => {
    postView.innerHTML = ``;
    posts.forEach(post => {
        postView.innerHTML += `
            <div class="post">
                <div class="post-user-info">
                    <img src="${SITE_BASE_URL}/avatars/${post.author.profileImage}" alt="Profilbilde" class="post-avatar">
                    <strong><a href="profile.html?user=${escapeHTML(post.author.username)}">${escapeHTML(post.author.username)}</a></strong>
                </div>
                <div class="post-main">
                    <p class="post-content">${escapeHTML(post.content)}</p>
                </div>
            </div>
        `;
    });

    if (getUserFromToken()) {
        postView.innerHTML += `
            <div class="group-box" style="margin-top: 20px;">
                <span class="group-box-legend">Skriv et svar</span>
                <form id="reply-form">
                    <input type="hidden" id="threadId" value="${threadId}">
                    <div class="form-group">
                        <label for="reply-content">Melding:</label>
                        <textarea id="reply-content" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Send svar</button>
                </form>
            </div>
        `;
    }
    breadcrumbs.innerHTML = `<a href="#/">Forum</a> &gt; Tråd`;
};
