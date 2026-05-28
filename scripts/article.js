/* ══════════════════════════════════════════════════════════════
   article.js — Enrichissements partagés des articles de blog
   • Table des matières (sommaire) générée depuis les <h2>, affichée
     uniquement sur grand écran (CSS), si l'article a ≥ 3 sections
   • Surlignage de la section courante (scrollspy)
   • Bouton « retour en haut »
   • Barre de partage (Facebook, X, LinkedIn, WhatsApp, copier le lien)
   ══════════════════════════════════════════════════════════════ */
(function () {
    var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function slugify(t) {
        return (t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'section';
    }

    function buildTOC(wrap) {
        var hs = wrap.querySelectorAll('h2');
        if (hs.length < 3) return; // pas de sommaire pour les articles courts

        var used = {};
        var nav = document.createElement('nav');
        nav.className = 'article-toc';
        nav.setAttribute('aria-label', "Sommaire de l'article");
        var html = '<p class="article-toc-title">Sommaire</p><ul>';
        hs.forEach(function (h) {
            var id = h.id || slugify(h.textContent);
            var base = id, n = 2;
            while (used[id]) { id = base + '-' + (n++); }
            used[id] = true;
            h.id = id;
            html += '<li><a href="#' + id + '">' + h.textContent + '</a></li>';
        });
        html += '</ul>';
        nav.innerHTML = html;
        document.body.appendChild(nav);

        // Scrollspy : surligne le lien de la section visible
        var links = nav.querySelectorAll('a');
        var byId = {};
        links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    links.forEach(function (a) { a.classList.remove('active'); });
                    var a = byId[e.target.id];
                    if (a) a.classList.add('active');
                }
            });
        }, { rootMargin: '-80px 0px -70% 0px' });
        hs.forEach(function (h) { spy.observe(h); });

        // Défilement doux (respecte prefers-reduced-motion)
        links.forEach(function (a) {
            a.addEventListener('click', function (ev) {
                var t = document.getElementById(a.getAttribute('href').slice(1));
                if (t) {
                    ev.preventDefault();
                    t.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth', block: 'start' });
                    history.replaceState(null, '', a.getAttribute('href'));
                }
            });
        });
    }

    function buildBackToTop() {
        var btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Revenir en haut de la page');
        btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>';
        document.body.appendChild(btn);
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: REDUCE ? 'auto' : 'smooth' });
        });
        window.addEventListener('scroll', function () {
            btn.classList.toggle('visible', window.scrollY > 600);
        }, { passive: true });
    }

    function buildShare(wrap) {
        var url = encodeURIComponent(location.href);
        var title = encodeURIComponent(document.title);
        var fb = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3l.4-3H14V4.3c0-.8.2-1.3 1.4-1.3H17V.3C16.7.2 15.8.1 14.8.1c-2.1 0-3.6 1.3-3.6 3.7V6H8.4v3H11.2v8h2.8z"/></svg>';
        var x = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.94l-4.84-6.32L5.7 22H2.44l8-9.14L1.5 2h7.11l4.38 5.79zm-1.22 18h1.8L7.04 3.9H5.1z"/></svg>';
        var li = '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.2 8.4h4.6V24H.2zM8.4 8.4h4.4v2.1h.06c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.5 3 5.5 7V24h-4.6v-6.9c0-1.6 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24H8.4z"/></svg>';
        var wa = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.5-1.2-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.5-.3.4c-.1.1-.3.3-.1.5.1.3.7 1.1 1.4 1.8 1 .9 1.7 1.1 2 1.3.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>';
        var copy = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"></path><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"></path></svg>';

        var share = document.createElement('div');
        share.className = 'article-share';
        share.innerHTML =
            '<span class="article-share-label">Partager&nbsp;:</span>' +
            '<a class="share-btn share-fb" target="_blank" rel="noopener" aria-label="Partager sur Facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + url + '">' + fb + '</a>' +
            '<a class="share-btn share-x" target="_blank" rel="noopener" aria-label="Partager sur X" href="https://twitter.com/intent/tweet?url=' + url + '&text=' + title + '">' + x + '</a>' +
            '<a class="share-btn share-li" target="_blank" rel="noopener" aria-label="Partager sur LinkedIn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + url + '">' + li + '</a>' +
            '<a class="share-btn share-wa" target="_blank" rel="noopener" aria-label="Partager sur WhatsApp" href="https://wa.me/?text=' + title + '%20' + url + '">' + wa + '</a>' +
            '<button type="button" class="share-btn share-copy" aria-label="Copier le lien de l\'article">' + copy + '</button>';

        var shareWrap = document.createElement('div');
        shareWrap.className = 'article-share-wrap';
        shareWrap.appendChild(share);

        var anchor = document.querySelector('.related-wrap') || document.querySelector('.cta-banner');
        if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(shareWrap, anchor);
        else wrap.appendChild(shareWrap);

        // Copier le lien
        var copyBtn = share.querySelector('.share-copy');
        copyBtn.addEventListener('click', function () {
            var done = function () {
                share.setAttribute('data-copied', 'Lien copié !');
                copyBtn.classList.add('copied');
                setTimeout(function () { share.removeAttribute('data-copied'); copyBtn.classList.remove('copied'); }, 2000);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(location.href).then(done, function () {});
            } else {
                var ta = document.createElement('textarea');
                ta.value = location.href; document.body.appendChild(ta); ta.select();
                try { document.execCommand('copy'); done(); } catch (e) {}
                document.body.removeChild(ta);
            }
        });
    }

    function init() {
        var wrap = document.querySelector('.article-wrap');
        if (wrap) { buildTOC(wrap); buildShare(wrap); }
        buildBackToTop();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
