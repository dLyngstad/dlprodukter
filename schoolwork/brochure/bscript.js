function downloadBrochure() {
    window.print();
}
function downloadBrochure() {
    // We give the browser a tiny moment to 'solidify' the images before printing
    setTimeout(() => {
        window.print();
    }, 500);
}

function uploadImage(panelId) {
    const input = document.getElementById(`file-${panelId}`);
    const targetPanel = document.getElementById(panelId);
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Check if an image container already exists to avoid stacking too many
            let container = targetPanel.querySelector('.image-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'image-container';
                targetPanel.appendChild(container);
            }
            
            // Clear previous image in that panel if there is one
            container.innerHTML = '';
            
            const img = document.createElement('img');
            img.src = e.target.result;
            
            // CSS to ensure it prints correctly
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            img.style.display = "block";
            
            container.appendChild(img);
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}
