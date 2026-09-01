#!/usr/bin/env node

/**
 * Brique partagée : découverte et lecture des pages du site.
 *
 * Utilisée par generate-sitemap.js, generate-site-map.js et check-site.js
 * pour que les trois scripts aient exactement la même notion de « page du site »,
 * de « URL propre » et de « priorité SEO ».
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE_URL = 'https://autoecolemarti.fr';

/** Pages noindex / sans valeur SEO — exclues du sitemap (mais pas des contrôles) */
const EXCLUDED_FROM_SITEMAP = new Set([
  'merci.html',
  'mentions-legales.html',
  'reservation.html',
  'devis.html',
]);

/** Fragments de chemin exclus (sous-arborescences techniques) */
const EXCLUDED_PATH_FRAGMENTS = [
  '/quizz/panneaux/', // pages temporaires éventuelles dans ce dossier
];

/** Dossiers jamais parcourus (ni site, ni contrôles) */
const EXCLUDED_DIRS = new Set(['node_modules', 'scripts', 'vendor', 'fonts', 'plaquettes', 'data']);

/**
 * Lister tous les fichiers HTML du site.
 * Ignore les dossiers techniques et tous les dossiers commençant par un point
 * (.git, .github, .claude/templates…) — sans quoi le gabarit d'article se
 * retrouverait dans le sitemap.
 *
 * @param {string} dir      racine de parcours
 * @param {object} options  { includeNoindex: bool, include404: bool }
 */
function findHtmlFiles(dir = '.', options = {}) {
  const { includeNoindex = false, include404 = false } = options;
  const out = [];

  (function walk(current) {
    for (const entry of fs.readdirSync(current)) {
      const full = path.join(current, entry);
      const stat = fs.statSync(full);

      if (stat.isDirectory()) {
        if (entry.startsWith('.')) continue;
        if (EXCLUDED_DIRS.has(entry)) continue;
        walk(full);
        continue;
      }

      if (!entry.endsWith('.html')) continue;
      if (entry === '404.html' && !include404) continue;

      const normalized = full.replace(/\\/g, '/');
      if (EXCLUDED_PATH_FRAGMENTS.some(f => normalized.includes(f))) continue;
      if (!includeNoindex && EXCLUDED_FROM_SITEMAP.has(entry)) continue;

      out.push(full);
    }
  })(dir);

  return out.sort();
}

