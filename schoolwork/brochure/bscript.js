// 1. PRINT FUNCTION
function downloadBrochure() {
    window.print();
}

// 2. IMAGE HANDLING
let savedRange = null;

// Track cursor position to insert images in the right place
document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const closestContent = range.commonAncestorContainer.parentElement.closest('.content');
        if (closestContent) {
            savedRange = range;
        }
    }
});

function triggerImageUpload() {
    if (!savedRange) {
        alert("Please click inside a text field before inserting an image!");
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
            img.className = 'inserted-image';
            img.style.width = "100%"; // Default size
            
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(savedRange);
            
            savedRange.deleteContents();
            savedRange.insertNode(img);
            savedRange.collapse(false);
            input.value = '';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// NEW: IMAGE RESIZE ON CLICK
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' && 
        e.target.classList.contains('inserted-image') && 
        e.target.closest('.content[contenteditable="true"]')) {
        
        const currentWidthStr = e.target.style.width || '100%';
        const currentVal = parseInt(currentWidthStr.replace('%', ''));
        const newWidth = prompt("Enter new image width in percentage (1-100):", currentVal);

        if (newWidth !== null) {
            const widthNum = parseInt(newWidth);
            if (!isNaN(widthNum) && widthNum > 0 && widthNum <= 100) {
                e.target.style.width = widthNum + "%";
                e.target.style.height = "auto"; 
            } else {
                alert("Please enter a valid number between 1 and 100.");
            }
        }
    }
});

// 3. TEXT COLOR
function changeTextColor(color) {
    if (savedRange) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(savedRange);
    }
    document.execCommand('foreColor', false, color);
}

// 4. SAVE & LOAD PROJECT
function saveProject() {
    const projectData = { panels: {} };
    document.querySelectorAll('.content').forEach(area => {
        projectData.panels[area.id] = area.innerHTML;
    });
    
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
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
                if (area) {
                    area.innerHTML = projectData.panels[panelId];
                    // FIX: Force editable state after loading
                    area.contentEditable = "true";
                }
            }
            alert("Project Loaded! You can now click and edit directly.");
        } catch (err) { 
            alert("Error loading file: " + err); 
        }
    };
    reader.readAsText(file);
}
