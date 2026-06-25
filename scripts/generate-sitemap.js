#!/usr/bin/env node

/**
 * Générateur de sitemap dynamique pour autoecolemarti.fr
 * Usage: node scripts/generate-sitemap.js
 * 
 * Lit tous les fichiers HTML du site, extrait les titres et dates de modif,
 * génère sitemap.xml conforme au standard W3C
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE_URL = 'https://autoecolemarti.fr';
const OUTPUT_FILE = 'sitemap.xml';
const PAGES_DIR = '.'; // racine du site

// Pages noindex / sans valeur SEO — exclues du sitemap
const EXCLUDED_FILES = new Set([
  'merci.html',
  'mentions-legales.html',
  'reservation.html',
]);

// Fragments de chemin exclus (sous-arborescences techniques)
const EXCLUDED_PATH_FRAGMENTS = [
  '/quizz/panneaux/', // pages temporaires éventuelles dans ce dossier
];

/**
 * Obtenir la date de dernière modif d'un fichier
 * Priorité: 1) git log, 2) fs.stat
 */
function getLastModifiedDate(filePath) {
  try {
    // Chercher la date du dernier commit qui a touché ce fichier
    const result = execSync(`git log -1 --format=%ci -- "${filePath}" 2>/dev/null || echo ""`, {
      encoding: 'utf8'
    }).trim();
    
    if (result) {
      // Format: 2026-03-25 14:30:45 +0200 → 2026-03-25
      return result.split(' ')[0];
    }
  } catch (e) {
    // Si git n'est pas dispo, fallback fs.stat
  }

  // Fallback: date de modification du fichier système
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0]; // Date du jour par défaut
  }
}

/**
 * Lister tous les fichiers HTML
 */
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Ignorer certains répertoires
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', '.github', 'scripts'].includes(file)) {
        findHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html') && file !== '404.html') {
      // Exclure les pages noindex / sans valeur SEO
      const normalized = filePath.replace(/\\/g, '/');
      if (EXCLUDED_FILES.has(file)) return;
      if (EXCLUDED_PATH_FRAGMENTS.some(f => normalized.includes(f))) return;
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Extraire la priorité basée sur le chemin
 */
function getPriority(filePath) {
  // path.join('.', 'foo') → 'foo' (le './' est supprimé). On normalise au cas où.
  const p = filePath.replace(/\\/g, '/').replace(/^\.\//, '');

  if (p === 'index.html') return '1.0';            // Accueil
  if (p === 'faq.html') return '0.9';              // FAQ (intent informatif fort)
  if (p.startsWith('formules/')) return '0.9';     // Pages formations (intent commercial)
  if (p === 'blog/index.html') return '0.8';       // Hub blog
  if (p === 'espace-eleves.html') return '0.8';   // Espace élèves
  if (p.startsWith('blog/')) return '0.7';         // Articles de blog
  if (p.startsWith('quizz/')) return '0.8';        // Outil pédagogique
  if (p === 'auto-ecole-anglet.html' || p === 'auto-ecole-biarritz.html') return '0.8'; // Pages locales (SEO local)
  return '0.5';
}

/**
 * Convertir le chemin fichier en URL
 */
function filePathToUrl(filePath) {
  let url = filePath
    .replace(/\\/g, '/') // Windows → Unix
    .replace(/^\.\// , '') // Enlever ./
    .replace(/index\.html$/, '') // index.html → /
    .replace(/\.html$/, ''); // Enlever extension

  // Ajouter slash final si pas vide
  if (url && !url.endsWith('/')) {
    url += '/';
  }

  // Construire l'URL finale
  if (url === '/' || !url) {
    return SITE_URL; // Accueil = domaine seul
  }
  return `${SITE_URL}/${url}`.replace(/\/$/, ''); // Ajouter / entre domaine et chemin
}

/**
 * Générer le sitemap
 */
function generateSitemap() {
  console.log('🔍 Recherche des fichiers HTML...');
  const htmlFiles = findHtmlFiles(PAGES_DIR);

  if (htmlFiles.length === 0) {
    console.error('❌ Aucun fichier HTML trouvé!');
    process.exit(1);
  }

  console.log(`✓ ${htmlFiles.length} fichier(s) trouvé(s)`);

  // Construire les URLs
  const urls = htmlFiles
    .map(filePath => ({
      url: filePathToUrl(filePath),
      lastmod: getLastModifiedDate(filePath),
      priority: getPriority(filePath)
    }))
    .sort((a, b) => a.url.localeCompare(b.url)); // Trier alphabétiquement

  // Générer XML
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(({ url, lastmod, priority }) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`),
    '</urlset>'
  ];

  const xml = xmlLines.join('\n');

  // Écrire le fichier
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8');
  console.log(`\n✅ Sitemap généré: ${OUTPUT_FILE}`);
  console.log(`📊 ${urls.length} URLs incluses`);
  console.log('\nAperçu (5 premières URLs):');
  urls.slice(0, 5).forEach(({ url, lastmod }) => {
    console.log(`  ${url} (${lastmod})`);
  });
}

/**
 * Échapper les caractères XML
 */
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Exécuter
try {
  generateSitemap();
} catch (err) {
  console.error('❌ Erreur:', err.message);
  process.exit(1);
}
