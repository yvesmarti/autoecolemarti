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
> 📌 **Pour la bascule du 31/08/2026, la grille est déjà écrite ici** : il suffira de demander
> *« Applique la grille du §1 bis de TARIFS.md »* — nouveaux montants (§1 bis), correspondances
> format par format (§1 ter), ordre d'exécution (§3, §7) et contrôles (§8) sont prêts.
>
> ⚠️ **Ce fichier doit être mis à jour EN MÊME TEMPS que les tarifs** (§7, étape 1), sinon il
> devient faux et perd tout intérêt.

- **Dernière vérification de l'inventaire** : 5 août 2026
- **Grille en vigueur sur le site** : celle affichée « à compter du 09/03/2026 » (§1)
- **Prochaine grille** : **31/08/2026** — figée au **§1 bis**, correspondances au **§1 ter**.
  ⚠️ **Non encore appliquée au site.** Aucun fichier HTML/JS/MD n'a été modifié : ce document
  est la feuille de route de la bascule, à dérouler fin août.

---

## §1 — Grille en vigueur jusqu'au 30/08/2026 (source de vérité actuelle)

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
| `DATE_EFFET` | 09/03/2026 | Date d'entrée en vigueur affichée (13 occurrences, §2.11) |

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

## §1 bis — Grille à appliquer le 31/08/2026 (cible)

> Établie d'après le tableau fourni par Yves le 05/08/2026 (3 tableaux : manuelle, BVA, AAC).
> **Nouveauté structurante : l'évaluation de départ et l'accompagnement à l'examen ne sont plus
> uniformes** — ils sont désormais facturés au tarif horaire de la formule.

| Identifiant | Poste | BVA (automatique) | Manuelle | AAC |
|---|---|---|---|---|
| `TOTAL_*` | **Total TTC du forfait** | **1 085 €** | **1 375 €** | **1 775 €** |
| `DOSSIER` | Frais administratifs + dossier complet | 200,00 € | 200,00 € | 200,00 € |
| `CODE` | Pack code (salle + internet illimités + livre) | 75,00 € | 75,00 € | 75,00 € |
| `EVAL` | Évaluation de départ | **54,00 €** | **50,00 €** | **50,00 €** |
| `H_INCLUSES` | Heures de conduite incluses | 13 h | 20 h | 20 h |
| `CONDUITE_*` | Montant de la conduite incluse | 702,00 € | 1 000,00 € | 1 000,00 € |
| `RDV_PREALABLE` | RDV préalable 2 h (accompagnateur) | — | — | 100,00 € |
| `RDV_PEDAGO` | 2 RDV pédagogiques (2 × 3 h) | — | — | 300,00 € |
| `EXAMEN` | Accompagnement / présentation examen | 54,00 € | 50,00 € | 50,00 € |
| `HEURE_SUP` | **Heure de conduite supplémentaire** | **54 €/h** | **50 €/h** | **50 €/h** |

Valeurs dérivées :

| Identifiant | Valeur | Origine |
|---|---|---|
| `SESSION_RDV` | 150,00 €/session | `RDV_PEDAGO` ÷ 2 |
| `RDV_AGREGE` | 400,00 € | `RDV_PREALABLE` + `RDV_PEDAGO` (`devis.html` uniquement) |
| `EXAMEN_SUP` | **54 € (BVA) / 50 € (manuelle, AAC)** | option « 2ᵉ passage » du devis — ⚠️ **devient différencié** |
| `DATE_EFFET` | **31/08/2026** | remplace 09/03/2026 dans les 13 emplacements du §2.11 |

### Invariants de la nouvelle grille

```
BVA      : 200 + 75 + 54 + 702  + 54              = 1 085  ✓
Manuelle : 200 + 75 + 50 + 1000 + 50              = 1 375  ✓
AAC      : 200 + 75 + 50 + 1000 + 100 + 300 + 50  = 1 775  ✓
Conduite BVA      : 13 h × 54 € = 702 €   ✓
Conduite Man./AAC : 20 h × 50 € = 1 000 € ✓
RDV préalable     :  2 h × 50 € = 100 €   ✓
RDV pédagogiques  :  6 h × 50 € = 300 €   ✓
RDV agrégé devis  : 100 + 300   = 400 €   ✓
Session pédago    : 300 ÷ 2     = 150 €   ✓
```

