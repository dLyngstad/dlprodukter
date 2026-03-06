document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DATA STRUCTURE ---
    const gestureData = [
        {
            id: 'p1',
            category: 'physics',
            categoryName: 'Physics',
            title: '',
            model: '',
            concept: '',
            extraInfo: ''
        },
        {
            id: 'p2',
            category: 'physics',
            categoryName: 'Physics',
            title: '',
            model: '',
            concept: '',
            extraInfo: ''
        },
        {
            id: 'p3',
            category: 'physics',
            categoryName: 'Physics',
            title: '',
            model: '',
            concept: '',
            extraInfo: ''
        },
        {
            id: 'c1',
            category: 'chemistry',
            categoryName: 'Chemistry',
            title: '',
            model: '',
            concept: '',
            extraInfo: ''
        },
        {
            id: 'c2',
            category: 'chemistry',
            categoryName: 'Chemistry',
            title: '',
            model: '',
            concept: '',
            extraInfo: ''
        },
        {
            id: 'b1',
            category: 'biology',
            categoryName: 'Biology',
            title: '',
            model: '',
            concept: '',
            extraInfo: ''
        },
        {
            id: 'b2',
            category: 'biology',
            categoryName: 'Biology',
            title: '',
            model: '',
            concept: '',
            extraInfo: ''
        },
        {
            id: 'e1',
            category: 'earth',
            categoryName: 'Earth Science',
            title: '',
            model: '',
            concept: '',
            extraInfo: ''
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
        grid.innerHTML = '';

        const filteredData = gestureData.filter(item => {
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery) || 
                                  item.concept.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        if (filteredData.length === 0) {
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
        }

        filteredData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <span class="card-category">${item.categoryName}</span>
                <h3>${item.title}</h3>
                <p><strong>The Model:</strong> ${item.model}</p>
                <p><strong>The Concept:</strong> ${item.concept}</p>
            `;
            
            card.addEventListener('click', () => openModal(item));
            grid.appendChild(card);
        });
    }

    // --- 4. MODAL LOGIC ---
    function openModal(item) {
        document.getElementById('modal-category').textContent = item.categoryName;
        document.getElementById('modal-title').textContent = item.title;
        document.getElementById('modal-model').textContent = item.model;
        document.getElementById('modal-concept').textContent = item.concept;
        document.getElementById('modal-extra').textContent = item.extraInfo;

        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
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
