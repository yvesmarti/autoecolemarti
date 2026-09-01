#!/usr/bin/env node

/**
 * Captures d'écran des pages — `npm run shot -- /faq /formules/`
 *
 * Sert à comparer le rendu avant / après une modification de style, en desktop
 * et en mobile. Les captures atterrissent dans .captures/ (ignoré par git).
 *
 * Prérequis : `npm install` (playwright est en devDependencies).
 * Le serveur local est démarré automatiquement, pas besoin de `npm run serve`.
 *
 * Options :
 *   --etiquette=avant   préfixe les fichiers (pour comparer deux états)
 *   --entier            capture la page entière et pas seulement le premier écran
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const DOSSIER = '.captures';
const PORT = 8099;

const FORMATS = [
  { nom: 'desktop', viewport: { width: 1280, height: 900 } },
  { nom: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 },
];

const args = process.argv.slice(2);
const options = args.filter(a => a.startsWith('--'));
const cibles = args.filter(a => !a.startsWith('--'));

const etiquette = (options.find(o => o.startsWith('--etiquette=')) || '').split('=')[1] || '';
const pleinePage = options.includes('--entier');

if (!cibles.length) {
  console.error('Usage : npm run shot -- /faq /formules/ [--etiquette=avant] [--entier]');
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('❌ playwright n\'est pas installé. Lancer `npm install` une première fois.');
  process.exit(1);
}

/**
 * Lancer Chromium.
 *
 * Playwright télécharge normalement son propre navigateur (`npx playwright install`).
 * Sur les machines où un Chromium est déjà fourni par le système ou par
 * l'environnement (variable PLAYWRIGHT_BROWSERS_PATH), la version attendue par
 * Playwright et celle réellement présente peuvent différer : on retombe alors sur
 * le binaire trouvé sur le disque plutôt que d'échouer.
 */
async function lancerNavigateur() {
  try {
    return await chromium.launch();
  } catch (err) {
    const binaire = trouverChromium();
    if (!binaire) {
      console.error(
        "❌ Aucun Chromium utilisable. Lancer une fois : npx playwright install chromium\n" +
        "   (ou définir CHROMIUM_PATH vers un binaire Chrome/Chromium existant)"
      );
      throw err;
    }
    console.log(`ℹ️  Chromium de Playwright absent — utilisation de ${binaire}`);
    return chromium.launch({ executablePath: binaire });
  }
}

/** Chercher un binaire Chromium utilisable sur la machine */
function trouverChromium() {
  const candidats = [];

  if (process.env.CHROMIUM_PATH) candidats.push(process.env.CHROMIUM_PATH);

  const racine = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (racine && fs.existsSync(racine)) {
    for (const dossier of fs.readdirSync(racine)) {
      if (!dossier.startsWith('chromium')) continue;
      candidats.push(
        path.join(racine, dossier, 'chrome-linux', 'chrome'),
        path.join(racine, dossier, 'chrome-linux', 'headless_shell'),
        path.join(racine, dossier, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium')
      );
    }
  }

  candidats.push(
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  );

  return candidats.find(c => {
    try {
      return fs.existsSync(c) && fs.statSync(c).isFile();
    } catch {
      return false;
    }
  }) || null;
}

/** Nom de fichier lisible à partir du chemin d'URL */
const nommer = (cible, format) => {
  const base = cible.replace(/^\//, '').replace(/\/$/, '') || 'accueil';
  const slug = base.replace(/\//g, '-');
  return `${etiquette ? `${etiquette}-` : ''}${slug}-${format}.png`;
};

(async () => {
  fs.mkdirSync(DOSSIER, { recursive: true });

  const serveur = spawn('node', [path.join(__dirname, 'serve.js'), String(PORT)], {
    stdio: 'ignore',
    cwd: process.cwd(),
  });

  // Laisser le serveur se lier au port avant la première requête
  await new Promise(r => setTimeout(r, 400));

  const navigateur = await lancerNavigateur();

  try {
    for (const format of FORMATS) {
      const contexte = await navigateur.newContext({
        viewport: format.viewport,
        isMobile: format.isMobile || false,
        deviceScaleFactor: format.deviceScaleFactor || 1,
        hasTouch: format.isMobile || false,
      });
      const page = await contexte.newPage();

      for (const cible of cibles) {
        const url = `http://localhost:${PORT}${cible.startsWith('/') ? cible : `/${cible}`}`;
        await page.goto(url, { waitUntil: 'networkidle' });

        // Déclencher les animations d'apparition au scroll avant de capturer
        await page.evaluate(() => {
          document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(250);

        const fichier = path.join(DOSSIER, nommer(cible, format.nom));
        await page.screenshot({ path: fichier, fullPage: pleinePage });
        console.log(`📸 ${fichier}`);
      }

      await contexte.close();
    }
  } finally {
    await navigateur.close();
    serveur.kill();
  }

  console.log(`\n✅ Captures dans ${DOSSIER}/`);
})().catch(err => {
  console.error('❌ Erreur:', err.message);
  process.exit(1);
});
