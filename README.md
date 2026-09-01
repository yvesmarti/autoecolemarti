# 🚗 Auto-École Marti — Bayonne

[![Site web](https://img.shields.io/badge/Site%20web-autoecolemarti.fr-d63031?style=for-the-badge)](https://autoecolemarti.fr)

> *L'auto-école de confiance du Pays Basque depuis 1962.*

---

## 🏫 L'établissement

Fondée en **1962** par M. Marti, l'auto-école Marti est implantée au cœur de Petit Bayonne depuis plus de 64 ans. Une école familiale qui accompagne les candidats au permis avec une pédagogie personnalisée et des tarifs transparents.

| | |
|---|---|
| ⭐ Note Google | **4,9 / 5** (80 avis) |
| 📅 Fondée en | **1962** |
| 👨‍🎓 Expérience | **64 ans** de formation |
| 💶 Tarif leçon (manuelle / AAC) | **50 €** / heure |
| 💶 Tarif leçon (BVA) | **52 €** / heure |

---

## 📋 Nos formations

| Formule | Prix TTC | En bref | Détails |
|---|---|---|---|
| 🚙 **Permis B — Boîte Automatique** | **1 055 €** | 13h de conduite min., la formule la plus accessible | [Voir la formule →](https://autoecolemarti.fr/formules/permis-b-automatique) |
| ⚙️ **Permis B — Boîte Manuelle** | **1 375 €** | 20h de conduite min., polyvalence totale (toutes voitures) | [Voir la formule →](https://autoecolemarti.fr/formules/permis-b-manuel) |
| 👦 **Conduite Accompagnée (AAC)** | **1 775 €** | Dès 15 ans, 20h auto-école + conduite supervisée en famille | [Voir la formule →](https://autoecolemarti.fr/formules/conduite-accompagnee) |

Tous les tarifs sont **TTC**, fournitures comprises (code illimité en ligne, accompagnement aux examens). Tarifs en vigueur à compter du **31/08/2026**.

---

## 📍 Localisation

**13 rue Marengo — 64100 Bayonne** (Petit Bayonne)

[📌 Ouvrir dans Google Maps](https://www.google.com/maps/search/13+rue+Marengo+64100+Bayonne)

Zone d'intervention : **Bayonne · Anglet · Biarritz · Saint-Jean-de-Luz** et l'intérieur du Pays Basque.

---

## 📚 Blog & ressources pédagogiques

### Code de la route
- [Réussir son code de la route du premier coup](https://autoecolemarti.fr/blog/reussir-code-route-premier-coup)
- [Questions pièges au code : les reconnaître et y répondre](https://autoecolemarti.fr/blog/questions-pieges-code-route)

### Conduite & formations
- [Boîte automatique ou manuelle : laquelle choisir ?](https://autoecolemarti.fr/blog/boite-automatique-ou-manuelle)
- [Réussir son permis B : le guide complet](https://autoecolemarti.fr/blog/comment-reussir-son-permis-conduire)
- [L'apprentissage anticipé de la conduite (AAC)](https://autoecolemarti.fr/blog/aac-apprentissage-anticipe-conduite)

### Réglementation
- [Permis probatoire : règles, points et limitations](https://autoecolemarti.fr/blog/regles-permis-probatoire)
- [Combien coûte le permis à Bayonne en 2026 ?](https://autoecolemarti.fr/blog/combien-coute-permis-conduire-bayonne)

### Conseils pratiques
- [Premiers réflexes en cas de panne ou d'accident](https://autoecolemarti.fr/blog/reflexes-urgence-conduite)
- [Conduire sur le BAB : guide pour éviter les pièges](https://autoecolemarti.fr/blog/conduire-sur-le-bab-guide-complet)

### Outils interactifs
- [🪧 Quiz : connaissez-vous les panneaux de signalisation ?](https://autoecolemarti.fr/quizz/quizz_panneaux)
- [🌿 Simulateur d'éco-conduite](https://autoecolemarti.fr/blog/simulateur-ecoconduite)

> [Voir tous les articles du blog →](https://autoecolemarti.fr/blog/)

---

## 🔗 Liens rapides

| Page | Lien |
|---|---|
| 🏠 Site principal | [autoecolemarti.fr](https://autoecolemarti.fr) |
| 📖 Blog | [autoecolemarti.fr/blog/](https://autoecolemarti.fr/blog/) |
| ⚖️ Mentions légales | [autoecolemarti.fr/mentions-legales](https://autoecolemarti.fr/mentions-legales) |

---

## 🛠️ Développement

Site statique : aucune étape de build n'est nécessaire pour le publier. Node ne sert qu'à
l'outillage de maintenance.

```bash
npm install          # une seule fois (Playwright, pour les captures d'écran)

npm run serve        # aperçu local sur http://localhost:8080
npm run check        # contrôle qualité : liens, balises SEO, JSON-LD, dates, sitemap, tarifs
npm run docs         # régénère SITE.md (inventaire du site)
npm run sitemap      # régénère sitemap.xml
npm run shot -- /faq # captures desktop + mobile dans .captures/
```

| Fichier | Rôle |
|---|---|
| `SITE.md` | 🤖 inventaire généré des pages, articles et feuilles de style |
| `STYLE_GUIDE.md` | design system : couleurs, typographie, composants |
| `data/tarifs.json` | grille tarifaire de référence, contrôlée automatiquement |
| `CLAUDE.md` | conventions et pièges du projet |

Deux workflows GitHub Actions tournent à chaque push : l'un régénère `sitemap.xml` et
`SITE.md`, l'autre lance le contrôle qualité (en mode alerte, non bloquant).

---

*Site statique HTML/CSS/JS hébergé sur Cloudflare Pages — SIRET 382 930 188 00018*
