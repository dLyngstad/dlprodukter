let savedRange = null;

// Track the cursor position whenever you click or type
document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        // Only save if we are inside a content area
        if (range.commonAncestorContainer.parentElement.closest('.content')) {
            savedRange = range;
        }
    }
});

function triggerImageUpload() {
    if (!savedRange) {
        alert("Please click inside the brochure text first so I know where to put the image!");
        return;
    }
    document.getElementById('global-image-input').click();
}

function insertImageAtCursor(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'inserted-image'; // Uses the CSS styling
            
            // Restore the saved cursor position
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(savedRange);
            
            // Insert the image
            savedRange.deleteContents();
            savedRange.insertNode(img);
            
            // Move cursor after the image
            savedRange.collapse(false);
            
            // Reset input so you can upload the same file again if needed
            input.value = '';
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// --- KEEP YOUR EXISTING SAVE/LOAD/PRINT FUNCTIONS BELOW ---

function downloadBrochure() {
    window.print();
}

function saveProject() {
    const projectData = { panels: {} };
    const contentAreas = document.querySelectorAll('.content');
    contentAreas.forEach(area => {
        projectData.panels[area.id] = area.innerHTML;
    });
    const blob = new Blob([JSON.stringify(projectData)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'my_brochure_project.json';
    link.click();
}

function loadProject(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const projectData = JSON.parse(e.target.result);
            for (const panelId in projectData.panels) {
                const area = document.getElementById(panelId);
                if (area) area.innerHTML = projectData.panels[panelId];
            }
            alert("Project Loaded!");
        } catch (err) { alert("Error: " + err); }
    };
    reader.readAsText(file);
}
