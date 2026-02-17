function saveProject() {
    const projectData = {
        panels: {}
    };

    // Capture all text and images from each content area
    const contentAreas = document.querySelectorAll('.content');
    contentAreas.forEach(area => {
        projectData.panels[area.id] = area.innerHTML;
    });

    const blob = new Blob([JSON.stringify(projectData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my_brochure_project.json';
    link.click();
}

function loadProject(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const projectData = JSON.parse(e.target.result);
        
        for (const panelId in projectData.panels) {
            const area = document.getElementById(panelId);
            if (area) {
                area.innerHTML = projectData.panels[panelId];
            }
        }
        alert("Project Loaded Successfully!");
    };
    reader.readAsText(file);
}

// Keep your existing uploadImage and downloadBrochure functions below this!





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
