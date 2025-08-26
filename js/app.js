// Function to load HTML content from a file into an element
const loadHTML = (filePath, elementId) => {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching HTML:', error);
        });
};

// When the DOM is fully loaded, load the header and footer
document.addEventListener("DOMContentLoaded", () => {
    loadHTML('partials/header.html', 'header-placeholder');
    loadHTML('partials/footer.html', 'footer-placeholder');
    
    // We will put the Auth0 code here later, after the header is loaded
});

// --- Your Auth0 configuration and functions will go below this line ---
// (We can re-integrate this in the next step)
