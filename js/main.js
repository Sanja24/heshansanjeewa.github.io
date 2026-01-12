document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile nav (Fixed to not crash on subpages)
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // 2. Dark mode
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localStorage.theme === 'dark' || (!localStorage.theme && prefersDark)) {
        document.body.classList.add('dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            themeToggle.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // 3. THE GALLERY LOADER (This part was missing!)
    const galleryContainer = document.getElementById('dynamic-gallery');
    if (galleryContainer) {
        const project = galleryContainer.getAttribute('data-project');
        const count = parseInt(galleryContainer.getAttribute('data-count'));

        for (let i = 1; i <= count; i++) {
            const card = document.createElement('div');
            card.className = 'gallery-card fade-in';

            const img = document.createElement('img');
            img.src = `../assets/images/${project}/${i}.jpg`;
            
            const descDiv = document.createElement('div');
            descDiv.className = 'image-description';
            descDiv.innerText = "Loading description...";

            // Fetch the matching .txt file
            fetch(`../assets/images/${project}/${i}.txt`)
                .then(response => response.ok ? response.text() : "")
                .then(text => { descDiv.innerText = text; })
                .catch(() => { descDiv.style.display = 'none'; });

            img.onclick = () => {
                const lb = document.getElementById('lightbox');
                const lbImg = document.getElementById('lightbox-img');
                lb.style.display = 'flex';
                lbImg.src = img.src;
            };

            card.appendChild(img);
            card.appendChild(descDiv);
            galleryContainer.appendChild(card);
        }
    }

    // Lightbox Close
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.onclick = (e) => { if (e.target.id !== 'lightbox-img') lb.style.display = 'none'; };
        const close = document.querySelector('.close-lightbox');
        if (close) close.onclick = () => lb.style.display = 'none';
    }

    // Scroll animations
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