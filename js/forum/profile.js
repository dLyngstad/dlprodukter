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
    const avatarUploadForm = document.getElementById('avatar-upload-form'); // Ny referanse

    // Funksjon for å laste profildata
    const loadProfile = async () => {
        const params = new URLSearchParams(window.location.search);
        const username = params.get('user');

        if (!username) {
            profileUsername.textContent = "Bruker ikke spesifisert.";
            return;
        }

        try {
            const profileData = await api.fetchProfile(username);
            
            profileUsername.textContent = profileData.username;
            profilePostCount.textContent = profileData.postCount;
            profileBio.textContent = profileData.bio || "Ingen biografi.";
            
            // ENDRING: Viser det ekte profilbildet fra serveren
            profileImage.src = `${api.API_BASE_URL}/avatars/${profileData.profileImage}`;
            
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

    // Event listener for redigeringsskjemaet (bio)
    editProfileForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const token = auth.getToken();
        const newBio = bioTextarea.value;
        try {
            await api.updateProfile(newBio, token);
            alert("Profilen din er oppdatert!");
            loadProfile();
        } catch (error) {
            alert(`Feil: ${error.message}`);
        }
    });

    // NY EVENT LISTENER: Håndterer innsending av bildeopplasting
    avatarUploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const token = auth.getToken();
        const fileInput = document.getElementById('avatar-file');
        
        if (fileInput.files.length === 0) {
            alert("Vennligst velg en fil først.");
            return;
        }

        // Vi bruker FormData for å sende filer
        const formData = new FormData();
        formData.append('avatar', fileInput.files[0]);

        try {
            await api.uploadAvatar(formData, token);
            alert("Profilbilde oppdatert!");
            loadProfile(); // Last profilen på nytt for å vise det nye bildet
        } catch(error) {
            alert(`Feil ved opplasting: ${error.message}`);
        }
    });

    loadProfile();
});
