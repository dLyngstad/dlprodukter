document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    const searchBar = document.getElementById('search-bar');
    const noResultsMsg = document.getElementById('no-results');

    // Store current states
    let currentCategory = 'all';
    let searchQuery = '';

    // Main filtering function
    function updateFilters() {
        let visibleCount = 0;

        cards.forEach(card => {
            // 1. Check if card matches category filter
            const matchesCategory = (currentCategory === 'all' || card.getAttribute('data-category') === currentCategory);
            
            // 2. Check if card text matches search query
            const cardText = card.textContent.toLowerCase();
            const matchesSearch = cardText.includes(searchQuery);

            // 3. Apply visibility
            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Show or hide "No Results" message
        if (visibleCount === 0) {
            noResultsMsg.style.display = 'block';
        } else {
            noResultsMsg.style.display = 'none';
        }
    }

    // Listen for Category Button Clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active styling
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update state and run filter
            currentCategory = btn.getAttribute('data-filter');
            updateFilters();
        });
    });

    // Listen for Search Bar typing
    searchBar.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        updateFilters();
    });
});
