# CLAUDE.md — Mémoire du projet Auto-École Marti

> Lu automatiquement au début de chaque session. Ce fichier contient les **règles** et les
> **pièges** — ce qui ne se devine pas en lisant le code. L'**inventaire** du site (liste des
> pages, des articles, des feuilles de style) vit dans `SITE.md`, régénéré automatiquement.

## Où trouver quoi

| Besoin | Fichier | Nature |
|---|---|---|
| Inventaire des pages, articles, CSS | **`SITE.md`** | 🤖 généré — à lire au besoin, jamais à éditer |
| Couleurs, typo, composants, thèmes de blog | **`STYLE_GUIDE.md`** | manuel — fait autorité sur le design |
| Grille tarifaire et zones interdites | **`data/tarifs.json`** | manuel — fait autorité sur les prix |
| Squelette d'un nouvel article | **`.claude/templates/article-blog.html`** | gabarit + checklist |

## Commandes

```bash
npm run check     # 10 contrôles qualité (liens, SEO, JSON-LD, dates, sitemap, tarifs)
npm run docs      # régénère SITE.md
npm run sitemap   # régénère sitemap.xml
npm run serve     # aperçu local sur http://localhost:8080 (URLs propres comme Cloudflare)
npm run shot -- / /faq --etiquette=avant   # captures desktop + mobile dans .captures/
```

**`npm run check` avant chaque commit.** Il attrape ce qu'une relecture humaine laisse passer :
liens cassés, balises manquantes, dates désynchronisées entre le hub blog et les articles,
tarifs oubliés lors d'une bascule. Il tourne aussi en CI à chaque push, en **mode alerte**
(il n'échoue jamais pour l'instant — voir `.github/workflows/check-site.yml`).

---

## Le projet

Site d'une auto-école bayonnaise en activité depuis 1962.

- Domaine : `autoecolemarti.fr` — **Cloudflare Pages**, déploiement automatique à chaque push
  sur `main`. Domaine, `www` → apex et « Always Use HTTPS » sont réglés dans le tableau de bord
  Cloudflare, **pas dans le dépôt** (donc pas de fichier `CNAME`).
- SIRET 382 930 188 00018 · 13 rue Marengo, 64100 Bayonne · 05 59 59 12 60
- Google Analytics : `G-DEK5H3Z9DR` (chargé uniquement après consentement)
- `10d209545e74459dbed8aadfce8ec9fb.txt` à la racine : jeton de vérification d'un service
  externe — **ne pas supprimer**, même s'il ressemble à un fichier oublié.

**Pile technique** : HTML/CSS/JS purs, aucun framework, aucune étape de build pour le site.
Node n'est utilisé que pour l'outillage (`scripts/`) et Playwright n'est qu'une dépendance de
développement pour les captures — le site déployé reste 100 % statique.

Exceptions : Supabase (`reservation.html` uniquement), PDF.js 3.11.174 via CDN (visionneuse des
plaquettes sur les pages formules), tarteaucitron (RGPD, hébergé en local).

---

## Conventions à ne pas enfreindre

### Liens internes — jamais de `.html`
Toujours l'URL propre, en chemin absolu : `/faq`, `/formules/conduite-accompagnee`,
`/blog/<slug>`, `/blog/` et `/` pour les index. Les URLs absolues (JSON-LD, redirections JS)
suivent la même règle. Cloudflare redirige `/page.html` en **308** ; pointer directement la
forme propre évite ce détour et concentre le jus SEO sur l'URL canonique. Le fichier
`_redirects` (39 règles 301) couvre les mêmes paires par sécurité. → contrôlé par `npm run check`

### Adresses e-mail — jamais en clair
Pas de `mailto:` dans le HTML. Toujours l'obfuscation par entités :
```html
<a data-email="&#97;&#117;&#116;&#111;..." data-subject="Sujet" data-show-email="true">…</a>
```
Le décodage est mutualisé dans `/scripts/email-decoder.js`, à inclure en fin de page.

