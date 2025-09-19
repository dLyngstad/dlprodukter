import { getUserFromToken } from './auth.js';
// ENDRING: Importerer API_BASE_URL for å bygge bilde-URLer
import { escapeHTML, API_BASE_URL } from './api.js';

// Denne filen er vår "interiørdesigner" som endrer på hva som vises på siden.

const postsContainer = document.getElementById('posts-container');
const postFormContainer = document.getElementById('post-form-container');
const authContainer = document.getElementById('auth-container');
const userStatus = document.getElementById('user-status');
const usernameDisplay = document.getElementById('username-display');

export const renderPosts = (posts) => {
    const loggedInUser = getUserFromToken();

    postsContainer.innerHTML = '<h2>Innlegg</h2>'; 
    posts.forEach(post => {
        // Hopp over hvis posten eller forfatteren mangler data av en eller annen grunn
        if (!post || !post.author) return;

        const postElement = document.createElement('div');
        postElement.className = 'post'; // Bruker fortsatt .post som hovedcontainer

        let postHTML = `
            <div class="post-user-info">
                
                <img src="${API_BASE_URL}/avatars/${post.author.profileImage}" alt="Profilbilde" class="post-avatar">

                <strong><a href="profile.html?user=${escapeHTML(post.author.username)}">${escapeHTML(post.author.username)}</a></strong>
                <p>Innlegg: ${post.author.postCount}</p>
            </div>
            <div class="post-main">
                <p class="post-content">${escapeHTML(post.content)}</p>
        `;

        // Sjekk om sletteknappen skal vises
        if (loggedInUser && loggedInUser.username === post.author.username) {
            postHTML += `<button class="delete-btn" data-post-id="${post.id}">Slett</button>`;
        }

        // Lukk post-main div
        postHTML += `</div>`; 

        postElement.innerHTML = postHTML;
        postsContainer.appendChild(postElement);
    });
};

export const updateUI = () => {
    const user = getUserFromToken();
    if (user) {
        authContainer.classList.add('hidden');
        postFormContainer.classList.remove('hidden');
        userStatus.classList.remove('hidden');
        usernameDisplay.textContent = user.username;
    } else {
        authContainer.classList.remove('hidden');
        postFormContainer.classList.add('hidden');
        userStatus.classList.add('hidden');
    }
};

export const clearForm = (formElement) => {
    formElement.reset();
};
