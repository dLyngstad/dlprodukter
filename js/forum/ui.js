import { getUserFromToken } from './auth.js';
import { escapeHTML, SITE_BASE_URL, fetchProfile } from './api.js';

// ... (referanser til elementer som før) ...
const categoryView = document.getElementById('category-view');
const threadView = document.getElementById('thread-view');
const postView = document.getElementById('post-view');
const breadcrumbs = document.getElementById('breadcrumbs');
const authContainer = document.getElementById('auth-container');
const userStatus = document.getElementById('user-status');
const usernameDisplay = document.getElementById('username-display');


export const showView = (viewId) => {
    // ... (uendret) ...
};

// ENDRING: Denne er nå async og henter profildata
export const renderProfileLink = async () => {
    const container = document.getElementById('profile-link-container');
    if (!container) return; 

    const user = getUserFromToken();

    if (user && user.username) {
        try {
            const profileData = await fetchProfile(user.username);
            const avatarUrl = `${SITE_BASE_URL}/avatars/${profileData.profileImage || 'default.jpg'}`;

            container.innerHTML = `
                <div class="group-box profile-widget">
                    <span class="group-box-legend">Min profil</span>
                    <a href="profile.html?user=${escapeHTML(user.username)}" class="profile-widget-link">
                        <img src="${avatarUrl}" alt="Profilbilde" class="profile-widget-avatar">
                        <span>Gå til din profil</span>
                    </a>
                </div>
            `;
            container.classList.remove('hidden');
        } catch (error) {
            console.error("Kunne ikke hente profildata for widget:", error);
            container.innerHTML = '';
            container.classList.add('hidden');
        }
    } else {
        container.innerHTML = '';
        container.classList.add('hidden');
    }
};

// ENDRING: Denne funksjonen er nå async og kaller renderProfileLink
export const updateAuthUI = async () => {
    const user = getUserFromToken();
    if (user) {
        authContainer.classList.add('hidden');
        userStatus.classList.remove('hidden');
        usernameDisplay.textContent = user.username;
    } else {
        authContainer.classList.remove('hidden');
        userStatus.classList.add('hidden');
    }
    // Kaller alltid denne for å sikre at profil-widgeten vises/skjules korrekt
    await renderProfileLink();
};

// ... (resten av filen, renderCategories, renderThreads, etc. er uendret) ...
export const renderCategories = (categories) => {
    let html = '<h2>Kategorier</h2>';
    categories.forEach(cat => {
        html += `
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
    categoryView.innerHTML = html;
    breadcrumbs.innerHTML = `<a href="#/">Forum</a>`;
};

export const renderThreads = (threads, category) => {
    let html = `<h2>Tråder i ${escapeHTML(category.title)}</h2>`;
    threads.forEach(thread => {
        html += `
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
        html += `
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
    threadView.innerHTML = html;
    breadcrumbs.innerHTML = `<a href="#/">Forum</a> &gt; ${escapeHTML(category.title)}`;
};

export const renderPosts = (posts, threadId) => {
    const loggedInUser = getUserFromToken();
    let postsHTML = '';

    posts.forEach((post, index) => {
        if (!post || !post.author) return;

        let deleteButtonHTML = '';
        if (loggedInUser && loggedInUser.username === post.author.username) {
            deleteButtonHTML = `<button class="delete-btn" data-post-id="${post.id}">Slett</button>`;
        }
        
        let postClasses = 'post';
        if (index === 0) {
            postClasses += ' original-post';
        }

        postsHTML += `
            <div class="${postClasses}">
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

