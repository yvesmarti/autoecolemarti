# TARIFS.md — Référentiel des tarifs affichés sur le site

> **À quoi sert ce fichier ?**
> Les prix de l'auto-école ne sont stockés nulle part de façon centralisée : ils sont écrits
> en dur dans **19 fichiers**, sous **9 formats d'écriture différents**, à la fois dans le
> contenu visible, les balises `<meta>`, les schémas JSON-LD et une configuration JavaScript.
> Ce fichier recense **toutes** les occurrences pour qu'aucune ne soit oubliée lors d'un
> changement de grille.
>
> **Au moment de changer les tarifs**, il suffit de demander :
> *« Mets à jour les tarifs du site selon TARIFS.md — voici la nouvelle grille : … »*
>
> ⚠️ **Ce fichier doit être mis à jour EN MÊME TEMPS que les tarifs** (§7, étape 1), sinon il
> devient faux et perd tout intérêt.

- **Dernière vérification de l'inventaire** : 2 août 2026
- **Grille en vigueur documentée ci-dessous** : celle affichée « à compter du 09/03/2026 »

---

## §1 — Grille en vigueur (source de vérité)

| Identifiant | Poste | BVA (automatique) | Manuelle | AAC |
|---|---|---|---|---|
| `TOTAL_*` | **Total TTC du forfait** | **967 €** | **1 261 €** | **1 629 €** |
| `DOSSIER` | Frais administratifs + dossier | 200,00 € | 200,00 € | 200,00 € |
| `CODE` | Pack code de la route | 50,00 € | 50,00 € | 50,00 € |
| `EVAL` | Évaluation de départ | 45,00 € | 45,00 € | 45,00 € |
| `H_INCLUSES` | Heures de conduite incluses | 13 h | 20 h | 20 h |
| `CONDUITE_*` | Montant de la conduite incluse | 624,00 € | 920,00 € | 920,00 € |
| `RDV_PREALABLE` | RDV préalable 2 h (accompagnateur) | — | — | 92,00 € |
| `RDV_PEDAGO` | 2 RDV pédagogiques (2 × 3 h) | — | — | 276,00 € |
| `EXAMEN` | Accompagnement / présentation examen | 48,00 € | 46,00 € | 46,00 € |
| `HEURE_SUP` | **Heure de conduite supplémentaire** | **48 €/h** | **46 €/h** | **46 €/h** |

Valeurs dérivées affichées telles quelles sur le site :

| Identifiant | Valeur | Origine |
|---|---|---|
| `SESSION_RDV` | 138,00 €/session | `RDV_PEDAGO` ÷ 2 |
| `RDV_AGREGE` | 368,00 € | `RDV_PREALABLE` + `RDV_PEDAGO` (utilisé par `devis.html` uniquement) |
| `EXAMEN_SUP` | 46,00 € | Option « 2ᵉ passage » de l'estimateur de devis |
| `DATE_EFFET` | 09/03/2026 | Date d'entrée en vigueur affichée (12 occurrences, §2.11) |

### Invariants à revérifier après toute modification

```
BVA      : 200 + 50 + 45 + 624 + 48            = 967    ✓
Manuelle : 200 + 50 + 45 + 920 + 46            = 1 261  ✓
AAC      : 200 + 50 + 45 + 920 + 92 + 276 + 46 = 1 629  ✓
Conduite BVA      : 13 h × 48 € = 624 €  ✓
Conduite Man./AAC : 20 h × 46 € = 920 €  ✓
RDV agrégé devis  : 92 + 276    = 368 €  ✓
Session pédago    : 276 ÷ 2     = 138 €  ✓
```

---

## §2 — Inventaire par tarif

Chaque ligne donne le fichier, la ligne **au 02/08/2026** (les numéros bougent : se fier au
texte exact) et le **format d'écriture** — c'est le format qui piège les rechercher/remplacer.

### 2.1 — `TOTAL_BVA` = 967 €

