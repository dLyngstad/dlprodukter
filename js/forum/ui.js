import { getUserFromToken } from './auth.js';
// ENDRING: Vi importerer ikke lenger 'deletePost' her
import { escapeHTML, SITE_BASE_URL } from './api.js'; 

// Referanser til alle elementer som skal manipuleres
const categoryView = document.getElementById('category-view');
const threadView = document.getElementById('thread-view');
const postView = document.getElementById('post-view');
const breadcrumbs = document.getElementById('breadcrumbs');
const authContainer = document.getElementById('auth-container');
const userStatus = document.getElementById('user-status');
const usernameDisplay = document.getElementById('username-display');

// Hjelpefunksjon for å bytte mellom hovedvisningene
export const showView = (viewId) => {
    if (categoryView && threadView && postView) {
        [categoryView, threadView, postView].forEach(view => view.classList.add('hidden'));
        document.getElementById(viewId).classList.remove('hidden');
    }
};

// Viser/skjuler innlogging vs. innlogget status
export const updateAuthUI = () => {
    // ... (denne funksjonen er uendret) ...
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
    // ... (denne funksjonen er uendret) ...
};

// Rendrer trådlisten
export const renderThreads = (threads, category) => {
    // ... (denne funksjonen er uendret) ...
};

// Rendrer innleggslisten (MED SLETT-KNAPP-LOGIKK)
export const renderPosts = (posts, threadId) => {
    const loggedInUser = getUserFromToken();
    let postsHTML = '';

    posts.forEach(post => {
        if (!post || !post.author) return;
        
        let deleteButtonHTML = '';
        if (loggedInUser && loggedInUser.username === post.author.username) {
            deleteButtonHTML = `<button class="delete-btn" data-post-id="${post.id}">Slett</button>`;
        }

        postsHTML += `
            <div class="post">
                <div class="post-user-info">
                    <img src="${SITE_BASE_URL}/avatars/${post.author.profileImage}" alt="Profilbilde" class="post-avatar">
                    <strong><a href="profile.html?user=${escapeHTML(post.author.username)}">${escapeHTML(post.author.username)}</a></strong>
                </div>
                <div class="post-main">
                    <p class="post-content">${escapeHTML(post.content)}</p>
                    ${deleteButtonHTML}
                </div>
            </div>
        `;
    });

    let replyFormHTML = '';
    if (getUserFromToken()) {
        replyFormHTML = `
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
    postView.innerHTML = postsHTML + replyFormHTML;
    breadcrumbs.innerHTML = `<a href="#/">Forum</a> &gt; Tråd`;
};