### Écarts par rapport à la grille actuelle

| Formule | Ancien | Nouveau | Écart |
|---|---|---|---|
| Boîte automatique | 967 € | 1 085 € | **+118 € (+12,2 %)** |
| Boîte manuelle | 1 261 € | 1 375 € | **+114 € (+9,0 %)** |
| Conduite accompagnée | 1 629 € | 1 775 € | **+146 € (+9,0 %)** |
| Heure supplémentaire manuelle / AAC | 46 €/h | 50 €/h | +4 € (+8,7 %) |
| Heure supplémentaire BVA | 48 €/h | 54 €/h | +6 € (+12,5 %) |
| Pack code | 50 € | 75 € | +25 € (+50 %) |

### Décisions actées avec Yves (05/08/2026)

1. **Heure supplémentaire hors forfait** : elle s'aligne sur le tarif horaire du forfait —
   **50 €/h** en manuelle et AAC, **54 €/h** en BVA. (Le tableau source ne donnait que la
   composition du forfait ; point confirmé explicitement.)
2. **`devis.html`, option « Présentation supplémentaire à l'examen »** : elle passe **par
   formule** (54 € BVA / 50 € manuelle & AAC). Aujourd'hui la clé `options` est **globale** →
   c'est la **seule modification de code** de toute la bascule (voir §3, entrée 1).
3. **Mention affichée** : « Tarifs TTC à compter du **31/08/2026** » (et non 01/09).
4. **`blog/combien-coute-permis-conduire-bayonne.html:250`** — l'exemple fictif de concurrent
   « un forfait à 1 000€ incluant seulement 15h » **doit être changé** (→ 1 100 €) : 1 000 €
   devient la ligne « 20 h de conduite » réelle de Marti, la collision serait illisible.
5. **`blog/auto-ecole-en-ligne-ou-marti.html:259`** — le texte reproche aux auto-écoles en ligne
   des heures sup « souvent 40€ à 50€ de l'heure », soit exactement le futur tarif manuelle
   Marti. **Décision : ne pas modifier.** Point de vigilance assumé, signalé ici pour mémoire —
   pas une action de la checklist.

### Ce qui ne change pas

- Les **volumes horaires** (13 h BVA, 20 h manuelle/AAC) et les 2 h + 6 h de RDV AAC → §2.10
  n'a pas à être touché.
- Les **frais de dossier** restent à 200,00 € sur les trois formules.
- Les **libellés** du tableau source correspondent au contenu déjà affiché (« Pack code » a
  déjà pour détail « Accès salle + internet illimités (Prépacode) + livre de code »).
  Harmonisation optionnelle : le tableau dit « Frais administratifs + dossier **complet** »
  là où le site dit « Frais administratifs + dossier » (BVA, manuelle) et « Frais
  administratifs » (AAC).

---

## §1 ter — Table de correspondance ancien → nouveau (tous formats)

C'est le tableau opérationnel de la bascule : chaque montant, dans **chacun des formats sous
lesquels il est écrit** (§4, piège 1), avec sa cible. Aucun remplacement ne doit être fait
sans passer par cette table.

