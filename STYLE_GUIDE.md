# Guide de Style — AutoÉcole Marti

> Document de référence pour maintenir la cohérence visuelle du site.
> À soumettre à Claude avant toute modification de style.

---

## 1. Identité de marque

Le site s'appuie sur l'identité basque : **rouge basque** et **vert/teal basque** comme couleurs principales de la marque.
Typographie : **Playfair Display** (élégance, titres) + **DM Sans** (modernité, corps de texte).
Toutes les polices sont auto-hébergées (conformité RGPD, zéro dépendance externe).

---

## 2. Palette de couleurs globale

| Variable CSS | Valeur HEX | Usage |
|---|---|---|
| `--basque-rouge` | `#d63031` | CTA principal, boutons, accents rouges |
| `--rouge-sombre` | `#922b21` | Hover rouge |
| `--basque-vert` | `#00695c` | CTA secondaire, accents verts |
| `--or` | `#d4a853` | Accent doré, premium |
| `--noir` | `#0a0a0a` | Texte principal, footer |
| `--blanc` | `#fafaf8` | Fond principal |
| `--creme` | `#f5f0e8` | Fond secondaire, sections alternées |
| `--gris` | `#6b7280` | Texte secondaire, métadonnées |
| `--gris-clair` | `#e5e5e5` | Bordures, séparateurs |

**Variables globales :**
- `--radius` : `16px` (coins arrondis standard)
- `--radius-sm` : `10px` (petits éléments)
- `--ombre` : `0 4px 30px rgba(0,0,0,0.08)` (ombre subtile)
- `--ombre-forte` : `0 20px 60px rgba(0,0,0,0.12)` (ombre forte, hover)
- `--transition` : `0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)` (toutes les transitions)

---

## 3. Thèmes couleur par catégorie de blog

Chaque catégorie a ses propres variables CSS définies en inline `<style>` dans le `<head>` de l'article.

### Code de la Route — Rouge `#d63031`
```css
--article-accent: #d63031;
--article-accent-bg: rgba(214, 48, 49, 0.06);
--article-accent-pill: rgba(214, 48, 49, 0.12);
--article-hero-gradient: linear-gradient(135deg, #fff5f5, #fce4e4, #f5c6c6);
--article-hero-glow: rgba(214, 48, 49, 0.10);
--cta-gradient: linear-gradient(135deg, #d63031, #922b21);
--cta-btn-color: #d63031;
```
Hero fond : `#fff5f5` → `#ffe0e0` | Badge : `rgba(214,48,49,0.08)`

---

### Conduite — Vert `#00695c`
```css
--article-accent: #00695c;
--article-accent-bg: rgba(0, 105, 92, 0.06);
--article-accent-pill: rgba(0, 105, 92, 0.12);
--article-hero-gradient: linear-gradient(135deg, #f0f9f5, #d4ede5, #b8ddd2);
--article-hero-glow: rgba(0, 105, 92, 0.10);
--cta-gradient: linear-gradient(135deg, #00695c, #004d40);
--cta-btn-color: #00695c;
```
Hero fond : `#f0f9f5` → `#d4ede5` | Badge : `rgba(0,105,92,0.08)`

---

### Conduite Accompagnée (AAC) — Vert clair `#00695c`
```css
--article-accent: #00695c;
--article-accent-bg: rgba(0, 105, 92, 0.06);
--article-accent-pill: rgba(0, 105, 92, 0.12);
--article-hero-gradient: linear-gradient(135deg, #f0fffe, #c8f0ec, #a8e4df);
--article-hero-glow: rgba(0, 105, 92, 0.12);
--cta-gradient: linear-gradient(135deg, #00897b, #00695c);
--cta-btn-color: #00695c;
```
Hero fond : `#f0fffe` → `#c8f0ec` | Teinte plus claire/turquoise que "Conduite"

---

