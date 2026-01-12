// Mobile nav - Added checks to prevent errors on subpages
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

// Dark mode - Persistence logic
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply theme on load
if (localStorage.theme === 'dark' || (!localStorage.theme && prefersDark)) {
  document.body.classList.add('dark');
  if (themeToggle) themeToggle.textContent = '☀️'; // Update icon if button exists
}

// Toggle theme logic
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
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

document.querySelectorAll('.fade-in, .slide-up')
  .forEach(el => observer.observe(el));