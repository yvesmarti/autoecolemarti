#!/usr/bin/env node

/**
 * Contrôle qualité du site — `npm run check`
 *
 * Rejoue en une commande les vérifications qu'il faudrait sinon refaire à la main
 * à chaque modification : liens, balises SEO, JSON-LD, cohérence des dates,
 * couverture du sitemap et intégrité de la grille tarifaire.
 *
 * Usage :
 *   node scripts/check-site.js              # échoue (code 1) s'il y a des erreurs
 *   node scripts/check-site.js --warn-only  # n'échoue jamais (mode observation CI)
 *   node scripts/check-site.js --quiet      # n'affiche que les problèmes
 */

const fs = require('fs');
const path = require('path');
const P = require('./lib/pages');

const WARN_ONLY = process.argv.includes('--warn-only');
const QUIET = process.argv.includes('--quiet');

/* ------------------------------------------------------------------ */
/* Collecte des problèmes                                              */
/* ------------------------------------------------------------------ */

const problemes = [];
let controleCourant = '';

const erreur = (fichier, message) =>
  problemes.push({ niveau: 'ERREUR', controle: controleCourant, fichier, message });
const avertir = (fichier, message) =>
  problemes.push({ niveau: 'AVERTISSEMENT', controle: controleCourant, fichier, message });

const controle = (nom, fn) => {
  controleCourant = nom;
  const avant = problemes.length;
  fn();
  const trouves = problemes.length - avant;
  if (!QUIET) {
    const etat = trouves === 0 ? '✓' : '✗';
    console.log(`${etat} ${nom}${trouves ? ` — ${trouves} problème(s)` : ''}`);
  }
};

/* ------------------------------------------------------------------ */
/* Chargement des pages (une seule lecture disque)                     */
/* ------------------------------------------------------------------ */

// includeNoindex : les pages noindex sont exclues du sitemap mais pas des contrôles
const fichiers = P.findHtmlFiles('.', { includeNoindex: true, include404: true });
const pages = fichiers.map(P.readPage);
const parFichier = new Map(pages.map(p => [p.file, p]));
const indexables = pages.filter(p => !p.noindex);
const articles = pages.filter(p => p.file.startsWith('blog/') && p.file !== 'blog/index.html');

/* ------------------------------------------------------------------ */
/* 1 — Liens internes cassés                                           */
/* ------------------------------------------------------------------ */

/** Une cible de lien interne existe-t-elle sur le disque ? */
function cibleExiste(href, depuis) {
  const nu = href.split('#')[0].split('?')[0];
  if (!nu) return true; // ancre pure (#section) → même page

  let base;
  if (nu.startsWith('/')) {
    base = nu.slice(1);
  } else {
    base = path.posix.normalize(path.posix.join(path.posix.dirname(depuis), nu));
  }

  if (base === '' || base.endsWith('/')) base += 'index.html';

  return [base, `${base}.html`, path.posix.join(base, 'index.html')].some(c => fs.existsSync(c));
}

const externe = h => /^(https?:|mailto:|tel:|javascript:|data:)/i.test(h);

controle('Liens internes cassés', () => {
  for (const page of pages) {
    const vus = new Set();
    for (const href of page.links) {
      if (externe(href) || href.startsWith('#') || vus.has(href)) continue;
      vus.add(href);
      if (!cibleExiste(href, page.file)) {
        erreur(page.file, `lien vers « ${href} » : aucune page ni fichier correspondant`);
      }
    }
  }
});

/* ------------------------------------------------------------------ */
/* 2 — Liens internes en .html (convention : URLs propres)             */
/* ------------------------------------------------------------------ */

