/*
 * Décodage des liens email obfusqués (anti-spam).
 * Les adresses sont écrites en entités HTML dans l'attribut data-email et
 * reconstruites côté client en mailto: au chargement.
 */
document.querySelectorAll('[data-email]').forEach(function (el) {
  var e = el.dataset.email, s = el.dataset.subject, h = 'mailto:' + e;
  if (s) h += '?subject=' + encodeURIComponent(s);
  el.href = h;
  if (el.dataset.showEmail) el.textContent = e;
});
