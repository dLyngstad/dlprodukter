const API_URL = 'http://143.110.126.86:3000/posts'; 
// F.eks: 'http://81.166.123.45:3000/posts'

    // VIKTIG: Adressen til din Raspberry Pi-server
    //const API_URL = 'http://raspberrypi.local:3000/posts';
    
    // Referanser til HTML-elementene
    const postsContainer = document.getElementById('posts-container');
    const postForm = document.getElementById('post-form');

    /**
     * Funksjon for å hente alle poster fra serveren og vise dem
     */
    const fetchPosts = async () => {
        try {
            const response = await fetch(API_URL);
            const posts = await response.json();

            // Tøm containeren før vi legger inn nye poster
            postsContainer.innerHTML = '<h2>Innlegg</h2>'; 

            // Gå gjennom hver post og lag HTML for den
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                
                postElement.innerHTML = `
                    <div class="post-header">Fra: ${escapeHTML(post.author)}</div>
                    <p class="post-content">${escapeHTML(post.content)}</p>
                `;
                
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error('Klarte ikke å hente poster:', error);
            postsContainer.innerHTML = '<p>Kunne ikke laste innlegg. Er serveren påslått?</p>';
        }
    };

    /**
     * Funksjon som kjører når skjemaet sendes inn
     */
    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Forhindrer at siden laster på nytt

        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;

        const newPost = { author, content };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                // Tøm skjemaet
                postForm.reset();
                // Hent og vis alle poster på nytt, inkludert den nye
                fetchPosts();
            } else {
                console.error('Klarte ikke å lagre posten.');
            }
        } catch (error) {
            console.error('Feil ved sending av post:', error);
        }
    };
    
    // Hjelpefunksjon for å unngå at brukere kan skrive inn skadelig HTML
    const escapeHTML = (str) => {
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    };

    // Lytt etter at skjemaet sendes inn
    postForm.addEventListener('submit', handleFormSubmit);

    // Hent alle poster når siden lastes inn for første gang
    fetchPosts();
});
