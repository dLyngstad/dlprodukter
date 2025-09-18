import * as api from './api.js';
import * as auth from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Referanser til elementer på profilsiden
    const profileUsername = document.getElementById('profile-username');
    const profilePostCount = document.getElementById('profile-post-count');
    const profileBio = document.getElementById('profile-bio');
    const profileImage = document.getElementById('profile-image');
    const editProfileContainer = document.getElementById('edit-profile-container');
    const editProfileForm = document.getElementById('edit-profile-form');
    const bioTextarea = document.getElementById('bio');

    // Funksjon for å laste profildata
    const loadProfile = async () => {
        // Henter brukernavnet fra URL-en (f.eks. profile.html?user=testbruker)
        const params = new URLSearchParams(window.location.search);
        const username = params.get('user');

        if (!username) {
            profileUsername.textContent = "Bruker ikke spesifisert.";
            return;
        }

        try {
            const profileData = await api.fetchProfile(username);
            
            // Fyll inn data på siden
            profileUsername.textContent = profileData.username;
            profilePostCount.textContent = profileData.postCount;
            profileBio.textContent = profileData.bio || "Ingen biografi.";
            // Her vil vi senere sette profilbilde, foreløpig en plassholder
            profileImage.src = `https://via.placeholder.com/150?text=${profileData.username.charAt(0)}`;
            
            // Sjekk om innlogget bruker ser på sin egen profil
            const loggedInUser = auth.getUserFromToken();
            if (loggedInUser && loggedInUser.username === profileData.username) {
                editProfileContainer.classList.remove('hidden');
                bioTextarea.value = profileData.bio;
            }

        } catch (error) {
            console.error(error);
            profileUsername.textContent = "Kunne ikke laste profil.";
        }
    };

    // Event listener for redigeringsskjemaet
    editProfileForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const token = auth.getToken();
        const newBio = bioTextarea.value;

        try {
            await api.updateProfile(newBio, token);
            alert("Profilen din er oppdatert!");
            loadProfile(); // Last inn profilen på nytt for å vise endringene
        } catch (error) {
            alert(`Feil: ${error.message}`);
        }
    });

    // Start alt når siden lastes
    loadProfile();
});
