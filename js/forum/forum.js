document.addEventListener('DOMContentLoaded', () => {

    const API_BASE_URL = 'https://forum.dlprodukter.com'; // Din sikre Cloudflare-adresse
    
    // Referanser til alle HTML-elementene vi trenger
    const postsContainer = document.getElementById('posts-container');
    const postFormContainer = document.getElementById('post-form-container');
    const postForm = document.getElementById('post-form');
    const authContainer = document.getElementById('auth-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const userStatus = document.getElementById('user-status');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');

    // Hjelpefunksjon for å få tak i lagret token
    const getToken = () => localStorage.getItem('jwt_token');

    /**
     * Oppdaterer grensesnittet basert på om brukeren er logget inn eller ikke
     */
    const updateUI = () => {
        const token = getToken();
        if (token) {
            // Bruker er innlogget
            authContainer.classList.add('hidden'); // Skjul login/register
            postFormContainer.classList.remove('hidden'); // Vis post-skjema
            userStatus.classList.remove('hidden'); // Vis status
            
            // Hent brukernavn fra tokenet for visning
            const payload = JSON.parse(atob(token.split('.')[1]));
            usernameDisplay.textContent = payload.username;

        } else {
            // Bruker er ikke innlogget
            authContainer.classList.remove('hidden'); // Vis login/register
            postFormContainer.classList.add('hidden'); // Skjul post-skjema
            userStatus.classList.add('hidden'); // Skjul status
        }
    };

    /**
     * Funksjon for å hente alle poster fra serveren
     */
    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts`);
            const posts = await response.json();
            postsContainer.innerHTML = '<h2>Innlegg</h2>'; 
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <div class="post-header">Fra: ${escapeHTML(post.author)}</div>
                    <p class="post-content">${escapeHTML(post.content)}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Klarte ikke å hente poster:', error);
            postsContainer.innerHTML = '<h2>Innlegg</h2><p>Kunne ikke laste innlegg. Er serveren påslått?</p>';
        }
    };

    /**
     * Håndterer innsending av registreringsskjema
     */
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        alert(data.message); // Gi beskjed til brukeren
        if (response.ok) registerForm.reset();
    });

    /**
     * Håndterer innsending av innloggingsskjema
     */
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        if (response.ok) {
            // Lagre "adgangskortet" i nettleserens minne
            localStorage.setItem('jwt_token', data.token);
            updateUI(); // Oppdater grensesnittet til "innlogget"-modus
        } else {
            alert(data.message);
        }
    });

    /**
     * Håndterer innsending av nytt innlegg
     */
    postForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const content = document.getElementById('content').value;
        const token = getToken();

        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Sender med "adgangskortet"
            },
            body: JSON.stringify({ content }),
        });
        
        if (response.ok) {
            postForm.reset();
            fetchPosts(); // Hent alle poster på nytt
        } else {
            alert("Kunne ikke poste innlegg. Kanskje du må logge inn på nytt.");
        }
    });

    /**
     * Håndterer utlogging
     */
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('jwt_token'); // Slett "adgangskortet"
        updateUI(); // Oppdater grensesnittet til "utlogget"-modus
    });

    // Hjelpefunksjon for sikkerhet
    const escapeHTML = (str) => {
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(str || ""));
        return p.innerHTML;
    };

    // --- INITIERING ---
    fetchPosts(); // Hent poster når siden lastes
    updateUI(); // Sjekk om brukeren allerede er innlogget og vis riktig innhold
});
