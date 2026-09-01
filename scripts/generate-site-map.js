#!/usr/bin/env node

/**
 * Générateur de SITE.md — `npm run docs`
 *
 * Produit l'inventaire du site à partir des fichiers réels, au lieu de le maintenir
 * à la main dans CLAUDE.md (où il périmait à chaque page ajoutée).
 *
 * ⚠️ Ne jamais éditer SITE.md à la main : il est régénéré à chaque push par la CI.
 */

const fs = require('fs');
const path = require('path');
const P = require('./lib/pages');

const OUTPUT_FILE = 'SITE.md';

const ORDRE_FAMILLES = [
  'Accueil',
  'Formules — hub',
  'Formules — pages détail',
  'Pages locales (SEO)',
  'Blog — hub',
  'Blog — articles',
  'Outils interactifs',
  'Pages transverses',
];

/** Échapper les caractères qui casseraient un tableau Markdown */
const cell = v => (v == null || v === '' ? '—' : String(v).replace(/\|/g, '\\|').replace(/\n/g, ' '));

/** Raccourcir un texte trop long pour une cellule */
const court = (v, n) => (v && v.length > n ? `${v.slice(0, n - 1)}…` : v);

/** Catégories d'articles, lues sur les cartes du hub blog */
function categoriesArticles() {
  const map = new Map();
  const hubPath = 'blog/index.html';
  if (!fs.existsSync(hubPath)) return map;

  const hub = fs.readFileSync(hubPath, 'utf8');
  const cartes = hub.matchAll(
    /<article class="article-card[^"]*"[^>]*data-category="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g
  );

  for (const [, categorie, corps] of cartes) {
    const lien = corps.match(/href="\/blog\/([^"#]+)"/);
    if (lien) map.set(lien[1].replace(/\/$/, ''), categorie);
  }
  return map;
}

/** Feuilles de style d'une page, en nom court */
const cssCourt = page =>
  page.styles
    .map(s => path.basename(s))
    .filter(s => s !== 'fonts.css')
    .join(', ') || '—';

/** Types JSON-LD structurants (on masque le bruit : ListItem, ImageObject…) */
const BRUIT = new Set(['ListItem', 'ImageObject', 'Organization', 'WebPage', 'Person', 'PostalAddress', 'GeoCoordinates', 'Place', 'Offer', 'ContactPoint', 'OpeningHoursSpecification', 'Answer', 'Question', 'Rating', 'AggregateRating', 'Review', 'CourseInstance', 'Schedule']);
const typesUtiles = page => page.jsonLdTypes.filter(t => !BRUIT.has(t)).join(', ') || '—';

