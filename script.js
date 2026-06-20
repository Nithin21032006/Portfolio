// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initNavbarScroll();
    initStatusLine();
    initScrollReveal();
    initBackToTop();
    initContactForm();
});

// ============================================
// Mobile Nav Toggle
// ============================================
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// ============================================
// Navbar background intensifies on scroll
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
            navbar.style.background = 'rgba(17, 17, 15, 0.96)';
        } else {
            navbar.style.background = 'rgba(17, 17, 15, 0.82)';
        }
    });
}

// ============================================
// Terminal status-line typing effect
// ============================================
function initStatusLine() {
    const el = document.getElementById('status-text');
    if (!el) return;

    const roles = [
        'building web platforms',
        'studying AI & cybersecurity',
        'shipping side projects',
        'open to opportunities'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const current = roles[roleIndex];

        if (!deleting) {
            el.textContent = current.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 1800);
                return;
            }
        } else {
            el.textContent = current.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        const speed = deleting ? 35 : 55;
        setTimeout(tick, speed);
    }

    tick();
}

// ============================================
// Scroll reveal for elements with .reveal
// ============================================
function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('in-view'); });
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
}

// ============================================
// Back to top button
// ============================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// Contact form (demo submit handling)
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            alert('Please fill in all fields before sending.');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'sent ✓';
        submitBtn.disabled = true;

        setTimeout(function () {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2200);
    });
}