| Ancien | Nouveau | Formats à traiter |
|---|---|---|
| `967` | `1 085` | `967€`→`1 085€` · `967 €`→`1 085 €` · `967&nbsp;€`→`1&nbsp;085&nbsp;€` · `"price": "967"`→`"1085"` · `base: 967`→`base: 1085` · `**967 €**`→`**1 085 €**` |
| `1 261` / `1261` | `1 375` | `1 261€` · `1 261 €` · `1&nbsp;261&nbsp;€` · `"1261"` · `base: 1261` · `**1 261 €**` · ⚠️ `1261€` **sans espace** (`blog/auto-ecole-en-ligne-ou-marti.html:270`) |
| `1 629` / `1629` | `1 775` | `1 629€` · `1 629 €` · `1&nbsp;629&nbsp;€` · `1 629 € TTC` · `"1629"` · `base: 1629` · `**1 629 €**` |
| `46 €/h` `46€/h` `46 €/heure` `"46"` | `50 €/h` `50€/h` `50 €/heure` `"50"` | heure supplémentaire manuelle + AAC (§2.4) |
| `48 €/h` `48€/h` `48 €/heure` `"48"` | `54 €/h` `54€/h` `54 €/heure` `"54"` | heure supplémentaire BVA (§2.5) |
| `46,00 €` / `prix: 46` | `50,00 €` / `prix: 50` | **accompagnement examen** manuelle + AAC |
| `48,00 €` / `prix: 48` | `54,00 €` / `prix: 54` | **accompagnement examen** BVA |
| `45,00 €` / `prix: 45` | `54,00 €` **(BVA)** · `50,00 €` **(manuelle, AAC)** | ⚠️ **évaluation de départ — plus de cible unique** |
| `50,00 €` / `prix: 50` | `75,00 €` / `prix: 75` | **pack code**, les 3 formules — ⚠️ à traiter **avant** tout autre `50`, cf. §4 piège 8 |
| `624,00 €` / `prix: 624` | `702,00 €` / `prix: 702` | conduite incluse BVA |
| `920,00 €` / `prix: 920` | `1 000,00 €` / `prix: 1000` | conduite incluse manuelle + AAC |
| `92,00 €` | `100,00 €` | RDV préalable AAC |
| `276,00 €` | `300,00 €` | 2 RDV pédagogiques AAC |
| `138,00 €` | `150,00 €` | détail « soit …/session » (AAC) |
| `prix: 368` | `prix: 400` | RDV agrégé `devis.html:691` |
| `Soit 48 €/h` / `Soit 46 €/h` (détail devis) | `Soit 54 €/h` / `Soit 50 €/h` | `devis.html`, champ `detail` des lignes conduite |
| `09/03/2026` | `31/08/2026` | 13 occurrences (§2.11) **+ à ajouter** dans `llms.txt` et `README.md` |

---

## §2 — Inventaire par tarif

Chaque ligne donne le fichier, la ligne **au 02/08/2026** (les numéros bougent : se fier au
texte exact) et le **format d'écriture** — c'est le format qui piège les rechercher/remplacer.

### 2.1 — `TOTAL_BVA` = 967 €  →  **1 085 €** au 31/08/2026

⚠️ Ce montant **passe de 3 à 4 chiffres** : chaque occurrence doit adopter le séparateur de
milliers déjà employé par 1 261 / 1 629 dans le même fichier (§4, piège 9).

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

### 2.2 — `TOTAL_MANUEL` = 1 261 €  →  **1 375 €** au 31/08/2026

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

### 2.3 — `TOTAL_AAC` = 1 629 €  →  **1 775 €** au 31/08/2026

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

### 2.4 — `HEURE_SUP` manuelle / AAC = 46 €/h  →  **50 €/h** au 31/08/2026

⚠️ **Attention** : la valeur `46 €` correspond à **trois postes distincts** — heure
supplémentaire, présentation à l'examen (manuelle/AAC) et option 2ᵉ passage. Une hausse peut
ne concerner que l'un des trois. Vérifier le contexte de chaque ligne avant de remplacer.

⚠️ **Après la bascule, c'est pire** : en manuelle/AAC, `50 €` recouvrira **quatre** postes —
heure supplémentaire, présentation à l'examen, **évaluation de départ** (qui rejoint le tarif
horaire) et option 2ᵉ passage. Et `50,00 €` est aussi l'**ancien** prix du pack code (§2.7),
d'où l'ordre de traitement imposé du §4, piège 8.

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

### 2.5 — `HEURE_SUP` automatique = 48 €/h  →  **54 €/h** au 31/08/2026

⚠️ Même remarque qu'en §2.4 : après bascule, `54 €` recouvrira **trois** postes BVA — heure
supplémentaire, présentation à l'examen et **évaluation de départ**.

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

### 2.6 — `DOSSIER` = 200,00 € (identique aux 3 formules)  →  **inchangé** au 31/08/2026

*Seul poste qui ne bouge pas. Le tableau source l'intitule « Frais administratifs + dossier
complet » — harmonisation de libellé optionnelle (§1 bis, « ce qui ne change pas »).*

| Fichier | Ligne | Libellé affiché |
|---|---|---|
| `formules/permis-b-automatique.html` | 377 | « Frais administratifs + dossier » |
| `formules/permis-b-manuel.html` | 341 | « Frais administratifs + dossier » |
| `formules/conduite-accompagnee.html` | 358 | « Frais administratifs » |
| `devis.html` | 655, 671, 687 | `{ label: "Frais de dossier & inscription", prix: 200 }` ×3 |

