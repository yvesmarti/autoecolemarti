#!/usr/bin/env node

/**
 * Serveur statique local — `npm run serve`
 *
 * Reproduit le comportement de Cloudflare Pages pour pouvoir prévisualiser le site
 * avant de pousser :
 *   - URLs propres : /faq → faq.html, /blog/ → blog/index.html
 *   - redirection 301 de /page.html vers /page (comme le fichier _redirects)
 *   - 404.html servi pour les pages inconnues
 *
 * Usage : node scripts/serve.js [port]   (défaut : 8080)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.argv[2]) || 8080;
const RACINE = process.cwd();

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

/** Empêcher toute sortie de la racine du site (../../etc/passwd) */
function resoudre(urlPath) {
  const decode = decodeURIComponent(urlPath.split('?')[0]);
  const absolu = path.resolve(RACINE, `.${path.posix.normalize(decode)}`);
  return absolu.startsWith(RACINE) ? absolu : null;
}

const serveur = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  // Canonicalisation : /page.html → /page (301), comme _redirects
  if (urlPath.endsWith('.html')) {
    const propre = urlPath === '/index.html' ? '/' : urlPath.replace(/(\/index)?\.html$/, '');
    res.writeHead(301, { Location: propre || '/' });
    return res.end();
  }

  const base = resoudre(urlPath);
  if (!base) {
    res.writeHead(403);
    return res.end('403');
  }

  // Ordre de résolution : fichier exact, puis .html, puis index.html du dossier
  const candidats = [base, `${base}.html`, path.join(base, 'index.html')];
  const trouve = candidats.find(c => fs.existsSync(c) && fs.statSync(c).isFile());

  if (!trouve) {
    const page404 = path.join(RACINE, '404.html');
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    return res.end(fs.existsSync(page404) ? fs.readFileSync(page404) : 'Page introuvable');
  }

  res.writeHead(200, {
    'Content-Type': TYPES[path.extname(trouve)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(trouve).pipe(res);
});

serveur.listen(PORT, () => {
  console.log(`\n🚗 Auto-École Marti — aperçu local`);
  console.log(`   http://localhost:${PORT}/`);
  console.log(`   (Ctrl+C pour arrêter)\n`);
});