| Fichier | Ligne | Format écrit | Contexte |
|---|---|---|---|
| `index.html` | 13, 16, 27 | `967€` | meta description / og / twitter |
| `index.html` | 101 | `"price": "967"` | JSON-LD Offer « Forfait Permis B — Boîte automatique » |
| `index.html` | 328 | `967€` | **commentaire HTML** `<!-- BOÎTE AUTOMATIQUE — 967€ -->` |
| `index.html` | 332 | `967€` | `.formation-price` carte formule |
| `index.html` | 473 | `967€` | argumentaire « nos forfaits démarrent à… » |
| `formules/index.html` | 9, 11, 23 | `967€` | title / og:title / twitter:title |
| `formules/index.html` | 10, 12, 24 | `967€` | meta / og / twitter description |
| `formules/index.html` | 760 | `967&nbsp;€` | chapô hero |
| `formules/index.html` | 781 | `967&nbsp;€` | `.shortcut-price` raccourci BVA |
| `formules/index.html` | 1092, 1176 | `967€` | pastilles « autres formules » (résultats AAC et manuelle) |
| `formules/index.html` | 1117 | `967€` | `.result-price-display` résultat quiz BVA |
| `formules/index.html` | 1123 | `(967€)` | liste d'avantages du résultat BVA |
| `formules/permis-b-automatique.html` | 9 | `967 €` | `<title>` |
| `formules/permis-b-automatique.html` | 12, 14, 26 | `967€` | meta / og / twitter description |
| `formules/permis-b-automatique.html` | 53 | `"price": "967"` | JSON-LD `Course` → `offers` |
| `formules/permis-b-automatique.html` | 282 | `967 €` | `.price-tag` hero |
| `formules/permis-b-automatique.html` | 301 | `967 €` | bloc « Le tarif le plus bas » |
| `formules/permis-b-automatique.html` | 336 | `967 €` | tableau comparatif (cellule highlight) |
| `formules/permis-b-automatique.html` | 369 | `967 €` | `.total-price` |
| `formules/permis-b-manuel.html` | 337 *(cellule muted)* | — | *voir `TOTAL_MANUEL`* |
| `faq.html` | 63, 71 | `967 €` | JSON-LD FAQPage (2 réponses) |
| `faq.html` | 758, 772 | `967 €` | réponses visibles (miroir du JSON-LD) |
| `auto-ecole-anglet.html` | 12, 15, 27 | `967 €` | meta / og / twitter description |
| `auto-ecole-anglet.html` | 72 | `"price": "967"` | JSON-LD OfferCatalog |
| `auto-ecole-anglet.html` | 107 | `967 €` | JSON-LD FAQPage |
| `auto-ecole-anglet.html` | 273, 306, 343 | `967 €` | bloc tarifs / carte formule / FAQ visible |
| `auto-ecole-biarritz.html` | 12, 15, 27, 72, 107, 273, 306, 343 | idem Anglet | structure strictement parallèle |
| `auto-ecole-bayonne.html` | 12, 15, 27 | `967 €` | meta / og / twitter description |
| `auto-ecole-bayonne.html` | 87 | `"price": "967"` | JSON-LD OfferCatalog |
| `auto-ecole-bayonne.html` | 132 | `967 €` | JSON-LD FAQPage |
| `auto-ecole-bayonne.html` | 303, 374, 419 | `967 €` | bloc tarifs / carte formule / FAQ visible |
| `blog/combien-coute-permis-conduire-bayonne.html` | 12, 15, 29, 112 | `967€` | meta ×3 + JSON-LD BlogPosting `description` |
| `blog/combien-coute-permis-conduire-bayonne.html` | 219 | `967 €` | tableau comparatif |
| `blog/combien-coute-permis-conduire-bayonne.html` | 300, 325 | `967€` | carte article liée / titre CTA final |
| `blog/combien-coute-permis-conduire-bayonne.html` | 403 | `967€` | JSON-LD FAQPage |
| `blog/permis-lyceen-etudiant-bayonne.html` | 258 | `967 €` | tableau budget |
| `blog/permis-lyceen-etudiant-bayonne.html` | 321, 333 | `967 €` | FAQ visible |
| `blog/permis-lyceen-etudiant-bayonne.html` | 461, 485 | `967 €` | JSON-LD FAQPage (miroir de 321 et 333) |
| `blog/index.html` | 473 | `967€` | extrait de la carte article « Combien coûte… » |
| `llms.txt` | 3, 11, 49, 60, 117 | `967 €` | résumé, grille, section communes, FAQ, liste de liens |
| `README.md` | 26 | `**967 €**` | tableau des formations |
| `devis.html` | 650 | `base: 967,` | `DEVIS_CONFIG.formules.bva` |

### 2.2 — `TOTAL_MANUEL` = 1 261 €