### Polices — jamais de CDN Google
Toutes les polices sont auto-hébergées en WOFF2 dans `fonts/` (conformité RGPD). Chaque page
précharge `dm-sans-latin-400-normal.woff2` et `playfair-display-latin-400-normal.woff2`.

### Balises obligatoires sur toute page indexable
`<meta name="description">`, `<link rel="canonical">`, `og:url` (identique au canonical),
`og:image` → `/og-image.png` (1200×630), `og:locale=fr_FR`, Twitter Card
`summary_large_image`, et `<script defer src="/scripts/load-consent.js">`.
Les articles ajoutent `og:type=article` + `article:published_time` / `article:modified_time`.
→ contrôlé par `npm run check`

### Pages `noindex` — pas de canonical
`merci`, `devis`, `reservation`, `mentions-legales` sont en `noindex, nofollow` et **ne portent
volontairement aucun canonical** (signaux contradictoires). `404.html` est en `noindex, follow`.
→ contrôlé par `npm run check`

### Dates d'article — trois endroits à synchroniser
`datePublished`/`dateModified` du JSON-LD, `article:published_time`/`article:modified_time`, et
le `<time datetime>` visible. La carte de l'article sur `blog/index.html` doit afficher la même
date de publication. Mettre à jour `dateModified` **et** `article:modified_time` à chaque
modification de fond. → contrôlé par `npm run check`

---

## JSON-LD

Schémas en place : `LocalBusiness`/`DrivingSchool` + `Review`/`AggregateRating` (accueil),
`FAQPage` + `BreadcrumbList` (FAQ, pages locales), `Course` + `hasCourseInstance` (formules
détail), `ItemList` (hub formules), `CollectionPage` (hub blog), `BlogPosting` (articles),
`Quiz`/`LearningResource` (quiz).

**Une seule entité, un seul `@id`.** Toute référence à l'auto-école porte
`https://autoecolemarti.fr/#business` : les blocs `LocalBusiness`/`DrivingSchool` de l'accueil
et des 3 pages locales, les `publisher`/`author` des articles et du hub blog, les `provider`
des pages formules et du quiz. C'est ce qui consolide tout le site en **une seule entreprise**
aux yeux des moteurs. Leur `url` vaut `https://autoecolemarti.fr` (l'URL de l'entité, pas celle
de la page). Seule l'accueil porte le `mainEntityOfPage` de l'entité ; le bloc `WebSite` de
l'accueil porte `@id: …/#website` + `publisher: { "@id": …/#business" }`.

**`mainEntityOfPage` se place sur le `BlogPosting`**, jamais dans `publisher`, avec un `@id`
égal au canonical de l'article. **Exactement un bloc `BlogPosting` par article.**

Téléphone toujours en E.164 : `+33559591260`.

→ les trois règles en gras sont contrôlées par `npm run check`

---

## RGPD — tarteaucitron

Le bandeau de consentement est **chargé en différé** pour ne pas bloquer l'affichage.
Sur une nouvelle page, inclure **uniquement** ceci dans le `<head>` :

```html
<script defer src="/scripts/load-consent.js"></script>
```

`load-consent.js` injecte ensuite lui-même, à l'inactivité (`requestIdleCallback`) ou à la
première interaction : les CSS (`vendor/tarteaucitron/tarteaucitron.css` puis
`css/tarteaucitron-custom.css`), puis `tarteaucitron.js` → `lang/tarteaucitron.fr.js` →
`scripts/consent.js`.

⚠️ **Ne jamais remettre ces scripts ni ces `<link>` CSS en direct dans le `<head>`** : ce serait
bloquant au rendu. Pour un déclenchement explicite (bouton « Gérer mes cookies » des mentions
légales), utiliser `window.loadConsent(callback)`.

