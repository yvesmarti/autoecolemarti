# Roadmap & Idées de développement

> Ce fichier recense les développements souhaités mais pas encore planifiés.
> Mis à jour au fil des idées. À consulter avant tout nouveau développement.

---

## Priorité haute (à faire bientôt)

### Changement de grille tarifaire (prévu — date à confirmer)
- **Procédure complète dans `TARIFS.md`** (racine du dépôt) : grille en vigueur, inventaire
  ligne à ligne des ~200 occurrences de prix réparties sur 18 fichiers, checklist par fichier,
  pièges de formats, greps de vérification. Le jour J, il suffit de demander à Claude :
  *« Mets à jour les tarifs du site selon TARIFS.md — voici la nouvelle grille : … »*
- **À faire par Yves en parallèle** : régénérer les 3 plaquettes PDF
  (`plaquettes/Plaquette_AAC.pdf`, `Plaquette_Permis_B_Manuel.pdf`, `Plaquette_Permis_B_BVA.pdf`)
  — elles contiennent la grille et Claude ne peut pas les modifier.
- **Décider de la nouvelle date d'effet** (l'actuelle, `09/03/2026`, est affichée à 12 endroits).

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
- **Différenciation anti-cannibalisation** : « prix du permis à Bayonne » est visé à la fois
  par `formules/index.html` (transactionnel) et `blog/combien-coute-permis-conduire-bayonne.html`
  (informationnel) ; idem « conduite accompagnée » entre la page formule AAC et 2 articles.
  Si les positions Google se cannibalisent, différencier davantage les angles et renforcer
  le maillage article → page formule.

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
