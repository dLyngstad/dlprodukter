// 1. DOWNLOAD FUNCTION
function downloadBrochure() {
    window.print();
}

// 2. IMAGE UPLOAD FUNCTION
function uploadImage(panelId) {
    // Note: This matches the 'onchange' event in your HTML
    // You might be passing 'event' or 'panelId' depending on your HTML. 
    // This handles the string ID version you are using.
    const input = document.getElementById(`file-${panelId}`); 
    
    // Fallback: If your HTML passes the event object instead (like in the single-file version)
    // we need to handle that. But based on your previous 'bscript', you use IDs.
    if (!input) {
        console.error("Could not find input with ID: file-" + panelId);
        return;
    }

    const targetPanel = document.getElementById(panelId);
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            let container = targetPanel.querySelector('.image-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'image-container';
                targetPanel.appendChild(container);
            }
            container.innerHTML = `<img src="${e.target.result}" style="width:100%; height:auto; display:block; margin:15px 0;">`;
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// 3. SAVE PROJECT FUNCTION
function saveProject() {
    const projectData = {
        panels: {}
    };

    // We look for all divs with class 'content' and save their inner HTML
    const contentAreas = document.querySelectorAll('.content');
    contentAreas.forEach(area => {
        // We save the HTML so bold text, images, and new paragraphs are kept
        projectData.panels[area.id] = area.innerHTML;
    });

    // Create a downloadable text file
    const blob = new Blob([JSON.stringify(projectData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my_brochure_project.json';
    link.click();
}

// 4. LOAD PROJECT FUNCTION
function loadProject(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const projectData = JSON.parse(e.target.result);
            
            // Loop through the saved data and put it back into the panels
            for (const panelId in projectData.panels) {
                const area = document.getElementById(panelId);
                if (area) {
                    area.innerHTML = projectData.panels[panelId];
                }
            }
            alert("Project Loaded Successfully!");
        } catch (err) {
            alert("Error loading file: " + err);
        }
    };
    reader.readAsText(file);
}