### 2.7 — `CODE` = 50,00 € (identique aux 3 formules)  →  **75,00 €** au 31/08/2026

⚠️ **À traiter en premier dans chaque fichier** : `50,00 €` est l'ancien pack code *et* le
nouveau tarif horaire manuelle/AAC. Une fois le pack code passé à 75,00 €, tout `50` restant
est sans ambiguïté un nouveau montant (§4, piège 8).

| Fichier | Ligne | Libellé affiché |
|---|---|---|
| `formules/permis-b-automatique.html` | 384 | « Pack code » |
| `formules/permis-b-manuel.html` | 348 | « Pack code » |
| `formules/conduite-accompagnee.html` | 365 | « Pack code » |
| `devis.html` | 656, 672, 688 | `{ id: "code", label: "Pack code de la route", prix: 50 }` ×3 |

⚠️ Dans `devis.html`, la ligne `id: "code"` est **déduite du total** quand l'utilisateur coche
« J'ai déjà le code » (fonction `prixCode()` l. 722-725). Changer ce montant change aussi la
réduction affichée.

### 2.8 — `EVAL` = 45,00 € (identique aux 3 formules)  →  **différencié** au 31/08/2026

🔴 **Changement de structure.** L'évaluation de départ cesse d'être un montant unique : elle
est désormais facturée au tarif horaire de la formule — **54,00 € en BVA**, **50,00 € en
manuelle et AAC**. Chaque occurrence a donc une cible **différente** selon le fichier ; ne
jamais remplacer `45,00 €` globalement.

| Fichier | Ligne | Libellé affiché | Cible 31/08/2026 |
|---|---|---|---|
| `formules/permis-b-automatique.html` | 391 | « Évaluation de départ » | **54,00 €** |
| `formules/permis-b-manuel.html` | 355 | « Évaluation de départ » | **50,00 €** |
| `formules/conduite-accompagnee.html` | 372 | « Évaluation de départ » | **50,00 €** |
| `devis.html` | 657 | `{ label: "Évaluation de départ", prix: 45 }` (bva) | `prix: 54` |
| `devis.html` | 673 | idem (manuel) | `prix: 50` |
| `devis.html` | 689 | idem (aac) | `prix: 50` |

### 2.9 — `CONDUITE_*`, `EXAMEN`, RDV pédagogiques

| Montant | Cible 31/08 | Fichier | Ligne | Contexte |
|---|---|---|---|---|
| **624,00 €** (13 h × 48) | **702,00 €** (13 × 54) | `formules/permis-b-automatique.html` | 398 | ligne « 13h de conduite minimum » |
| | | `devis.html` | 658 | `{ label: "13 h de conduite incluses", detail: "Soit 48 €/h", prix: 624 }` → `detail: "Soit 54 €/h", prix: 702` |
| **920,00 €** (20 h × 46) | **1 000,00 €** (20 × 50) | `formules/permis-b-manuel.html` | 362 | ligne « 20h de conduite minimum » |
| | | `formules/conduite-accompagnee.html` | 379 | ligne « 20h de conduite minimum » |
| | | `devis.html` | 674, 690 | `prix: 920` → `prix: 1000` (manuel + aac), `detail` « Soit 46 €/h » → « Soit 50 €/h » |
| **92,00 €** | **100,00 €** | `formules/conduite-accompagnee.html` | 386 | « 1 RDV préalable · 2h — formation de l'accompagnateur » |
| **276,00 €** | **300,00 €** | `formules/conduite-accompagnee.html` | 393 | « 2 RDV pédagogiques » |
| **138,00 €/session** | **150,00 €/session** | `formules/conduite-accompagnee.html` | 391 | détail « 2 × 3h — soit 138,00 €/session » |
| **368,00 €** | **400,00 €** | `devis.html` | 691 | ⚠️ `{ label: "RDV préalable + 2 RDV pédagogiques", prix: 368 }` — **agrège 92 + 276**, contrairement à la page AAC qui les sépare. Garder les deux cohérents. |
| **48,00 €** (examen BVA) | **54,00 €** | `formules/permis-b-automatique.html` | 405 | « Accompagnement à l'examen · 1 présentation incluse » |
| | | `devis.html` | 659 | `{ label: "Présentation à l'examen", prix: 48 }` → `prix: 54` |
| **46,00 €** (examen man.) | **50,00 €** | `formules/permis-b-manuel.html` | 369 | « Accompagnement à l'examen » |
| | | `devis.html` | 675 | `{ label: "Présentation à l'examen", prix: 46 }` → `prix: 50` |
| **46,00 €** (examen AAC) | **50,00 €** | `formules/conduite-accompagnee.html` | 400 | « Accompagnement à l'examen » |
| | | `devis.html` | 692 | `{ label: "Présentation à l'examen", prix: 46 }` → `prix: 50` |
| **46 €** (`EXAMEN_SUP`) | 🔴 **54 € BVA / 50 € man. + AAC** | `devis.html` | 702 | option cochable « Présentation supplémentaire à l'examen · En cas de 2ᵉ passage » — **change de structure**, voir ci-dessous |

