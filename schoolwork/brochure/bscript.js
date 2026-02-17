function downloadBrochure() {
    window.print();
}
// Test to see if the file is connected
console.log("Script loaded successfully!");

function downloadBrochure() {
    // We give the browser a moment to 'solidify' images before printing
    window.print();
}

function uploadImage(panelId) {
    const input = document.getElementById(`file-${panelId}`);
    const targetPanel = document.getElementById(panelId);
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Find or create the image container
            let container = targetPanel.querySelector('.image-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'image-container';
                targetPanel.appendChild(container);
            }
            
            // Clear old image and add new one
            container.innerHTML = `<img src="${e.target.result}" style="width:100%; height:auto; display:block; margin:10px 0;">`;
            console.log("Image injected into " + panelId);
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}
