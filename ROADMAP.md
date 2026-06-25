# Roadmap & Idées de développement

> Ce fichier recense les développements souhaités mais pas encore planifiés.
> Mis à jour au fil des idées. À consulter avant tout nouveau développement.

---

## Priorité haute (à faire bientôt)

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

---

## Développements réalisés

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
