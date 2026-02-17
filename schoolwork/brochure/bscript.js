// 1. PRINT FUNCTION
function downloadBrochure() {
    window.print();
}

// 2. IMAGE HANDLING
let savedRange = null;

document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (range.commonAncestorContainer.parentElement.closest('.content')) {
            savedRange = range;
        }
    }
});

function triggerImageUpload() {
    if (!savedRange) {
        alert("Please click inside the brochure text first!");
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

// 3. TEXT COLOR FUNCTION (THE FIX)
function changeTextColor(color) {
    document.execCommand('foreColor', false, color);
}

// 4. SAVE & LOAD PROJECT
function saveProject() {
    const projectData = { panels: {} };
    document.querySelectorAll('.content').forEach(area => {
        projectData.panels[area.id] = area.innerHTML;
    });
    const blob = new Blob([JSON.stringify(projectData)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'brochure_project.json';
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
        } catch (err) { alert("Error loading: " + err); }
    };
    reader.readAsText(file);
}
