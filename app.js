// --- Start of Configuration ---
const auth0Domain = 'dev-hbr7h3ablr72gmyf.us.auth0.com'; // <-- PASTE YOUR DOMAIN HERE
const auth0ClientId = 'gVj0yaS57yBYrvA5NhvylfFLoxXNkT5T'; // <-- PASTE YOUR CLIENT ID HERE
// --- End of Configuration ---

let auth0Client = null;

// Function to initialize the Auth0 client
const configureClient = async () => {
    auth0Client = await createAuth0Client({
        domain: auth0Domain,
        client_id: auth0ClientId
    });
};

// Function to update the UI based on login status
const updateUI = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
    const loginButton = document.getElementById('login-button');
    const userInfo = document.getElementById('user-info');

    loginButton.style.display = isAuthenticated ? 'none' : 'block';
    userInfo.style.display = isAuthenticated ? 'block' : 'none';

    if (isAuthenticated) {
        const user = await auth0Client.getUser();
        document.getElementById('user-profile').innerHTML = `
            <p>Welcome!</p>
            <p>Email: ${user.email}</p>
        `;
    }
};

// Main function that runs when the page loads
window.addEventListener('load', async () => {
    await configureClient();
    updateUI();

    // Handle the redirect from Auth0 after login
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/"); // Clean up the URL
        updateUI();
    }
});

// Event listener for the login button
document.getElementById('login-button').addEventListener('click', async () => {
    await auth0Client.loginWithRedirect({
        redirect_uri: window.location.origin
    });
});

// Event listener for the logout button
document.getElementById('logout-button').addEventListener('click', async () => {
    auth0Client.logout({
        returnTo: window.location.origin
    });
});
