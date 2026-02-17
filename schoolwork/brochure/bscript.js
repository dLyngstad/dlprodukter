// 1. UTSKRIFT
function downloadBrochure() {
    window.print();
}

// 2. BILDEHÅNDTERING
let savedRange = null;

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
        alert("Klikk i et tekstfelt før du setter inn bilde!");
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

// 3. TEKSTFARGE
function changeTextColor(color) {
    if (savedRange) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(savedRange);
    }
    document.execCommand('foreColor', false, color);
}

// 4. LAGRE & LASTE PROSJEKT
function saveProject() {
    const projectData = { panels: {} };
    document.querySelectorAll('.content').forEach(area => {
        projectData.panels[area.id] = area.innerHTML;
    });
    
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mitt_brosjyre_prosjekt.json';
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
                    // Tvinger feltet til å være redigerbart etter innlasting
                    area.contentEditable = "true";
                }
            }
            alert("Prosjektet er lastet og klart til redigering!");
        } catch (err) { 
            alert("Kunne ikke laste fil: " + err); 
        }
    };
    reader.readAsText(file);
}
