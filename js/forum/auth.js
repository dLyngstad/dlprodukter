// Denne filen er vår "sikkerhetsvakt" som håndterer adgangskort (tokens).

const TOKEN_KEY = 'jwt_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;
    try {
        // Dekoder den midterste delen (payload) av tokenet for å hente brukerinfo
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        console.error("Kunne ikke dekode token:", error);
        removeToken(); // Fjerner ugyldig token
        return null;
    }
};