| Fichier | Ligne | Format écrit | Contexte |
|---|---|---|---|
| `index.html` | 94 | `"price": "1261"` | JSON-LD Offer « Forfait Permis B — Boîte manuelle » |
| `index.html` | 344 | `1 261€` | **commentaire HTML** |
| `index.html` | 349 | `1 261€` | `.formation-price` carte formule |
| `formules/index.html` | 10, 12, 24 | `1 261€` | meta / og / twitter description |
| `formules/index.html` | 760, 794 | `1&nbsp;261&nbsp;€` | chapô hero / raccourci |
| `formules/index.html` | 1093, 1137 | `1 261€` | pastilles « autres formules » |
| `formules/index.html` | 1156 | `1 261€` | résultat quiz manuelle |
| `formules/permis-b-manuel.html` | 9 | `1 261 €` | `<title>` |
| `formules/permis-b-manuel.html` | 12, 14, 26 | `1 261€` | meta / og / twitter description |
| `formules/permis-b-manuel.html` | 53 | `"price": "1261"` | JSON-LD `Course` → `offers` |
| `formules/permis-b-manuel.html` | 288 | `1 261 €` | `.price-tag` hero |
| `formules/permis-b-manuel.html` | 333 | `1 261 €` | `.total-price` |
| `formules/permis-b-automatique.html` | 337 | `1 261 €` | tableau comparatif (cellule « muted ») |
| `faq.html` | 71 | `1 261 €` | JSON-LD FAQPage |
| `faq.html` | 773 | `1 261 €` | réponse visible |
| `auto-ecole-anglet.html` | 73 | `"price": "1261"` | JSON-LD OfferCatalog |
| `auto-ecole-anglet.html` | 107, 312, 343 | `1 261 €` | JSON-LD FAQPage / carte formule / FAQ visible |
| `auto-ecole-biarritz.html` | 73, 107, 312, 343 | idem Anglet | — |
| `auto-ecole-bayonne.html` | 88 | `"price": "1261"` | JSON-LD OfferCatalog |
| `auto-ecole-bayonne.html` | 132, 380, 419 | `1 261 €` | JSON-LD FAQPage / carte formule / FAQ visible |
| `blog/combien-coute-permis-conduire-bayonne.html` | 12, 15, 29, 112 | `1 261€` | meta ×3 + JSON-LD |
| `blog/combien-coute-permis-conduire-bayonne.html` | 225 | `1 261 €` | tableau comparatif |
| `blog/combien-coute-permis-conduire-bayonne.html` | 250 | `1 261€` | comparaison narrative (⚠️ voisine d'un exemple fictif « 1 000€ », §6) |
| `blog/combien-coute-permis-conduire-bayonne.html` | 307 | `1 261€` | carte article liée |
| `blog/combien-coute-permis-conduire-bayonne.html` | 403 | `1 261€` | JSON-LD FAQPage |
| `blog/permis-lyceen-etudiant-bayonne.html` | 263, 321, 461 | `1 261 €` | tableau / FAQ visible / JSON-LD |
| **`blog/auto-ecole-en-ligne-ou-marti.html`** | **270** | **`1261€`** | ⚠️ **sans espace** — invisible à une recherche « 1 261 » |
| `blog/index.html` | 473 | `1 261€` | extrait de carte article |
| `llms.txt` | 12, 49, 60 | `1 261 €` | grille, communes, FAQ |
| `README.md` | 27 | `**1 261 €**` | tableau des formations |
| `devis.html` | 666 | `base: 1261,` | `DEVIS_CONFIG.formules.manuel` |

### 2.3 — `TOTAL_AAC` = 1 629 €

| Fichier | Ligne | Format écrit | Contexte |
|---|---|---|---|
| `index.html` | 108 | `"price": "1629"` | JSON-LD Offer « Forfait Conduite Accompagnée (AAC) » |
| `index.html` | 361 | `1 629€` | **commentaire HTML** |
| `index.html` | 365 | `1 629€` | `.formation-price` carte formule |
| `formules/index.html` | 10, 12, 24 | `1 629€` | meta / og / twitter description |
| `formules/index.html` | 760, 807 | `1&nbsp;629&nbsp;€` | chapô hero / raccourci |
| `formules/index.html` | 1072 | `1 629€` | résultat quiz AAC |
| `formules/index.html` | 1138, 1177 | `1 629€` | pastilles « autres formules » |
| `formules/conduite-accompagnee.html` | 12, 14, 26 | `1 629€` | meta / og / twitter description |
| `formules/conduite-accompagnee.html` | 53 | `"price": "1629"` | JSON-LD `Course` → `offers` |
| `formules/conduite-accompagnee.html` | 294 | `1 629 €` | `.price-tag` hero |
| `formules/conduite-accompagnee.html` | 350 | `1 629 €` | `.total-price` |
| `faq.html` | 71 | `1 629 €` | JSON-LD FAQPage |
| `faq.html` | 774 | `1 629 €` | réponse visible |
| `auto-ecole-anglet.html` | 74 | `"price": "1629"` | JSON-LD OfferCatalog |
| `auto-ecole-anglet.html` | 107, 318, 343 | `1 629 €` | JSON-LD FAQPage / carte formule / FAQ visible |
| `auto-ecole-biarritz.html` | 74, 107, 318, 343 | idem Anglet | — |
| `auto-ecole-bayonne.html` | 89 | `"price": "1629"` | JSON-LD OfferCatalog |
| `auto-ecole-bayonne.html` | 132, 386, 419 | `1 629 €` | JSON-LD FAQPage / carte formule / FAQ visible |
| `blog/combien-coute-permis-conduire-bayonne.html` | 12, 15, 29, 112 | `1 629€` | meta ×3 + JSON-LD |
| `blog/combien-coute-permis-conduire-bayonne.html` | 231, 314, 403 | `1 629 €` / `1 629€` | tableau / carte liée / JSON-LD FAQPage |
| `blog/permis-lyceen-etudiant-bayonne.html` | 268 | `1 629 €` | tableau budget |
| `blog/regles-permis-probatoire.html` | 328 | `1 629 € TTC` | lien CTA inline « Découvrir la formule AAC » |
| `blog/regles-permis-probatoire.html` | 720 | `1 629 € TTC` | `.cta-formule-prix` (⚠️ seule des 3 cartes CTA à afficher un prix — l. 727 et 734 disent « Découvrir les tarifs ») |
| `blog/index.html` | 473 | `1 629€` | extrait de carte article |
| `llms.txt` | 13, 49, 60, 118 | `1 629 €` | grille, communes, FAQ, liste de liens |
| `README.md` | 28 | `**1 629 €**` | tableau des formations |
| `CLAUDE.md` | 62 | ⚠️ `1 629 € TTC` | arborescence du projet *(anciennement `€1,629`, corrigé le 02/08/2026)* |
| `devis.html` | 682 | `base: 1629,` | `DEVIS_CONFIG.formules.aac` |

### 2.4 — `HEURE_SUP` manuelle / AAC = 46 €/h

⚠️ **Attention** : la valeur `46 €` correspond à **trois postes distincts** — heure
supplémentaire, présentation à l'examen (manuelle/AAC) et option 2ᵉ passage. Une hausse peut
ne concerner que l'un des trois. Vérifier le contexte de chaque ligne avant de remplacer.

| Fichier | Ligne | Format écrit | Contexte |
|---|---|---|---|
| `index.html` | 115 | `"price": "46"` | JSON-LD Offer « Leçon de conduite — Boîte manuelle » |
| `index.html` | 266 | `46€` | stat hero « L'heure de conduite » |
| `index.html` | 350 | `46€/h` | note carte formule manuelle |
| `index.html` | 366 | `46€/h` | note carte formule AAC |
| `index.html` | 395 | `46€ TTC` | badge « heure de conduite supplémentaire » |
| `formules/index.html` | 1073 | `46€/h` | note résultat quiz AAC |
| `formules/index.html` | 1157 | `46€/h` | note résultat quiz manuelle |
| `formules/permis-b-manuel.html` | 360 | `Soit 46,00 €/heure` | détail ligne conduite |
| `formules/permis-b-manuel.html` | 373 | `46,00 €/heure` | note sous le tableau tarifaire |
| `formules/permis-b-automatique.html` | 342 | `46 €/h` | tableau comparatif (colonne manuelle) |
| `formules/conduite-accompagnee.html` | 377 | `Soit 46,00 €/heure` | détail ligne conduite |
| `faq.html` | 55, 71 | `46 €/h` | JSON-LD FAQPage (2 réponses) |
| `faq.html` | 744, 776 | `46 €/h` | réponse visible + encart « tip » |
| `auto-ecole-anglet.html` | 107 | `46 €` | JSON-LD FAQPage |
| `auto-ecole-biarritz.html` | 107 | `46 €` | JSON-LD FAQPage |
| `auto-ecole-bayonne.html` | 132, 419 | `46 €` | JSON-LD FAQPage + FAQ visible (⚠️ les 2, contrairement à Anglet/Biarritz) |
| `blog/combien-coute-permis-conduire-bayonne.html` | 241 | `46 €/h` | callout heures supplémentaires |
| `blog/combien-coute-permis-conduire-bayonne.html` | 411 | `46€/h` | JSON-LD FAQPage |
| `blog/permis-lyceen-etudiant-bayonne.html` | 274, 321 | `46 €` | note tableau / FAQ visible |
| `blog/permis-lyceen-etudiant-bayonne.html` | 461 | `46 €` | JSON-LD FAQPage |
| `llms.txt` | 14, 54 | `46 €/heure` | grille / FAQ |
| `README.md` | 18 | `**46 €** / heure` | tableau « chiffres clés » (⚠️ n'indique pas le 48 €/h BVA) |
| `devis.html` | 668, 684 | `prixHeureSup: 46,` | `DEVIS_CONFIG` manuel + aac |

### 2.5 — `HEURE_SUP` automatique = 48 €/h

| Fichier | Ligne | Format écrit | Contexte |
|---|---|---|---|
| `index.html` | 122 | `"price": "48"` | JSON-LD Offer « Leçon de conduite — Boîte automatique » |
| `index.html` | 333 | `48€/h` | note carte formule BVA |
| `index.html` | 399 | `48€ TTC` | badge « heure de conduite supplémentaire » |
| `formules/index.html` | 1118 | `48€/h` | note résultat quiz BVA |
| `formules/permis-b-automatique.html` | 341 | `48 €/h` | tableau comparatif |
| `formules/permis-b-automatique.html` | 396 | `Soit 48,00 €/heure` | détail ligne conduite |
| `faq.html` | 55, 71 | `48 €/h` | JSON-LD FAQPage |
| `faq.html` | 744, 776 | `48 €/h` | réponse visible + encart « tip » |
| `auto-ecole-anglet.html` | 107 | `48 €` | JSON-LD FAQPage |
| `auto-ecole-biarritz.html` | 107 | `48 €` | JSON-LD FAQPage |
| `auto-ecole-bayonne.html` | 132, 419 | `48 €` | JSON-LD FAQPage + FAQ visible (⚠️ les 2, contrairement à Anglet/Biarritz) |
| `blog/combien-coute-permis-conduire-bayonne.html` | 241, 411 | `48 €/h` / `48€/h` | callout / JSON-LD FAQPage |
| `blog/permis-lyceen-etudiant-bayonne.html` | 274, 321, 461 | `48 €` | note tableau / FAQ visible / JSON-LD |
| `llms.txt` | 15, 54 | `48 €/heure` | grille / FAQ |
| `devis.html` | 652 | `prixHeureSup: 48,` | `DEVIS_CONFIG.formules.bva` |

### 2.6 — `DOSSIER` = 200,00 € (identique aux 3 formules)

| Fichier | Ligne | Libellé affiché |
|---|---|---|
| `formules/permis-b-automatique.html` | 377 | « Frais administratifs + dossier » |
| `formules/permis-b-manuel.html` | 341 | « Frais administratifs + dossier » |
| `formules/conduite-accompagnee.html` | 358 | « Frais administratifs » |
| `devis.html` | 655, 671, 687 | `{ label: "Frais de dossier & inscription", prix: 200 }` ×3 |

### 2.7 — `CODE` = 50,00 € (identique aux 3 formules)

| Fichier | Ligne | Libellé affiché |
|---|---|---|
| `formules/permis-b-automatique.html` | 384 | « Pack code » |
| `formules/permis-b-manuel.html` | 348 | « Pack code » |
| `formules/conduite-accompagnee.html` | 365 | « Pack code » |
| `devis.html` | 656, 672, 688 | `{ id: "code", label: "Pack code de la route", prix: 50 }` ×3 |

⚠️ Dans `devis.html`, la ligne `id: "code"` est **déduite du total** quand l'utilisateur coche
« J'ai déjà le code » (fonction `prixCode()` l. 722-725). Changer ce montant change aussi la
réduction affichée.

### 2.8 — `EVAL` = 45,00 € (identique aux 3 formules)

| Fichier | Ligne | Libellé affiché |
|---|---|---|
| `formules/permis-b-automatique.html` | 391 | « Évaluation de départ » |
| `formules/permis-b-manuel.html` | 355 | « Évaluation de départ » |
| `formules/conduite-accompagnee.html` | 372 | « Évaluation de départ » |
| `devis.html` | 657, 673, 689 | `{ label: "Évaluation de départ", prix: 45 }` ×3 |

### 2.9 — `CONDUITE_*`, `EXAMEN`, RDV pédagogiques

| Montant | Fichier | Ligne | Contexte |
|---|---|---|---|
| **624,00 €** (13 h × 48) | `formules/permis-b-automatique.html` | 398 | ligne « 13h de conduite minimum » |
| | `devis.html` | 658 | `{ label: "13 h de conduite incluses", detail: "Soit 48 €/h", prix: 624 }` |
| **920,00 €** (20 h × 46) | `formules/permis-b-manuel.html` | 362 | ligne « 20h de conduite minimum » |
| | `formules/conduite-accompagnee.html` | 379 | ligne « 20h de conduite minimum » |
| | `devis.html` | 674, 690 | `prix: 920` (manuel + aac) |
| **92,00 €** | `formules/conduite-accompagnee.html` | 386 | « 1 RDV préalable · 2h — formation de l'accompagnateur » |
| **276,00 €** | `formules/conduite-accompagnee.html` | 393 | « 2 RDV pédagogiques » |
| **138,00 €/session** | `formules/conduite-accompagnee.html` | 391 | détail « 2 × 3h — soit 138,00 €/session » |
| **368,00 €** | `devis.html` | 691 | ⚠️ `{ label: "RDV préalable + 2 RDV pédagogiques", prix: 368 }` — **agrège 92 + 276**, contrairement à la page AAC qui les sépare. Garder les deux cohérents. |
| **48,00 €** (examen BVA) | `formules/permis-b-automatique.html` | 405 | « Accompagnement à l'examen · 1 présentation incluse » |
| | `devis.html` | 659 | `{ label: "Présentation à l'examen", prix: 48 }` |
| **46,00 €** (examen man.) | `formules/permis-b-manuel.html` | 369 | « Accompagnement à l'examen » |
| | `devis.html` | 675 | `{ label: "Présentation à l'examen", prix: 46 }` |
| **46,00 €** (examen AAC) | `formules/conduite-accompagnee.html` | 400 | « Accompagnement à l'examen » |
| | `devis.html` | 692 | `{ label: "Présentation à l'examen", prix: 46 }` |
| **46 €** (`EXAMEN_SUP`) | `devis.html` | 702 | option cochable « Présentation supplémentaire à l'examen · En cas de 2ᵉ passage » |

### 2.10 — Volumes horaires réglementaires (13 h / 20 h)

Ils accompagnent presque toujours un prix. À ne changer **que** si le contenu du forfait
change (ils sont adossés au minimum légal).

`index.html:333,350` · `formules/index.html:782,795` · `formules/permis-b-*.html`
(titres, meta, lignes de détail) · `faq.html:63,71,758,772,773` · `llms.txt:54` ·
`README.md:26,27` · `blog/combien-coute-permis-conduire-bayonne.html:219,225,250` ·
`blog/permis-lyceen-etudiant-bayonne.html:258,263,321` ·
`devis.html:651,667,683` (`hIncluses`).

### 2.11 — `DATE_EFFET` = 09/03/2026 — **12 occurrences**

| Fichier | Ligne | Formulation |
|---|---|---|
| `index.html` | 403 | « * Tarifs TTC à compter du 09/03/2026. » |
| `faq.html` | 71 | JSON-LD — « Tarifs TTC en vigueur à compter du 09/03/2026. » |
| `faq.html` | 776 | encart « tip » visible (miroir) |
| `formules/permis-b-automatique.html` | 363 | sous-titre du bloc tarifaire |
| `formules/permis-b-automatique.html` | 520 | mention de pied de page |
| `formules/permis-b-manuel.html` | 327 | sous-titre du bloc tarifaire |
| `formules/permis-b-manuel.html` | 484 | mention de pied de page |
| `formules/conduite-accompagnee.html` | 344 | sous-titre du bloc tarifaire |
| `formules/conduite-accompagnee.html` | 579 | mention de pied de page |
| `auto-ecole-anglet.html` | 302 | sous-titre du bloc formules |
| `auto-ecole-biarritz.html` | 302 | sous-titre du bloc formules |
| `auto-ecole-bayonne.html` | 370 | sous-titre du bloc formules |
| `devis.html` | 639 | commentaire « (Tarifs relevés sur le site au 09/03/2026 — à confirmer/actualiser.) » |

❗ **Absente de `llms.txt` et `README.md`** — à y **ajouter** lors de la prochaine mise à jour.

### 2.12 — Mentions sans montant (à relire, pas forcément à modifier)

| Fichier | Ligne | Texte |
|---|---|---|
| `espace-eleves.html` | 333 | « Ces documents détaillent le programme complet, **les tarifs en vigueur**… » → renvoie aux 3 PDF (§5) |
| `formules/permis-b-*.html`, `conduite-accompagnee.html` | 412 / 376 / 407 | bouton « 📄 Consulter la plaquette tarifaire PDF » |
| `faq.html` | 119, 884 | « paiement en plusieurs fois pour toutes les formules » |
| `auto-ecole-anglet/biarritz.html` | 273 | « Paiement en plusieurs fois possible. » |
| `auto-ecole-bayonne.html` | 303 | « Paiement en plusieurs fois possible. » |
| `blog/combien-coute-permis-conduire-bayonne.html` | 263-265 | section « Le paiement en plusieurs fois chez Marti » |
| `index.html` | 138 · `auto-ecole-*.html` | 42 | `"priceRange": "€€"` (indicateur de gamme JSON-LD, pas un montant) |
| `index.html` | 939 | `<option value="Renseignement tarifs">` du formulaire de contact |
| `mentions-legales.html` | 531 | CGV : « versement d'un acompte », « le forfait code est dû à l'inscription » |
| avis clients | `index.html` (JSON-LD + carrousel), `llms.txt:88-109` | « tarifs corrects », « rapport qualité/prix » — **ne pas réécrire un avis** |

---

## §3 — Checklist par fichier

Ordre de travail recommandé, du plus structurant au plus périphérique.
**19 fichiers**, à cocher au fur et à mesure.

- [ ] **1. `devis.html`** — objet `DEVIS_CONFIG` l. 641-704 : `base`, `hIncluses`,
      `prixHeureSup`, tableau `lignes` des 3 formules, `options[0].prix`.
      Mettre à jour aussi les commentaires l. 620 et 639.
      *Tout le reste de la page est calculé — ne rien toucher en dehors de `DEVIS_CONFIG`.*
- [ ] **2. `formules/permis-b-automatique.html`** — title l. 9, meta 12/14/26, JSON-LD 53,
      hero 282, bloc 301, tableau comparatif 336/337/341/342, sous-titre 363, total 369,
      détail 377/384/391/396/398/405, pied de page 520.
- [ ] **3. `formules/permis-b-manuel.html`** — title 9, meta 12/14/26, JSON-LD 53, hero 288,
      sous-titre 327, total 333, détail 341/348/355/360/362/369, note 373, pied de page 484.
- [ ] **4. `formules/conduite-accompagnee.html`** — meta 12/14/26, JSON-LD 53, hero 294,
      sous-titre 344, total 350, détail 358/365/372/377/379/386/391/393/400, pied de page 579.
- [ ] **5. `formules/index.html`** — title 9/11/23, meta 10/12/24, chapô 760,
      raccourcis 781-782/794-795/807-808, résultats du quiz 1072-1073/1092-1093,
      1117-1118/1123/1137-1138, 1156-1157/1176-1177.
- [ ] **6. `index.html`** — meta 13/16/27, JSON-LD Offers 94-124, stat hero 266,
      commentaires 328/344/361, cartes 332-333/349-350/365-366, bloc heure sup 395/399,
      note de date 403, argumentaire 473.
- [ ] **7. `faq.html`** — JSON-LD 55/63/71 **et** leur miroir visible 744/758/772-774/776.
      *Les deux doivent rester rigoureusement identiques.*
- [ ] **8. `auto-ecole-anglet.html`** — meta 12/15/27, OfferCatalog 72-74, FAQPage 107,
      bloc 273, sous-titre 302, cartes 306/312/318, FAQ visible 343.
- [ ] **9. `auto-ecole-biarritz.html`** — mêmes lignes qu'Anglet (12/15/27, 72-74, 107, 273,
      302, 306/312/318, 343).
- [ ] **10. `auto-ecole-bayonne.html`** — meta 12/15/27, OfferCatalog 87-89, FAQPage 132,
      bloc 303, sous-titre 370, cartes 374/380/386, FAQ visible 419.
      ⚠️ Contrairement à Anglet/Biarritz, la FAQ **visible** porte aussi les 46 €/48 €
      (l. 419) : elle doit rester rigoureusement identique au JSON-LD (l. 132).
- [ ] **11. `blog/combien-coute-permis-conduire-bayonne.html`** — meta 12/15/29,
      JSON-LD BlogPosting 112, tableau 219/225/231, callout 241, comparaison 250,
      cartes liées 300/307/314, CTA 325, JSON-LD FAQPage 403/411.
      Penser à `dateModified` + `article:modified_time`.
- [ ] **12. `blog/permis-lyceen-etudiant-bayonne.html`** — tableau 258/263/268, note 274,
      FAQ visible 321/333, JSON-LD FAQPage 461/485. + dates.
- [ ] **13. `blog/regles-permis-probatoire.html`** — CTA 328 et 720 (AAC uniquement). + dates.
- [ ] **14. `blog/auto-ecole-en-ligne-ou-marti.html`** — ⚠️ l. 270, format **`1261€`**. + dates.
- [ ] **15. `blog/index.html`** — extrait de carte l. 473.
- [ ] **16. `llms.txt`** — 3, 11-15, 50, 55, 61, 118-119. **Y ajouter la date d'effet.**
- [ ] **17. `README.md`** — 18 (heure de conduite), 26-28 (tableau formations).
      **Y ajouter la date d'effet**, et envisager d'y indiquer aussi le 48 €/h BVA.
- [ ] **18. `CLAUDE.md`** — l. 62 (mention du prix AAC dans l'arborescence).
- [ ] **19. `TARIFS.md`** (ce fichier) — §1, §2 et la date de vérification en tête.

---

## §4 — Pièges connus

1. **Neuf formats d'écriture** pour le même montant. Un rechercher/remplacer sur `1 261 €`
   rate à lui seul 5 variantes :

   | Format | Où | Exemple |
   |---|---|---|
   | `967€` | contenu, meta | `index.html:332` |
   | `967 €` | contenu | `faq.html:772` |
   | `967&nbsp;€` | entités HTML | `formules/index.html:781` |
   | `1&nbsp;261&nbsp;€` | entités HTML | `formules/index.html:794` |
   | `1261€` | **sans espace** | `blog/auto-ecole-en-ligne-ou-marti.html:270` |
   | `"1261"` | JSON-LD | `index.html:94` |
   | `920,00 €` | virgule + décimales | `formules/permis-b-manuel.html:362` |
   | `**967 €**` | Markdown gras | `README.md:26` |
   | `46€/h`, `46 €/heure` | unités variables | `index.html:350`, `llms.txt:14` |

2. **Toute réponse de FAQ existe en double** — une fois en JSON-LD, une fois en HTML visible.
   Concerné : `faq.html`, `auto-ecole-anglet/biarritz.html`,
   `blog/combien-coute-permis-conduire-bayonne.html`,
   `blog/permis-lyceen-etudiant-bayonne.html`. Modifier une seule des deux crée une
   incohérence entre la page et le rich snippet Google.
3. **Les prix sont dans les `<title>` et `<meta description>`** de `permis-b-manuel`,
   `permis-b-automatique` et `formules/index` → visibles directement dans les résultats
   Google. Ne pas les oublier.
4. **Trois commentaires HTML** de `index.html` (l. 328, 344, 361) portent le prix. Invisibles
   sur la page, mais faux si oubliés.
5. **`46 €` = trois postes différents** (heure sup, présentation examen, option 2ᵉ passage).
6. **`devis.html:691` agrège les RDV AAC à 368 €** là où la page AAC affiche 92 € + 276 €.
7. **`quizz/panneaux/AB25.svg`** ressort sur une recherche « € » : c'est un panneau routier,
   sans rapport. Toujours filtrer avec `| grep -v panneaux`.

---

## §5 — Hors dépôt : les 3 plaquettes PDF

Elles sont publiquement téléchargeables et présentées comme contenant « les tarifs en
vigueur » (`espace-eleves.html:333`). **Claude ne peut pas les régénérer** — c'est une tâche
manuelle pour Yves, à faire en même temps que la mise à jour du site.

| Fichier | Lié depuis |
|---|---|
| `plaquettes/Plaquette_AAC.pdf` | `formules/conduite-accompagnee.html:626`, `espace-eleves.html:336` |
| `plaquettes/Plaquette_Permis_B_Manuel.pdf` | `formules/permis-b-manuel.html:531`, `espace-eleves.html:341` |
| `plaquettes/Plaquette_Permis_B_BVA.pdf` | `formules/permis-b-automatique.html:567`, `espace-eleves.html:346` |

---

## §6 — Zone interdite : montants à NE PAS toucher

Ces montants apparaissent dans les mêmes recherches mais **ne sont pas des tarifs Marti**.
Les modifier serait une erreur factuelle.

| Nature | Où |
|---|---|
| **Amendes et sanctions** | `blog/infractions-code-route.html` (~40 montants : 35/45/68/75/90/135/180/300/375/1 500/3 750/4 500/9 000/15 000 €) · `blog/quiz-sanctions.html` (légende l. 517-520 + tableau JS `questions` l. 646-665) · `blog/dangers-alcool.html:558,562,576` · `blog/reflexes-urgence-conduite.html:248,390` · `blog/regles-permis-probatoire.html:374-377,475,519-544` |
| **Stage de récupération de points** | `blog/regles-permis-probatoire.html:497` — « 200 à 300 € environ » (prestataire tiers) |
| **Examen du code (tarif d'État)** | `blog/reussir-code-route-premier-coup.html:656,659` — « 30 euros » *(seul montant en toutes lettres du site)* · `blog/combien-coute-permis-conduire-bayonne.html:199` — « environ 30€ » |
| **Prix d'appel concurrents** | `blog/auto-ecole-en-ligne-ou-marti.html:256` — « 199€ », « moins de 10€ par mois » · `:259` — « souvent 40€ à 50€ de l'heure » |
| **Exemple fictif** | `blog/combien-coute-permis-conduire-bayonne.html:250` — « un forfait à 1 000€ incluant seulement 15h » (concurrent imaginaire, sert la démonstration) |
| **Simulateur d'éco-conduite** | `blog/simulateur-ecoconduite.html:177,179,318-319,324-325,387-399` — prix du carburant et de l'électricité |
| **Avis clients** | `index.html` (JSON-LD `Review` + carrousel), `llms.txt:88-109` — « tarifs corrects », « prix attractif » : **ne jamais réécrire le texte d'un avis** |

---

## §7 — Procédure de mise à jour

0. **Réunir les informations** : ancienne grille (§1), nouvelle grille, nouvelle date d'effet.
   Vérifier si les volumes horaires inclus changent (§2.10) et si le contenu des forfaits
   change (libellés des lignes de détail).
1. **Mettre à jour le §1 de ce fichier en premier** — il devient la nouvelle référence, et
   tout le reste s'y compare.
2. **Dérouler la checklist du §3**, fichier par fichier, en cochant.
3. **Recalculer les valeurs dérivées** : totaux (somme des lignes), montant de la conduite
   incluse (h × prix horaire), 138 €/session, 368 € agrégé du devis. Vérifier les invariants
   du §1.
4. **Date d'effet** : mettre à jour les 12 occurrences (§2.11) **et l'ajouter** à `llms.txt`
   et `README.md`.
5. **Articles de blog touchés** : mettre à jour `dateModified` (JSON-LD) et
   `article:modified_time` (meta) — convention `CLAUDE.md`. Mettre à jour `<time datetime>`
   uniquement si la date de publication visible doit changer.
6. `npm run sitemap` (ou laisser la GitHub Action le faire au push).
7. **Lancer les contrôles du §8** et corriger tout hit non répertorié.
8. Mettre à jour le §2 de ce fichier si des occurrences ont été ajoutées ou supprimées, ainsi
   que la date de vérification en tête.

---

## §8 — Contrôles après modification

```bash
# 1) Plus aucune trace des ANCIENS montants (adapter les valeurs à chaque changement)
grep -rn "967\|1261\|1 261\|1&nbsp;261\|1629\|1 629\|1&nbsp;629" \
  --include=*.html --include=*.md --include=*.txt . | grep -v panneaux

# 2) Anciens tarifs horaires (vérifier le contexte : cf. zone interdite §6)
grep -rn "46 €\|46€\|48 €\|48€" --include=*.html --include=*.md --include=*.txt . \
  | grep -v panneaux

# 3) Anciennes lignes de détail
grep -rn "200,00\|50,00\|45,00\|624,00\|920,00\|92,00\|276,00\|138,00" --include=*.html .

# 4) Tous les prix JSON-LD d'un coup — doivent tous refléter la nouvelle grille
grep -rn '"price"' --include=*.html .

# 5) Cohérence de la date d'effet (doit renvoyer 12 fichiers-lignes, + llms.txt et README.md
#    une fois la date ajoutée — soit 14)
grep -rn "09/03/2026" --include=*.html --include=*.md --include=*.txt .

# 6) Config JS de l'estimateur de devis
sed -n '641,705p' devis.html
```

**Critère de réussite** : chaque résultat des commandes 1 à 4 doit être soit une occurrence
déjà mise à jour, soit un montant explicitement classé en **zone interdite (§6)**. Aucun hit
ne doit rester inexpliqué.