🔴 **`EXAMEN_SUP` devient différencié — la seule modification de code de la bascule.**
Aujourd'hui `devis.html` déclare `options` comme une liste **globale** (l. 701-703), commune
aux trois formules :

```javascript
options: [
    { id: "examenSup", label: "Présentation supplémentaire à l'examen", detail: "En cas de 2ᵉ passage", prix: 46 },
],
```

Un prix unique ne peut plus convenir (54 € en BVA, 50 € ailleurs). Décision actée : porter
l'option **par formule**. Le rendu et le calcul lisent `DEVIS_CONFIG.options` aux lignes
**755-756** (construction des cases à cocher), **811-812** (ajout au total) et **854-855**
(récapitulatif e-mail) : ces trois points doivent résoudre l'option contre la formule
sélectionnée (`state.formule`) et non contre la liste globale.

### 2.10 — Volumes horaires réglementaires (13 h / 20 h)  →  **inchangés** au 31/08/2026

Ils accompagnent presque toujours un prix. À ne changer **que** si le contenu du forfait
change (ils sont adossés au minimum légal). La grille du 31/08/2026 conserve 13 h / 20 h,
ainsi que les 2 h de RDV préalable et les 2 × 3 h de RDV pédagogiques : **rien à modifier
ici**, mais bien vérifier que les phrases « 20 h à 46 €/h » deviennent « 20 h à 50 €/h »
sans que le volume ne bouge.

`index.html:333,350` · `formules/index.html:782,795` · `formules/permis-b-*.html`
(titres, meta, lignes de détail) · `faq.html:63,71,758,772,773` · `llms.txt:54` ·
`README.md:26,27` · `blog/combien-coute-permis-conduire-bayonne.html:219,225,250` ·
`blog/permis-lyceen-etudiant-bayonne.html:258,263,321` ·
`devis.html:651,667,683` (`hIncluses`).

### 2.11 — `DATE_EFFET` = 09/03/2026  →  **31/08/2026** — **13 occurrences**

*(Recomptées le 05/08/2026 : **13**, et non 12 comme indiqué jusqu'ici. Les lignes de pied de
page des 3 pages formules ont par ailleurs glissé de +1 depuis le 02/08.)*

| Fichier | Ligne | Formulation |
|---|---|---|
| `index.html` | 403 | « * Tarifs TTC à compter du 09/03/2026. » |
| `faq.html` | 71 | JSON-LD — « Tarifs TTC en vigueur à compter du 09/03/2026. » |
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
| `devis.html` | 639 | commentaire « (Tarifs relevés sur le site au 09/03/2026 — à confirmer/actualiser.) » |

❗ **Absente de `llms.txt` et `README.md`** — à y **ajouter** lors de la prochaine mise à jour.

📄 **Hors site** : `ROADMAP.md:18` cite aussi la date (« l'actuelle, `09/03/2026`, est affichée
à 12 endroits ») — c'est de la documentation, pas un tarif affiché, mais la ligne devient fausse
après bascule. La rubrique « Changement de grille tarifaire » de `ROADMAP.md` (l. 10-18) est
d'ailleurs à clore une fois l'opération faite.

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
**19 fichiers** porteurs de tarifs (+ `ROADMAP.md`, documentation), à cocher au fur et à mesure.

