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

- **Dernière vérification de l'inventaire** : 28 août 2026
- **Grille en vigueur sur le site** : celle affichée « à compter du 31/08/2026 » (§1)
- **Prochaine grille** : aucune programmée. La bascule du 31/08/2026 (ex-§1 bis/§1 ter) a été
  appliquée au site le 28 août 2026 ; son détail opérationnel (checklist, pièges spécifiques,
  contrôles exécutés) est archivé en §3/§4/§8 pour servir de modèle à la prochaine bascule.

---

## §1 — Grille en vigueur depuis le 31/08/2026 (source de vérité actuelle)

> Appliquée au site le 28/08/2026, d'après le tableau fourni par Yves le 05/08/2026 (3 tableaux :
> manuelle, BVA, AAC). **Changement structurant par rapport à la grille précédente** :
> l'évaluation de départ et l'accompagnement à l'examen ne sont plus des montants uniformes —
> ils sont désormais facturés au tarif horaire de la formule (voir « Historique » ci-dessous).

| Identifiant | Poste | BVA (automatique) | Manuelle | AAC |
|---|---|---|---|---|
| `TOTAL_*` | **Total TTC du forfait** | **1 055 €** | **1 375 €** | **1 775 €** |
| `DOSSIER` | Frais administratifs + dossier complet | 200,00 € | 200,00 € | 200,00 € |
| `CODE` | Pack code (salle + internet illimités + livre) | 75,00 € | 75,00 € | 75,00 € |
| `EVAL` | Évaluation de départ | 52,00 € | 50,00 € | 50,00 € |
| `H_INCLUSES` | Heures de conduite incluses | 13 h | 20 h | 20 h |
| `CONDUITE_*` | Montant de la conduite incluse | 676,00 € | 1 000,00 € | 1 000,00 € |
| `RDV_PREALABLE` | RDV préalable 2 h (accompagnateur) | — | — | 100,00 € |
| `RDV_PEDAGO` | 2 RDV pédagogiques (2 × 3 h) | — | — | 300,00 € |
| `EXAMEN` | Accompagnement / présentation examen | 52,00 € | 50,00 € | 50,00 € |
| `HEURE_SUP` | **Heure de conduite supplémentaire** | **52 €/h** | **50 €/h** | **50 €/h** |

Valeurs dérivées affichées telles quelles sur le site :

| Identifiant | Valeur | Origine |
|---|---|---|
| `SESSION_RDV` | 150,00 €/session | `RDV_PEDAGO` ÷ 2 |
| `RDV_AGREGE` | 400,00 € | `RDV_PREALABLE` + `RDV_PEDAGO` (utilisé par `devis.html` uniquement) |
| `EXAMEN_SUP` | **52 € (BVA) / 50 € (manuelle, AAC)** | Option « 2ᵉ passage » de l'estimateur de devis — différenciée par formule depuis cette bascule (`DEVIS_CONFIG.formules.<clé>.options`, voir §3 entrée 1) |
| `DATE_EFFET` | 31/08/2026 | Date d'entrée en vigueur affichée (13 occurrences + `llms.txt`/`README.md`, §2.11) |

### Invariants à revérifier après toute modification

```
BVA      : 200 + 75 + 52 + 676  + 52              = 1 055  ✓
Manuelle : 200 + 75 + 50 + 1000 + 50              = 1 375  ✓
AAC      : 200 + 75 + 50 + 1000 + 100 + 300 + 50  = 1 775  ✓
Conduite BVA      : 13 h × 52 € = 676 €   ✓
Conduite Man./AAC : 20 h × 50 € = 1 000 € ✓
RDV préalable     :  2 h × 50 € = 100 €   ✓
RDV pédagogiques  :  6 h × 50 € = 300 €   ✓
RDV agrégé devis  : 100 + 300   = 400 €   ✓
Session pédago    : 300 ÷ 2     = 150 €   ✓
```

### Historique — grille précédente (en vigueur du 09/03/2026 au 30/08/2026)

| Poste | BVA | Manuelle | AAC |
|---|---|---|---|
| Total TTC | 967 € | 1 261 € | 1 629 € |
| Dossier | 200,00 € | 200,00 € | 200,00 € |
| Pack code | 50,00 € | 50,00 € | 50,00 € |
| Évaluation de départ | 45,00 € | 45,00 € | 45,00 € |
| Conduite incluse | 624,00 € (13h) | 920,00 € (20h) | 920,00 € (20h) |
| RDV préalable | — | — | 92,00 € |
| RDV pédagogiques | — | — | 276,00 € |
| Accompagnement examen | 48,00 € | 46,00 € | 46,00 € |
| Heure supplémentaire | 48 €/h | 46 €/h | 46 €/h |

Écarts de la bascule du 31/08/2026 : Boîte auto +88 € (+9,1 %) · Boîte manuelle +114 € (+9,0 %) ·
AAC +146 € (+9,0 %) · Heure sup manuelle/AAC +4 € (+8,7 %) · Heure sup BVA +4 € (+8,3 %) · Pack
code +25 € (+50 %, motivé par le nouveau contenu du pack : accès salle + internet illimités +
livre). Décisions actées avec Yves le 05/08/2026, appliquées le 28/08/2026 :

1. L'heure supplémentaire hors forfait s'aligne sur le tarif horaire du forfait (50 €/h
   manuelle/AAC, 52 €/h BVA) — le tableau source ne donnait que la composition du forfait, point
   confirmé explicitement.
2. `devis.html`, option « Présentation supplémentaire à l'examen » : passée de globale à
   **par formule** (52 € BVA / 50 € manuelle & AAC) — seule modification de code de la bascule
   (§3 entrée 1).
3. `blog/combien-coute-permis-conduire-bayonne.html` — l'exemple fictif de concurrent « un
   forfait à 1 000€ incluant seulement 15h » a été porté à **1 100 €** pour ne plus entrer en
   collision avec le nouveau montant réel de la conduite incluse Marti (1 000 €).
4. `blog/auto-ecole-en-ligne-ou-marti.html` — la phrase « souvent 40€ à 50€ de l'heure »
   reprochée aux auto-écoles en ligne **n'a pas été modifiée**, malgré le chevauchement avec le
   nouveau tarif manuelle Marti (50 €/h) : décision explicite d'Yves, à garder en tête si un
   lecteur s'en étonne un jour.

---

## §2 — Inventaire par tarif

Chaque ligne donne le fichier, la ligne **au 28/08/2026** (les numéros bougent : se fier au
texte exact) et le **format d'écriture** — c'est le format qui piège les rechercher/remplacer.
Les montants ci-dessous sont ceux de la grille actuelle (§1) ; **revérifier chaque valeur par
grep avant la prochaine bascule**, cet inventaire décrit surtout les emplacements et formats.

