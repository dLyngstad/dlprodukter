import { getUserFromToken } from './auth.js';
import { escapeHTML } from './api.js';

// Denne filen er vår "interiørdesigner" som endrer på hva som vises på siden.

const postsContainer = document.getElementById('posts-container');
const postFormContainer = document.getElementById('post-form-container');
const authContainer = document.getElementById('auth-container');
const userStatus = document.getElementById('user-status');
const usernameDisplay = document.getElementById('username-display');

export const renderPosts = (posts) => {
    postsContainer.innerHTML = '<h2>Innlegg</h2>'; 
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">Fra: <a href="profile.html?user=${escapeHTML(post.author)}">${escapeHTML(post.author)}</a></div>
            <p class="post-content">${escapeHTML(post.content)}</p>
        `;
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
