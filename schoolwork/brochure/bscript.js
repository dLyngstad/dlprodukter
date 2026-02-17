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
        const container = range.commonAncestorContainer.nodeType === 1 
            ? range.commonAncestorContainer 
            : range.commonAncestorContainer.parentElement;
        
        const closestContent = container.closest('.content');
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
            img.className = 'img-center'; // Default alignment
            img.style.width = "100%";
            
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

// UPDATED: IMAGE RESIZE & WRAP LOGIC
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' && e.target.closest('.content')) {
        e.preventDefault(); 
        
        // 1. Prompt for Size
        const currentWidthStr = e.target.style.width || '100%';
        const currentVal = parseInt(currentWidthStr.replace('%', ''));
        const newWidth = prompt("Enter width in % (1-100):", currentVal);

        if (newWidth !== null) {
            const widthNum = parseInt(newWidth);
            if (!isNaN(widthNum) && widthNum > 0 && widthNum <= 100) {
                e.target.style.width = widthNum + "%";
            }
            
            // 2. Prompt for Alignment (Text Wrap)
            const align = prompt("Align: 'L' (Left/Wrap), 'R' (Right/Wrap), or 'C' (Center/No Wrap):", "C");
            
            if (align) {
                const choice = align.toLowerCase();
                e.target.className = ""; // Clear existing classes
                
                if (choice === 'l') e.target.classList.add('img-left');
                else if (choice === 'r') e.target.classList.add('img-right');
                else e.target.classList.add('img-center');
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

// 4. SAVE & LOAD
function saveProject() {
    const projectData = { panels: {} };
    document.querySelectorAll('.content').forEach(area => {
        projectData.panels[area.id] = area.innerHTML;
    });
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
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
                if (area) {
                    area.innerHTML = projectData.panels[panelId];
                    area.contentEditable = "true";
                }
            }
        } catch (err) { alert("Error: " + err); }
    };
    reader.readAsText(file);
}