### 2.1 — `TOTAL_BVA` = 1 055 €

| Fichier | Ligne | Format écrit | Contexte |
|---|---|---|---|
| `index.html` | 13, 16, 27 | `1 055€` | meta description / og / twitter |
| `index.html` | 102 | `"price": "1055"` | JSON-LD Offer « Forfait Permis B — Boîte automatique » |
| `index.html` | 333 | `1 055€` | **commentaire HTML** `<!-- BOÎTE AUTOMATIQUE — 1 055€ -->` |
| `index.html` | 337 | `1 055€` | `.formation-price` carte formule |
| `index.html` | 478 | `1 055€` | argumentaire « nos forfaits démarrent à… » |
| `formules/index.html` | 9, 11, 23 | `1 055€` | title / og:title / twitter:title |
| `formules/index.html` | 10, 12, 24 | `1 055€` | meta / og / twitter description |
| `formules/index.html` | 760 | `1&nbsp;055&nbsp;€` | chapô hero |
| `formules/index.html` | 781 | `1&nbsp;055&nbsp;€` | `.shortcut-price` raccourci BVA |
| `formules/index.html` | 1092, 1176 | `1 055€` | pastilles « autres formules » (résultats AAC et manuelle) |
| `formules/index.html` | 1117 | `1 055€` | `.result-price-display` résultat quiz BVA |
| `formules/index.html` | 1123 | `(1 055€)` | liste d'avantages du résultat BVA |
| `formules/permis-b-automatique.html` | 9 | `1 055 €` | `<title>` |
| `formules/permis-b-automatique.html` | 12, 14, 26 | `1 055€` | meta / og / twitter description |
| `formules/permis-b-automatique.html` | 53 | `"price": "1055"` | JSON-LD `Course` → `offers` |
| `formules/permis-b-automatique.html` | 282 | `1 055 €` | `.price-tag` hero |
| `formules/permis-b-automatique.html` | 301 | `1 055 €` | bloc « Le tarif le plus bas » |
| `formules/permis-b-automatique.html` | 336 | `1 055 €` | tableau comparatif (cellule highlight) |
| `formules/permis-b-automatique.html` | 369 | `1 055 €` | `.total-price` |
| `faq.html` | 63, 71 | `1 055 €` | JSON-LD FAQPage (2 réponses) |
| `faq.html` | 758, 772 | `1 055 €` | réponses visibles (miroir du JSON-LD) |
| `auto-ecole-anglet.html` | 12, 15, 27 | `1 055 €` | meta / og / twitter description |
| `auto-ecole-anglet.html` | 72 | `"price": "1055"` | JSON-LD OfferCatalog |
| `auto-ecole-anglet.html` | 107 | `1 055 €` | JSON-LD FAQPage |
| `auto-ecole-anglet.html` | 273, 306, 343 | `1 055 €` | bloc tarifs / carte formule / FAQ visible |
| `auto-ecole-biarritz.html` | 12, 15, 27, 72, 107, 273, 306, 343 | idem Anglet | structure strictement parallèle |
| `auto-ecole-bayonne.html` | 12, 15, 27 | `1 055 €` | meta / og / twitter description |
| `auto-ecole-bayonne.html` | 87 | `"price": "1055"` | JSON-LD OfferCatalog |
| `auto-ecole-bayonne.html` | 132 | `1 055 €` | JSON-LD FAQPage |
| `auto-ecole-bayonne.html` | 303, 374, 419 | `1 055 €` | bloc tarifs / carte formule / FAQ visible |
| `blog/combien-coute-permis-conduire-bayonne.html` | 12, 15, 29, 112 | `1 055€` | meta ×3 + JSON-LD BlogPosting `description` |
| `blog/combien-coute-permis-conduire-bayonne.html` | 219 | `1 055 €` | tableau comparatif |
| `blog/combien-coute-permis-conduire-bayonne.html` | 300, 325 | `1 055€` | carte article liée / titre CTA final |
| `blog/combien-coute-permis-conduire-bayonne.html` | 403 | `1 055€` | JSON-LD FAQPage |
| `blog/permis-lyceen-etudiant-bayonne.html` | 258 | `1 055 €` | tableau budget |
| `blog/permis-lyceen-etudiant-bayonne.html` | 321, 333 | `1 055 €` | FAQ visible |
| `blog/permis-lyceen-etudiant-bayonne.html` | 461, 485 | `1 055 €` | JSON-LD FAQPage (miroir de 321 et 333) |
| `blog/index.html` | 473 | `1 055€` | extrait de la carte article « Combien coûte… » |
| `llms.txt` | 3, 11, 49, 60, 117 | `1 055 €` | résumé, grille, section communes, FAQ, liste de liens |
| `README.md` | 26 | `**1 055 €**` | tableau des formations |
| `devis.html` | 650 | `base: 1055,` | `DEVIS_CONFIG.formules.bva` |

### 2.2 — `TOTAL_MANUEL` = 1 375 €

