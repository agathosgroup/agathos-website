// Nav: add .scrolled class on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const spans     = navToggle.querySelectorAll('span');

navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    if (open) {
        spans[0].style.transform = 'translateY(6px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
        document.body.style.overflow = 'hidden';
    } else {
        closeMenu();
    }
});

function closeMenu() {
    navLinks.classList.remove('open');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    document.body.style.overflow = '';
}

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Active nav link based on current section
const sections = document.querySelectorAll('section[id], [id="mission"]');
const navItems = document.querySelectorAll('.nav__links a');

function updateActiveNav() {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 60;
    const scrollY = window.scrollY + 120;
    let current = '';
    sections.forEach(section => {
        if (section.offsetTop <= scrollY) current = section.id;
    });
    if (nearBottom) current = sections[sections.length - 1].id;
    navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// Scroll animations via IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in, .stagger').forEach(el => observer.observe(el));
