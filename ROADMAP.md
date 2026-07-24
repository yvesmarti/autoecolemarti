# Roadmap & Idées de développement

> Ce fichier recense les développements souhaités mais pas encore planifiés.
> Mis à jour au fil des idées. À consulter avant tout nouveau développement.

---

## Priorité haute (à faire bientôt)

### SEO — Dette technique (revue de code, juillet 2026)

- **Workflow `Generate Sitemap` désactivé** : état `disabled_manually` depuis le 2026-04-11,
  dernier run le **2026-04-10** (~40 commits depuis sans régénération). À réactiver
  (Actions → Generate Sitemap → Enable), ou à assumer comme manuel — auquel cas documenter
  `npm run sitemap` comme étape obligatoire de publication dans `CLAUDE.md`, qui affirme
  aujourd'hui à tort « auto-regenerates sitemap.xml on HTML push ».
- **`sitemap.xml` et `llms.txt` obsolètes** (conséquence directe) :
  `blog/permis-lyceen-etudiant-bayonne` est absent des deux (31 URLs au sitemap pour
  32 pages indexables). Les `lastmod` sont figés aux 08–09/07 alors que `espace-eleves`,
  `auto-ecole-anglet`, `auto-ecole-biarritz`, `blog/index` et `index` ont bougé depuis.
- **Article lycéen/étudiant quasi-orphelin** : 1 seul lien entrant (le hub blog), contre une
  médiane de ~7 pour les autres articles. Cibles naturelles de liens contextuels :
  `blog/combien-coute-permis-conduire-bayonne`, `blog/aac-apprentissage-anticipe-conduite`,
  `formules/index.html`, `faq.html`.

### SEO — Actions hors-site (à faire par Yves)
- **Google Business Profile** : ajouter des photos (locaux, véhicules, équipe), publier des posts
  réguliers, répondre aux avis. Continuer à solliciter les avis (lien g.page déjà en footer).
- **Google Search Console** : vérifier la propriété du domaine, soumettre `sitemap.xml`,
  surveiller la couverture d'indexation et les requêtes.
- **Annuaires locaux** : inscrire l'école avec un NAP identique au site (PagesJaunes,
  Vroomvroom.fr, annuaires Bayonne / Pays basque).
- **Backlinks locaux** : partenaires, presse locale, associations.

---

## Priorité moyenne (à faire quand possible)

### SEO — Données structurées (revue de code, juillet 2026)

- **`mainEntityOfPage` mal imbriqué dans les 21 articles** : le champ est placé *à l'intérieur*
  de l'objet `publisher` au lieu du niveau `BlogPosting` (ex.
  `blog/aac-apprentissage-anticipe-conduite.html:47-58`). Résultat : aucun `BlogPosting` ne
  déclare réellement son `mainEntityOfPage`, et le `@id` pointe vers la home au lieu de
  l'article. Correction mécanique sur 21 fichiers.
- **Aucun `@id` dans les 60 blocs JSON-LD du site.** Conséquence pour le SEO local : les 3 blocs
  `LocalBusiness`/`DrivingSchool` (`index.html`, `auto-ecole-anglet`, `auto-ecole-biarritz`) —
  mêmes `name`, `address`, `geo`, `telephone` — sont lus comme **trois établissements
  distincts**. Un `@id` commun (`https://autoecolemarti.fr/#business`) les consoliderait.
- **`image` et `logo` du `LocalBusiness` pointent sur `favicon.ico.png`** (`index.html:34-38`),
  un carré 180×180. Google attend une vraie photo (~1200 px). À défaut de photo réelle,
  `og-image.png` (1200×630) serait déjà nettement mieux. → lié à « Images réelles » ci-dessous.
- **`sameAs` limité à une entrée** (`https://g.page/r/...`). Ajouter les profils réels quand ils
  existent (Facebook, Instagram, PagesJaunes) : complément on-site des actions hors-site.
- **8 titles > 60 caractères** (tronqués en SERP) : `blog/boite-automatique-ou-manuelle` (64),
  `blog/infractions-code-route` (63), `blog/permis-lyceen-etudiant-bayonne` (63),
  `blog/angles-morts` (62), `blog/distances-securite` (62),
  `blog/reussir-code-route-premier-coup` (62), `auto-ecole-biarritz` (61),
  `blog/dangers-alcool` (61).
- **`blog/quiz-sanctions.html:442`** : libellé « Mis à jour — Mars 2026 » alors que le
  `datetime` porte la date de *publication* (`2026-03-01`) et que le JSON-LD annonce
  `dateModified: 2026-05-28`. Seule page du site dans ce cas.