Configuration (`scripts/consent.js`) : `highPrivacy: true` (mode strict CNIL),
`privacyUrl: "/mentions-legales#cookies"`, Google Analytics chargé seulement après acceptation.

---

## Tarifs

**`data/tarifs.json` fait autorité.** Les prix ne sont pas centralisés dans le site : ils sont
écrits en dur dans une vingtaine de fichiers, sous **9 formats d'écriture** (`1 055€`,
`1&nbsp;055&nbsp;€`, `"1055"`, `1375€` sans espace, `1 000,00 €`, `50€/h`…), à la fois dans le
contenu visible, les `<title>`, les `<meta>`, des commentaires HTML et le `DEVIS_CONFIG` de
`devis.html`.

**Procédure de bascule** : mettre à jour `data/tarifs.json` **d'abord**, puis les pages, puis
`npm run check` — il vérifie les additions, signale tout fichier où un montant attendu manque,
et tout reliquat de l'ancienne grille.

### Pièges (tous rencontrés au moins une fois)

1. 🔴 **Un même nombre peut changer de sens en cours d'opération.** Lors de la bascule du
   31/08/2026, `50,00 €` était à la fois l'ancien pack code *et* le nouveau tarif horaire : dans
   un fichier à moitié migré, un `50,00 €` restant était indécidable. Traiter en premier le
   poste dont l'ancienne valeur risque de coïncider avec une nouvelle valeur d'un autre poste,
   puis descendre ligne par ligne. **Jamais de rechercher/remplacer global.**
2. **Un même montant recouvre plusieurs postes** : `50 €` désigne l'heure supplémentaire,
   l'accompagnement examen, l'évaluation de départ et l'option 2ᵉ passage. Vérifier le contexte
   de chaque occurrence.
3. **Un total qui change de nombre de chiffres** (`967` → `1 055`) demande d'ajouter le
   séparateur de milliers dans le format déjà employé par le fichier, puis de contrôler
   visuellement que les conteneurs ne débordent pas (`.formation-price`, `.shortcut-price`,
   `.result-price-display`, `.price-tag`, `.total-price`) — `npm run shot` sert exactement à ça.
4. **Toute réponse de FAQ existe en double** : une fois en JSON-LD, une fois en HTML visible
   (`faq.html`, les 3 pages locales, 2 articles). Modifier une seule des deux crée une
   incohérence entre la page et le résultat Google.
5. **Les prix sont dans les `<title>` et `<meta description>`** des pages formules → visibles
   directement dans Google.
6. **Trois commentaires HTML de `index.html`** portent le prix : invisibles, mais faux si oubliés.
7. **`devis.html` agrège les RDV AAC** (400 €) là où la page AAC les affiche séparément
   (100 € + 300 €).
8. **Zone interdite** : amendes, tarif d'État de l'examen du code (30 €), prix concurrents,
   exemple fictif à 1 100 €, prix du carburant du simulateur — listés dans
   `data/tarifs.json → zonesInterdites`. **Ne jamais les modifier de sa propre initiative.**
9. **Les 3 plaquettes PDF** portent aussi la grille. Claude ne peut pas les régénérer : c'est
   une tâche manuelle pour Yves, à faire en même temps.
10. Une recherche sur « € » fait ressortir `quizz/panneaux/AB25.svg` : c'est un panneau routier.
    Toujours filtrer avec `| grep -v panneaux`.

---

## Pages à angle particulier

Ces choix ne se devinent pas en lisant le code — les respecter.

- **`auto-ecole-bayonne.html` — anti-cannibalisation.** L'accueil possède déjà le mot-clé
  principal (`<h1>` « Auto-école à Bayonne — votre permis depuis 1962 », priorité 1.0). La page
  locale vise donc la **longue traîne de proximité** : `<h1>` « Auto-école à *Bayonne centre* »,
  section quartiers desservis, accès au bureau et horaires. **Ne jamais lui redonner le H1 ni
  les accroches de l'accueil** (« élue meilleure auto-école de Bayonne », « auto école pas chère
  à Bayonne », « Une institution du Petit Bayonne »). Si l'accueil et cette page se disputent
  « auto-école Bayonne » dans Search Console, **c'est l'accueil qui doit gagner**.
