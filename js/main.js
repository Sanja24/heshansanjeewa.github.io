document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile nav
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // 2. Dark mode
    const themeToggle = document.getElementById('theme-toggle');
    const updateThemeIcon = (isDark) => {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    };

    if (localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
        updateThemeIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            updateThemeIcon(isDark);
        });
    }

    // 3. ENHANCED GALLERY LOADER
    const galleryContainer = document.getElementById('dynamic-gallery');
    if (galleryContainer) {
        const project = galleryContainer.getAttribute('data-project');
        const count = parseInt(galleryContainer.getAttribute('data-count'));

        for (let i = 1; i <= count; i++) {
            const card = document.createElement('div');
            card.className = 'gallery-card fade-in';

            // Image with loading logic
            const img = document.createElement('img');
            img.src = `../assets/images/${project}/${i}.jpg`;
            img.alt = `Project Image ${i}`;
            img.loading = "lazy";
            
            const descDiv = document.createElement('div');
            descDiv.className = 'image-description';
            descDiv.innerText = "Checking for description...";

            fetch(`../assets/images/${project}/${i}.txt`)
                .then(response => response.ok ? response.text() : "")
                .then(text => { 
                    if(text.trim()) descDiv.innerText = text; 
                    else descDiv.style.display = 'none';
                })
                .catch(() => { descDiv.style.display = 'none'; });

            img.onclick = () => {
                openLightbox(img.src);
            };

            card.appendChild(img);
            card.appendChild(descDiv);
            galleryContainer.appendChild(card);
        }
    }

    // Lightbox Logic
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');

    function openLightbox(src) {
        lb.style.display = 'flex';
        lbImg.src = src;
    }

    if (lb) {
        lb.onclick = (e) => {
            if (e.target !== lbImg) lb.style.display = 'none';
        };
    }

    // Scroll animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => observer.observe(el));
});