### Conseils Pratiques — Doré `#d4a853`
```css
--article-accent: #d4a853;
--article-accent-bg: rgba(212, 168, 83, 0.08);
--article-accent-pill: rgba(212, 168, 83, 0.15);
--article-hero-gradient: linear-gradient(135deg, #fdfaf0, #f5edca, #ede0a8);
--article-hero-glow: rgba(212, 168, 83, 0.10);
--cta-gradient: linear-gradient(135deg, #d4a853, #b8860b);
--cta-btn-color: #d4a853;
```
Hero fond : `#fdfaf0` → `#f5edca`

---

### Réglementation — Bleu `#2d3fb5`
```css
--article-accent: #2d3fb5;
--article-accent-bg: rgba(63, 94, 251, 0.06);
--article-accent-pill: rgba(63, 94, 251, 0.08);
--article-hero-gradient: linear-gradient(135deg, #f0f4ff, #dbe5ff, #c0cfff);
--article-hero-glow: rgba(63, 94, 251, 0.08);
--cta-gradient: linear-gradient(135deg, #3f5efb, #2d3fb5);
--cta-btn-color: #2d3fb5;
```
Hero fond : `#f0f4ff` → `#dbe5ff`

---

### Outils Pédagogiques — Violet `#6d28d9`
```css
--article-accent: #6d28d9;
--article-accent-dark: #4c1d95;
--article-accent-bg: rgba(124, 58, 237, 0.06);
--article-accent-pill: rgba(124, 58, 237, 0.12);
--article-hero-gradient: linear-gradient(135deg, #f5f0ff, #e5d5ff, #d4b8ff);
--article-hero-glow: rgba(124, 58, 237, 0.10);
--cta-gradient: linear-gradient(135deg, #6d28d9, #4c1d95);
--cta-btn-color: #6d28d9;
```
Hero fond : `#f5f0ff` → `#e5d5ff` | Carte du hub : `.article-thumb.outils` + `.article-cat.violet`

---

### Tarifs — Orange doré `#e07b39`
```css
--article-accent: #e07b39;
--article-accent-bg: rgba(224, 123, 57, 0.06);
--article-accent-pill: rgba(224, 123, 57, 0.12);
--article-hero-gradient: linear-gradient(135deg, #fff8f0, #fce3c0, #f8cc90);
--article-hero-glow: rgba(224, 123, 57, 0.10);
--cta-gradient: linear-gradient(135deg, #e07b39, #c45e1a);
--cta-btn-color: #e07b39;
```
Hero fond : `#fff8f0` → `#fce3c0`

---

## 4. Typographie

| Élément | Police | Taille | Poids | Notes |
|---|---|---|---|---|
| H1 | Playfair Display | `clamp(2rem, 4.5vw, 3.2rem)` | 700 | `letter-spacing: -0.03em` |
| H2 | Playfair Display | `clamp(1.4rem, 2.5vw, 1.8rem)` | 700 | `letter-spacing: -0.02em` |
| H3 | DM Sans | `1.05rem` | 700 | Couleur `--article-accent` + puce colorée |
| Corps | DM Sans | `1rem` | 400 | `line-height: 1.7`, couleur `--noir` |
| Texte secondaire | DM Sans | `0.78rem – 0.9rem` | 400 | Couleur `--gris` |
| Navigation | DM Sans | `0.9rem` | 500 | Soulignement animé rouge au hover |

---

## 5. Composants principaux

### Navbar
- Fond transparent au sommet → `rgba(255,255,255,0.92)` + `blur(20px)` au scroll
- Logo : Playfair Display 1.5rem, poids 700 — la lettre d'accent en `--basque-rouge`
- Bouton CTA : `--basque-rouge`, border-radius 50px, `0.6rem 1.4rem`

### Hero (page d'accueil)
- Fond : `linear-gradient(135deg, #fdfcfa 0%, #f0ebe0 50%, #e8dfd0 100%)`
- Min-height : `88vh`
- Orbes décoratifs : rouge en haut-droite, vert en bas-gauche (radial-gradient)
- Grille 2 colonnes desktop

### Hero de l'article blog
- Min-height : `52vh`
- Fond : `--article-hero-gradient` (spécifique à la catégorie)
- Breadcrumb : `0.82rem`, gris, hover → `--article-accent`
- Pill catégorie : fond `--article-accent-pill`, texte `--article-accent`
- Pill temps de lecture : fond sombre opacité 0.06