| Fichier | Ligne | Format écrit | Contexte |
|---|---|---|---|
| `index.html` | 94 | `"price": "1375"` | JSON-LD Offer « Forfait Permis B — Boîte manuelle » |
| `index.html` | 349 | `1 375€` | **commentaire HTML** |
| `index.html` | 354 | `1 375€` | `.formation-price` carte formule |
| `formules/index.html` | 10, 12, 24 | `1 375€` | meta / og / twitter description |
| `formules/index.html` | 760, 794 | `1&nbsp;375&nbsp;€` | chapô hero / raccourci |
| `formules/index.html` | 1093, 1137 | `1 375€` | pastilles « autres formules » |
| `formules/index.html` | 1156 | `1 375€` | résultat quiz manuelle |
| `formules/permis-b-manuel.html` | 9 | `1 375 €` | `<title>` |
| `formules/permis-b-manuel.html` | 12, 14, 26 | `1 375€` | meta / og / twitter description |
| `formules/permis-b-manuel.html` | 53 | `"price": "1375"` | JSON-LD `Course` → `offers` |
| `formules/permis-b-manuel.html` | 288 | `1 375 €` | `.price-tag` hero |
| `formules/permis-b-manuel.html` | 333 | `1 375 €` | `.total-price` |
| `formules/permis-b-automatique.html` | 337 | `1 375 €` | tableau comparatif (cellule « muted ») |
| `faq.html` | 71 | `1 375 €` | JSON-LD FAQPage |
| `faq.html` | 773 | `1 375 €` | réponse visible |
| `auto-ecole-anglet.html` | 73 | `"price": "1375"` | JSON-LD OfferCatalog |
| `auto-ecole-anglet.html` | 107, 312, 343 | `1 375 €` | JSON-LD FAQPage / carte formule / FAQ visible |
| `auto-ecole-biarritz.html` | 73, 107, 312, 343 | idem Anglet | — |
| `auto-ecole-bayonne.html` | 88 | `"price": "1375"` | JSON-LD OfferCatalog |
| `auto-ecole-bayonne.html` | 132, 380, 419 | `1 375 €` | JSON-LD FAQPage / carte formule / FAQ visible |
| `blog/combien-coute-permis-conduire-bayonne.html` | 12, 15, 29, 112 | `1 375€` | meta ×3 + JSON-LD |
| `blog/combien-coute-permis-conduire-bayonne.html` | 225 | `1 375 €` | tableau comparatif |
| `blog/combien-coute-permis-conduire-bayonne.html` | 250 | `1 375€` | comparaison narrative (⚠️ voisine d'un exemple fictif « 1 000€ », §6) |
| `blog/combien-coute-permis-conduire-bayonne.html` | 307 | `1 375€` | carte article liée |
| `blog/combien-coute-permis-conduire-bayonne.html` | 403 | `1 375€` | JSON-LD FAQPage |
| `blog/permis-lyceen-etudiant-bayonne.html` | 263, 321, 461 | `1 375 €` | tableau / FAQ visible / JSON-LD |
| **`blog/auto-ecole-en-ligne-ou-marti.html`** | **270** | **`1375€`** | ⚠️ **sans espace** — invisible à une recherche « 1 375 » |
| `blog/index.html` | 473 | `1 375€` | extrait de carte article |
| `llms.txt` | 12, 49, 60 | `1 375 €` | grille, communes, FAQ |
| `README.md` | 27 | `**1 375 €**` | tableau des formations |
| `devis.html` | 666 | `base: 1375,` | `DEVIS_CONFIG.formules.manuel` |

### 2.3 — `TOTAL_AAC` = 1 775 €

| Fichier | Ligne | Format écrit | Contexte |
|---|---|---|---|
| `index.html` | 110 | `"price": "1775"` | JSON-LD Offer « Forfait Conduite Accompagnée (AAC) » |
| `index.html` | 366 | `1 775€` | **commentaire HTML** |
| `index.html` | 370 | `1 775€` | `.formation-price` carte formule |
| `formules/index.html` | 10, 12, 24 | `1 775€` | meta / og / twitter description |
| `formules/index.html` | 760, 807 | `1&nbsp;775&nbsp;€` | chapô hero / raccourci |
| `formules/index.html` | 1072 | `1 775€` | résultat quiz AAC |
| `formules/index.html` | 1138, 1177 | `1 775€` | pastilles « autres formules » |
| `formules/conduite-accompagnee.html` | 12, 14, 26 | `1 775€` | meta / og / twitter description |
| `formules/conduite-accompagnee.html` | 53 | `"price": "1775"` | JSON-LD `Course` → `offers` |
| `formules/conduite-accompagnee.html` | 294 | `1 775 €` | `.price-tag` hero |
| `formules/conduite-accompagnee.html` | 350 | `1 775 €` | `.total-price` |
| `faq.html` | 71 | `1 775 €` | JSON-LD FAQPage |
| `faq.html` | 774 | `1 775 €` | réponse visible |
| `auto-ecole-anglet.html` | 74 | `"price": "1775"` | JSON-LD OfferCatalog |
| `auto-ecole-anglet.html` | 107, 318, 343 | `1 775 €` | JSON-LD FAQPage / carte formule / FAQ visible |
| `auto-ecole-biarritz.html` | 74, 107, 318, 343 | idem Anglet | — |
| `auto-ecole-bayonne.html` | 89 | `"price": "1775"` | JSON-LD OfferCatalog |
| `auto-ecole-bayonne.html` | 132, 386, 419 | `1 775 €` | JSON-LD FAQPage / carte formule / FAQ visible |
| `blog/combien-coute-permis-conduire-bayonne.html` | 12, 15, 29, 112 | `1 775€` | meta ×3 + JSON-LD |
| `blog/combien-coute-permis-conduire-bayonne.html` | 231, 314, 403 | `1 775 €` / `1 775€` | tableau / carte liée / JSON-LD FAQPage |
| `blog/permis-lyceen-etudiant-bayonne.html` | 268 | `1 775 €` | tableau budget |
| `blog/regles-permis-probatoire.html` | 328 | `1 775 € TTC` | lien CTA inline « Découvrir la formule AAC » |
| `blog/regles-permis-probatoire.html` | 720 | `1 775 € TTC` | `.cta-formule-prix` (⚠️ seule des 3 cartes CTA à afficher un prix — l. 727 et 734 disent « Découvrir les tarifs ») |
| `blog/index.html` | 473 | `1 775€` | extrait de carte article |
| `llms.txt` | 13, 49, 60, 118 | `1 775 €` | grille, communes, FAQ, liste de liens |
| `README.md` | 28 | `**1 775 €**` | tableau des formations |
| `CLAUDE.md` | 62 | ⚠️ `1 775 € TTC` | arborescence du projet *(anciennement `€1,629`, corrigé le 02/08/2026)* |
| `devis.html` | 682 | `base: 1775,` | `DEVIS_CONFIG.formules.aac` |

### 2.4 — `HEURE_SUP` manuelle / AAC = 50 €/h

⚠️ **Attention** : la valeur `50 €` recouvre **quatre postes distincts** en manuelle/AAC —
heure supplémentaire, présentation à l'examen, évaluation de départ et option 2ᵉ passage. Une
hausse peut ne concerner que l'un des quatre. Vérifier le contexte de chaque ligne avant de
remplacer, et ne jamais lancer un rechercher/remplacer global sur `50` (§4, piège 8) : ce même
« 50 » n'a plus rien à voir avec le pack code depuis cette bascule, mais la prochaine
introduira sans doute une nouvelle collision numérique du même genre.

| Fichier | Ligne | Format écrit | Contexte |
|---|---|---|---|
| `index.html` | 115 | `"price": "50"` | JSON-LD Offer « Leçon de conduite — Boîte manuelle » |
| `index.html` | 266 | `50€` | stat hero « L'heure de conduite » |
| `index.html` | 350 | `50€/h` | note carte formule manuelle |
| `index.html` | 366 | `50€/h` | note carte formule AAC |
| `index.html` | 395 | `50€ TTC` | badge « heure de conduite supplémentaire » |
| `formules/index.html` | 1073 | `50€/h` | note résultat quiz AAC |
| `formules/index.html` | 1157 | `50€/h` | note résultat quiz manuelle |
| `formules/permis-b-manuel.html` | 360 | `Soit 50,00 €/heure` | détail ligne conduite |
| `formules/permis-b-manuel.html` | 373 | `50,00 €/heure` | note sous le tableau tarifaire |
| `formules/permis-b-automatique.html` | 342 | `50 €/h` | tableau comparatif (colonne manuelle) |
| `formules/conduite-accompagnee.html` | 377 | `Soit 50,00 €/heure` | détail ligne conduite |
| `faq.html` | 55, 71 | `50 €/h` | JSON-LD FAQPage (2 réponses) |
| `faq.html` | 744, 776 | `50 €/h` | réponse visible + encart « tip » |
| `auto-ecole-anglet.html` | 107 | `50 €` | JSON-LD FAQPage |
| `auto-ecole-biarritz.html` | 107 | `50 €` | JSON-LD FAQPage |
| `auto-ecole-bayonne.html` | 132, 419 | `50 €` | JSON-LD FAQPage + FAQ visible (⚠️ les 2, contrairement à Anglet/Biarritz) |
| `blog/combien-coute-permis-conduire-bayonne.html` | 241 | `50 €/h` | callout heures supplémentaires |
| `blog/combien-coute-permis-conduire-bayonne.html` | 411 | `50€/h` | JSON-LD FAQPage |
| `blog/permis-lyceen-etudiant-bayonne.html` | 274, 321 | `50 €` | note tableau / FAQ visible |
| `blog/permis-lyceen-etudiant-bayonne.html` | 461 | `50 €` | JSON-LD FAQPage |
| `llms.txt` | 14, 54 | `50 €/heure` | grille / FAQ |
| `README.md` | 18 | `**50 €** / heure` | tableau « chiffres clés » (indique désormais aussi le 52 €/h BVA sur la ligne suivante) |
| `devis.html` | 671, 690 | `prixHeureSup: 50,` | `DEVIS_CONFIG` manuel + aac, + `options[].prix: 50` des deux formules |

### 2.5 — `HEURE_SUP` automatique = 52 €/h

⚠️ Même remarque qu'en §2.4 : `52 €` recouvre **quatre** postes BVA — heure supplémentaire,
présentation à l'examen, évaluation de départ et option 2ᵉ passage.

| Fichier | Ligne | Format écrit | Contexte |
|---|---|---|---|
| `index.html` | 122 | `"price": "52"` | JSON-LD Offer « Leçon de conduite — Boîte automatique » |
| `index.html` | 333 | `52€/h` | note carte formule BVA |
| `index.html` | 399 | `52€ TTC` | badge « heure de conduite supplémentaire » |
| `formules/index.html` | 1118 | `52€/h` | note résultat quiz BVA |
| `formules/permis-b-automatique.html` | 341 | `52 €/h` | tableau comparatif |
| `formules/permis-b-automatique.html` | 396 | `Soit 52,00 €/heure` | détail ligne conduite |
| `faq.html` | 55, 71 | `52 €/h` | JSON-LD FAQPage |
| `faq.html` | 744, 776 | `52 €/h` | réponse visible + encart « tip » |
| `auto-ecole-anglet.html` | 107 | `52 €` | JSON-LD FAQPage |
| `auto-ecole-biarritz.html` | 107 | `52 €` | JSON-LD FAQPage |
| `auto-ecole-bayonne.html` | 132, 419 | `52 €` | JSON-LD FAQPage + FAQ visible (⚠️ les 2, contrairement à Anglet/Biarritz) |
| `blog/combien-coute-permis-conduire-bayonne.html` | 241, 411 | `52 €/h` / `52€/h` | callout / JSON-LD FAQPage |
| `blog/permis-lyceen-etudiant-bayonne.html` | 274, 321, 461 | `52 €` | note tableau / FAQ visible / JSON-LD |
| `llms.txt` | 15, 54 | `52 €/heure` | grille / FAQ |
| `devis.html` | 652, 662 | `prixHeureSup: 52,` | `DEVIS_CONFIG.formules.bva`, + `options[0].prix: 52` |

### 2.6 — `DOSSIER` = 200,00 € (identique aux 3 formules)

*Seul poste qui n'a pas bougé lors de la bascule du 31/08/2026. Le tableau source d'Yves
l'intitulait « Frais administratifs + dossier complet » — harmonisation de libellé restée
optionnelle, le site dit « Frais administratifs + dossier » (BVA, manuelle) ou « Frais
administratifs » (AAC).*

| Fichier | Ligne | Libellé affiché |
|---|---|---|
| `formules/permis-b-automatique.html` | 377 | « Frais administratifs + dossier » |
| `formules/permis-b-manuel.html` | 341 | « Frais administratifs + dossier » |
| `formules/conduite-accompagnee.html` | 358 | « Frais administratifs » |
| `devis.html` | 655, 674, 693 | `{ label: "Frais de dossier & inscription", prix: 200 }` ×3 |

### 2.7 — `CODE` = 75,00 € (identique aux 3 formules)

⚠️ **Piège du prochain changement de grille** : `75,00 €` est aujourd'hui exclusivement le pack
code. S'il devient un jour numériquement proche d'un autre poste (comme `50,00 €` l'était pour
le pack code et le tarif horaire avant cette bascule), retraiter en premier dans chaque fichier
et ne jamais lancer de rechercher/remplacer global (§4, piège 8).

| Fichier | Ligne | Libellé affiché |
|---|---|---|
| `formules/permis-b-automatique.html` | 384 | « Pack code » |
| `formules/permis-b-manuel.html` | 348 | « Pack code » |
| `formules/conduite-accompagnee.html` | 365 | « Pack code » |
| `devis.html` | 656, 675, 694 | `{ id: "code", label: "Pack code de la route", prix: 75 }` ×3 |

⚠️ Dans `devis.html`, la ligne `id: "code"` est **déduite du total** quand l'utilisateur coche
« J'ai déjà le code » (fonction `prixCode()` l. 725-728). Changer ce montant change aussi la
réduction affichée.

### 2.8 — `EVAL` — différenciée par formule depuis le 31/08/2026 : 52,00 € (BVA) / 50,00 € (manuelle, AAC)

🔴 **Changement de structure acté lors de cette bascule** : l'évaluation de départ, autrefois un
montant unique (45,00 €), est désormais facturée au tarif horaire de la formule. Ne jamais
supposer une cible unique pour ce poste lors d'un prochain ajustement.

| Fichier | Ligne | Libellé affiché | Valeur |
|---|---|---|---|
| `formules/permis-b-automatique.html` | 391 | « Évaluation de départ » | **52,00 €** |
| `formules/permis-b-manuel.html` | 355 | « Évaluation de départ » | **50,00 €** |
| `formules/conduite-accompagnee.html` | 372 | « Évaluation de départ » | **50,00 €** |
| `devis.html` | 657 | `{ label: "Évaluation de départ", prix: 52 }` (bva) | 52 € |
| `devis.html` | 676 | idem (manuel) | 50 € |
| `devis.html` | 695 | idem (aac) | 50 € |

### 2.9 — `CONDUITE_*`, `EXAMEN`, RDV pédagogiques

| Montant | Fichier | Ligne | Contexte |
|---|---|---|---|
| **676,00 €** (13 h × 52 €/h BVA) | `formules/permis-b-automatique.html` | 398 | ligne « 13h de conduite minimum » |
| | `devis.html` | 658 | `{ label: "13 h de conduite incluses", detail: "Soit 52 €/h", prix: 676 }` |
| **1 000,00 €** (20 h × 50 €/h manuelle/AAC) | `formules/permis-b-manuel.html` | 362 | ligne « 20h de conduite minimum » |
| | `formules/conduite-accompagnee.html` | 379 | ligne « 20h de conduite minimum » |
| | `devis.html` | 677, 696 | `prix: 1000`, `detail: "Soit 50 €/h"` (manuel + aac) |
| **100,00 €** | `formules/conduite-accompagnee.html` | 386 | « 1 RDV préalable · 2h — formation de l'accompagnateur » |
| **300,00 €** | `formules/conduite-accompagnee.html` | 393 | « 2 RDV pédagogiques » |
| **150,00 €/session** | `formules/conduite-accompagnee.html` | 391 | détail « 2 × 3h — soit 150,00 €/session » |
| **400,00 €** | `devis.html` | 697 | ⚠️ `{ label: "RDV préalable + 2 RDV pédagogiques", prix: 400 }` — **agrège 100 + 300**, contrairement à la page AAC qui les sépare. Garder les deux cohérents. |
| **52,00 €** (examen BVA) | `formules/permis-b-automatique.html` | 405 | « Accompagnement à l'examen · 1 présentation incluse » |
| | `devis.html` | 659 | `{ label: "Présentation à l'examen", prix: 52 }` |
| **50,00 €** (examen manuelle) | `formules/permis-b-manuel.html` | 369 | « Accompagnement à l'examen » |
| | `devis.html` | 678 | `{ label: "Présentation à l'examen", prix: 50 }` |
| **50,00 €** (examen AAC) | `formules/conduite-accompagnee.html` | 400 | « Accompagnement à l'examen » |
| | `devis.html` | 698 | `{ label: "Présentation à l'examen", prix: 50 }` |
| **52 € BVA / 50 € manuelle+AAC** (`EXAMEN_SUP`) | `devis.html` | 662, 681, 701 | option cochable « Présentation supplémentaire à l'examen · En cas de 2ᵉ passage », **une par formule** dans `DEVIS_CONFIG.formules.<clé>.options` |

🔴 **`EXAMEN_SUP` a été rendu différencié par formule lors de cette bascule — seule modification
de code de toute l'opération.** Avant le 31/08/2026, `devis.html` déclarait `options` comme une
liste **globale**, commune aux trois formules, avec un prix unique de 46 €. Un prix unique ne
convenait plus (52 € en BVA, 50 € ailleurs), donc l'option a été déplacée **dans chaque objet
formule** (`DEVIS_CONFIG.formules.bva.options`, `.manuel.options`, `.aac.options` — l. 662, 681,
701). Trois points de lecture ont dû être adaptés en conséquence, et doivent continuer à lire
`DEVIS_CONFIG.formules[state.formule].options` (jamais une liste globale) :
- `buildOptions()` (l. 759-772) — construction des cases à cocher, rappelée à chaque changement
  de formule (l. 752) car le prix affiché en dépend ;
- `render()` (l. 817-820) — ajout au total via `f.options.forEach(...)` ;
- `updateEmailCta()` (l. 860-862) — récapitulatif e-mail via `f.options.filter(...)`.

### 2.10 — Volumes horaires réglementaires (13 h / 20 h)

Ils accompagnent presque toujours un prix. Adossés au minimum légal, à ne changer que si le
contenu du forfait change réellement. La bascule du 31/08/2026 a conservé 13 h / 20 h, ainsi que
les 2 h de RDV préalable et les 2 × 3 h de RDV pédagogiques — seuls les tarifs horaires qui les
accompagnent ont changé (« 20 h à 46 €/h » → « 20 h à 50 €/h », volume inchangé).

`index.html:333,350` · `formules/index.html:782,795` · `formules/permis-b-*.html`
(titres, meta, lignes de détail) · `faq.html:63,71,758,772,773` · `llms.txt:54` ·
`README.md:26,27` · `blog/combien-coute-permis-conduire-bayonne.html:219,225,250` ·
`blog/permis-lyceen-etudiant-bayonne.html:258,263,321` ·
`devis.html:651,670,689` (`hIncluses`).

### 2.11 — `DATE_EFFET` = 31/08/2026 — **16 occurrences**

*(13 occurrences historiques sur le site + `llms.txt` (2) et `README.md` (1), qui n'en portaient
pas avant cette bascule et ont été complétés — cf. entrée ci-dessous.)*

| Fichier | Ligne | Formulation |
|---|---|---|
| `index.html` | 403 | « * Tarifs TTC à compter du 31/08/2026. » |
| `faq.html` | 71 | JSON-LD — « Tarifs TTC en vigueur à compter du 31/08/2026. » |
| `faq.html` | 776 | encart « tip » visible (miroir) |
| `formules/permis-b-automatique.html` | 363 | sous-titre du bloc tarifaire |
| `formules/permis-b-automatique.html` | **521** | mention de pied de page |
| `formules/permis-b-manuel.html` | 327 | sous-titre du bloc tarifaire |
| `formules/permis-b-manuel.html` | **485** | mention de pied de page |
| `formules/conduite-accompagnee.html` | 344 | sous-titre du bloc tarifaire |
| `formules/conduite-accompagnee.html` | **580** | mention de pied de page |
| `auto-ecole-anglet.html` | 302 | sous-titre du bloc formules |
| `auto-ecole-biarritz.html` | 302 | sous-titre du bloc formules |
| `auto-ecole-bayonne.html` | 370 | sous-titre du bloc formules |
| `devis.html` | 639 | commentaire « (Tarifs relevés sur le site au 31/08/2026 — à confirmer/actualiser.) » |
| `llms.txt` | 16, 62 | ajoutée lors de cette bascule (grille + FAQ tarifs) |
| `README.md` | 31 | ajoutée lors de cette bascule (note sous le tableau des formations) |

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

## §3 — Checklist par fichier (historique de la bascule du 31/08/2026)

Ordre de travail suivi pour cette bascule, du plus structurant au plus périphérique — conservé
comme **modèle** pour la prochaine (même enchaînement de fichiers, même prudence sur l'ordre
interne à chaque bloc). **19 fichiers** porteurs de tarifs + `ROADMAP.md`, tous traités et
vérifiés (§8) le 28/08/2026.

> **Règle d'or, valable pour toute future bascule** : à l'intérieur d'un fichier, traiter les
> blocs tarifaires **ligne par ligne, de haut en bas**, en commençant toujours par le poste dont
> l'ancienne valeur risque de coïncider avec une nouvelle valeur d'un autre poste (ici, le pack
> code 50 → 75, avant que `50` ne redevienne le tarif horaire manuelle/AAC). Jamais de
> rechercher/remplacer global sur un nombre à deux chiffres tant que tous ses usages n'ont pas
> été identifiés (§4, piège 8).

- [x] **1. `devis.html`** — objet `DEVIS_CONFIG` (`base`, `hIncluses`, `prixHeureSup`, tableau
      `lignes` des 3 formules) + commentaires l. 620/639.
      🔴 **Seule modification de code de toute la bascule** : l'option `examenSup`, jusque-là
      **globale** (`DEVIS_CONFIG.options`), a été déplacée **dans chaque objet formule**
      (`DEVIS_CONFIG.formules.<clé>.options`, l. 662/681/701 — 52 € BVA / 50 € manuelle & AAC).
      Trois points de lecture adaptés en conséquence : `buildOptions()` (l. 759-772, rappelée à
      chaque changement de formule l. 752), `render()` (l. 817, `f.options.forEach`),
      `updateEmailCta()` (l. 860, `f.options.filter`). Détail au §2.9.
- [x] **2. `formules/permis-b-automatique.html`** — title, meta, JSON-LD, hero, tableau
      comparatif, sous-titre, total, détail tarifaire, pied de page.
- [x] **3. `formules/permis-b-manuel.html`** — title, meta, JSON-LD, hero, sous-titre, total,
      détail tarifaire, note, pied de page.
- [x] **4. `formules/conduite-accompagnee.html`** — meta, JSON-LD, hero, sous-titre, total,
      détail tarifaire, pied de page.
- [x] **5. `formules/index.html`** — title, meta, chapô hero, raccourcis des 3 formules,
      résultats du quiz (3 écrans + pastilles croisées « autres formules »).
- [x] **6. `index.html`** — meta, JSON-LD Offers (5 prix), stat hero, 3 commentaires HTML,
      cartes formules, bloc heure sup, note de date, argumentaire.
- [x] **7. `faq.html`** — JSON-LD **et** son miroir visible tenus identiques.
- [x] **8. `auto-ecole-anglet.html`** — meta, OfferCatalog, FAQPage JSON-LD, bloc tarifs,
      sous-titre, cartes, FAQ visible.
- [x] **9. `auto-ecole-biarritz.html`** — structure strictement parallèle à Anglet.
- [x] **10. `auto-ecole-bayonne.html`** — idem, avec une FAQ **visible** qui porte aussi les
      tarifs horaires (contrairement à Anglet/Biarritz) : tenue identique au JSON-LD.
- [x] **11. `blog/combien-coute-permis-conduire-bayonne.html`** — meta, JSON-LD BlogPosting,
      tableau, callout, cartes liées, CTA, JSON-LD FAQPage, `dateModified` + `article:modified_time`.
      🔴 L'exemple fictif de concurrent « un forfait à 1 000€ incluant seulement 15h » a été
      porté à **1 100 €** (seule dérogation à la zone interdite du §6, explicitement validée).
- [x] **12. `blog/permis-lyceen-etudiant-bayonne.html`** — tableau, note, FAQ visible, JSON-LD
      FAQPage, dates.
- [x] **13. `blog/regles-permis-probatoire.html`** — 2 CTA AAC, dates.
- [x] **14. `blog/auto-ecole-en-ligne-ou-marti.html`** — format **`1261€`** → `1375€` (sans
      espace, repéré manuellement), dates. La phrase « souvent 40€ à 50€ de l'heure » reprochée
      aux plateformes en ligne **n'a pas été modifiée** — décision d'Yves du 05/08/2026, malgré
      le chevauchement avec le tarif manuelle Marti (50 €/h désormais).
- [x] **15. `blog/index.html`** — extrait de carte article.
- [x] **16. `llms.txt`** — grille, tarifs horaires, FAQ, liste de liens, date d'effet ajoutée.
- [x] **17. `README.md`** — tableau formations, tarif horaire manuelle/AAC, tarif horaire BVA
      ajouté (absent auparavant), date d'effet ajoutée.
- [x] **18. `CLAUDE.md`** — mention du prix AAC dans l'arborescence.
- [x] **19. `TARIFS.md`** (ce fichier) — §1 bis promu en §1, ancienne grille et §1 ter archivés
      en « Historique », cibles reportées dans le §2, date de vérification mise à jour.
- [x] **20. `ROADMAP.md`** — rubrique « Changement de grille tarifaire » close (§4 ci-après pour
      les pièges rencontrés).

---

## §4 — Pièges connus

1. **Neuf formats d'écriture** pour le même montant. Un rechercher/remplacer sur `1 375 €`
   rate à lui seul 5 variantes :

   | Format | Où | Exemple |
   |---|---|---|
   | `1 055€` | contenu, meta | `index.html:332` |
   | `1 055 €` | contenu | `faq.html:772` |
   | `1&nbsp;055&nbsp;€` | entités HTML | `formules/index.html:781` |
   | `1&nbsp;375&nbsp;€` | entités HTML | `formules/index.html:794` |
   | `1375€` | **sans espace** | `blog/auto-ecole-en-ligne-ou-marti.html:270` |
   | `"1055"` | JSON-LD | `index.html:101` |
   | `1 000,00 €` | virgule + décimales + séparateur de milliers | `formules/permis-b-manuel.html:362` |
   | `**1 055 €**` | Markdown gras | `README.md:26` |
   | `50€/h`, `50 €/heure` | unités variables | `index.html:350`, `llms.txt:14` |

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
5. **Un même montant recouvre plusieurs postes distincts** : `50 €` désigne à la fois l'heure
   sup, l'accompagnement examen, l'évaluation de départ et l'option 2ᵉ passage (manuelle/AAC) ;
   `52 €` les mêmes postes en BVA. Vérifier le contexte de chaque ligne avant de remplacer.
6. **`devis.html` agrège les RDV AAC** (`{ label: "RDV préalable + 2 RDV pédagogiques", prix: 400 }`,
   l. 697) là où la page AAC les affiche séparément (100 € + 300 €). Garder les deux cohérents
   si l'un des deux montants change.
7. **`quizz/panneaux/AB25.svg`** ressort sur une recherche « € » : c'est un panneau routier,
   sans rapport. Toujours filtrer avec `| grep -v panneaux`.

### Pièges rencontrés lors de la bascule du 31/08/2026 (illustratifs pour la prochaine)

8. 🔴 **Un même nombre peut changer de sens en cours d'opération — le piège le plus
   dangereux.** Lors de cette bascule, `50,00 €` était à la fois l'ancien prix du pack code
   *et* le nouveau tarif horaire manuelle/AAC : dans un fichier à moitié migré, un `50,00 €`
   restant était indécidable (déjà à jour, ou pas encore traité ?). **Règle générale** : dans
   chaque bloc tarifaire, traiter en premier le poste dont l'ancienne valeur risque de
   coïncider avec une nouvelle valeur d'un autre poste, puis descendre ligne par ligne.
   **Jamais de rechercher/remplacer global** sur un nombre qui a plusieurs significations
   possibles dans le même fichier.
9. **Un total qui change de nombre de chiffres** (ici `967` → `1 055`, passage de 3 à 4
   chiffres) n'est pas une simple substitution : il faut **ajouter le séparateur de milliers**
   déjà employé par les autres totaux dans le même fichier (`1 055 €`, `1&nbsp;055&nbsp;€`,
   `"1055"`), puis contrôler visuellement que les conteneurs ne débordent pas :
   `.formation-price` (`index.html`), `.shortcut-price` et `.result-price-display`
   (`formules/index.html`), `.price-tag` et `.total-price`
   (`formules/permis-b-automatique.html`), cartes formules des 3 pages locales.
10. **Une ligne de détail peut franchir le seuil des 4 chiffres** (`920,00 €` → `1 000,00 €`),
    introduisant une espace de milliers qui n'existait pas à cet endroit. Rester cohérent avec
    le format déjà en usage ailleurs dans le fichier (`1 000,00 €` sur les pages formules,
    `prix: 1000` dans `devis.html`).
11. **Un poste jusque-là uniforme peut se différencier par formule** (ici l'évaluation de
    départ et l'option « 2ᵉ passage » du devis, alignées sur le tarif horaire de chaque
    formule) : vérifier qu'aucune occurrence n'a été remplacée par un montant global unique
    quand la cible réelle dépend du fichier/de la formule (§2.8, §2.9).
12. **Un montant en zone interdite peut entrer en collision avec la nouvelle grille** — ici
    l'exemple fictif de concurrent « 1 000€ » de `blog/combien-coute-permis-conduire-bayonne.html`
    coïncidait avec le nouveau montant réel de la conduite incluse (1 000 €) : porté à 1 100 €
    après validation explicite d'Yves (§1, « Historique »), seule dérogation acceptée à la
    règle du §6 — ne jamais modifier la zone interdite de sa propre initiative.

---

## §5 — Hors dépôt : les 3 plaquettes PDF

Elles sont publiquement téléchargeables et présentées comme contenant « les tarifs en
vigueur » (`espace-eleves.html:333`). **Claude ne peut pas les régénérer** — c'est une tâche
manuelle pour Yves, à faire en même temps que la mise à jour du site.

✅ **Faites par Yves.** Les trois PDF ont été remplacés le 28/08/2026 (commit « Add files via
upload ») et portent déjà la grille du §1 (1 055 / 1 375 / 1 775 €, pack code à 75 €, évaluation
et accompagnement examen au tarif horaire de la formule) ainsi que la date du 31/08/2026 —
vérifié en relisant leur contenu.

| Fichier | Lié depuis |
|---|---|
| `plaquettes/Plaquette_AAC.pdf` | `formules/conduite-accompagnee.html:627`, `espace-eleves.html:336` |
| `plaquettes/Plaquette_Permis_B_Manuel.pdf` | `formules/permis-b-manuel.html:532`, `espace-eleves.html:341` |
| `plaquettes/Plaquette_Permis_B_BVA.pdf` | `formules/permis-b-automatique.html:568`, `espace-eleves.html:346` |

---

## §6 — Zone interdite : montants à NE PAS toucher

Ces montants apparaissent dans les mêmes recherches mais **ne sont pas des tarifs Marti**.
Les modifier serait une erreur factuelle.

| Nature | Où |
|---|---|
| **Amendes et sanctions** | `blog/infractions-code-route.html` (~40 montants : 35/45/68/75/90/135/180/300/375/1 500/3 750/4 500/9 000/15 000 €) · `blog/quiz-sanctions.html` (légende l. 517-520 + tableau JS `questions` l. 646-665) · `blog/dangers-alcool.html:558,562,576` · `blog/reflexes-urgence-conduite.html:248,390` · `blog/regles-permis-probatoire.html:374-377,475,519-544` |
| **Stage de récupération de points** | `blog/regles-permis-probatoire.html:497` — « 200 à 300 € environ » (prestataire tiers) |
| **Examen du code (tarif d'État)** | `blog/reussir-code-route-premier-coup.html:656,659` — « 30 euros » *(seul montant en toutes lettres du site)* · `blog/combien-coute-permis-conduire-bayonne.html:199` — « environ 30€ » |
| **Prix d'appel concurrents** | `blog/auto-ecole-en-ligne-ou-marti.html:256` — « 199€ », « moins de 10€ par mois » · `:259` — « souvent 40€ à 50€ de l'heure » ⚠️ chevauche le tarif manuelle Marti (50 €/h depuis le 31/08/2026) mais **reste inchangée** : décision d'Yves du 05/08/2026 |
| **Exemple fictif** | `blog/combien-coute-permis-conduire-bayonne.html:251` — « un forfait à 1 100€ incluant seulement 15h » (concurrent imaginaire, sert la démonstration). Porté de 1 000 € à **1 100 €** lors de la bascule du 31/08/2026, car 1 000 € désignait désormais la ligne « 20 h de conduite » réelle de Marti (§4 piège 12) — seule dérogation jamais accordée à cette zone interdite. |
| **Simulateur d'éco-conduite** | `blog/simulateur-ecoconduite.html:177,179,318-319,324-325,387-399` — prix du carburant et de l'électricité |
| **Avis clients** | `index.html` (JSON-LD `Review` + carrousel), `llms.txt:88-109` — « tarifs corrects », « prix attractif » : **ne jamais réécrire le texte d'un avis** |

---

## §7 — Procédure de mise à jour

0. **Réunir les informations** : grille actuelle (§1), nouvelle grille, nouvelle date d'effet.
   Vérifier si les volumes horaires inclus changent (§2.10) et si le contenu des forfaits
   change (libellés des lignes de détail). Bâtir une table de correspondance ancien → nouveau,
   montant par montant et format par format (voir §4 piège 1 pour la liste des formats), avant
   de commencer — c'est ce qui a été fait pour la bascule du 31/08/2026 (§1, « Historique »).
1. **Mettre à jour le §1 de ce fichier en premier** — il devient la nouvelle référence, et
   tout le reste s'y compare. Basculer l'ancienne grille dans un paragraphe « Historique ».
2. **Dérouler une checklist par fichier** sur le modèle du §3 (même ordre : `devis.html` puis
   les pages formules, la home, la FAQ, les pages locales, le blog, puis la documentation).
   ⚠️ **Ordre imposé à l'intérieur de chaque bloc tarifaire** : identifier d'abord si une
   ancienne valeur va coïncider avec une nouvelle valeur d'un autre poste (comme le pack code
   qui devenait indiscernable du futur tarif horaire lors de cette bascule, §4 piège 8) et la
   traiter en premier, puis descendre ligne par ligne. **Aucun rechercher/remplacer global**
   sur un montant dont le sens peut varier selon l'endroit.
3. **Recalculer les valeurs dérivées** : totaux (somme des lignes), montant de la conduite
   incluse (h × prix horaire), le prix par session pédagogique, le montant agrégé des RDV du
   devis. Vérifier les invariants du §1.
4. **Date d'effet** : mettre à jour les 13 occurrences (§2.11) **et l'ajouter** à `llms.txt`
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

Gabarit de commandes, exécutées et validées pour la bascule du 31/08/2026 (résultats ci-dessous)
— à ré-adapter aux nouveaux montants lors de la prochaine bascule.

### A — Les ANCIENS montants ont disparu

```bash
# 1) Anciens totaux — doit renvoyer 0 hit
grep -rn "967\|1261\|1 261\|1&nbsp;261\|1629\|1 629\|1&nbsp;629" \
  --include=*.html --include=*.md --include=*.txt . | grep -v panneaux

# 2) Anciens tarifs horaires 46/48 — 0 hit attendu HORS zone interdite §6
grep -rn "46 €\|46€\|48 €\|48€\|46,00\|48,00" \
  --include=*.html --include=*.md --include=*.txt . | grep -v panneaux

# 3) Anciennes lignes de détail — seul 200,00 (inchangé) doit rester
grep -rn "45,00\|624,00\|920,00\|92,00\|276,00\|138,00\|368" --include=*.html .

# 4) Ancienne date d'effet — 0 hit
grep -rn "09/03/2026" --include=*.html --include=*.md --include=*.txt .
```

### B — Les NOUVEAUX montants sont bien partout

```bash
# 5) Nouveaux totaux (tous formats, y compris l'espace insécable et le JSON-LD)
grep -rl "1 055\|1055\|1&nbsp;055\|1 375\|1375\|1&nbsp;375\|1 775\|1775\|1&nbsp;775" \
  --include=*.html --include=*.md --include=*.txt . | grep -v panneaux

# 6) Nouveaux tarifs horaires (⚠️ vérifier le CONTEXTE de chaque « 50 » : heure sup,
#    évaluation, accompagnement examen — et plus jamais le pack code)
grep -rn "50 €\|50€\|52 €\|52€\|50,00\|52,00" \
  --include=*.html --include=*.md --include=*.txt . | grep -v panneaux

# 7) Nouvelles lignes de détail
grep -rn "75,00\|676,00\|1 000,00\|100,00\|300,00\|150,00\|400" --include=*.html .

# 8) Nouvelle date d'effet — 13 emplacements historiques + llms.txt (2) + README.md (1) = 16
#    attendus, hors TARIFS.md/ROADMAP.md
grep -rn "31/08/2026" --include=*.html --include=*.md --include=*.txt .

# 9) Tous les prix JSON-LD d'un coup — doivent tous refléter la nouvelle grille
#    (attendu : 1055 / 1375 / 1775 pour les forfaits, 50 / 52 pour les leçons)
grep -rn '"price"' --include=*.html .

# 10) Config JS de l'estimateur de devis (relecture intégrale de DEVIS_CONFIG)
sed -n '641,704p' devis.html
```

**Résultats de l'exécution du 28/08/2026** :
- Bloc A : **aucun hit** sur le site — les 2 seuls hits bruts venaient de coordonnées SVG dans
  `blog/100-questions-permis-b-jour-examen.html` (`id="g10556"`, chemins `<path>`, sans rapport
  avec un prix, cf. §4 piège 7) et d'un exemple de format dans `CLAUDE.md` (mis à jour au passage).
  `ROADMAP.md:18` portait encore `09/03/2026` avant la clôture de sa rubrique (§3 entrée 20).
- Bloc B : les 18 fichiers attendus (les 3 pages formules détail, `formules/index.html`,
  `index.html`, `faq.html`, les 3 pages locales, 5 articles de blog + `blog/index.html`,
  `llms.txt`, `README.md`, `devis.html`, `CLAUDE.md`) portent bien les nouveaux montants ; les
  9 occurrences `"price"` en JSON-LD reflètent toutes la nouvelle grille (1055/1375/1775 pour
  les forfaits — `index.html` ×3, `auto-ecole-anglet/biarritz/bayonne.html` ×3 chacune,
  `formules/permis-b-*.html` + `conduite-accompagnee.html` ×1 chacune ; 50/52 pour les leçons
  — `index.html` ×2).

**Critère de réussite** :
- Bloc A : **aucun hit**, sauf les montants explicitement classés en **zone interdite (§6)**.
- Bloc B : chaque hit doit être une occurrence **voulue** ; en particulier, aucun montant du
  poste qui servait de piège numérique (ici le pack code) ne doit plus désigner l'ancien poste,
  et aucun total qui a gagné un chiffre ne doit rester sans séparateur de milliers (§4, piège 9).
- Aucun hit ne doit rester inexpliqué dans l'un ou l'autre bloc.
