#!/usr/bin/env node

/**
 * Générateur de sitemap pour autoecolemarti.fr — `npm run sitemap`
 *
 * La découverte des pages, la conversion en URL propre et le calcul de priorité
 * vivent dans scripts/lib/pages.js, partagés avec check-site.js et
 * generate-site-map.js : les trois scripts ont ainsi exactement la même notion
 * de « page du site ».
 */

const fs = require('fs');
const P = require('./lib/pages');

const OUTPUT_FILE = 'sitemap.xml';

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap() {
  console.log('🔍 Recherche des fichiers HTML...');
  const htmlFiles = P.findHtmlFiles('.');

  if (htmlFiles.length === 0) {
    console.error('❌ Aucun fichier HTML trouvé!');
    process.exit(1);
  }

  console.log(`✓ ${htmlFiles.length} fichier(s) trouvé(s)`);

  const urls = htmlFiles
    .map(filePath => ({
      url: P.filePathToUrl(filePath),
      lastmod: P.getLastModifiedDate(filePath),
      priority: P.getPriority(filePath),
    }))
    .sort((a, b) => a.url.localeCompare(b.url));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(({ url, lastmod, priority }) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`),
    '</urlset>',
  ].join('\n');

  fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8');
  console.log(`\n✅ Sitemap généré: ${OUTPUT_FILE}`);
  console.log(`📊 ${urls.length} URLs incluses`);
  console.log('\nAperçu (5 premières URLs):');
  urls.slice(0, 5).forEach(({ url, lastmod }) => console.log(`  ${url} (${lastmod})`));
}

try {
  generateSitemap();
} catch (err) {
  console.error('❌ Erreur:', err.message);
  process.exit(1);
}
