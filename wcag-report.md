# Rapport WCAG



## Éléments aria-hidden contenant du contenu focusable

### Résumé
Les éléments avec l'attribut `aria-hidden` qui sont également capables d'accaparer le focus peuvent perturber les utilisateurs qui naviguent par clavier ou avec un lecteur d'écran. Cela peut entraîner une navigation confuse et rendre difficile la localisation des éléments réellement interactifs, ce qui est particulièrement problématique pour les personnes ayant des limitations visuelles.

### Problème
Les éléments `c-icon-button` situés dans le DOM sous l'attribut `aria-hidden` sont capables d'accaparer le focus. Cela signifie que ces éléments peuvent être sélectionnés par un utilisateur naviguant avec une souris, un clavier ou un lecteur d'écran, ce qui est incohérent avec la finalité de l'attribut `aria-hidden`.

### Règle WCAG concernée
2.4.1 – Navigabilité (A)

### Cause technique
L'attribut `aria-hidden` est utilisé pour indiquer que le contenu ne doit pas être rendu accessible par les technologies d’assistance, mais certains éléments sous cet attribut restent capables de recevoir le focus. Cela peut entraîner une mauvaise expérience utilisateur et des problèmes de navigation.

### Correction proposée
Pour corriger cette violation, il faut soit supprimer l'attribut `aria-hidden` si les éléments doivent être accessibles, soit désactiver la possibilité d'accaparer le focus pour ces éléments. Voici un exemple de correction :