- **URL d'accueil incohérente en forme** : canonical `https://autoecolemarti.fr/` (avec slash)
  mais tout le JSON-LD (`LocalBusiness.url`, `WebSite.url`, position 1 des `BreadcrumbList`,
  tous les `publisher.url`) la référence *sans* slash. Cosmétique, gratuit à aligner.

### SEO — Fraîcheur du contenu
- Mettre à jour 2-3 anciens articles de blog par trimestre (tarifs, réglementation) ;
  le champ `dateModified` des schémas BlogPosting valorise ces mises à jour.
- Envisager un auteur nommé (moniteur) sur les articles pour le signal E-E-A-T.

### Images réelles
- Le site n'a aucune photo : ajouter des images des locaux, véhicules et de l'équipe
  (hero homepage, pages formules, couvertures blog) avec `alt`, `loading="lazy"` et WebP.
- Remplacer à terme `og-image.png` (visuel typographique généré) par une vraie photo de marque.

---

## Idées / Réflexions (pas encore priorisées)

- Minification CSS (~105 KB non minifiés) — nécessiterait un step de build, faible priorité
  pour un site déjà léger.
- CPF / permis accéléré / permis moto : **non proposés** par l'école (confirmé juin 2026) —
  ne pas créer de contenu sur ces sujets.
- ~~**Externaliser le CSS inline commun** vers une feuille partagée cacheable~~ → **fait en
  version ciblée** (juillet 2026, voir « Développements réalisés »). Bilan mesuré : le « shell »
  n'était pas dupliqué à l'identique (3 resets, `:root` de 6 à 20 variables, 3+ navbars, 5 footers,
  et `reservation`/`mentions-legales` sur des systèmes de design séparés). La mutualisation a donc
  été limitée à la famille génuinement quasi-identique (6 pages formules détail + pages locales) via
  `css/base.css`. Gain perf mesuré ≈ **neutre** (les pages chargeaient déjà `fonts.css` + `nav-mobile.css`
  en externe ; le gros du CSS inline est spécifique-page) — bénéfice réel = **maintenabilité** (navbar/
  footer/reset édités à un seul endroit). Pas d'extension aux autres pages prévue (design distinct).
- **`espace-eleves.html` : indexable ou `noindex` ?** Page en priorité 0.8 au sitemap, sans
  `noindex`, alors que son contenu est présenté comme réservé « après votre inscription » et
  que 2 de ses 4 cartes sont encore des placeholders. Elle capte pourtant 31 liens internes
  (footers) — c'est la 2e page la plus maillée du site. Arbitrage : la remplir, ou la passer
  en `noindex` jusqu'au lancement des accès.
- **Différenciation anti-cannibalisation** : « prix du permis à Bayonne » est visé à la fois
  par `formules/index.html` (transactionnel) et `blog/combien-coute-permis-conduire-bayonne.html`
  (informationnel) ; idem « conduite accompagnée » entre la page formule AAC et 2 articles.
  Si les positions Google se cannibalisent, différencier davantage les angles et renforcer
  le maillage article → page formule.

## Hors SEO — à trancher (revue de code, juillet 2026)

Constats relevés au passage lors de la revue SEO, consignés ici pour ne pas les perdre.
Aucun n'a été corrigé.

- **Skip-link inopérant sur `index.html`** (page la plus visitée). Le handler « smooth scroll »
  de `index.html:1177-1184` capture `a[href^="#"]`, donc aussi
  `<a class="skip-link" href="#main-content">` ; son `e.preventDefault()` supprime le
  déplacement natif du focus : la page défile mais le focus clavier reste sur le lien.
  À noter : `scripts/article.js` gère correctement `prefers-reduced-motion`, ce handler non.
- **CTA « S'inscrire » de la navbar sans `href`** — `index.html:226` :
  `<a data-email="…" class="nav-cta">S'inscrire</a>`. Un `<a>` sans `href` n'est ni focusable
  au clavier ni annoncé comme lien ; le `href` n'est injecté qu'après `email-decoder.js`, qui
  n'est pas chargé sur `merci.html` ni `blog/fatigue-volant.html` (CTA mort sur ces 2 pages).
- **`<main>` imbriqué** dans `blog/infractions-code-route.html` (l. 364 et 393) et
  `blog/quiz-sanctions.html` (l. 424 et 449) — HTML invalide, landmark dupliqué.
- **Aucun `integrity=` (SRI)** sur les 3 dépendances CDN : EmailJS (`index.html:1406`,
  version flottante `@4`), Supabase (`reservation.html:16`), PDF.js (3 pages formules).
  EmailJS est chargé sur **chaque** visite de l'accueil pour un formulaire situé en bas de
  page — le motif de lazy-load de `scripts/load-consent.js` s'y appliquerait directement.
  `CLAUDE.md` et `STYLE_GUIDE.md` annoncent par ailleurs « zéro dépendance externe ».