controle('Liens internes en .html (URLs propres)', () => {
  for (const page of pages) {
    const vus = new Set();
    for (const href of page.links) {
      if (externe(href) || vus.has(href)) continue;
      vus.add(href);
      if (/\.html(#|\?|$)/.test(href)) {
        erreur(
          page.file,
          `lien vers « ${href} » : utiliser l'URL propre (sans .html), sinon Cloudflare ajoute une redirection 308 inutile`
        );
      }
    }
  }
});

/* ------------------------------------------------------------------ */
/* 3 — JSON-LD : validité et règles du projet                          */
/* ------------------------------------------------------------------ */

const ID_BUSINESS = `${P.SITE_URL}/#business`;
const TYPES_BUSINESS = ['LocalBusiness', 'DrivingSchool'];

controle('JSON-LD (validité + règles du projet)', () => {
  for (const page of pages) {
    for (const msg of page.jsonLdErrors) {
      erreur(page.file, `bloc JSON-LD illisible : ${msg}`);
    }

    P.walkJsonLd(page.jsonLd, node => {
      const types = [].concat(node['@type'] || []);

      // L'entité auto-école doit toujours porter l'@id mutualisé
      if (types.some(t => TYPES_BUSINESS.includes(t)) && node.name) {
        if (node['@id'] !== ID_BUSINESS) {
          erreur(
            page.file,
            `bloc ${types.join('/')} : @id vaut « ${node['@id'] || 'absent'} » au lieu de « ${ID_BUSINESS} » (une seule entité pour les moteurs)`
          );
        }
      }

      // mainEntityOfPage se place sur le BlogPosting, jamais dans publisher
      if (types.includes('BlogPosting')) {
        const meop = node.mainEntityOfPage;
        if (!meop) {
          erreur(page.file, 'BlogPosting sans mainEntityOfPage');
        } else if (meop['@id'] && page.canonical && meop['@id'] !== page.canonical) {
          erreur(
            page.file,
            `mainEntityOfPage @id (${meop['@id']}) ≠ canonical (${page.canonical})`
          );
        }
        if (node.publisher && node.publisher.mainEntityOfPage) {
          erreur(page.file, 'mainEntityOfPage placé dans publisher au lieu du BlogPosting');
        }
      }
    });

    // Exactement un bloc de type article par page d'article
    if (articles.includes(page)) {
      let n = 0;
      P.walkJsonLd(page.jsonLd, node => {
        if ([].concat(node['@type'] || []).includes('BlogPosting')) n++;
      });
      if (n !== 1) erreur(page.file, `${n} blocs BlogPosting (la règle est : exactement 1)`);
    }
  }
});

/* ------------------------------------------------------------------ */
/* 4 — Balises obligatoires sur les pages indexables                   */
/* ------------------------------------------------------------------ */

controle('Balises obligatoires (pages indexables)', () => {
  for (const page of indexables) {
    const manque = [];
    if (!page.description) manque.push('meta description');
    if (!page.canonical) manque.push('link canonical');
    if (!page.ogUrl) manque.push('og:url');
    if (!page.ogImage) manque.push('og:image');
    if (!page.ogLocale) manque.push('og:locale');
    if (!page.twitterCard) manque.push('twitter:card');
    if (!page.hasConsent) manque.push('scripts/load-consent.js (bandeau RGPD)');
    if (!page.h1) manque.push('<h1>');
    if (manque.length) erreur(page.file, `balise(s) manquante(s) : ${manque.join(', ')}`);

    if (!/rel="preload"[^>]+dm-sans/.test(page.head)) {
      avertir(page.file, 'pas de preload de la police DM Sans');
    }
  }
});

/* ------------------------------------------------------------------ */
/* 5 — Cohérence canonical / og:url / URL réelle                       */
/* ------------------------------------------------------------------ */

controle('Cohérence canonical ↔ og:url ↔ URL réelle', () => {
  for (const page of indexables) {
    if (page.canonical && page.canonical !== page.url) {
      erreur(page.file, `canonical « ${page.canonical} » ≠ URL réelle « ${page.url} »`);
    }
    if (page.ogUrl && page.canonical && page.ogUrl !== page.canonical) {
      erreur(page.file, `og:url « ${page.ogUrl} » ≠ canonical « ${page.canonical} »`);
    }
  }
});

/* ------------------------------------------------------------------ */
/* 6 — Pages noindex : pas de canonical (signaux contradictoires)      */
/* ------------------------------------------------------------------ */

controle('Pages noindex sans canonical', () => {
  for (const page of pages.filter(p => p.noindex)) {
    // 404.html est noindex,follow et n'a pas vocation à porter de canonical non plus
    if (page.canonical) {
      erreur(
        page.file,
        `page noindex portant un canonical (${page.canonical}) : signaux contradictoires pour Google`
      );
    }
  }
});

/* ------------------------------------------------------------------ */
/* 7 — Articles : cohérence des dates                                  */
/* ------------------------------------------------------------------ */

/** Récupérer datePublished / dateModified du bloc BlogPosting */
function datesJsonLd(page) {
  let res = null;
  P.walkJsonLd(page.jsonLd, node => {
    if ([].concat(node['@type'] || []).includes('BlogPosting')) {
      res = {
        publiee: (node.datePublished || '').slice(0, 10) || null,
        modifiee: (node.dateModified || '').slice(0, 10) || null,
      };
    }
  });
  return res;
}

controle('Articles — dates JSON-LD ↔ Open Graph', () => {
  for (const page of articles) {
    const ld = datesJsonLd(page);
    if (!ld) continue;

    const ogPub = (page.publishedTime || '').slice(0, 10) || null;
    const ogMod = (page.modifiedTime || '').slice(0, 10) || null;

    if (ld.publiee !== ogPub) {
      erreur(page.file, `datePublished JSON-LD (${ld.publiee}) ≠ article:published_time (${ogPub})`);
    }
    if (ld.modifiee !== ogMod) {
      erreur(page.file, `dateModified JSON-LD (${ld.modifiee}) ≠ article:modified_time (${ogMod})`);
    }

    const timeTag = page.html.match(/<time[^>]+datetime="([^"]+)"/);
    if (!timeTag) {
      avertir(page.file, 'date de publication visible sans <time datetime="…">');
    } else if (ld.publiee && timeTag[1].slice(0, 10) !== ld.publiee) {
      avertir(
        page.file,
        `<time datetime="${timeTag[1]}"> ≠ datePublished (${ld.publiee})`
      );
    }
  }
});

