# Shoe Passport : analyse UI/UX et améliorations

Revue du prototype publié sur GitHub Pages (`/p/PW-21-048172/`, `/p/PW-19-031544/`, `/p/PW-24-009871/`), passée au crible de cinq skills de design :

| # | Skill | Angle | Note / verdict |
|---|---|---|---|
| 1 | **frontend-design** (Anthropic) | Direction artistique, éviter le « fait par une IA » | Bonne exécution, mais tombe dans 3 des 5 marqueurs « IA par défaut » |
| 2 | **web-design-guidelines** (Vercel) | Conformité code, ligne par ligne | 14 écarts, dont 3 d'accessibilité importants |
| 3 | **ui-ux-pro-max** | Priorités UX 1 → 10, checklist de livraison | Priorités 1 (accessibilité) et 6 (typo/couleur) non conformes |
| 4 | **refactoring-ui** | Audit hiérarchie → espacement → typo → couleur → profondeur → images → finitions | 3 P0, 7 P1, 5 P2 |
| 5 | **oil-ui** | Relecture visuelle indépendante (sans voir le code), test des 3 secondes | **7/10** : « fiche produit premium 2023 », publiable mais plafonnée |

**Verdict global :** le prototype est propre, crédible et le parcours fonctionne : bonnes photos, frise réussie, logique de reprise claire. Ce qui le retient : **(a)** des textes gris sous le seuil de contraste, **(b)** un clavier mal géré, **(c)** une identité visuelle générique (crème + serif + petits titres en majuscules) qui ne porte pas l'idée de *passeport*.

### Les 5 priorités