```html
<div class="aspect-square" tabindex="-1">
  <div class="mx-1 will-change-transform">
    <div class="bottom-3.5 right-3.5 left-3.5">
      <div class="items-end gap-3 justify-between">
        <div class="self-end flex-shrink-0">
          <!-- Désactiver le focus pour l'élément c-icon-button -->
          <c-icon-button tabindex="-1" aria-hidden="true"></c-icon-button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Recommandation
Assurez-vous que les éléments avec `aria-hidden` ne soient pas capables d'accaparer le focus. Si ces éléments doivent être interactifs, supprimez l'attribut `aria-hidden`. Sinon, désactivez la possibilité de recevoir le focus pour ces éléments en utilisant `tabindex="-1"` ou un autre moyen approprié.

---

Ce rapport vous guide pas à pas dans la correction des problèmes liés aux éléments `aria-hidden` contenant du contenu focusable. N'hésitez pas si vous avez besoin d'aide supplémentaire !


## ARIA attributs interdits sur certains rôles

### Résumé
L'utilisation d'attributs ARIA non autorisés peut entraîner une mauvaise interaction avec les lecteurs d'écran et d'autres technologies d'assistance, rendant l'interface utilisateur moins accessible pour les personnes ayant des besoins spécifiques. Cela peut perturber la navigation et la compréhension du contenu.

### Problème
L'attribut `aria-label` est utilisé sur un élément `<c-button>` sans attribut de rôle valide, ce qui est interdit par les normes ARIA. L'absence d'un rôle approprié peut entraîner une mauvaise interprétation du lecteur d'écran.

### Règle WCAG concernée
2.5.3 – Pointer sur l’élément (en utilisant des rôles et des attributs ARIA pour définir correctement les éléments).

### Cause technique
L'attribut `aria-label` est utilisé sans que le rôle de l'élément `<c-button>` ne soit spécifié ou qu'il n'utilise un rôle valide qui accepte cet attribut. Cela peut entraîner une mauvaise interprétation par les technologies d'assistance.

### Correction proposée
Pour corriger cette violation, il est nécessaire de définir un rôle approprié pour l'élément `<c-button>` ou de supprimer l'attribut `aria-label` si le rôle n'est pas adapté. Par exemple :

```html
<c-button prependicon="search" role="button" aria-label="Rechercher">
```

### Recommandation
Assurez-vous que chaque élément ARIA utilise les attributs et rôles appropriés pour éviter toute confusion avec les technologies d'assistance. Consultez la documentation ARIA pour vérifier les attributs autorisés par le rôle de l'élément.

---

Ce rapport vous guide pas à pas dans la correction des problèmes liés aux attributs ARIA interdits, en mettant l'accent sur l'importance d'une structure DOM correcte et conforme aux normes WCAG.


## Bouton sans texte discernable

### Résumé
Un utilisateur qui navigue avec un lecteur d'écran ne pourra pas comprendre la fonctionnalité du bouton car il n'y a aucun texte visible ou non visible (comme aria-label) pour le décrire. Cela peut entraîner une confusion et des difficultés de navigation, rendant l'interface utilisateur moins accessible.

### Problème
Le bouton en question, identifié par la classe `.max-w-3.c-button--size-m.c-button--variation-primary`, ne contient pas de texte visible ou non visible qui permettrait à un lecteur d'écran de le décrire. Il n'y a pas d'attribut aria-label, aria-labelledby, title, et aucun label explicite ou implicite associé.

### Règle WCAG concernée
1.3.2 – Contraste (minimaire)

**Correction :**
La règle correcte est en réalité 2.5.3 – Éléments de commande discernables.

### Cause technique
L'élément bouton n'a pas d'attribut aria-label, aria-labelledby ou title pour fournir un texte alternatif qui peut être lu par les lecteurs d'écran. De plus, l'élément ne contient pas de texte visible et n'est pas associé à un label explicite ou implicite.

### Correction proposée
Pour résoudre ce problème, vous pouvez ajouter un attribut aria-label avec une description claire du bouton :

```html
<button class="max-w-3 c-button--size-m c-button--variation-primary" aria-label="Valider la commande">></button>
```

Ou si le texte est visible pour les utilisateurs visuels, vous pouvez simplement ajouter ce texte au bouton :

```html
<button class="max-w-3 c-button--size-m c-button--variation-primary">Valider la commande</button>
```

### Recommandation
Ajoutez un aria-label ou du texte visible à chaque bouton pour assurer que les utilisateurs de lecteurs d'écran peuvent comprendre sa fonction. Assurez-vous également que le texte est concis et descriptif.

---

**Note :**
Il semble qu'il y ait une confusion dans la règle WCAG mentionnée initialement (1.3.2 – Contraste). La violation décrite correspond en réalité à 2.5.3 – Éléments de commande discernables, qui exige que les boutons aient un texte ou une étiquette claire pour être compris par tous les utilisateurs, y compris ceux qui utilisent des lecteurs d'écran.


## Contraste insuffisant entre les couleurs

### Résumé
Le contraste insuffisant entre le texte et son arrière-plan rend la lecture difficile pour les utilisateurs ayant une déficience visuelle. Cela peut entraîner des difficultés de navigation, un stress oculaire accru et une perte d'efficacité lors de l'utilisation du site.

### Problème
Les éléments suivants ont un contraste insuffisant entre la couleur du texte et celle de l'arrière-plan :

1. **Cible :** `.border-[\#00b5e2]`
   - Le contraste est de 2.41, alors qu'il devrait être d'au moins 4.5:1 selon les normes WCAG.

2. **Cible :** `app-edito-push:nth-child(6) > .p-[10px].sm\:p-[30px].shadow-[0px_4px_16px_0px_rgba\(18\,18\,18\,0\.08\)] > .md\:grid-cols-[200px_1fr].gap-5.grid > .md\:w-[200px].gap-2.5.mt-3 > .sm\:min-h-[490px].pb-0.p-2.5 > .py-1.5.backdrop-blur-[2px].px-2 > .leading-normal.text-base.font-bold`
   - Le contraste est de 2.41, alors qu'il devrait être d'au moins 4.5:1 selon les normes WCAG.

3. **Cible :** `app-edito-push:nth-child(6) > .p-[10px].sm\:p-[30px].shadow-[0px_4px_16px_0px_rgba\(18\,18\,18\,0\.08\)] > .md\:grid-cols-[200px_1fr].gap-5.grid > .md\:w-[200px].gap-2.5.mt-3 > .sm\:min-h-[490px].pb-0.p-2.5 > .py-1.5.backdrop-blur-[2px].px-2 > .leading-none.text-xs > p`
   - Le contraste est de 2.41, alors qu'il devrait être d'au moins 4.5:1 selon les normes WCAG.

### Règle WCAG concernée
1.4.3 – Contraste (minimaire)

### Cause technique
Les éléments ne respectent pas le ratio de contraste minimal requis par la règle WCAG 2.1 AA pour assurer une lisibilité adéquate des informations textuelles pour les utilisateurs ayant une déficience visuelle.

### Correction proposée

Pour chaque élément, il faut ajuster la couleur du texte ou de l'arrière-plan afin d'atteindre le ratio de contraste minimal requis. Voici quelques exemples :

```html
<!-- Exemple 1 : Ajustement pour .border-[\#00b5e2] -->
<span class="border-[#00b5e2]" style="color: #333;">Texte avec un meilleur contraste</span>

<!-- Exemple 2 : Ajustement pour app-edito-push:nth-child(6) > .p-[10px].sm\:p-[30px]... -->
<span class="leading-normal.text-base.font-bold" style="color: #333;">Texte avec un meilleur contraste</span>

<!-- Exemple 3 : Ajustement pour app-edito-push:nth-child(6) > .p-[10px].sm\:p-[30px]... -->
<p class="leading-none.text-xs" style="color: #333;">Texte avec un meilleur contraste</p>
```

### Recommandation
Utilisez des outils en ligne comme le [Contrast Checker](https://webaim.org/resources/contrastchecker/) pour vérifier et ajuster les couleurs afin de respecter la règle WCAG 2.1 AA sur le contraste.

N'oubliez pas d'effectuer ces tests régulièrement lors des mises à jour du site pour maintenir une expérience utilisateur optimale pour tous les utilisateurs, y compris ceux ayant des déficiences visuelles.


## Images sans texte alternatif

### Résumé
Les images sans texte alternatif peuvent causer des difficultés majeures pour les utilisateurs qui se déplacent avec un lecteur d'écran. Ces utilisateurs ne recevront aucune information sur l'image, ce qui peut entraîner une confusion et une perte de contexte dans la navigation du site web.

### Problème
Les éléments `<img>` analysés n'ont pas d'attribut `alt`, ni d'attributs `aria-label` ou `aria-labelledby`. Ils ne possèdent pas non plus de rôle `none` ou `presentation`.

### Règle WCAG concernée
1.1.1 – Non-text Content.

### Cause technique
Les images doivent avoir un attribut `alt` qui décrit l'image ou indique son fonctionnement si elle est décorative. Les éléments d'images sans ces attributs ne permettent pas aux utilisateurs de comprendre le contenu visuel du site web, ce qui va à l'encontre des exigences de la règle WCAG 1.1.1.

### Correction proposée
Pour chaque image manquante en `alt`, ajoutez un attribut `alt` approprié ou utilisez un rôle `none` pour les images décoratives sans information supplémentaire.

```html
<!-- Exemple d'image avec alt -->
<img src="image.jpg" alt="Description de l'image">

<!-- Pour une image décorative -->
<img src="deco-image.png" role="presentation">
```

### Recommandation
Ajoutez un attribut `alt` à chaque élément `<img>` pour fournir des informations sur le contenu visuel. Si l'image est purement décorative et ne fournit aucune information supplémentaire, utilisez un rôle `none` ou `presentation`.

---

## Images sans texte alternatif

### Résumé
Les images sans texte alternatif peuvent causer des difficultés majeures pour les utilisateurs qui se déplacent avec un lecteur d'écran. Ces utilisateurs ne recevront aucune information sur l'image, ce qui peut entraîner une confusion et une perte de contexte dans la navigation du site web.

### Problème
Les éléments `<img>` analysés n'ont pas d'attribut `alt`, ni d'attributs `aria-label` ou `aria-labelledby`. Ils ne possèdent pas non plus de rôle `none` ou `presentation`.

### Règle WCAG concernée
1.1.1 – Non-text Content.

### Cause technique
Les images doivent avoir un attribut `alt` qui décrit l'image ou indique son fonctionnement si elle est décorative. Les éléments d'images sans ces attributs ne permettent pas aux utilisateurs de comprendre le contenu visuel du site web, ce qui va à l'encontre des exigences de la règle WCAG 1.1.1.

### Correction proposée
Pour chaque image manquante en `alt`, ajoutez un attribut `alt` approprié ou utilisez un rôle `none` pour les images décoratives sans information supplémentaire.

```html
<!-- Exemple d'image avec alt -->
<img src="image.jpg" alt="Description de l'image">

<!-- Pour une image décorative -->
<img src="deco-image.png" role="presentation">
```

### Recommandation
Ajoutez un attribut `alt` à chaque élément `<img>` pour fournir des informations sur le contenu visuel. Si l'image est purement décorative et ne fournit aucune information supplémentaire, utilisez un rôle `none` ou `presentation`.


## Form Elements Sans Labels

### Résumé
Les formes sans labels peuvent être extrêmement frustrantes pour les utilisateurs qui dépendent des lecteurs d'écran ou de l'interface utilisateur en mode clavier. Ces éléments manquent de contexte, rendant difficile la compréhension et l'utilisation correcte du formulaire par ces utilisateurs. Cela peut entraîner une mauvaise saisie de données ou même un abandon du processus.

### Problème
Les form elements identifiés ne possèdent aucun label explicite ou implicite, ni d'attributs aria-label ou aria-labelledby qui pourraient fournir le contexte nécessaire. Ils manquent également d'autres attributs comme title ou placeholder qui pourraient aider à clarifier leur fonction.

### Règle WCAG concernée
1.3.1 – Info et Relations (Level A)

### Cause technique
Les éléments HTML tels que les champs de saisie, les boutons radio et autres contrôles de formulaire ne sont pas associés à un élément `<label>` ou n'ont pas d'attributs aria qui leur donnent une description claire. Cela peut être dû à une mauvaise structuration du DOM ou à l'absence de ces attributs lors de la création des éléments.

### Correction proposée
Pour chaque form element, il faut ajouter un label explicite ou utiliser les attributs aria-label ou aria-labelledby pour fournir le contexte nécessaire. Voici un exemple corrigé :

```html
<div class="relative items-center flex">
  <input type="number" min="0" max="1" step="0.05" aria-label="Entrez la quantité souhaitée">
</div>
```

### Recommandation
Pour chaque élément de formulaire, assurez-vous d'ajouter un label explicite ou d'utiliser les attributs aria pour fournir une description claire et concise du rôle et de l'intention de l'élément. Cela garantit que tous les utilisateurs peuvent comprendre et interagir correctement avec le formulaire.

---

Répétez ce format pour chaque violation identifiée, en adaptant le titre, le résumé, le problème, la règle WCAG, la cause technique, la correction proposée et la recommandation à chaque cas spécifique.


## Titre manquant : La page ne contient pas d'en-tête de niveau 1

### Résumé
La présence d'un en-tête de niveau 1 (h1) est essentielle pour les utilisateurs qui naviguent avec un lecteur d'écran. Sans cet élément, ces utilisateurs peuvent se sentir perdus et ne pas comprendre la structure globale de la page. De plus, cela peut rendre la navigation par le clavier moins intuitive et compliquée.

### Problème
La page analysée n'a pas d'en-tête de niveau 1 (h1). C'est un élément crucial pour structurer le contenu et aider les utilisateurs à comprendre où ils se trouvent sur une page web. 

### Règle WCAG concernée
2.4.6 – Titres (Aria)

Bien que la règle spécifique soit liée au niveau AA, l'absence d'un en-tête de niveau 1 est un problème majeur qui affecte directement la navigation et la compréhension du contenu pour les utilisateurs dépendant des technologies d’assistance.

### Cause technique
Le DOM (Document Object Model) manque d'une balise `<h1>` qui sert à définir le titre principal de la page. Cette absence peut être due à une mauvaise structuration du code ou à un oubli lors de l'écriture des contenus.

### Correction proposée
Ajoutez un en-tête de niveau 1 (h1) au début de votre contenu, qui doit contenir le titre principal de la page. Voici un exemple :

```html
<h1>Titre Principal de la Page</h1>
```

### Recommandation
Assurez-vous d'inclure systématiquement un en-tête de niveau 1 (h1) pour chaque nouvelle page que vous créez ou modifiez. Cela aidera à améliorer l'expérience utilisateur et la conformité avec les normes WCAG.

---

Ce rapport est conçu pour être clair, concis et facilement applicable par un développeur ou un concepteur web. Il vise à résoudre le problème de manière efficace tout en promouvant une meilleure expérience utilisateur pour tous.


## Contenu non inclus dans des balises landmark

### Résumé
Le contenu n'est pas inclus dans des balises landmark (comme `<main>`, `<header>`, `<footer>`). Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Le contenu n'est pas inclus dans des balises landmark. Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1 – Info et Relations (Level A).

### Cause technique
Le DOM n'est pas correctement structuré avec des balises landmark, ce qui empêche le lecteur d'écran de reconnaître les sections principales du contenu.

### Correction proposée
Ajoutez des balises landmark pour chaque section importante. Par exemple :

```html
<main>
  <app-text></app-text>
</main>

<article role="region">
  <app-anim-co></app-anim-co>
</article>

<footer>
  <app-legal-notices></app-legal-notices>
</footer>
```

### Recommandation
Utilisez des balises landmark appropriées pour chaque section du contenu. Cela permet aux utilisateurs de naviguer facilement entre les sections principales de la page.

---

## Images sans texte alternatif

### Résumé
Les images n'ont pas d'attribut `alt`. Les utilisateurs qui utilisent un lecteur d'écran ne peuvent pas comprendre le contenu des images, ce qui peut entraîner une perte d'information importante pour l'utilisateur.

### Problème
Certaines images manquent de texte alternatif (attribut `alt`). Par exemple :

```html
<img src="image.jpg" alt="">
```

### Règle WCAG concernée
1.1.1 – Non-text Content (Level A).

### Cause technique
L'attribut `alt` est absent ou vide pour les images.

### Correction proposée
Ajoutez un attribut `alt` descriptif à chaque image :

```html
<img src="image.jpg" alt="Description de l'image">
```

### Recommandation
Assurez-vous que chaque image a un attribut `alt` qui décrit précisément son contenu.

---

## Bouton sans label

### Résumé
Les boutons n'ont pas de texte ou d'étiquette. Les utilisateurs qui utilisent un lecteur d'écran ne peuvent pas comprendre la fonction du bouton, ce qui peut entraîner une confusion et une perte de navigation.

### Problème
Certains éléments de type bouton manquent de texte ou d'étiquette :

```html
<button class="stretched-link" target="_parent" aria-label="Voir l'offre"></button>
```

### Règle WCAG concernée
2.4.4 – Link Purpose (In Context) (Level A).

### Cause technique
L'élément bouton n'a pas de texte visible ou d'étiquette claire.

### Correction proposée
Ajoutez un texte visible pour le bouton :

```html
<button class="stretched-link" target="_parent">Voir l'offre</button>
```

### Recommandation
Assurez-vous que chaque bouton a un texte visible et descriptif qui indique sa fonction.

---

## Titres manquants

### Résumé
Les sections importantes de la page n'ont pas de titres. Les utilisateurs qui utilisent un lecteur d'écran ne peuvent pas facilement identifier les sections principales, ce qui peut entraîner une confusion et une perte de navigation.

### Problème
Certaines sections manquent de titres :

```html
<div class="section">
  <!-- Contenu -->
</div>
```

### Règle WCAG concernée
2.4.6 – Heading and Label Orientation (Level AA).

### Cause technique
Les éléments n'ont pas d'éléments `<h1>`, `<h2>` ou autres titres pour structurer le contenu.

### Correction proposée
Ajoutez des titres aux sections importantes :

```html
<div class="section">
  <h2>Titre de la section</h2>
  <!-- Contenu -->
</div>
```

### Recommandation
Utilisez les balises `<h1>` à `<h6>` pour structurer le contenu et rendre la navigation plus facile.

---

## Lien non descriptif

### Résumé
Les liens ne sont pas suffisamment descriptifs. Les utilisateurs qui utilisent un lecteur d'écran peuvent avoir du mal à comprendre où les liens mènent, ce qui peut entraîner une confusion et une perte de navigation.

### Problème
Certains liens manquent de texte descriptif :

```html
<a href="lien.html" class="stretched-link">Voir l'offre</a>
```

### Règle WCAG concernée
2.4.4 – Link Purpose (In Context) (Level A).

### Cause technique
Le lien n'a pas de texte descriptif.

### Correction proposée
Ajoutez un texte descriptif pour le lien :

```html
<a href="lien.html" class="stretched-link">Voir l'offre</a>
```

### Recommandation
Assurez-vous que chaque lien a du texte clair et descriptif qui indique où il mène.

---

## Contenu non inclus dans des balises landmark (suite)

### Résumé
Le contenu n'est pas inclus dans des balises landmark. Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1 – Info and Relationships (Level A).

### Cause technique
Le DOM n'est pas correctement structuré avec des balises landmark, ce qui empêche le lecteur d'écran de reconnaître les sections principales du contenu.

### Correction proposée
Ajoutez des balises landmark pour chaque section importante :

```html
<main>
  <app-text></app-text>
</main>

<article role="region">
  <app-anim-co></app-anim-co>
</article>

<footer>
  <app-legal-notices></app-legal-notices>
</footer>
```

### Recommandation
Utilisez des balises landmark appropriées pour chaque section du contenu. Cela permet aux utilisateurs de naviguer facilement entre les sections principales de la page.

---

## Contenu non inclus dans des balises landmark (suite)

### Résumé
Le contenu n'est pas inclus dans des balises landmark. Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1 – Info and Relationships (Level A).

### Cause technique
Le DOM n'est pas correctement structuré avec des balises landmark, ce qui empêche le lecteur d'écran de reconnaître les sections principales du contenu.

### Correction proposée
Ajoutez des balises landmark pour chaque section importante :

```html
<main>
  <app-text></app-text>
</main>

<article role="region">
  <app-anim-co></app-anim-co>
</article>

<footer>
  <app-legal-notices></app-legal-notices>
</footer>
```

### Recommandation
Utilisez des balises landmark appropriées pour chaque section du contenu. Cela permet aux utilisateurs de naviguer facilement entre les sections principales de la page.

---

## Contenu non inclus dans des balises landmark (suite)

### Résumé
Le contenu n'est pas inclus dans des balises landmark. Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1 – Info and Relationships (Level A).

### Cause technique
Le DOM n'est pas correctement structuré avec des balises landmark, ce qui empêche le lecteur d'écran de reconnaître les sections principales du contenu.

### Correction proposée
Ajoutez des balises landmark pour chaque section importante :

```html
<main>
  <app-text></app-text>
</main>

<article role="region">
  <app-anim-co></app-anim-co>
</article>

<footer>
  <app-legal-notices></app-legal-notices>
</footer>
```

### Recommandation
Utilisez des balises landmark appropriées pour chaque section du contenu. Cela permet aux utilisateurs de naviguer facilement entre les sections principales de la page.

---

## Contenu non inclus dans des balises landmark (suite)

### Résumé
Le contenu n'est pas inclus dans des balises landmark. Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1 – Info and Relationships (Level A).

### Cause technique
Le DOM n'est pas correctement structuré avec des balises landmark, ce qui empêche le lecteur d'écran de reconnaître les sections principales du contenu.

### Correction proposée
Ajoutez des balises landmark pour chaque section importante :

```html
<main>
  <app-text></app-text>
</main>

<article role="region">
  <app-anim-co></app-anim-co>
</article>

<footer>
  <app-legal-notices></app-legal-notices>
</footer>
```

### Recommandation
Utilisez des balises landmark appropriées pour chaque section du contenu. Cela permet aux utilisateurs de naviguer facilement entre les sections principales de la page.

---

## Contenu non inclus dans des balises landmark (suite)

### Résumé
Le contenu n'est pas inclus dans des balises landmark. Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1 – Info and Relationships (Level A).

### Cause technique
Le DOM n'est pas correctement structuré avec des balises landmark, ce qui empêche le lecteur d'écran de reconnaître les sections principales du contenu.

### Correction proposée
Ajoutez des balises landmark pour chaque section importante :

```html
<main>
  <app-text></app-text>
</main>

<article role="region">
  <app-anim-co></app-anim-co>
</article>

<footer>
  <app-legal-notices></app-legal-notices>
</footer>
```

### Recommandation
Utilisez des balises landmark appropriées pour chaque section du contenu. Cela permet aux utilisateurs de naviguer facilement entre les sections principales de la page.

---

## Contenu non inclus dans des balises landmark (suite)

### Résumé
Le contenu n'est pas inclus dans des balises landmark. Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1 – Info and Relationships (Level A).

### Cause technique
Le DOM n'est pas correctement structuré avec des balises landmark, ce qui empêche le lecteur d'écran de reconnaître les sections principales du contenu.

### Correction proposée
Ajoutez des balises landmark pour chaque section importante :

```html
<main>
  <app-text></app-text>
</main>

<article role="region">
  <app-anim-co></app-anim-co>
</article>

<footer>
  <app-legal-notices></app-legal-notices>
</footer>
```

### Recommandation
Utilisez des balises landmark appropriées pour chaque section du contenu. Cela permet aux utilisateurs de naviguer facilement entre les sections principales de la page.

---

## Contenu non inclus dans des balises landmark (suite)

### Résumé
Le contenu n'est pas inclus dans des balises landmark. Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1 – Info and Relationships (Level A).

### Cause technique
Le DOM n'est pas correctement structuré avec des balises landmark, ce qui empêche le lecteur d'écran de reconnaître les sections principales du contenu.

### Correction proposée
Ajoutez des balises landmark pour chaque section importante :

```html
<main>
  <app-text></app-text>
</main>

<article role="region">
  <app-anim-co></app-anim-co>
</article>

<footer>
  <app-legal-notices></app-legal-notices>
</footer>
```

### Recommandation
Utilisez des balises landmark appropriées pour chaque section du contenu. Cela permet aux utilisateurs de naviguer facilement entre les sections principales de la page.

---

## Contenu non inclus dans des balises landmark (suite)

### Résumé
Le contenu n'est pas inclus dans des balises landmark. Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1 – Info and Relationships (Level A).

### Cause technique
Le DOM n'est pas correctement structuré avec des balises landmark, ce qui empêche le lecteur d'écran de reconnaître les sections principales du contenu.

### Correction proposée
Ajoutez des balises landmark pour chaque section importante :

```html
<main>
  <app-text></app-text>
</main>

<article role="region">
  <app-anim-co></app-anim-co>
</article>

<footer>
  <app-legal-notices></app-legal-notices>
</footer>
```

### Recommandation
Utilisez des balises landmark appropriées pour chaque section du contenu. Cela permet aux utilisateurs de naviguer facilement entre les sections principales de la page.

---

## Contenu non inclus dans des balises landmark (suite)

### Résumé
Le contenu n'est pas inclus dans des balises landmark. Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1 – Info and Relationships (Level A).

### Cause technique
Le DOM n'est pas correctement structuré avec des balises landmark, ce qui empêche le lecteur d'écran de reconnaître les sections principales du contenu.

### Correction proposée
Ajoutez des balises landmark pour chaque section importante :

```html
<main>
  <app-text></app-text>
</main>

<article role="region">
  <app-anim-co></app-anim-co>
</article>

<footer>
  <app-legal-notices></app-legal-notices>
</footer>
```

### Recommandation
Utilisez des balises landmark appropriées pour chaque section du contenu. Cela permet aux utilisateurs de naviguer facilement entre les sections principales de la page.

---

## Contenu non inclus dans des balises landmark (suite)

### Résumé
Le contenu n'est pas inclus dans des balises landmark. Cela rend la navigation pour les utilisateurs qui utilisent un lecteur d'écran plus difficile, car ils ne peuvent pas facilement sauter entre les sections principales de la page.

### Problème
Les éléments tels que `app-text`, `app-anim-co`, et `app-legal-notices` ne sont pas entourés par des balises qui permettent une navigation structurée pour les utilisateurs de lecteurs d'écran.

### Règle WCAG concernée
1.3.1


## Éléments scrolables non accessibles au clavier

### Résumé
Les utilisateurs qui naviguent avec un clavier ou un lecteur d'écran peuvent rencontrer des difficultés pour accéder à du contenu scrolable, comme des conteneurs de liste ou des panneaux de chat. Cela peut entraîner une perte de navigation et rendre l'expérience utilisateur frustrante, voire impossible.

### Problème
L’élément avec la classe `.sm\:flex-row` ne permet pas aux utilisateurs d'accéder à son contenu scrolable via le clavier. Il n'est pas focusable ni ne contient de contenu focusable, ce qui empêche les utilisateurs de naviguer et d'interagir avec le contenu scrolable.

### Règle WCAG concernée
2.1.3 – Éléments Focusables (A)

### Cause technique
L’élément en question n'est pas configuré pour recevoir le focus via un clavier, ce qui est nécessaire pour les éléments contenant du contenu scrolable. Il manque des attributs ou une structure DOM appropriée pour rendre l'élément accessible.

### Correction proposée
Pour résoudre cette violation, il faut ajouter la propriété `tabindex="0"` à l’élément et s'assurer qu'il contient au moins un élément focusable (comme un bouton ou une liste) qui permettra aux utilisateurs de naviguer dans le contenu scrolable.

```html
<div class="sm\:flex-row" tabindex="0">
  <div>
    <!-- Contenu scrolable -->
    <button>Scroll</button>
  </div>
</div>
```

### Recommandation
Ajoutez `tabindex="0"` à tous les éléments contenant du contenu scrolable et assurez-vous qu'ils contiennent au moins un élément focusable pour permettre aux utilisateurs de naviguer dans le contenu via le clavier.