function generer() {
  const pages = P.findHtmlFiles('.', { includeNoindex: true, include404: true }).map(P.readPage);
  const categories = categoriesArticles();

  const parFamille = new Map();
  for (const page of pages) {
    if (!parFamille.has(page.family)) parFamille.set(page.family, []);
    parFamille.get(page.family).push(page);
  }

  const lignes = [];
  const aujourdhui = new Date().toISOString().split('T')[0];

  lignes.push('# SITE.md — inventaire du site');
  lignes.push('');
  lignes.push('> 🤖 **Fichier généré automatiquement — ne pas éditer à la main.**');
  lignes.push('> Régénéré par `npm run docs` et par la CI à chaque push.');
  lignes.push('> Il remplace l\'inventaire manuel qui vivait dans `CLAUDE.md` : celui-ci périmait');
  lignes.push('> à chaque page ajoutée, celui-là décrit toujours l\'état réel du dépôt.');
  lignes.push('');
  lignes.push(`- **Généré le** : ${aujourdhui}`);
  lignes.push(`- **Pages HTML** : ${pages.length} (dont ${pages.filter(p => p.noindex).length} en \`noindex\`)`);
  lignes.push(`- **Articles de blog** : ${pages.filter(p => p.family === 'Blog — articles').length}`);
  lignes.push('');
  lignes.push('| Famille | Pages |');
  lignes.push('|---|---|');
  for (const famille of ORDRE_FAMILLES) {
    const liste = parFamille.get(famille);
    if (liste) lignes.push(`| ${famille} | ${liste.length} |`);
  }
  lignes.push('');
  lignes.push('---');
  lignes.push('');

  /* ---- Articles de blog : tableau dédié (catégorie + dates) ---- */
  const articles = (parFamille.get('Blog — articles') || []).sort((a, b) => a.file.localeCompare(b.file));
  if (articles.length) {
    lignes.push('## Blog — articles');
    lignes.push('');
    lignes.push('| Slug | Catégorie | Publié | Modifié | Sujet (H1) |');
    lignes.push('|---|---|---|---|---|');
    for (const page of articles) {
      const slug = path.basename(page.file, '.html');
      lignes.push(
        `| \`${slug}\` | ${cell(categories.get(slug))} | ${cell((page.publishedTime || '').slice(0, 10))} | ${cell((page.modifiedTime || '').slice(0, 10))} | ${cell(court(page.h1, 70))} |`
      );
    }
    lignes.push('');
  }

  /* ---- Toutes les autres familles ---- */
  for (const famille of ORDRE_FAMILLES) {
    if (famille === 'Blog — articles') continue;
    const liste = parFamille.get(famille);
    if (!liste) continue;

    lignes.push(`## ${famille}`);
    lignes.push('');
    lignes.push('| Fichier | URL | Indexée | Titre (H1) | JSON-LD | CSS propre |');
    lignes.push('|---|---|---|---|---|---|');
    for (const page of liste.sort((a, b) => a.file.localeCompare(b.file))) {
      lignes.push(
        `| \`${page.file}\` | \`${page.path}\` | ${page.noindex ? 'non' : `oui (${page.priority})`} | ${cell(court(page.h1, 55))} | ${cell(typesUtiles(page))} | ${cell(cssCourt(page))} |`
      );
    }
    lignes.push('');
  }

  /* ---- Ressources partagées ---- */
  lignes.push('---');
  lignes.push('');
  lignes.push('## Ressources partagées');
  lignes.push('');

  const lister = (dir, filtre) =>
    fs.existsSync(dir) ? fs.readdirSync(dir).filter(filtre).sort() : [];

  lignes.push('### Feuilles de style (`css/`)');
  lignes.push('');
  lignes.push('| Fichier | Chargée par |');
  lignes.push('|---|---|');
  for (const f of lister('css', f => f.endsWith('.css'))) {
    const utilisateurs = pages.filter(p => p.styles.some(s => s.endsWith(`/${f}`) || s.endsWith(f)));
    const resume =
      utilisateurs.length === 0 ? 'aucune page (injectée par un script)' :
      utilisateurs.length > 8 ? `${utilisateurs.length} pages` :
      utilisateurs.map(p => `\`${p.file}\``).join(', ');
    lignes.push(`| \`css/${f}\` | ${resume} |`);
  }
  lignes.push('');

  lignes.push('### Scripts (`scripts/`)');
  lignes.push('');
  for (const f of lister('scripts', f => /\.(js|py)$/.test(f))) {
    lignes.push(`- \`scripts/${f}\``);
  }
  for (const f of lister('scripts/lib', f => f.endsWith('.js'))) {
    lignes.push(`- \`scripts/lib/${f}\``);
  }
  lignes.push('');

  const pdfs = lister('plaquettes', f => f.endsWith('.pdf'));
  if (pdfs.length) {
    lignes.push('### Plaquettes PDF (`plaquettes/`)');
    lignes.push('');
    for (const f of pdfs) lignes.push(`- \`plaquettes/${f}\``);
    lignes.push('');
  }

  fs.writeFileSync(OUTPUT_FILE, `${lignes.join('\n')}\n`, 'utf8');
  console.log(`✅ ${OUTPUT_FILE} généré — ${pages.length} pages inventoriées`);
}

try {
  generer();
} catch (err) {
  console.error('❌ Erreur:', err.message);
  process.exit(1);
}