/* ------------------------------------------------------------------ */
/* 8 — Hub blog : cartes et dates affichées                            */
/* ------------------------------------------------------------------ */

const MOIS = {
  janvier: 1, février: 2, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6,
  juillet: 7, août: 8, aout: 8, septembre: 9, octobre: 10, novembre: 11, décembre: 12, decembre: 12,
};

controle('Hub blog — cartes et dates affichées', () => {
  const hub = parFichier.get('blog/index.html');
  if (!hub) return;

  const cartes = [...hub.html.matchAll(/<article class="article-card[^"]*"[^>]*>([\s\S]*?)<\/article>/g)]
    .map(m => m[1]);

  const slugsCartes = new Set();

  for (const carte of cartes) {
    const lien = carte.match(/href="\/blog\/([^"#]+)"/);
    if (!lien) continue;
    const slug = lien[1].replace(/\/$/, '');
    slugsCartes.add(slug);

    const article = parFichier.get(`blog/${slug}.html`);
    if (!article) {
      erreur('blog/index.html', `carte pointant vers /blog/${slug} : cet article n'existe pas`);
      continue;
    }

    const dateAffichee = carte.match(/class="article-date"[^>]*>([^<]+)</);
    if (!dateAffichee) continue;

    const m = dateAffichee[1].trim().match(/(\d{1,2})\s+(\S+)\s+(\d{4})/);
    if (!m) continue;

    const mois = MOIS[m[2].toLowerCase()];
    if (!mois) continue;

    const affichee = `${m[3]}-${String(mois).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`;
    const reelle = (article.publishedTime || '').slice(0, 10);

    if (reelle && affichee !== reelle) {
      erreur(
        'blog/index.html',
        `carte « ${slug} » : date affichée ${affichee} ≠ date de publication de l'article (${reelle})`
      );
    }
  }

  for (const article of articles) {
    const slug = path.basename(article.file, '.html');
    if (!slugsCartes.has(slug)) {
      erreur('blog/index.html', `l'article « ${slug} » n'a aucune carte sur le hub`);
    }
  }
});

/* ------------------------------------------------------------------ */
/* 9 — Sitemap et pages orphelines                                     */
/* ------------------------------------------------------------------ */

controle('Sitemap et pages orphelines', () => {
  if (!fs.existsSync('sitemap.xml')) {
    erreur('sitemap.xml', 'fichier absent — lancer `npm run sitemap`');
    return;
  }

  const xml = fs.readFileSync('sitemap.xml', 'utf8');
  const dansSitemap = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
  const attendues = new Set(P.findHtmlFiles('.').map(P.filePathToUrl));

  for (const url of attendues) {
    if (!dansSitemap.has(url)) {
      erreur('sitemap.xml', `${url} est indexable mais absente du sitemap — lancer \`npm run sitemap\``);
    }
  }
  for (const url of dansSitemap) {
    if (!attendues.has(url)) {
      erreur('sitemap.xml', `${url} est dans le sitemap mais n'est plus une page indexable`);
    }
  }

  // Pages orphelines : aucune autre page ne pointe vers elles
  const cibles = new Set();
  for (const page of pages) {
    for (const href of page.links) {
      if (externe(href) || !href.startsWith('/')) continue;
      cibles.add(href.split('#')[0].split('?')[0].replace(/\/$/, '') || '/');
    }
  }
  // reservation.html et devis.html sont volontairement orphelines (pages pas encore lancées)
  const orphelinesTolerees = new Set(['/reservation', '/devis']);

  for (const page of indexables) {
    const cle = page.path.replace(/\/$/, '') || '/';
    if (!cibles.has(cle) && !orphelinesTolerees.has(cle)) {
      erreur(page.file, `page indexable sans aucun lien entrant (orpheline) : ${page.path}`);
    }
  }
});

/* ------------------------------------------------------------------ */
/* 10 — Tarifs                                                         */
/* ------------------------------------------------------------------ */

/**
 * Normaliser un texte pour y chercher des montants.
 * Gère les 9 formats d'écriture du site : « 1 055€ », « 1&nbsp;055&nbsp;€ »,
 * « "1055" », « 1375€ », « 1 000,00 € »…
 */
function normaliserMontants(texte) {
  return texte
    .replace(/&nbsp;|&#160;|&#xa0;| | | /gi, ' ')
    .replace(/(\d)[ ](?=\d{3}(?!\d))/g, '$1'); // séparateur de milliers → collé
}

/** Le montant apparaît-il comme nombre autonome dans ce texte normalisé ? */
function contientMontant(texteNormalise, montant) {
  return new RegExp(`(?<![\\d,.])${montant}(?![\\d])`).test(texteNormalise);
}

controle('Tarifs — invariants, présence et reliquats', () => {
  const ref = JSON.parse(fs.readFileSync('data/tarifs.json', 'utf8'));

  // 10a — Les additions de la grille tombent juste
  for (const [cle, f] of Object.entries(ref.formules)) {
    const somme =
      f.dossier + f.code + f.evaluation + f.conduite + f.examen +
      (f.rdvPrealable || 0) + (f.rdvPedagogiques || 0);

    if (somme !== f.total) {
      erreur('data/tarifs.json', `${cle} : le détail fait ${somme} € mais le total affiché est ${f.total} €`);
    }
    if (f.heuresIncluses * f.heureSup !== f.conduite) {
      erreur(
        'data/tarifs.json',
        `${cle} : ${f.heuresIncluses} h × ${f.heureSup} €/h = ${f.heuresIncluses * f.heureSup} €, or la conduite incluse est annoncée à ${f.conduite} €`
      );
    }
  }

  const aac = ref.formules.aac;
  if (aac.rdvPrealable !== 2 * aac.heureSup) {
    erreur('data/tarifs.json', `AAC : le RDV préalable (2 h) devrait valoir ${2 * aac.heureSup} €, pas ${aac.rdvPrealable} €`);
  }
  if (aac.rdvPedagogiques !== 6 * aac.heureSup) {
    erreur('data/tarifs.json', `AAC : les 2 RDV pédagogiques (2 × 3 h) devraient valoir ${6 * aac.heureSup} €, pas ${aac.rdvPedagogiques} €`);
  }
  if (ref.derives.sessionRdv.valeur * 2 !== aac.rdvPedagogiques) {
    erreur('data/tarifs.json', 'la session de RDV pédagogique ne vaut pas la moitié du poste « 2 RDV pédagogiques »');
  }
  if (ref.derives.rdvAgrege.valeur !== aac.rdvPrealable + aac.rdvPedagogiques) {
    erreur('data/tarifs.json', 'le RDV agrégé de devis.html ≠ RDV préalable + RDV pédagogiques');
  }

  // Textes du site où chercher des montants (HTML + llms.txt + README)
  const aScanner = [
    ...P.findHtmlFiles('.', { includeNoindex: true, include404: true }).map(P.normalize),
    'llms.txt',
    'README.md',
  ].filter(f => fs.existsSync(f));

  const textes = new Map(
    aScanner.map(f => [f, normaliserMontants(fs.readFileSync(f, 'utf8'))])
  );

  // 10b — Chaque total est présent dans tous les fichiers attendus
  for (const [cle, attendus] of Object.entries(ref.presence)) {
    if (cle.startsWith('_')) continue;
    const [formule, champ] = cle.split('.');
    const montant = ref.formules[formule][champ];

    for (const fichier of attendus) {
      const texte = textes.get(fichier);
      if (texte === undefined) {
        avertir('data/tarifs.json', `presence.${cle} cite « ${fichier} », qui n'existe plus`);
        continue;
      }
      if (!contientMontant(texte, montant)) {
        erreur(fichier, `le tarif ${montant} € (${cle}) devrait figurer ici et n'y est pas — occurrence oubliée ?`);
      }
    }

    for (const [fichier, texte] of textes) {
      if (attendus.includes(fichier)) continue;
      if (contientMontant(texte, montant)) {
        avertir(
          fichier,
          `contient ${montant} € (${cle}) sans être listé dans data/tarifs.json → presence.${cle} : nouvelle occurrence à déclarer`
        );
      }
    }
  }

  // 10c — Aucun reliquat d'une grille précédente
  const interdites = new Set(Object.keys(ref.zonesInterdites).filter(k => !k.startsWith('_')));

  for (const grille of ref.grillesPrecedentes) {
    for (const [fichier, texte] of textes) {
      if (interdites.has(fichier)) continue; // amendes, tarifs d'État, prix concurrents…
      for (const montant of grille.montantsDisparus) {
        if (new RegExp(`(?<![\\d,.])${montant}\\s*(&nbsp;|\\s)*€`).test(texte)) {
          erreur(
            fichier,
            `montant ${montant} € : reliquat de la grille du ${grille.enVigueurDu}, remplacée le ${ref.enVigueurDepuis}`
          );
        }
      }
    }
  }
});

/* ------------------------------------------------------------------ */
/* Rapport                                                             */
/* ------------------------------------------------------------------ */

const erreurs = problemes.filter(p => p.niveau === 'ERREUR');
const avertissements = problemes.filter(p => p.niveau === 'AVERTISSEMENT');

function afficher(liste, titre, icone) {
  if (!liste.length) return;
  console.log(`\n${icone} ${titre} (${liste.length})`);
  let dernierControle = null;
  for (const p of liste) {
    if (p.controle !== dernierControle) {
      console.log(`\n  ▸ ${p.controle}`);
      dernierControle = p.controle;
    }
    console.log(`    ${p.fichier}`);
    console.log(`      ${p.message}`);
  }
}

console.log(`\n${'─'.repeat(70)}`);
console.log(`${pages.length} pages analysées`);

afficher(erreurs, 'ERREURS', '❌');
afficher(avertissements, 'AVERTISSEMENTS', '⚠️');

if (!erreurs.length && !avertissements.length) {
  console.log('\n✅ Aucun problème détecté.');
} else {
  console.log(`\n${erreurs.length} erreur(s), ${avertissements.length} avertissement(s).`);
}
console.log(`${'─'.repeat(70)}\n`);

// Mode observation : on affiche tout mais on ne bloque jamais la CI.
// Pour passer le contrôle en bloquant, retirer --warn-only dans
// .github/workflows/check-site.yml (une seule ligne à modifier).
if (erreurs.length && !WARN_ONLY) process.exit(1);