> **Règle d'or de la bascule du 31/08/2026** : à l'intérieur d'un fichier, traiter les blocs
> tarifaires **ligne par ligne, de haut en bas**, en commençant toujours par le **pack code
> (50 → 75)**. Jamais de rechercher/remplacer global sur `50`, `46`, `48` ou `45` : ces
> nombres changent de sens au cours de l'opération (§4, pièges 8 à 11).

- [ ] **1. `devis.html`** — objet `DEVIS_CONFIG` l. 641-704 : `base`, `hIncluses`,
      `prixHeureSup`, tableau `lignes` des 3 formules, `options[0].prix`.
      Mettre à jour aussi les commentaires l. 620 et 639.
      *Tout le reste de la page est calculé — ne rien toucher en dehors de `DEVIS_CONFIG`.*
      🔴 **Exception 31/08/2026 — seule modification de code de toute la bascule** :
      l'option `examenSup` (l. 701-703) est aujourd'hui **globale** et doit devenir
      **par formule** (54 € BVA / 50 € manuelle & AAC). Adapter les trois points de lecture
      de `DEVIS_CONFIG.options` : l. 755-756 (rendu des cases), 811-812 (calcul du total),
      854-855 (récapitulatif e-mail). Détail au §2.9.
      Valeurs cibles : `bva` → `base: 1085`, `prixHeureSup: 54`, lignes `200 / 75 / 54 /
      702 (detail « Soit 54 €/h ») / 54` · `manuel` → `base: 1375`, `prixHeureSup: 50`,
      lignes `200 / 75 / 50 / 1000 (« Soit 50 €/h ») / 50` · `aac` → `base: 1775`,
      `prixHeureSup: 50`, lignes `200 / 75 / 50 / 1000 / 400 (RDV agrégés) / 50`.
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
      🔴 **Décision 31/08/2026** : l. 250, l'exemple fictif de concurrent « un forfait à
      **1 000€** incluant seulement 15h » doit devenir **1 100 €** — 1 000 € devient la
      ligne « 20 h de conduite » réelle de Marti, la collision rendrait la démonstration
      incompréhensible. *(Cette ligne est listée en zone interdite §6 : c'est l'unique
      dérogation, explicitement validée.)*
- [ ] **12. `blog/permis-lyceen-etudiant-bayonne.html`** — tableau 258/263/268, note 274,
      FAQ visible 321/333, JSON-LD FAQPage 461/485. + dates.
