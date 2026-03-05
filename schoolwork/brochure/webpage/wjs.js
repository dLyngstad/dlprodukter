document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DATA STRUCTURE ---
    const gestureData = [
        {
            id: 'p1',
            category: 'physics',
            categoryName: 'Physics',
            title: 'The Right-Hand Rule',
            model: 'Point the thumb in the direction of the current. Let the fingers curl inward.',
            concept: 'Shows the direction of the circular magnetic field around a wire.',
            extraInfo: 'Commonly used in electromagnetism. Have students hold their pens as the "wire" and physically wrap their hands around it to cement the spatial relationship.'
        },
        {
            id: 'p2',
            category: 'physics',
            categoryName: 'Physics',
            title: 'Wave Types',
            model: 'Snake-like up/down motion (Transverse) vs. pulsing push/pull motion (Longitudinal).',
            concept: 'Medium movement relative to wave direction (e.g., light vs. sound).',
            extraInfo: 'Pair this with a physical slinky demonstration. The hand gesture allows students to replicate the slinky motion at their desks without needing the equipment.'
        },
        {
            id: 'p3',
            category: 'physics',
            categoryName: 'Physics',
            title: 'Particle States',
            model: 'Fists vibrating together (solid), sliding over each other (liquid), bouncing far apart (gas).',
            concept: 'The kinetic theory of matter.',
            extraInfo: 'This translates microscopic, invisible particle behavior into a macro, visible movement. It reinforces that particles in solids are still moving, just vibrating in place.'
        },
        {
            id: 'c1',
            category: 'chemistry',
            categoryName: 'Chemistry',
            title: 'Chirality',
            model: 'Palms up, showing they are mirror images but cannot be perfectly superimposed.',
            concept: 'Enantiomers and "handedness" in molecular structures.',
            extraInfo: 'The literal use of hands makes the concept of "handedness" immediately intuitive. Ask students to try and stack their hands palm-down to prove they don\'t align perfectly.'
        },
        {
            id: 'c2',
            category: 'chemistry',
            categoryName: 'Chemistry',
            title: 'Enzyme "Lock & Key"',
            model: 'Hand in a rigid "C" shape docking with a fist from the other hand.',
            concept: 'Enzyme-substrate specificity.',
            extraInfo: 'Emphasize how the shape of the active site must exactly match the substrate. You can extend this to show "induced fit" by having the C-shape squeeze the fist slightly upon docking.'
        },
        {
            id: 'b1',
            category: 'biology',
            categoryName: 'Biology',
            title: 'Sliding Filaments',
            model: 'Point fingers of both hands together, then slide them deeply between one another.',
            concept: 'Actin and myosin sliding during muscle contraction.',
            extraInfo: 'This helps visualize the microscopic sarcomere contraction, showing how overlap increases without the filaments themselves actually shortening.'
        },
        {
            id: 'b2',
            category: 'biology',
            categoryName: 'Biology',
            title: 'Phagocytosis',
            model: 'A "pac-man" hand wrapping around a small object and pulling inward.',
            concept: 'Cell membrane engulfing large particles.',
            extraInfo: 'Great for visualizing the active nature of bulk transport across a membrane compared to passive diffusion. The hands become the dynamic lipid bilayer.'
        },
        {
            id: 'e1',
            category: 'earth',
            categoryName: 'Earth Science',
            title: 'Tectonic Plates',
            model: 'Flat hands sliding apart (Divergent), pushing to buckle (Convergent), or rubbing edges (Transform).',
            concept: 'Plate boundaries and resulting geography.',
            extraInfo: 'Use this alongside maps showing real-world fault lines. Ask students to "create a mountain" (convergent) or "make an earthquake" (transform) with their hands.'
        }
    ];

    // --- 2. DOM ELEMENTS ---
    const grid = document.getElementById('gesture-grid');
    const searchBar = document.getElementById('search-bar');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResultsMsg = document.getElementById('no-results');
    
    // Modal Elements
    const modal = document.getElementById('gesture-modal');
    const closeModalBtn = document.getElementById('close-modal');

    let currentCategory = 'all';
    let searchQuery = '';

    // --- 3. RENDERING CARDS DYNAMICALLY ---
    function renderCards() {
        // Clear current grid
        grid.innerHTML = '';

        // Filter the data based on search and category
        const filteredData = gestureData.filter(item => {
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery) || 
                                  item.concept.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        // Show/Hide no results message
        if (filteredData.length === 0) {
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
        }

        // Create HTML for each filtered item
        filteredData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <span class="card-category">${item.categoryName}</span>
                <h3>${item.title}</h3>
                <p><strong>The Model:</strong> ${item.model}</p>
                <p><strong>The Concept:</strong> ${item.concept}</p>
            `;
            
            // Add click event to open the modal with this specific item's data
            card.addEventListener('click', () => openModal(item));
            grid.appendChild(card);
        });
    }

    // --- 4. MODAL LOGIC ---
    function openModal(item) {
        // Populate modal with data
        document.getElementById('modal-category').textContent = item.categoryName;
        document.getElementById('modal-title').textContent = item.title;
        document.getElementById('modal-model').textContent = item.model;
        document.getElementById('modal-concept').textContent = item.concept;
        document.getElementById('modal-extra').textContent = item.extraInfo;

        // Show modal
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    // Event listeners for closing modal
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(); // Close if clicking the background overlay
    });

    // --- 5. FILTERING LOGIC ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-filter');
            renderCards();
        });
    });

    searchBar.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderCards();
    });

    // --- 6. INITIALIZATION ---
    renderCards(); 
});