/** Chemin fichier → chemin normalisé sans './' ni antislash Windows */
function normalize(filePath) {
  return filePath.replace(/\\/g, '/').replace(/^\.\//, '');
}

/**
 * Convertir le chemin fichier en URL absolue.
 * Les URLs doivent correspondre exactement aux balises canonical des pages :
 * - index de dossier → slash final ('blog/index.html' → '/blog/')
 * - page simple      → sans extension ni slash ('faq.html' → '/faq')
 */
function filePathToUrl(filePath) {
  const url = normalize(filePath)
    .replace(/index\.html$/, '')
    .replace(/\.html$/, '');

  return url ? `${SITE_URL}/${url}` : `${SITE_URL}/`;
}

/** Chemin fichier → chemin d'URL relatif ('/faq', '/blog/', '/') */
function filePathToPath(filePath) {
  return filePathToUrl(filePath).replace(SITE_URL, '') || '/';
}

/** Priorité SEO déduite du chemin */
function getPriority(filePath) {
  const p = normalize(filePath);

  if (p === 'index.html') return '1.0';            // Accueil
  if (p === 'faq.html') return '0.9';              // FAQ (intent informatif fort)
  if (p.startsWith('formules/')) return '0.9';     // Pages formations (intent commercial)
  if (p === 'blog/index.html') return '0.8';       // Hub blog
  if (p === 'espace-eleves.html') return '0.8';    // Espace élèves
  if (p.startsWith('blog/')) return '0.7';         // Articles de blog
  if (p.startsWith('quizz/')) return '0.8';        // Outil pédagogique
  if (/^auto-ecole-(anglet|bayonne|biarritz)\.html$/.test(p)) return '0.8'; // Pages locales
  return '0.5';
}

/** Famille de pages (sert au regroupement dans SITE.md) */
function getFamily(filePath) {
  const p = normalize(filePath);

  if (p === 'index.html') return 'Accueil';
  if (p === 'blog/index.html') return 'Blog — hub';
  if (p.startsWith('blog/')) return 'Blog — articles';
  if (p === 'formules/index.html') return 'Formules — hub';
  if (p.startsWith('formules/')) return 'Formules — pages détail';
  if (/^auto-ecole-/.test(p)) return 'Pages locales (SEO)';
  if (p.startsWith('quizz/')) return 'Outils interactifs';
  return 'Pages transverses';
}

/** Date du dernier commit touchant le fichier (fallback : mtime, puis aujourd'hui) */
function getLastModifiedDate(filePath) {
  try {
    const result = execSync(`git log -1 --format=%ci -- "${filePath}" 2>/dev/null || echo ""`, {
      encoding: 'utf8',
    }).trim();
    if (result) return result.split(' ')[0];
  } catch (e) {
    /* git indisponible → fallback */
  }

  try {
    return fs.statSync(filePath).mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/* ------------------------------------------------------------------ */
/* Extraction du contenu d'une page                                    */
/* ------------------------------------------------------------------ */

const first = (re, s) => {
  const m = s.match(re);
  return m ? m[1].trim() : null;
};

/** Décoder les entités HTML les plus courantes (pour comparer des textes) */
function decodeEntities(s) {
  if (!s) return s;
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&(?:eacute|#233);/g, 'é')
    .replace(/&(?:egrave|#232);/g, 'è');
}

/**
 * Lire une page et en extraire tout ce dont les scripts ont besoin.
 * Un seul passage de lecture disque, réutilisé par tous les contrôles.
 */
function readPage(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const head = html.slice(0, Math.max(html.indexOf('</head>'), 0) || html.length);

  const jsonLd = [];
  const jsonLdErrors = [];
  const reLd = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = reLd.exec(html)) !== null) {
    try {
      jsonLd.push(JSON.parse(m[1]));
    } catch (err) {
      jsonLdErrors.push(err.message);
    }
  }

  const links = [...html.matchAll(/href="([^"]+)"/g)].map(x => x[1]);
  const styles = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map(x => x[1]);

  return {
    file: normalize(filePath),
    url: filePathToUrl(filePath),
    path: filePathToPath(filePath),
    family: getFamily(filePath),
    priority: getPriority(filePath),
    html,
    head,
    title: decodeEntities(first(/<title>([\s\S]*?)<\/title>/i, html)),
    h1: decodeEntities(
      (first(/<h1[^>]*>([\s\S]*?)<\/h1>/i, html) || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || null
    ),
    description: decodeEntities(first(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i, head)),
    canonical: first(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i, head),
    ogUrl: first(/<meta[^>]+property="og:url"[^>]+content="([^"]*)"/i, head),
    ogImage: first(/<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i, head),
    ogLocale: first(/<meta[^>]+property="og:locale"[^>]+content="([^"]*)"/i, head),
    ogType: first(/<meta[^>]+property="og:type"[^>]+content="([^"]*)"/i, head),
    twitterCard: first(/<meta[^>]+name="twitter:card"[^>]+content="([^"]*)"/i, head),
    publishedTime: first(/<meta[^>]+property="article:published_time"[^>]+content="([^"]*)"/i, head),
    modifiedTime: first(/<meta[^>]+property="article:modified_time"[^>]+content="([^"]*)"/i, head),
    noindex: /name="robots"[^>]+content="[^"]*noindex/i.test(head),
    hasConsent: /load-consent\.js/.test(html),
    jsonLd,
    jsonLdErrors,
    jsonLdTypes: collectTypes(jsonLd),
    links,
    styles,
  };
}

/** Aplatir tous les @type rencontrés dans les blocs JSON-LD d'une page */
function collectTypes(nodes) {
  const types = new Set();
  const visit = node => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== 'object') return;
    if (node['@type']) [].concat(node['@type']).forEach(t => types.add(t));
    Object.values(node).forEach(visit);
  };
  visit(nodes);
  return [...types].sort();
}

/** Parcourir récursivement tous les objets d'un arbre JSON-LD */
function walkJsonLd(nodes, fn) {
  const visit = node => {
    if (Array.isArray(node)) return node.forEach(visit);
    if (!node || typeof node !== 'object') return;
    fn(node);
    Object.values(node).forEach(visit);
  };
  visit(nodes);
}

module.exports = {
  SITE_URL,
  EXCLUDED_FROM_SITEMAP,
  findHtmlFiles,
  normalize,
  filePathToUrl,
  filePathToPath,
  getPriority,
  getFamily,
  getLastModifiedDate,
  readPage,
  decodeEntities,
  walkJsonLd,
};