- **`formules/code-de-la-route-bayonne.html` ne porte aucun tarif Marti.** Le pack code est une
  ligne incluse dans les 3 forfaits, pas un produit isolé : la page renvoie vers `/formules/`
  pour les prix. Son seul chiffre est le 30 € de l'examen d'État. Pas de plaquette PDF non plus
  (exception dans la famille formules).
- **`reservation.html` et `devis.html` sont volontairement orphelines** : aucun lien entrant,
  `noindex`, hors sitemap. Pages pas encore lancées. Le jour du lancement : les lier depuis la
  nav/footer/CTA et retirer le `noindex` si l'indexation est souhaitée.
- **`formules/index.html` utilise du CSS inline** (pas de feuille externe) — exception
  intentionnelle, ne pas « corriger ».
- **`css/base.css` est réservé à 8 pages** : les 4 pages formules détail, les 3 pages locales et
  `espace-eleves`. Ordre de chargement impératif : `fonts.css` → `base.css` → `<style>` inline →
  `nav-mobile.css`. Les autres pages (accueil, FAQ, 404, merci, reservation, mentions légales,
  hub formules, quiz, blog) sont **volontairement autonomes** — systèmes de design distincts,
  ne pas leur imposer `base.css`.
- **Avis clients** : les blocs `Review`/`AggregateRating` en JSON-LD sont conservés tels quels.
  Noté que Google ignore généralement les avis auto-hébergés — décision assumée, ne pas y
  toucher. **Ne jamais réécrire le texte d'un avis**, ni sur l'accueil ni dans `llms.txt`.
- **Sujets à ne pas traiter** : CPF, permis accéléré, permis moto — **non proposés** par
  l'école (confirmé juin 2026). Ne créer aucun contenu dessus.
- **`blog/auto-ecole-en-ligne-ou-marti.html`** : la phrase « souvent 40€ à 50€ de l'heure »
  reprochée aux auto-écoles en ligne chevauche le tarif manuelle Marti (50 €/h) mais reste
  **inchangée** — décision explicite d'Yves.

---

## Écrire pour ce site

- **Ton** : identité basque assumée (rouge, vert), élégant sans être pompeux, tutoiement jamais,
  vouvoiement toujours. Titres en Playfair Display avec 2-4 mots en `<em>` italique.
- **Mobile d'abord** : tout doit tenir en 390 px de large.
- **Contenu pédagogique** = priorité de la marque (22 articles, quiz, simulateurs).
- **Maillage interne** : varier les textes de liens vers une même page — des ancres identiques
  répétées sont dévaluées par Google.
- Un nouvel article ? Partir de `.claude/templates/article-blog.html` et dérouler sa checklist.

---

## `.claudeignore` — fichiers volontairement invisibles

Pour éviter les délais et l'encombrement, ces fichiers sont exclus de ma vue :

| Chemin | Poids | Raison |
|---|---|---|
| `quizz/panneaux/` | 2,7 Mo (294 SVG) | données jamais modifiées |
| `fonts/` | 540 Ko (WOFF2) | binaires |
| `quizz/panneaux_data.js` | 51 Ko | gros fichier de données statiques |
| `node_modules/` | variable | dépendances de développement |

Si je dis « fichier introuvable » pour l'un d'eux, **c'est normal, pas un bug** : décrire la
modification autrement (par exemple modifier le HTML plutôt que l'asset).

Les PDF de `plaquettes/` ne sont **pas** ignorés (ils sont petits et référencés par leur nom),
mais je ne peux pas lire leur contenu binaire.