1. **Contraste** : remplacer `--ink-3 #8a7d72` par `#6f645a` (3,55:1 → 5,12:1). Une ligne, et ça corrige une dizaine de textes.
2. **Focus clavier visible** + **navigation aux flèches dans les onglets**.
3. **Tailles minimales** : rien sous 12 px (bannière à 10,5 px aujourd'hui).
4. **Supprimer les vides** : carte résultat vide de ~370 px, hauteur de page figée sur l'onglet le plus long.
5. **Rendre le passeport visible** : page d'identité, tampons de ressemelage. C'est la refonte qui fera la différence devant un jury.

---

## 0. Méthode et limites

- `github.io` est bloqué par le proxy de l'environnement d'analyse. J'ai reconstruit **exactement l'export statique déployé** (`GITHUB_PAGES=true npm run build`, branche `main`) et je l'ai servi en local sous `/Strat-case-AE/`.
- **Captures** : iPhone 390×844 (les 3 onglets, les 3 paires, parcours « Use sample », note C, cuir abîmé) et bureau 1440×900.
- **Mesures** :
  - contraste avec `refactoring-ui/scripts/check_contrast.py` ;
  - focus et clavier avec Playwright (Tab, flèches) ;
  - titres et images lus dans le DOM ;
  - base de règles `ui-ux-pro-max/scripts/search.py`.
- **Non vérifié** : vrai iPhone avec la puce NFC, lecteur d'écran réel (VoiceOver), performances sur réseau mobile.
- Les numéros de ligne renvoient au code de `main` au moment de la revue.

---

## 1. refactoring-ui : audit dans l'ordre du livre

Ordre imposé par le skill : hiérarchie → espacement → typographie → couleur → profondeur → images → finitions. Sévérités :
- **P0** : l'usage est affecté ;
- **P1** : la cohérence est affectée ;
- **P2** : finition.

| # | Domaine | Sév. | Emplacement | Règle | Aujourd'hui | Proposition | Effort |
|---|---|---|---|---|---|---|---|
| 1 | Couleur | **P0** | `app/globals.css` `--ink-3`, utilisé l. 92, 166, 234, 262, 332, 439, 441, 449, 476 | §5.6 contraste 4,5:1 | `#8a7d72` = **3,55:1** sur crème, 3,93:1 sur carte, **3,14:1** sur `--cream-2`. Touche les onglets inactifs, `.small`, dates de la frise, « / ~3 », prix barré, « Uncertified on eBay », pied de page | `--ink-3: #6f645a` (5,12 / 5,67 / 4,53:1, tout passe) | S |
| 2 | Finitions | **P0** | `components/tabs/TradeTab.tsx:155` + `.result` l. 362 | §8.4 un état vide se conçoit | Les 4 cartes résultat sont empilées dans une même case de grille, donc l'état « Answer the 3 questions » prend la hauteur de la plus grande (~370 px, presque vide avec un « ? ») | Rendre seulement la carte active, ou une ligne compacte pour l'état vide (« Répondez aux 3 questions pour voir votre offre »), sans carte | M |
| 3 | Typographie | **P0** | `.banner` l. 49 (10,5 px), `.tag-cpo` l. 424 (10,5 px), `.eyebrow` l. 68, `.serial` l. 99, `.tl-date` l. 262, `.r-kicker`, `.footer-sub` (11 px) | lisibilité mobile (≥ 12 px) | 7 styles sous 12 px | Minimum 12 px partout ; bannière à 12 px sur 2 lignes OK | S |
| 4 | Hiérarchie | P1 | `Passport.tsx:65`, `StoryTab.tsx:36`, `TradeTab.tsx:92`, `BuyerTab.tsx:26` | §2.4 souligner en atténuant le reste, §2.6 | Un petit titre bordeaux en majuscules au-dessus de chaque H1/H2 : 4 niveaux qui crient en même temps | Garder seulement « Digital shoe passport » (ou le remplacer par le n° de série) ; supprimer les 3 autres | S |
| 5 | Hiérarchie | P1 | Onglet acheteur : bouton « Add to cart » ; onglet histoire : « Book recrafting » | §2.8 une seule action principale | OK par onglet. Mais sur l'onglet reprise, 3 boutons de couleurs différentes (vert / bordeaux / noir) selon la note | Garder une seule couleur d'action (encre) ; la note porte déjà le code couleur | S |
| 6 | Espacement | P1 | `globals.css` ensemble | §3.2 une échelle, pas de valeurs uniques | Paddings 5/8/9/11/12/13/14/18 px, marges 4/6/8/10/14/16/18/20/22/28 px | Échelle 4 · 8 · 12 · 16 · 24 · 32 · 48 en variables `--s-*` | M |
| 7 | Espacement | P1 | `BuyerTab.tsx:30,35,38`, `StoryTab.tsx:17,61`, `TradeTab.tsx:96,116,149` | §1.5 tout vient d'un système | Styles en ligne `style={{ marginTop: 14 }}`, `fontWeight: 600` | Classes utilitaires (`.mt-3`) ou modificateurs | S |
| 8 | Typographie | P1 | tailles 10,5 / 11 / 11,5 / 12 / 12,5 / 13 / 13,5 / 14 / 15 / 15,5 / 18 / 26 / 28 / 30 / 34 / 40 / 44 px | §4.1 échelle typo, écart ≥ 25 % | 17 tailles, dont plusieurs à moins de 5 % d'écart | 12 · 14 · 16 · 20 · 28 · 40 (+ 56 pour le prix). Corps 16 px | M |
| 9 | Espacement | P1 | `.panels` l. 194 | §3.1 | Les 3 panneaux sont empilés en grille, donc la page a la hauteur du plus long onglet. Sur la paire Strand, ~200 px de vide avant le pied de page | Retirer l'empilement (`display:none` sur les panneaux inactifs) et accepter le changement de hauteur ; garder le fondu | M |
| 10 | Couleur | P1 | `.checks li` l. 444 `#eee5d8` | §5.3 pas de couleur hors palette | Couleur codée en dur | Variable `--line-soft` | S |
| 11 | Couleur | P1 | `--line #d9ccb9` sur crème = 1,4:1 | WCAG 1.4.11 (3:1 pour les bordures de composants actifs) | Les boutons « ghost » (Upload/Use sample) n'ont presque pas de contour | Fond `--card` + bordure `#b9a994` minimum, ou ombre de relief | S |
| 12 | Profondeur | P2 | `.card` partout | §6.2 cinq niveaux d'élévation | Tout est carte plate à bordure 1,5 px : stats, frise, photo, résultat, fiche. Aucune hiérarchie de plans | Frise sans carte (sur le fond) ; seule la fiche acheteur reste « posée » avec une ombre `--shadow-2` | M |
| 13 | Finitions | P2 | `.stats` `StoryTab.tsx:17-33` | §2.5 combiner étiquettes et valeurs | 3 cartes identiques (212 / 5 / 1 / ~3) : le motif « grand chiffre + petite étiquette » par défaut | Une ligne de données dans la page passeport (voir §6) | M |
| 14 | Images | P2 | `BuyerTab.tsx:32` | §7.1 | Même photo deux fois à l'écran (héros + fiche) | Masquer le héros sur l'onglet acheteur, ou un autre angle (semelle, couture) | S |
| 15 | Finitions | P2 | `.save` « Save $205 » sur `--oxblood-soft` | §8.2 | Bordeaux = « refus » ailleurs (note C) mais « bonne affaire » ici | Vert ou encre pour l'économie ; bordeaux réservé aux refus | S |

---

## 2. web-design-guidelines (Vercel) : écarts dans le code

```text
## app/globals.css
app/globals.css:166  - .tab : aucun style :focus-visible ; outline auto 1px du navigateur, invisible sur .btn-primary (fond encre)
app/globals.css:270  - .btn : idem, ajouter :focus-visible { outline: 2px solid var(--oxblood); outline-offset: 2px }
app/globals.css:166,270,340 - aucun état :hover (boutons, onglets, segments) ; le jury sur ordinateur n'a aucun retour au survol
app/globals.css:31   - body 15px ; règle ≥ 16px pour le texte courant sur mobile
app/globals.css:76,84 - .h1/.h2 sans text-wrap: balance (risque de mot orphelin)
app/globals.css      - pas de touch-action: manipulation sur button / .seg button
app/globals.css:144  - .pulse : boucle infinie décorative ; OK, stoppée en reduced-motion (garder)

## components/Passport.tsx
components/Passport.tsx:78-94 - role="tablist" sans flèches gauche/droite ni tabIndex itinérant ; les 3 onglets sont 3 arrêts Tab (modèle WAI-ARIA Tabs)
components/Passport.tsx:56  - getComputedStyle + offsetTop pendant le changement d'onglet (lecture de mise en page), acceptable mais à garder hors du rendu
components/Passport.tsx:52  - l'état de l'onglet est bien dans l'URL (#trade) ✓ ; la note de reprise ne l'est pas (perdue au rechargement)

## components/tabs/TradeTab.tsx
components/tabs/TradeTab.tsx:117 - <label class="btn"> qui sert de bouton d'envoi : pas de focus visible quand l'<input> caché a le focus → utiliser :focus-within sur le label
components/tabs/TradeTab.tsx:117 - aria-disabled sur <label> sans effet visuel
components/tabs/TradeTab.tsx:131 - « 1 / 3 » est décoratif pour le lecteur d'écran : aria-hidden, ou annoncer « Question 1 sur 3 »
components/tabs/TradeTab.tsx:153 - aria-live="polite" sur un bloc qui contient les 4 cartes : risque de tout annoncer ; mettre aria-live sur le seul titre du résultat

## components/tabs/BuyerTab.tsx / StoryTab.tsx
components/tabs/BuyerTab.tsx:42-46 - prix en dur "$" + nombre → Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0})
components/tabs/StoryTab.tsx:18-33 - les stats n'ont pas de titre de section (h2/h3), la structure saute de H1 à H2 « From hide to today »
components/tabs/StoryTab.tsx:46  - dates « FEB 2021 » écrites en dur → Intl.DateTimeFormat si données en ISO

## app/layout.tsx
app/layout.tsx:30 - themeColor #1f1a17 (bannière) ✓ cohérent
app/layout.tsx:39 - pas de lien d'évitement (« Aller au contenu ») ; mineur, page courte
- Marques (« Allen Edmonds », « Goodyear », « Port Washington ») : ajouter translate="no"

## Conforme ✓
images avec alt ; icônes aria-hidden ; boutons = <button> ; toast aria-live ; panneaux cachés en inert ;
prefers-reduced-motion géré ; safe-area-inset ; viewport sans user-scalable=no ; « … » typographiques ;
chiffres tabulaires (.num) ; next/image en fill dans un conteneur à ratio fixe (pas de saut de mise en page)
```

---

## 3. ui-ux-pro-max : priorités 1 → 10

| Priorité | Catégorie | État | Constats |
|---|---|---|---|
| 1 | Accessibilité (CRITIQUE) | ❌ | Contraste `--ink-3` 3,55:1 ; focus non stylé ; onglets sans flèches |
| 2 | Toucher et interaction (CRITIQUE) | ⚠️ | Cibles OK (boutons 52 px, segments 46 px, petits boutons 40-44 px) ; « Upload / Use sample » à 40 px, à porter à 44 px ; retour visuel au toucher seulement `scale(.98)` |
| 3 | Performance | ✅ | WebP, `priority` sur le héros, lazy sur la fiche, polices `display: swap`, 114 kB de JS |
| 4 | Choix du style | ⚠️ | Style « patrimoine artisanal » cohérent avec le sujet, mais générique (voir §4) ; icônes SVG ✓, pas d'emoji ✓ |
| 5 | Mise en page et responsive | ⚠️ | Mobile ✓ ; bureau : colonne 440 px seule dans 1440 px, rien n'est prévu pour un écran projeté |
| 6 | Typographie et couleur | ❌ | Corps 15 px (< 16) ; plusieurs textes sous 12 px ; couleurs en dur (`#eee5d8`, `#7fcf9f`, `#e7c9a0`, `#efe6d8`) |
| 7 | Animation | ✅ | Courbe d'accélération unique et propre, sortie plus rapide que l'entrée sur les résultats ✓, reduced-motion ✓ |
| 8 | Formulaires et retours | ⚠️ | Le parcours photo → réponses → note est très clair ; mais l'état vide est un gros bloc, et « Instant estimate · confirmed by AE at drop-off » arrive après les questions au lieu d'avant |
| 9 | Navigation | ✅ | Liens directs `#story/#trade/#buyer`, onglets fixes en haut, retour navigateur non pollué (`replaceState`) |
| 10 | Graphiques et données | n/a | La frise n'utilise pas la couleur seule (libellés date + titres) ✓ |

**Design system généré par l'outil** (`"luxury heritage craftsmanship product passport" --design-system`) :
- la recommandation de polices (Rubik + Nunito Sans) et de couleurs est **hors sujet** pour une marque de souliers cousus Goodyear, donc à ignorer ;
- deux principes sont à retenir :
  - **« Scroll-triggered storytelling »** : raconter par chapitres, un appel à l'action à la fin de chaque chapitre ;
  - **anti-motifs** : *« Generic product pages »* et *« No story »*. C'est exactement le risque de l'en-tête actuel.

**Checklist de livraison** (ui-ux-pro-max) :
- [x] Pas d'emoji en icône
- [x] `cursor: pointer` sur tout ce qui est cliquable (*boutons OK, `label.btn` OK, segments à vérifier*)
- [x] États de survol 150-300 ms (*absents*)
- [x] Contraste texte ≥ 4,5:1 (*échec `--ink-3`*)
- [x] Focus visible au clavier (*défaut navigateur seulement*)
- [x] `prefers-reduced-motion` respecté
- [ ] Responsive 375 / 768 / 1024 / 1440 (*375 et ≥ 900 px faits ; 768 reste la colonne centrée*)

---

## 4. frontend-design (Anthropic) : direction et « effet IA »

Le skill liste cinq familles d'esthétique que les IA produisent par défaut. Le prototype en coche trois :

| Marqueur par défaut | Présent ? | Où |
|---|---|---|
| Fond crème chaud (~#F4F1EA) + serif à fort contraste + accent terre | **Oui** | `--cream #f6f1e8`, Cormorant Garamond 700, accent bordeaux |
| Petit titre en MAJUSCULES espacées au-dessus de chaque titre | **Oui** | 4 occurrences + kickers de résultat + dates de frise + étiquette CPO |
| Méta-données reliées par « · » | **Oui** | `Black calf · US 10.5 D · made 2021`, `Authentic pair · made in…`, `Book recrafting · $150`, `Grade B · accepted`, `Certified · Grade B`, bannière, pied de page |
| Kit de cartes SaaS identiques, même rayon partout | Partiel | stats, frise, photo, résultat, fiche : toutes en carte 18 px de rayon + bordure 1,5 px |
| Grand chiffre + petite étiquette | Oui | rangée 212 / 5 / 1 |

Le skill précise que ces choix ne sont pas des fautes en soi. Le problème, c'est qu'ils apparaissent **quel que soit le sujet** : remplacez « chaussure » par « montre » ou « sac », la page tient toujours. Ses recommandations :

1. **Partir du sujet.** Le monde d'Allen Edmonds offre déjà son propre vocabulaire visuel :
   - **le passeport** : page d'identité, numéro, tampons, filigrane ;
   - **le cuir** : noir veau, noyer, grain ;
   - **la fabrication** : 212 étapes, trépointe Goodyear, forme ;
   - **l'étiquette d'atelier** : fiche de suivi Port Washington.
2. **Une seule audace.** Mettre toute l'énergie dans **un** élément mémorable et garder le reste sobre. Ici, cet élément devrait être *la page passeport avec ses tampons de ressemelage*. Chaque recraft = un tampon daté ; « ~3 » = 3 cases de tampon, dont une remplie.
3. **Typo.** Cormorant en 700 est le serif « luxe » le plus utilisé par les IA.
   - Alternatives plus liées au sujet : un serif d'étiquette ou de document officiel (Source Serif 4, Newsreader, IBM Plex Serif), ou une capitale gravée pour le seul nom du modèle.
   - Pour le numéro de série : une chasse fixe **uniquement là**, car ça imite une vraie ligne de passeport.
4. **Pas de mot isolé en couleur, pas de majuscules pour les étiquettes, pas d'étiquettes inutiles.** Supprimer « Its life so far » (le titre « From hide to today » suffit).
5. **Mouvement.** Un seul moment orchestré : à l'ouverture (scan NFC), le tampon « Authentic » se pose. Supprimer le point vert pulsant permanent.
6. **Rédaction.**
   - Boutons orientés action et cohérents de bout en bout : le bouton « Get my $75 credit » doit déclencher un toast qui dit « Credit reserved » ;
   - éviter le jargon (« CPO ») ;
   - « Its story » → « Story ».

---

## 5. oil-ui : relecture indépendante (sans accès au code)

oil-ui exige que la relecture soit faite par un relecteur isolé : un agent séparé qui n'a vu **ni le code ni mes conclusions**, seulement les captures, le brief et la page en ligne. Il a appliqué la grille « nouvelle interface », notée sur 10.

**Test des 3 secondes :** « une fiche produit e-commerce premium de 2023 ». Le regard va au titre, puis à la photo. C'est lisible et publiable, mais ça plafonne la note.

**Note : 7/10.** Pour atteindre 8 : un en-tête « passeport » reconnaissable même en miniature, plus de vide dans la carte de résultat, des petits textes lisibles projetés, une frise qui raconte au défilement.

### Problèmes (par impact)

| # | Où | Constat | Cible |
|---|---|---|---|
| 1 | En-tête, onglet Story | En miniature, c'est une fiche produit (titre serif + photo). Ce qui fait la valeur (n° de série, puce appairée, lieu de fabrication) est réduit à une petite pastille. Remplacez « Park Avenue » par une autre chaussure : la page tient toujours | Le **passeport** (n° de série, puce, fabrication) est le personnage principal, lisible à 180 px de large ; la photo le sert |
| 2 | Carte résultat avant réponse (Trade in) | Grand vide sous les 3 questions : on dirait une page inachevée | Pas de zone vide > 40 px ; afficher l'échelle A/B/C ou rien |
| 3 | Petits textes gris (pied de page, « Instant estimate… », « Uncertified on eBay ~$70 », légende sous le bouton) | Ce sont les arguments du pitch, et ce sont les textes les moins lisibles | Lisibles projetés depuis le fond de la salle, ≥ 4,5:1 |
| 4 | Bureau 1440×900 | Colonne de 408 px qui flotte dans du beige vide ; le jury verra peut-être cette version | Cadre téléphone assumé ou mise en scène voulue ; en-tête non tronqué à 900 px de haut |
| 5 | Partout | Tout est dans une carte à bordure identique, donc rien ne se démarque | Au moins un bloc par onglet sans boîte ; le bloc principal se distingue par sa forme |

### Améliorations

- **Finition** :
  - les alignements à gauche sont propres (2 lignes de repère seulement) ;
  - mais « 212 hand steps » répète la frise, et le « / ~3 » est mal calé et ressemble à une coquille.
- **Identité visuelle** :
  - la serif, le bordeaux et le disque de note « B » ont un vrai niveau premium ;
  - en revanche, les boutons segmentés beiges et les pastilles d'icônes vert pâle restent des composants par défaut ;
  - cible : des contrôles qui évoquent le cuir et l'atelier (surpiqûre, estampille) sans ajouter d'éléments.
- **Mouvement** :
  - existant (vérifié sur la page) : indicateur d'onglet qui glisse, fondu des panneaux, analyse photo en 3 étapes, reduced-motion respecté, toasts « Demo only » honnêtes ;
  - à ajouter : la frise qui **se remplit comme un fil de couture** au défilement, chaque étape s'allumant au passage ;
  - à ajouter : la note qui **se pose comme un tampon encreur**.
  - Ressenti à vitesse réelle non vérifié.

**À garder :** le ton éditorial sobre (serif, bordeaux, beige papier), la carte de résultat avec ses étapes numérotées, la comparaison « $245 vs ~$70 non certifié ».

---

## 6. Plan d'action consolidé

### A. Corrections rapides (< 1 h, sans changer la direction)

- [x] `--ink-3: #6f645a` (`app/globals.css:11`)
- [x] Style de focus global :
  ```css
  :where(button, a, [role="tab"], label.btn):focus-visible { outline: 2px solid var(--oxblood); outline-offset: 2px; }
  label.btn:has(input:focus-visible) { outline: 2px solid var(--oxblood); outline-offset: 2px; }
  ```
- [x] Minimum 12 px : `.banner`, `.tag-cpo`, `.eyebrow`, `.serial`, `.tl-date`, `.r-kicker`, `.footer-sub`. Corps `body` 15 → 16 px
- [x] Supprimer les petits titres « Its life so far », « AE Certified Pre-Owned », « Buying used? · the next owner »
- [x] Masquer la photo d'en-tête sur l'onglet acheteur (`html[data-tab="buyer"] .hero { display:none }`) ou changer d'angle
- [x] État vide du résultat : une ligne d'aide au lieu de la carte de 370 px
- [x] `text-wrap: balance` sur `.h1, .h2, .r-title`
- [x] États `:hover` (`.btn-primary:hover { background: #000 }`, `.tab:hover { color: var(--ink) }`, `.seg button:hover`)
- [x] « Upload photo / Use sample » : `min-height: 44px`
- *Note : la bordure `#b9a994` proposée ne fait que 2,04:1 ; `--line-strong` est passé à `#948470` (3,22:1 sur crème, 3,57:1 sur carte).*
- [x] Copie : « Its story » → « Story » ; « / ~3 » → « of ~3 » ; aligner le README sur le pied de page ($75 / $245 / $265)
- [x] « Save $205 » en vert ou en encre, pas en bordeaux

### B. Chantiers moyens (½ à 1 journée)

- [x] **Onglets accessibles** : flèches gauche/droite + Début/Fin, `tabIndex={selected ? 0 : -1}` (modèle WAI-ARIA Tabs)
- [x] **Hauteur des panneaux** : ne rendre que le panneau actif (garder le fondu) pour supprimer le vide sous les onglets courts
- [x] **Échelles** : variables `--s-1…--s-8` (4-48 px), `--fs-xs…--fs-3xl` (12-56 px), `--r-sm/md/lg` ; remplacer les styles en ligne et les couleurs en dur
- [x] **Une seule couleur d'action** (encre) ; vert et bordeaux réservés aux *statuts* (note A/B accepté, C/refus)
- [x] **Moins de cartes** : frise posée sur le fond, stats intégrées à l'en-tête ; seule la fiche acheteur reste une carte en relief
- [x] **Vue bureau / projection** : à partir de 900 px, le téléphone dans un cadre au centre, et à côté un QR code « Scannez la puce » avec le pitch en 3 lignes
  - *Fait sans le QR code (choix : pas de bibliothèque) ; l'adresse de la page est affichée en texte.*
- [x] **Prix et dates** via `Intl.NumberFormat` / `Intl.DateTimeFormat` ; `translate="no"` sur les marques
  - *Prix et marques faits. Dates non faites : `data/pairs.json` contient « Feb 2021 », pas de l'ISO, et les données ne devaient pas changer.*
- [x] **Note de reprise dans l'URL** (`#trade?g=B`) pour une démo reproductible et partageable

### C. Refonte : faire du passeport l'idée visible

C'est ce qui ferait passer le prototype de « fiche produit soignée » à « concept qu'on retient ». Comme c'est un changement de direction, les skills (huashu-design, oil-ui) demandent **d'abord 3 directions à comparer**, avant de coder. Pistes :

1. **Page d'identité** :
   - photo de la paire dans un cadre façon passeport ;
   - champs *Modèle / Cuir / Pointure / Né le / Lieu* alignés comme sur un document ;
   - n° de série en chasse fixe ;
   - ligne codée en bas (`P<AE<PARKAVENUE<<BLACKCALF<<PW21048172<<<`).
2. **Visas** : chaque étape de la frise = un tampon (encre bordeaux, légère rotation, date) ; les ressemelages restants = cases vides en pointillés.
3. **Moment unique** : au premier affichage, le tampon « Authentic · Port Washington » se pose (300 ms, désactivé en reduced-motion).
4. **Reprise** = « Mettre fin à ce passeport » ; **Acheteur** = « Le passeport vous est transféré ». La métaphore relie les 3 onglets.

---

## Annexe A : contrastes mesurés (`check_contrast.py`)

| Texte | Fond | Ratio | Verdict |
|---|---|---|---|
| `--ink-3 #8a7d72` | crème `#f6f1e8` | 3,55:1 | ❌ |
| `--ink-3 #8a7d72` | carte `#fffdf9` | 3,93:1 | ❌ |
| `--ink-3 #8a7d72` | `--cream-2 #ece3d5` | 3,14:1 | ❌ |
| `--line #d9ccb9` (bordure) | crème | 1,40:1 | ❌ pour un bouton (3:1 requis) |
| **proposé `#6f645a`** | crème / carte / cream-2 | 5,12 / 5,67 / 4,53:1 | ✅ |
| `--ink-2 #5a4f47` | crème / cream-2 | 7,06 / 6,25:1 | ✅ |
| bordeaux `#6b1f24` | crème | 10,11:1 | ✅ |
| vert `#2f5d44` | `--green-soft` | 6,33:1 | ✅ |
| bannière `#efe6d8` | encre `#1f1a17` | 13,94:1 | ✅ |

## Annexe B : variables proposées

```css
:root {
  /* texte : 3 niveaux max (refactoring-ui §2.2) */
  --ink: #1f1a17;  --ink-2: #5a4f47;  --ink-3: #6f645a;
  --line: #d9ccb9; --line-strong: #b9a994; --line-soft: #eee5d8;

  /* espacement */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 24px; --s-6: 32px; --s-7: 48px;

  /* typo (écart ≥ 25 %) */
  --fs-xs: 12px; --fs-sm: 14px; --fs-md: 16px; --fs-lg: 20px; --fs-xl: 28px; --fs-2xl: 40px; --fs-3xl: 56px;

  /* rayons selon le niveau */
  --r-sm: 8px; --r-md: 12px; --r-lg: 18px;

  /* élévation (lumière venant du haut) */
  --shadow-1: 0 1px 2px rgb(31 26 23 / .10);
  --shadow-2: 0 1px 2px rgb(31 26 23 / .08), 0 6px 16px rgb(31 26 23 / .08);
}
```

### À garder absolument

- Les vraies photos.
- La frise avec le ressemelage en bordeaux.
- Les 4 issues de reprise (A, B, C, cuir abîmé) avec étapes numérotées : c'est une vraie séquence, la numérotation est justifiée.
- La fiche acheteur (prix barré + comparaison eBay + tableau de confiance).
- Les liens directs sans flash d'onglet.
- `inert` sur les panneaux cachés.
- La gestion de reduced-motion.
- La bannière d'honnêteté « concept, pas un service AE ».