### Boutons
- **Primaire** : fond `--basque-rouge`, blanc, shadow `rgba(214,48,49,0.3)`, border-radius 50px
- **Secondaire** : transparent, texte noir, bordure `--gris-clair`
- Hover : `translateY(-2px)` + ombre renforcée
- Padding : `1rem 2rem`

### Boîtes Callout (articles)
| Type | Couleur bordure | Fond |
|---|---|---|
| `.callout-info` | `#00695c` (basque-vert) | Vert très clair |
| `.callout-warning` | `#d4a853` (or) | Doré très clair |
| `.callout-success` | `#27ae60` (vert-clair) | Vert clair |
| `.callout-danger` | `#d63031` (basque-rouge) | Rouge très clair |

Bordure gauche : `4px solid`, padding : `1.4rem 1.6rem`

### Étapes numérotées
- Cercle numéro : 44px, fond `--article-accent`, texte blanc
- Police cercle : Playfair Display, 1.1rem, poids 700
- Layout flex, gap `1.4rem`

### Cartes du blog (index)
- Fond blanc, border-radius 16px
- Thumbnail 200px avec fond gradient spécifique à la catégorie
- Bandeau couleur en haut thumbnail : `3px solid`, gradient rouge → teal
- Hover : `translateY(-6px)` + `--ombre-forte`

### Articles liés
- Fond `--creme`
- Grille 2 colonnes, gap `1.2rem`
- Bordure carte `1px solid #eee`, hover → `--article-accent`

### Bannière CTA
- Fond : `--cta-gradient` (gradient catégorie)
- Pattern SVG en overlay (blanc, opacité 0.03)
- Bouton : fond blanc, texte `--cta-btn-color`
- H2 : Playfair Display, `clamp(1.8rem, 3vw, 2.5rem)`, poids 700

### Footer
- Fond : `--noir` (#0a0a0a)
- Grille : `2fr 1fr 1fr 1fr` desktop → 2 col 1024px → 1 col 768px
- Titres colonnes : `0.82rem`, majuscule, `rgba(255,255,255,0.4)`
- Liens : `rgba(255,255,255,0.7)` → blanc au hover

---

## 6. Espacement et layout

| Élément | Valeur |
|---|---|
| Padding section | `6rem 2rem` |
| Max-width container | `1200px` |
| Max-width article | `780px` |
| Gap grilles standard | `1.2rem – 2rem` |
| Border-radius standard | `16px` |
| Border-radius petit | `10px` |

**Breakpoints responsives :**
- `1024px` : layouts compacts, grilles 2 colonnes
- `768px` : nav hamburger, passage 1 colonne, padding réduit à `1.2rem`

---

## 7. Animations

- **Courbe globale** : `0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Hover cards** : `translateY(-2px)` à `translateY(-8px)`
- **Apparition au scroll** : opacity 0→1, `translateY(30px)`→0 via IntersectionObserver
- **Soulignement liens nav** : width 0→100% au hover
- **Badge logo** : animation pulse (oscillation scale)

---

## 8. Fichiers CSS clés

| Fichier | Rôle |
|---|---|
| `/css/fonts.css` | Polices auto-hébergées (DM Sans, Playfair Display, Inter) |
| `/css/index.css` | Styles globaux du site, variables :root, navbar, footer, hero |
| `/css/blog-index.css` | Page liste du blog, cartes articles |
| `/css/blog-article.css` | Structure article, callouts, steps, related, CTA |
| `<style>` inline article | Variables de thème couleur spécifiques à la catégorie |

---

## 9. Règle de cohérence pour nouveaux articles

1. Identifier la catégorie → copier le bloc `--article-accent` correspondant
2. Insérer le bloc `<style>` en `<head>` avec les variables de la catégorie
3. La couleur d'accent s'applique automatiquement à : H3, pills, callouts, steps, tables, CTA, related articles
4. Ne jamais coder de couleur en dur dans le HTML — toujours passer par les variables CSS

---

*Dernière mise à jour : août 2026*
