document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Navigation Logic ---
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // --- 2. Dark Mode Management ---
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme on initial load
    if (localStorage.theme === 'dark' || (!localStorage.theme && prefersDark)) {
        document.body.classList.add('dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    // Manual toggle event
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            themeToggle.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // --- 3. Automated Project Gallery Loader ---
    const galleryContainer = document.getElementById('dynamic-gallery');
    
    if (galleryContainer) {
        const project = galleryContainer.getAttribute('data-project');
        const count = parseInt(galleryContainer.getAttribute('data-count'));

        for (let i = 1; i <= count; i++) {
            const card = document.createElement('div');
            card.className = 'gallery-card fade-in';

            // Create Image element
            const img = document.createElement('img');
            img.src = `../assets/images/${project}/${i}.jpg`;
            img.alt = `${project} documentation image ${i}`;
            
            // Create Description element (Fetching from matching .txt file)
            const descDiv = document.createElement('div');
            descDiv.className = 'image-description';
            descDiv.innerText = "Loading description...";

            fetch(`../assets/images/${project}/${i}.txt`)
                .then(response => response.ok ? response.text() : "No additional description available.")
                .then(text => { descDiv.innerText = text; })
                .catch(() => { descDiv.style.display = 'none'; });

            // Lightbox Trigger on Image click
            img.onclick = () => {
                const lb = document.getElementById('lightbox');
                const lbImg = document.getElementById('lightbox-img');
                if (lb && lbImg) {
                    lb.style.display = 'flex';
                    lbImg.src = img.src;
                }
            };

            card.appendChild(img);
            card.appendChild(descDiv);
            galleryContainer.appendChild(card);
        }
    }

    // --- 4. Lightbox Closing Logic ---
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.onclick = (e) => { 
            if (e.target.id !== 'lightbox-img') lb.style.display = 'none'; 
        };
        const closeBtn = document.querySelector('.close-lightbox');
        if (closeBtn) closeBtn.onclick = () => lb.style.display = 'none';
    }

    // --- 5. Scroll Animations ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => observer.observe(el));
});