- **Duplication CSS résiduelle** : ~1 400 lignes de CSS inline relèvent du shell partagé, dont
  161 lignes strictement identiques entre `devis.html` et `formules/index.html`. La note de
  `CLAUDE.md` classant ces deux pages en « systèmes de design distincts » est contredite par la
  mesure. Le blog, lui, est exemplaire (0 duplication de shell).
- **Dérive documentaire** : `CLAUDE.md` liste 20 articles (il y en a 21) et omet `devis.html`
  de l'arborescence ; `STYLE_GUIDE.md` §8 ignore `css/base.css` et `css/nav-mobile.css` et se
  date de « mars 2026 ».

---

## Décisions actées (audit SEO — juillet 2026)

- **Balisage avis conservé tel quel** : `AggregateRating`/`Review` en JSON-LD sur la homepage
  et les pages Anglet/Biarritz. Noté : Google ignore généralement les avis « self-serving »
  hébergés sur le site de l'entreprise (guidelines 2019+) ; les avis Google Business restent
  la référence. Décision Yves : ne pas y toucher.
- **`reservation.html` et `devis.html` volontairement orphelines** (aucun lien entrant,
  noindex, hors sitemap) : pages pas encore lancées. Le jour du lancement : les lier depuis
  la nav/footer/CTA et retirer le noindex si indexation souhaitée.

---

## Développements réalisés

### Mutualisation du shell CSS (`css/base.css`) — juillet 2026
- Création de `css/base.css` (reset, `:root` cœur, navbar desktop + dropdown + hamburger, footer,
  skip-link/`:focus-visible`) extrait à l'identique du canonique Anglet.
- 6 pages migrées (retrait du shell inline, ajout du `<link>`, conservation inline du spécifique-page
  + variables `:root` propres + overrides d'accent nav) : `auto-ecole-anglet`, `auto-ecole-biarritz`,
  `espace-eleves`, `formules/conduite-accompagnee`, `formules/permis-b-manuel`, `formules/permis-b-automatique`.
  ~649 lignes de CSS dupliqué supprimées, centralisées dans une feuille de ~120 lignes.
- Ordre de chargement conservé : `fonts.css` → `base.css` → `<style>` inline → `nav-mobile.css` → `nav.js`.
- Non-régression visuelle vérifiée au pixel près (captures desktop 1280 + mobile 390, avant/après) :
  rendu identique sur les 6 pages, hors artefact de capture headless sur le menu déroulant survolé.
- Documentation `css/nav-mobile.css` (existante mais non répertoriée) ajoutée à CLAUDE.md au passage.

### Pages locales Anglet & Biarritz (SEO local) — juin 2026
- Création de `auto-ecole-anglet.html` et `auto-ecole-biarritz.html` : pages d'atterrissage
  locales (schémas `DrivingSchool` + `BreadcrumbList` + `FAQPage`, contenu différencié, mini-FAQ).
- Maillage : liens contextuels depuis l'article BAB, liens footer de la homepage, liens croisés
  entre les deux pages ; ajout à `llms.txt` et règle de priorité 0.8 dans `generate-sitemap.js`.

### Optimisations SEO techniques — juin 2026
- Image OG de marque (`og-image.png`, 1200×630) + balises `og:image`, `og:locale` et
  Twitter Cards sur toutes les pages indexables ; `og:url` ajouté aux articles qui n'en avaient pas.
- Page `404.html` personnalisée (noindex, design du site, liens de secours).
- `espace-eleves.html` : canonical sans `.html`, réintégrée au sitemap, liens footer ajoutés
  (index, FAQ, blog, formules) — page désorphelinée.
- `dateModified` + `<time datetime>` sur les 21 articles de blog (BreadcrumbList ajouté à
  l'article tarifs + hub blog ; les autres pages en avaient déjà).
- Schéma `Course` enrichi sur les 3 pages formules (`telephone`, `category: Paid`,
  `inLanguage`, `hasCourseInstance` avec lieu et volume horaire).
- `defer` sur le script Supabase de `reservation.html` (init déplacée au `DOMContentLoaded`).

### Page "Espace Élèves" (`espace-eleves.html`) — juin 2026
- Page publique de ressources post-inscription
- 4 cartes : plateforme code, application mobile, documents PDF, contacts
- Liens vers la plateforme et l'app à compléter quand Yves fournit les URLs
- ~~Lien dans la navigation à ajouter ultérieurement~~ → liens footer ajoutés (juin 2026)
