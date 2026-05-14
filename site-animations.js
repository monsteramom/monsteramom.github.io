(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function addRevealTargets() {
        const selectors = [
            '.hero-content',
            '.hero-media',
            '.highlight-item',
            '.plant-card',
            '.page-hero-grid > *',
            '.care-plant-card',
            '.blog-card',
            '.shared-contact-panel',
            '.shared-contact-grid .contact-card',
            '.product-detail-container > *'
        ];

        document.querySelectorAll(selectors.join(',')).forEach((element, index) => {
            element.classList.add('reveal-on-scroll');
            element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
        });
    }

    function revealNow() {
        document.querySelectorAll('.reveal-on-scroll').forEach(element => element.classList.add('is-visible'));
    }

    document.addEventListener('DOMContentLoaded', function () {
        const yr = new Date().getFullYear();
        document.querySelectorAll('.footer p').forEach(function (p) {
            p.innerHTML = p.innerHTML.replace(/\d{4}(?= Monstera Mom)/, yr);
        });

        addRevealTargets();

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealNow();
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        document.querySelectorAll('.reveal-on-scroll').forEach(element => observer.observe(element));
    });
}());
