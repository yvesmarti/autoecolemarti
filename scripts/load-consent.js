/*
 * Chargement différé du bandeau de consentement (tarteaucitron).
 * La librairie RGPD (~136 Ko) n'est pas critique au premier rendu : on l'injecte
 * à l'inactivité (requestIdleCallback) ou dès la première interaction utilisateur,
 * selon ce qui arrive en premier. Aucun cookie/GA n'est posé avant consentement
 * (highPrivacy), donc différer l'affichage du bandeau reste conforme CNIL.
 *
 * Expose window.loadConsent(cb) : déclenche le chargement si besoin et exécute cb
 * une fois tarteaucitron prêt (utilisé par le bouton « Gérer mes préférences cookies »).
 */
(function () {
  var started = false;
  var ready = false;
  var queue = [];

  function inject(src, onload) {
    var s = document.createElement('script');
    s.src = src;
    if (onload) s.onload = onload;
    document.head.appendChild(s);
  }

  function flush() {
    ready = true;
    while (queue.length) {
      try { queue.shift()(); } catch (e) { /* noop */ }
    }
  }

  function load(cb) {
    if (cb) queue.push(cb);
    if (ready) { flush(); return; }
    if (started) return;
    started = true;
    inject('/vendor/tarteaucitron/tarteaucitron.js', function () {
      inject('/vendor/tarteaucitron/lang/tarteaucitron.fr.js', function () {
        inject('/scripts/consent.js', flush);
      });
    });
  }

  // API publique pour les déclencheurs explicites (ex. lien « gérer mes cookies »)
  window.loadConsent = load;

  var events = ['scroll', 'click', 'keydown', 'touchstart', 'mousemove'];
  events.forEach(function (evt) {
    window.addEventListener(evt, function () { load(); }, { once: true, passive: true });
  });

  if ('requestIdleCallback' in window) {
    requestIdleCallback(function () { load(); }, { timeout: 3000 });
  } else {
    setTimeout(function () { load(); }, 2000);
  }
})();
