/* ══════════════════════════════════════════════════════════════
   nav.js — Menu hamburger mobile partagé
   Inclus sur toutes les pages SAUF l'accueil (index.html a son
   propre script). Fonctionne avec un bouton .hamburger existant
   ou en injecte un. Gère l'accordéon « Formations » si présent.
   ══════════════════════════════════════════════════════════════ */
(function () {
    function init() {
        var navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;
        var container = navLinks.parentElement; // .nav-inner en général
        var mq = window.matchMedia('(max-width: 768px)');

        // Bouton hamburger : réutilisé s'il existe, sinon injecté
        var burger = document.querySelector('.hamburger');
        if (!burger) {
            burger = document.createElement('button');
            burger.className = 'hamburger';
            burger.setAttribute('aria-label', 'Ouvrir le menu de navigation');
            burger.setAttribute('aria-expanded', 'false');
            burger.innerHTML = '<span></span><span></span><span></span>';
            if (navLinks.id) burger.setAttribute('aria-controls', navLinks.id);
            if (container) container.appendChild(burger);
            else navLinks.insertAdjacentElement('afterend', burger);
        }

        function closeMenu() {
            navLinks.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
        }

        burger.addEventListener('click', function () {
            var open = navLinks.classList.toggle('active');
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        // Accordéon sous-menu « Formations » (si présent)
        var dropdown = document.querySelector('.nav-dropdown');
        var dropdownLink = dropdown ? dropdown.querySelector(':scope > a') : null;
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function (e) {
                if (mq.matches) {
                    e.preventDefault();
                    var op = dropdown.classList.toggle('open');
                    dropdownLink.setAttribute('aria-expanded', op ? 'true' : 'false');
                }
            });
        }

        // Fermer le menu au clic sur un lien (sauf le parent accordéon en mobile)
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (link === dropdownLink && mq.matches) return;
                closeMenu();
                if (dropdown) {
                    dropdown.classList.remove('open');
                    if (dropdownLink) dropdownLink.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Repli propre si on repasse en desktop
        var onChange = function (e) {
            if (!e.matches) {
                closeMenu();
                if (dropdown) dropdown.classList.remove('open');
            }
        };
        if (mq.addEventListener) mq.addEventListener('change', onChange);
        else if (mq.addListener) mq.addListener(onChange);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
