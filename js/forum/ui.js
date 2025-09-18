import { getUserFromToken } from './auth.js';
import { escapeHTML } from './api.js';

// Denne filen er vår "interiørdesigner" som endrer på hva som vises på siden.

const postsContainer = document.getElementById('posts-container');
const postFormContainer = document.getElementById('post-form-container');
const authContainer = document.getElementById('auth-container');
const userStatus = document.getElementById('user-status');
const usernameDisplay = document.getElementById('username-display');

export const renderPosts = (posts) => {
    // Hent den innloggede brukeren for å sammenligne
    const loggedInUser = getUserFromToken();

    postsContainer.innerHTML = '<h2>Innlegg</h2>'; 
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        // Bygg opp HTML for innlegget
        let postHTML = `
            <div class="post-header">Fra: <a href="profile.html?user=${escapeHTML(post.author)}">${escapeHTML(post.author)}</a></div>
            <p class="post-content">${escapeHTML(post.content)}</p>
        `;

        // VIKTIG: Sjekk om den innloggede brukeren er forfatteren av posten
        if (loggedInUser && loggedInUser.username === post.author) {
            // Hvis ja, legg til en sletteknapp med postens unike ID
            postHTML += `<button class="delete-btn" data-post-id="${post.id}">Slett</button>`;
        }

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
