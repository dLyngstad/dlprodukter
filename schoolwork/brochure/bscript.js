function downloadBrochure() {
    window.print();
}
function downloadBrochure() {
    window.print();
}

function uploadImage(panelId) {
    const input = document.getElementById(`file-${panelId}`);
    const targetPanel = document.getElementById(panelId);
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Check if an image container already exists
            let container = targetPanel.querySelector('.image-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'image-container';
                targetPanel.appendChild(container);
            }
            
            // Inject the image as a base64 string
            container.innerHTML = `<img src="${e.target.result}" style="width:100%; height:auto; display:block; margin:15px 0;">`;
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}
