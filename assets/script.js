// Shared utility: reveal-on-scroll + mobile nav toggle
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Mobile nav toggle
        var toggle = document.querySelector('.nav-toggle');
        var links = document.querySelector('.nav-links');
        if (toggle && links) {
            toggle.addEventListener('click', function () {
                links.classList.toggle('open');
            });
        }

        // Reveal-on-scroll via IntersectionObserver (no scroll listeners)
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var items = document.querySelectorAll('.reveal');
        if (reduceMotion || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
        items.forEach(function (el) { observer.observe(el); });

        // Safety net: never leave content permanently invisible if the
        // observer misses an element (slow layout, edge-case browsers).
        setTimeout(function () {
            document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
                el.classList.add('is-visible');
            });
        }, 2500);
    });
})();
