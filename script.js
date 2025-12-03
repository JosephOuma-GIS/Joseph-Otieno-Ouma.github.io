<script>
/* =========================================
   1. SMOOTH SCROLLING FOR ANCHOR LINKS
   =========================================
   - Handles variable navbar height (desktop/mobile)
   - Auto-closes hamburger on navigation
   - Hash update for accessibility
   ----------------------------------------- */
(function () {
    const NAVBAR_SELECTOR = '.navbar';
    const NAV_MENU_SELECTOR = '.nav-menu';
    function getNavbarHeight() {
        const navbar = document.querySelector(NAVBAR_SELECTOR);
        return navbar ? navbar.offsetHeight : 0;
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (!target || href === '#!' || href === '#') return;
            e.preventDefault();
            // Calculate scroll position offset by navbar height
            const rect = target.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const navbarOffset = getNavbarHeight();

            window.scrollTo({
                top: scrollTop + rect.top - navbarOffset,
                behavior: 'smooth'
            });

            // Update hash (accessibility)
            history.pushState(null, '', href);

            // Auto-close mobile menu if open
            const navMenu = document.querySelector(NAV_MENU_SELECTOR);
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }
        });
    });
})();

/* =========================================
   2. NAVBAR STYLE CHANGE ON SCROLL
   =========================================
   - Enhanced visual feedback
   - Robust if .navbar missing
   ----------------------------------------- */
(function () {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    function setNavbarStyle(scrolled) {
        navbar.style.background = scrolled
            ? 'rgba(255,255,255,0.98)'
            : 'rgba(255,255,255,0.95)';
        navbar.style.backdropFilter = scrolled
            ? 'blur(12px)'
            : 'blur(10px)';
        navbar.style.boxShadow = scrolled
            ? '0 8px 32px rgba(0,0,0,0.12)'
            : '0 4px 20px rgba(0,0,0,0.08)';
    }
    function onScroll() {
        setNavbarStyle(window.scrollY > 120);
    }
    window.addEventListener('scroll', onScroll);
    window.addEventListener('load', onScroll);
})();

/* =========================================
   3. FADE-IN ON SCROLL FOR KEY BLOCKS
   =========================================
   - Honors reduced motion settings
   - Applies to main cards/grids
   - Elegant, modular
   ----------------------------------------- */
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const selectors = [
        '.service-card',
        '.job-listing',
        '.course-box',
        '.project-card',
        '.about-grid > div'
    ].join(', ');
    const elements = document.querySelectorAll(selectors);
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(.56,.5,.34,1.05), transform 0.8s cubic-bezier(.57,.23,.42,1.02)';
    });

    function showOnScroll() {
        const windowH = window.innerHeight;
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < windowH - 50) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    window.addEventListener('load', showOnScroll, { passive: true });
    window.addEventListener('scroll', showOnScroll, { passive: true });
})();

/* =========================================
   4. CONTACT FORM: CLIENT-SIDE FEEDBACK
   =========================================
   - Validates fields
   - Accessible feedback
   - Reset form if valid
   ----------------------------------------- */
(function () {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Fetch user input fields
            const nameField = this.querySelector('input[placeholder="Your Name"], input[name="name"]');
            const emailField = this.querySelector('input[placeholder="Your Email"], input[type="email"]');
            const messageField = this.querySelector('textarea');

            let name = nameField ? nameField.value.trim() : '';
            let email = emailField ? emailField.value.trim() : '';
            let message = messageField ? messageField.value.trim() : '';

            let errors = [];
            if (nameField && !name) errors.push('Please enter your name.');
            if (emailField && !/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) errors.push('Please provide a valid email address.');
            if (messageField && !message) errors.push('Please add a message.');

            if (errors.length) {
                alert(errors.join('\n'));
                return;
            }

            // Success message
            alert(`Thank you${name ? ', ' + name : ''}! Your message has been sent.\nWe will get back to you within 24 hours.`);
            form.reset();
        });
    });
})();

/* =========================================
   5. PAGE FADE-IN EFFECT ON LOAD
   =========================================
   - Gentle intro, respects reduced motion
   ----------------------------------------- */
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.7s cubic-bezier(.26,.92,.26,1)';
    window.addEventListener('DOMContentLoaded', function() {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
})();
</script>