- [ ] **13. `blog/regles-permis-probatoire.html`** — CTA 328 et 720 (AAC uniquement). + dates.
- [ ] **14. `blog/auto-ecole-en-ligne-ou-marti.html`** — ⚠️ l. 270, format **`1261€`** →
      `1375€` (sans espace, invisible à une recherche « 1 261 »). + dates.
      ℹ️ L. 259 (« souvent 40€ à 50€ de l'heure » reproché aux plateformes en ligne)
      **reste inchangée** — décision d'Yves du 05/08/2026, malgré le chevauchement avec le
      futur tarif Marti de 50 €/h. Ne pas la « corriger » spontanément.
- [ ] **15. `blog/index.html`** — extrait de carte l. 473.
- [ ] **16. `llms.txt`** — 3, 11-15, 50, 55, 61, 118-119. **Y ajouter la date d'effet.**
- [ ] **17. `README.md`** — 18 (heure de conduite → **50 €/h**), 26-28 (tableau formations
      → 1 085 / 1 375 / 1 775 €). **Y ajouter la date d'effet (31/08/2026)** et le tarif
      horaire BVA (**54 €/h**), aujourd'hui absent.
- [ ] **18. `CLAUDE.md`** — l. 62 (mention du prix AAC dans l'arborescence).
- [ ] **19. `TARIFS.md`** (ce fichier) — une fois la bascule faite : **promouvoir le §1 bis
      en §1** (il devient la grille en vigueur), archiver ou supprimer l'ancienne grille et
      le §1 ter devenu sans objet, reporter les cibles dans le §2, et mettre à jour la date
      de vérification en tête.
- [ ] **20. `ROADMAP.md`** *(documentation, pas un tarif affiché)* — clore la rubrique
      « Changement de grille tarifaire » (l. 10-18) et corriger la l. 18 qui cite
      `09/03/2026` et un décompte de 12 emplacements (en réalité 13, cf. §2.11).

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

### Pièges propres à la bascule du 31/08/2026

8. 🔴 **`50` change de sens en cours d'opération — le piège le plus dangereux.**
   `50,00 €` est **l'ancien prix du pack code** ; c'est aussi **le nouveau tarif horaire**
   manuelle/AAC, le nouveau prix de l'évaluation et celui de l'accompagnement examen. Dans un
   fichier à moitié migré, un `50,00 €` est **indécidable** : impossible de savoir s'il reste
   à traiter ou s'il est déjà à jour.
   **Règle** : dans chaque bloc tarifaire, commencer par passer le pack code à 75,00 €, puis
   descendre ligne par ligne. **Aucun rechercher/remplacer global sur `50`.**
9. **`967` passe de 3 à 4 chiffres.** Ce n'est pas une simple substitution : il faut **ajouter
   un séparateur de milliers** au format déjà employé par 1 261 / 1 629 dans le même fichier
   (`1 085 €`, `1&nbsp;085&nbsp;€`, `"1085"`). Après coup, contrôler visuellement que les
   conteneurs ne débordent pas : `.formation-price` (`index.html`), `.shortcut-price` et
   `.result-price-display` (`formules/index.html`), `.price-tag` et `.total-price`
   (`formules/permis-b-automatique.html`), cartes formules des 3 pages locales.
10. **`1 000,00 €` introduit une espace de milliers dans une ligne de détail**, ce qui
    n'existait pas jusqu'ici (`920,00 €`). Format retenu : `1 000,00 €` sur les pages
    formules, `prix: 1000` dans `devis.html`.
11. **`45,00 €` n'a plus de cible unique** : 54,00 € en BVA, 50,00 € en manuelle et AAC (§2.8).
    Idem pour l'option « 2ᵉ passage » du devis (§2.9).
12. **Deux montants « zone interdite » entrent en collision avec la nouvelle grille** :
    - `blog/combien-coute-permis-conduire-bayonne.html:250` — exemple fictif « 1 000€ » :
      **à changer en 1 100 €** (dérogation validée, §3 entrée 11) ;
    - `blog/auto-ecole-en-ligne-ou-marti.html:259` — « souvent 40€ à 50€ de l'heure » :
      **à laisser tel quel** (décision d'Yves, §1 bis).

---

## §5 — Hors dépôt : les 3 plaquettes PDF

Elles sont publiquement téléchargeables et présentées comme contenant « les tarifs en
vigueur » (`espace-eleves.html:333`). **Claude ne peut pas les régénérer** — c'est une tâche
manuelle pour Yves, à faire en même temps que la mise à jour du site.

⚠️ **31/08/2026** : les trois plaquettes devront porter la grille du §1 bis (1 085 / 1 375 /
1 775 €, pack code à 75 €, évaluation et accompagnement examen au tarif horaire) **et** la
nouvelle date d'effet. Tant qu'elles ne sont pas refaites, le site affichera des tarifs à jour
et les PDF téléchargeables des tarifs périmés — c'est le point le plus visible pour un élève.

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
| **Prix d'appel concurrents** | `blog/auto-ecole-en-ligne-ou-marti.html:256` — « 199€ », « moins de 10€ par mois » · `:259` — « souvent 40€ à 50€ de l'heure » ⚠️ chevauche le futur tarif Marti (50 €/h) mais **reste inchangée** : décision d'Yves du 05/08/2026 |
| **Exemple fictif** | `blog/combien-coute-permis-conduire-bayonne.html:250` — « un forfait à 1 000€ incluant seulement 15h » (concurrent imaginaire, sert la démonstration). 🔴 **Dérogation unique au 31/08/2026** : à porter à **1 100 €**, car 1 000 € devient la ligne « 20 h de conduite » réelle de Marti (§3 entrée 11, §4 piège 12). |
| **Simulateur d'éco-conduite** | `blog/simulateur-ecoconduite.html:177,179,318-319,324-325,387-399` — prix du carburant et de l'électricité |
| **Avis clients** | `index.html` (JSON-LD `Review` + carrousel), `llms.txt:88-109` — « tarifs corrects », « prix attractif » : **ne jamais réécrire le texte d'un avis** |

---

## §7 — Procédure de mise à jour

0. **Réunir les informations** : ancienne grille (§1), nouvelle grille, nouvelle date d'effet.
   Vérifier si les volumes horaires inclus changent (§2.10) et si le contenu des forfaits
   change (libellés des lignes de détail).
   *Pour la bascule du 31/08/2026, tout est déjà réuni : grille au §1 bis, correspondances
   format par format au §1 ter, décisions actées au §1 bis.*
1. **Mettre à jour le §1 de ce fichier en premier** — il devient la nouvelle référence, et
   tout le reste s'y compare. *(31/08/2026 : promouvoir le §1 bis en §1, cf. §3 entrée 19.)*
2. **Dérouler la checklist du §3**, fichier par fichier, en cochant.
   ⚠️ **Ordre imposé à l'intérieur de chaque bloc tarifaire** : commencer par le **pack code
   (50 → 75)**, puis descendre ligne par ligne. Tant que des `50,00 €` « ancien pack code »
   subsistent, on ne peut plus distinguer ce qui est traité de ce qui ne l'est pas
   (§4, piège 8). Aucun rechercher/remplacer global sur `50`, `46`, `48`, `45`.
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

### A — Les ANCIENS montants ont disparu

```bash
# 1) Anciens totaux — doit renvoyer 0 hit
grep -rn "967\|1261\|1 261\|1&nbsp;261\|1629\|1 629\|1&nbsp;629" \
  --include=*.html --include=*.md --include=*.txt . | grep -v panneaux

# 2) Anciens tarifs horaires 46/48 — 0 hit attendu HORS zone interdite §6
grep -rn "46 €\|46€\|48 €\|48€\|46,00\|48,00" \
  --include=*.html --include=*.md --include=*.txt . | grep -v panneaux

# 3) Anciennes lignes de détail — seuls 200,00 (inchangé) et les nouveaux 50,00 doivent rester
grep -rn "45,00\|624,00\|920,00\|92,00\|276,00\|138,00\|368" --include=*.html .

# 4) Ancienne date d'effet — 0 hit (y compris ROADMAP.md:18, cf. §2.11)
grep -rn "09/03/2026" --include=*.html --include=*.md --include=*.txt .
```

### B — Les NOUVEAUX montants sont bien partout

```bash
# 5) Nouveaux totaux (tous formats, y compris l'espace insécable et le JSON-LD)
grep -rn "1 085\|1085\|1&nbsp;085\|1 375\|1375\|1&nbsp;375\|1 775\|1775\|1&nbsp;775" \
  --include=*.html --include=*.md --include=*.txt . | grep -v panneaux

# 6) Nouveaux tarifs horaires (⚠️ vérifier le CONTEXTE de chaque « 50 » : heure sup,
#    évaluation, accompagnement examen — et plus jamais le pack code)
grep -rn "50 €\|50€\|54 €\|54€\|50,00\|54,00" \
  --include=*.html --include=*.md --include=*.txt . | grep -v panneaux

# 7) Nouvelles lignes de détail
grep -rn "75,00\|702,00\|1 000,00\|100,00\|300,00\|150,00\|400" --include=*.html .

# 8) Nouvelle date d'effet — 13 emplacements (§2.11) + llms.txt + README.md = 15 attendus
#    hors TARIFS.md et ROADMAP.md
grep -rn "31/08/2026" --include=*.html --include=*.md --include=*.txt .

# 9) Tous les prix JSON-LD d'un coup — doivent tous refléter la nouvelle grille
#    (attendu : 1085 / 1375 / 1775 pour les forfaits, 50 / 54 pour les leçons)
grep -rn '"price"' --include=*.html .

# 10) Config JS de l'estimateur de devis (relecture intégrale de DEVIS_CONFIG)
sed -n '641,705p' devis.html
```

**Critère de réussite** :
- Bloc A : **aucun hit**, sauf les montants explicitement classés en **zone interdite (§6)** —
  dont les ~40 amendes de `blog/infractions-code-route.html` et les « 30 € » du code.
- Bloc B : chaque hit doit être une occurrence **voulue** ; en particulier, plus aucun `50,00 €`
  ne doit désigner le pack code (§4, piège 8), et aucun total BVA ne doit rester sans
  séparateur de milliers (§4, piège 9).
- Aucun hit ne doit rester inexpliqué dans l'un ou l'autre bloc.
