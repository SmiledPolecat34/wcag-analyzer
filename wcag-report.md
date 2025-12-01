<div class="violation-card impact-serious">

## Éléments aria-hidden contenant des éléments focusables

### Résumé

Les utilisateurs qui naviguent avec le clavier ou l'aide d'un lecteur d'écran peuvent rencontrer des problèmes de navigation et de compréhension du contenu s'il existe des éléments `aria-hidden` qui sont eux-mêmes focusables ou contiennent des éléments focusables. Cela peut entraîner une confusion, car ces éléments ne devraient pas être accessibles via le clavier ni lus par un lecteur d'écran.

### Problème

Les éléments `.aspect-square:nth-child(2) > .mx-1.will-change-transform > .bottom-3\.5.right-3\.5.left-3\.5 > .items-end.gap-3.justify-between > .self-end.flex-shrink-0 > c-icon-button` et `.aspect-square:nth-child(4) > .mx-1.will-change-transform > .bottom-3\.5.right-3\.5.left-3\.5 > .items-end.gap-3.justify-between > .self-end.flex-shrink-0 > c-icon-button` sont marqués avec `aria-hidden="true"` mais restent focusables. Cela va à l'encontre des bonnes pratiques d'accessibilité et peut perturber la navigation de l'utilisateur.

### Règle WCAG concernée

2.4.1 - Navigateurs de page (A)

### Cause technique

Les éléments `aria-hidden="true"` doivent être non focusables et ne pas contenir d'éléments focusables. Dans ce cas, les éléments ciblés sont marqués avec `aria-hidden` mais restent dans le flux du clavier, causant une incohérence entre l'intention de masquer ces éléments pour les lecteurs d'écran et leur comportement réel.

### Correction proposée

Pour résoudre ce problème, il faut soit désactiver la focusabilité des éléments en question, soit les retirer complètement du DOM si leur présence n'est pas nécessaire. Voici un exemple de correction :

```html
<div class="aspect-square" tabindex="-1">
  <div class="mx-1 will-change-transform">
    <div class="bottom-3\.5 right-3\.5 left-3\.5">
      <div class="items-end gap-3 justify-between">
        <div class="self-end flex-shrink-0">
          <!-- Désactiver la focusabilité -->
          <c-icon-button aria-hidden="true" tabindex="-1"></c-icon-button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Recommandation

Assurez-vous que tous les éléments marqués avec `aria-hidden` ne sont pas focusables et n'ont pas d'enfants focusables. Si un élément doit être caché pour l'accessibilité mais reste dans le DOM, ajoutez `tabindex="-1"` à cet élément pour le rendre non focusable.

---

Ce rapport vous aide à identifier précisément les problèmes liés aux éléments `aria-hidden` et propose des solutions concrètes pour améliorer l'accessibilité de votre site.

</div>

<div class="violation-card impact-serious">

## ARIA attributs interdits sur certains rôles

### Résumé

L'utilisation d'attributs ARIA non autorisés peut entraîner une mauvaise interaction avec les lecteurs d'écran et d'autres technologies d'assistance, rendant l'interface utilisateur moins accessible pour les personnes ayant des besoins spécifiques. Cela peut également créer de la confusion et perturber l'expérience utilisateur.

### Problème

L'attribut `aria-label` est utilisé sur un élément `<c-button>` sans attribut de rôle valide, ce qui est interdit par les normes ARIA. L'absence d'un rôle approprié peut entraîner une mauvaise interprétation par les technologies d'assistance.

### Règle WCAG concernée

1.3.1 – Info et relations

### Cause technique

L'élément `<c-button>` utilise l'attribut `aria-label` sans un rôle ARIA valide qui permettrait son utilisation. Selon les spécifications ARIA, certains attributs ne sont autorisés que pour des rôles spécifiques.

### Correction proposée

Pour corriger cette violation, il est nécessaire d'ajouter un rôle approprié à l'élément `<c-button>` ou de remplacer `aria-label` par une autre méthode conforme. Par exemple :

```html
<c-button prependicon="search" role="button" aria-label="Rechercher"></c-button>
```

### Recommandation

Vérifiez toujours la compatibilité des attributs ARIA avec les rôles utilisés dans votre code pour éviter ces violations. Utilisez les ressources officielles comme le site de W3C pour vous assurer que vos implémentations sont conformes.

---

Ce rapport est conçu pour aider à comprendre et corriger rapidement les problèmes d'accessibilité, tout en maintenant une communication claire et chaleureuse.

</div>

<div class="violation-card impact-critical">

## Bouton sans texte discernable

### Résumé

Les utilisateurs qui naviguent avec des lecteurs d'écran ne peuvent pas comprendre la fonctionnalité du bouton car il n'y a aucun texte visible ou accessible pour les écrans tactiles. Cela peut entraîner une confusion et un manque de clarté, rendant l'interaction difficile voire impossible.

### Problème

Le bouton ciblé par le sélecteur CSS `.max-w-3.c-button--size-m.c-button--variation-primary` ne contient pas de texte visible pour les lecteurs d'écran. Il n'a ni `aria-label`, ni `aria-labelledby`, ni `title`, et aucun `<label>` explicite ou implicite associé.

### Règle WCAG concernée

1.3.2 – Contraste (Minimum)

**Correction : Cette règle est incorrecte dans le contexte de la description fournie, elle devrait être 4.1.2 - Éléments d'interface et 2.5.3 - Consignes de navigation**

### Cause technique

Le bouton n'a pas de texte interne visible pour les lecteurs d'écran ni aucun attribut `aria` ou `title` qui pourrait fournir une indication claire sur sa fonctionnalité.

### Correction proposée

Pour résoudre ce problème, il est nécessaire d'ajouter un texte explicite au bouton ou d'utiliser l'un des attributs `aria-label`, `aria-labelledby`, ou de lui associer un `<label>`.

```html
<button
  class="max-w-3 c-button--size-m c-button--variation-primary"
  aria-label="Valider la commande"
>
  Valider
</button>
```

### Recommandation

Ajoutez toujours du texte explicite aux boutons pour les rendre compréhensibles par tous les utilisateurs, y compris ceux qui utilisent des lecteurs d'écran. Utilisez l'attribut `aria-label` si le texte ne peut pas être affiché visuellement.

---

Ce rapport est conçu pour vous aider à comprendre et corriger rapidement les problèmes de conformité WCAG sur votre site web, en gardant un ton professionnel mais chaleureux.

</div>

<div class="violation-card impact-serious">

## Contraste insuffisant entre les couleurs

### Résumé

Le contraste insuffisant entre le texte et la couleur d'arrière-plan peut rendre l’information difficile à lire pour les utilisateurs ayant une déficience visuelle. Cela peut entraîner des difficultés de lecture, un stress oculaire et une perte de productivité pour ces utilisateurs.

### Problème

Plusieurs éléments sur le site n'atteignent pas la norme WCAG 2.1 AA en termes de contraste entre les couleurs du texte et l’arrière-plan. Par exemple, un élément avec un texte bleu (#00b5e2) sur un fond blanc (#ffffff) a un ratio de contraste insuffisant (2.41 au lieu des 4.5 requis pour une taille de police normale).

### Règle WCAG concernée

1.4.3 – Contraste (minimaire)

### Cause technique

Le problème est dû à l'utilisation de couleurs qui ne respectent pas les seuils de contraste nécessaires selon la taille et le poids des polices. Par exemple, pour un texte en 12pt normal sur fond blanc, le ratio doit être au moins 4.5:1.

### Correction proposée

Pour corriger ce problème, il faut ajuster les couleurs du texte ou de l'arrière-plan afin d’atteindre le ratio minimal requis par WCAG 2.1 AA. Voici un exemple corrigé pour le premier élément :

```html
<div class="border-[#00b5e2]">
  <!-- Remplacez #00b5e2 par une couleur plus foncée ou plus claire qui respecte les normes de contraste -->
  Contenu du div...
</div>
```

### Recommandation

Utilisez un outil d'analyse comme le Color Contrast Analyzer pour vérifier et ajuster automatiquement la palette de couleurs afin qu’elles répondent aux exigences WCAG. Assurez-vous que chaque élément respecte les normes de contraste avant sa mise en production.

---

## Contraste insuffisant entre les couleurs (Element 2)

### Résumé

Le texte blanc (#ffffff) sur un fond bleu (#00b1fd) ne répond pas aux exigences minimales de contraste WCAG, rendant la lecture difficile pour les utilisateurs ayant une déficience visuelle. Cela peut entraîner des difficultés d'accessibilité et une perte de lisibilité.

### Problème

Un élément avec du texte blanc (#ffffff) sur un fond bleu (#00b1fd), en taille 12pt et en gras, ne respecte pas le ratio minimal de contraste WCAG (4.5:1 pour la taille normale).

### Règle WCAG concernée

1.4.3 – Contraste (minimaire)

### Cause technique

Le texte blanc sur un fond bleu clair n'atteint pas les seuils de contraste nécessaires, ce qui peut rendre l’information difficile à lire pour les utilisateurs ayant une déficience visuelle.

### Correction proposée

Pour corriger cette violation, il faut ajuster la couleur du texte ou du fond. Par exemple :

```html
<div class="leading-normal text-base font-bold" style="color: #007acc;">
  <!-- Remplacez le texte blanc par un autre qui respecte les normes de contraste -->
  Contenu du div...
</div>
```

### Recommandation

Testez régulièrement vos couleurs avec des outils d'accessibilité pour vous assurer qu’elles répondent aux exigences WCAG. Utilisez une palette de couleurs qui respecte les normes de contraste.

---

## Contraste insuffisant entre les couleurs (Element 3)

### Résumé

Le texte blanc (#ffffff) sur un fond bleu (#00b1fd), en taille 9pt, ne répond pas aux exigences minimales de contraste WCAG. Cela peut rendre la lecture difficile pour les utilisateurs ayant une déficience visuelle.

### Problème

Un élément avec du texte blanc (#ffffff) sur un fond bleu (#00b1fd), en taille 9pt, ne respecte pas le ratio minimal de contraste WCAG (4.5:1 pour la taille normale).

### Règle WCAG concernée

1.4.3 – Contraste (minimaire)

### Cause technique

Le texte blanc sur un fond bleu clair n'atteint pas les seuils de contraste nécessaires, ce qui peut rendre l’information difficile à lire pour les utilisateurs ayant une déficience visuelle.

### Correction proposée

Pour corriger cette violation, il faut ajuster la couleur du texte ou du fond. Par exemple :

```html
<div class="leading-none text-xs" style="color: #007acc;">
  <!-- Remplacez le texte blanc par un autre qui respecte les normes de contraste -->
  Contenu du div...
</div>
```

### Recommandation

Testez régulièrement vos couleurs avec des outils d'accessibilité pour vous assurer qu’elles répondent aux exigences WCAG. Utilisez une palette de couleurs qui respecte les normes de contraste.

---

Ce rapport a été généré pour aider à améliorer l'accessibilité du site en corrigeant les problèmes de contraste entre les couleurs, assurant ainsi un meilleur confort et lisibilité pour tous les utilisateurs.

</div>

<div class="violation-card impact-critical">

## Images sans texte alternatif

### Résumé

Les images sans texte alternatif (alt) sont problématiques pour les utilisateurs qui naviguent avec des lecteurs d'écran. Ces derniers dépendent du texte alternatif pour comprendre le contenu visuel, ce qui est crucial pour l'accessibilité et la compréhension globale de la page.

### Problème

Les images dans les éléments `app-edito-push:nth-child(6)` et `app-edito-push:nth-child(7)` ne possèdent pas d'attribut alt. Elles manquent également d'autres attributs comme aria-label, aria-labelledby ou title qui pourraient fournir une description alternative.

### Règle WCAG concernée

1.1.1 – Non-text Content

### Cause technique

Les éléments `<img>` ne disposent pas de l'attribut `alt`, ni d'un rôle `none` ou `presentation`. Les images sont donc interprétées comme du contenu significatif par les lecteurs d'écran, mais sans aucune information supplémentaire pour les utilisateurs dépendant des technologies d’assistance.

### Correction proposée

Pour chaque image manquante en alt, ajoutez un attribut `alt` qui décrit l'image ou indique qu'elle est décorative si elle n'a pas de sens contextuel. Si l'image est purement décorative et ne transmet aucun contenu important, vous pouvez utiliser `role="presentation"` pour signaler au lecteur d'écran que cette image n'est pas significative.

```html
<!-- Pour app-edito-push:nth-child(6) -->
<img src="image.jpg" alt="Description de l'image ou 'Image décorative' si non significative" />

<!-- Pour app-edito-push:nth-child(7) -->
<img src="image2.jpg" alt="Description de l'image ou 'Image décorative' si non significative" />
```

### Recommandation

Ajoutez un attribut `alt` à chaque image pour fournir une description claire et concise. Si l'image est purement décorative, utilisez `role="presentation"` pour indiquer qu'elle n'est pas significative.

---

Ce rapport vous guide étape par étape pour résoudre les problèmes d'accessibilité liés aux images sans texte alternatif sur votre site web. N'hésitez pas à répéter ce processus pour chaque violation identifiée afin de garantir une meilleure expérience utilisateur pour tous, y compris ceux qui dépendent des technologies d’assistance.

</div>

<div class="violation-card impact-critical">

## Form Elements Sans Labels

### Résumé

Les formes sans labels peuvent causer des difficultés pour les utilisateurs qui naviguent avec un lecteur d'écran ou ceux qui ont besoin de clarifications supplémentaires. Cela peut entraîner une confusion sur le but et la fonctionnalité des éléments, rendant l'interaction avec ces formulaires moins intuitive et plus frustrante.

### Problème

Les éléments de formulaire tels que les champs de saisie, les boutons radio et autres ne sont pas associés à un label explicite ou implicite. Ils manquent également d'autres attributs comme `aria-label`, `title` ou `placeholder`.

### Règle WCAG concernée

1.3.1 – Info et Relations (Level A)

### Cause technique

Les éléments de formulaire n'ont pas été correctement structurés avec des labels explicites ou implicites, ni d'autres attributs comme `aria-label`, `title` ou `placeholder`. Cela peut être causé par une mauvaise structure du DOM ou un manque de compréhension sur l'importance des labels pour les éléments de formulaire.

### Correction proposée

Pour chaque élément de formulaire, ajoutez un label explicite. Par exemple :

```html
<label for="input1">Nom</label> <input type="text" id="input1" />
```

Si le texte du label est déjà présent dans le contenu visible et qu'il ne peut pas être ajouté directement comme balise `<label>`, vous pouvez utiliser `aria-label` ou `aria-labelledby`.

```html
<input type="text" aria-label="Nom" />
```

### Recommandation

Assurez-vous que chaque élément de formulaire a un label explicite. Si le texte du label est déjà présent dans le contenu visible, utilisez `aria-label`. Cette pratique garantit une meilleure expérience utilisateur pour tous les utilisateurs, y compris ceux qui dépendent des lecteurs d'écran.

---

## Form Elements Sans Labels (Noeud 2)

### Résumé

Les formes sans labels peuvent causer des difficultés pour les utilisateurs qui naviguent avec un lecteur d'écran ou ceux qui ont besoin de clarifications supplémentaires. Cela peut entraîner une confusion sur le but et la fonctionnalité des éléments, rendant l'interaction avec ces formulaires moins intuitive et plus frustrante.

### Problème

L'élément `<input type="range">` n'est pas associé à un label explicite ou implicite. Il manque également d'autres attributs comme `aria-label`, `title` ou `placeholder`.

### Règle WCAG concernée

1.3.1 – Info et Relations (Level A)

### Cause technique

L'élément de formulaire n'a pas été correctement structuré avec des labels explicites ou implicites, ni d'autres attributs comme `aria-label`, `title` ou `placeholder`. Cela peut être causé par une mauvaise structure du DOM ou un manque de compréhension sur l'importance des labels pour les éléments de formulaire.

### Correction proposée

Pour chaque élément de formulaire, ajoutez un label explicite. Par exemple :

```html
<label for="rangeInput">Valeur</label> <input type="range" id="rangeInput" />
```

Si le texte du label est déjà présent dans le contenu visible et qu'il ne peut pas être ajouté directement comme balise `<label>`, vous pouvez utiliser `aria-label` ou `aria-labelledby`.

```html
<input type="range" aria-label="Valeur" />
```

### Recommandation

Assurez-vous que chaque élément de formulaire a un label explicite. Si le texte du label est déjà présent dans le contenu visible, utilisez `aria-label`. Cette pratique garantit une meilleure expérience utilisateur pour tous les utilisateurs, y compris ceux qui dépendent des lecteurs d'écran.

---

## Form Elements Sans Labels (Noeud 3)

### Résumé

Les formes sans labels peuvent causer des difficultés pour les utilisateurs qui naviguent avec un lecteur d'écran ou ceux qui ont besoin de clarifications supplémentaires. Cela peut entraîner une confusion sur le but et la fonctionnalité des éléments, rendant l'interaction avec ces formulaires moins intuitive et plus frustrante.

### Problème

L'élément `<input type="range">` n'est pas associé à un label explicite ou implicite. Il manque également d'autres attributs comme `aria-label`, `title` ou `placeholder`.

### Règle WCAG concernée

1.3.1 – Info et Relations (Level A)

### Cause technique

L'élément de formulaire n'a pas été correctement structuré avec des labels explicites ou implicites, ni d'autres attributs comme `aria-label`, `title` ou `placeholder`. Cela peut être causé par une mauvaise structure du DOM ou un manque de compréhension sur l'importance des labels pour les éléments de formulaire.

### Correction proposée

Pour chaque élément de formulaire, ajoutez un label explicite. Par exemple :

```html
<label for="rangeInput">Valeur</label> <input type="range" id="rangeInput" />
```

Si le texte du label est déjà présent dans le contenu visible et qu'il ne peut pas être ajouté directement comme balise `<label>`, vous pouvez utiliser `aria-label` ou `aria-labelledby`.

```html
<input type="range" aria-label="Valeur" />
```

### Recommandation

Assurez-vous que chaque élément de formulaire a un label explicite. Si le texte du label est déjà présent dans le contenu visible, utilisez `aria-label`. Cette pratique garantit une meilleure expérience utilisateur pour tous les utilisateurs, y compris ceux qui dépendent des lecteurs d'écran.

---

## Form Elements Sans Labels (Noeud 4)

### Résumé

Les formes sans labels peuvent causer des difficultés pour les utilisateurs qui naviguent avec un lecteur d'écran ou ceux qui ont besoin de clarifications supplémentaires. Cela peut entraîner une confusion sur le but et la fonctionnalité des éléments, rendant l'interaction avec ces formulaires moins intuitive et plus frustrante.

### Problème

L'élément `<input type="range">` n'est pas associé à un label explicite ou implicite. Il manque également d'autres attributs comme `aria-label`, `title` ou `placeholder`.

### Règle WCAG concernée

1.3.1 – Info et Relations (Level A)

### Cause technique

L'élément de formulaire n'a pas été correctement structuré avec des labels explicites ou implicites, ni d'autres attributs comme `aria-label`, `title` ou `placeholder`. Cela peut être causé par une mauvaise structure du DOM ou un manque de compréhension sur l'importance des labels pour les éléments de formulaire.

### Correction proposée

Pour chaque élément de formulaire, ajoutez un label explicite. Par exemple :

```html
<label for="rangeInput">Valeur</label> <input type="range" id="rangeInput" />
```

Si le texte du label est déjà présent dans le contenu visible et qu'il ne peut pas être ajouté directement comme balise `<label>`, vous pouvez utiliser `aria-label` ou `aria-labelledby`.

```html
<input type="range" aria-label="Valeur" />
```

### Recommandation

Assurez-vous que chaque élément de formulaire a un label explicite. Si le texte du label est déjà présent dans le contenu visible, utilisez `aria-label`. Cette pratique garantit une meilleure expérience utilisateur pour tous les utilisateurs, y compris ceux qui dépendent des lecteurs d'écran.

---

## Form Elements Sans Labels (Noeud 5)

### Résumé

Les formes sans labels peuvent causer des difficultés pour les utilisateurs qui naviguent avec un lecteur d'écran ou ceux qui ont besoin de clarifications supplémentaires. Cela peut entraîner une confusion sur le but et la fonctionnalité des éléments, rendant l'interaction avec ces formulaires moins intuitive et plus frustrante.

### Problème

L'élément `<input type="range">` n'est pas associé à un label explicite ou implicite. Il manque également d'autres attributs comme `aria-label`, `title` ou `placeholder`.

### Règle WCAG concernée

1.3.1 – Info et Relations (Level A)

### Cause technique

L'élément de formulaire n'a pas été correctement structuré avec des labels explicites ou implicites, ni d'autres attributs comme `aria-label`, `title` ou `placeholder`. Cela peut être causé par une mauvaise structure du DOM ou un manque de compréhension sur l'importance des labels pour les éléments de formulaire.

### Correction proposée

Pour chaque élément de formulaire, ajoutez un label explicite. Par exemple :

```html
<label for="rangeInput">Valeur</label> <input type="range" id="rangeInput" />
```

Si le texte du label est déjà présent dans le contenu visible et qu'il ne peut pas être ajouté directement comme balise `<label>`, vous pouvez utiliser `aria-label` ou `aria-labelledby`.

```html
<input type="range" aria-label="Valeur" />
```

### Recommandation

Assurez-vous que chaque élément de formulaire a un label explicite. Si le texte du label est déjà présent dans le contenu visible, utilisez `aria-label`. Cette pratique garantit une meilleure expérience utilisateur pour tous les utilisateurs, y compris ceux qui dépendent des lecteurs d'écran.

---

## Form Elements Sans Labels (Noeud 6)

### Résumé

Les formes sans labels peuvent causer des difficultés pour les utilisateurs qui naviguent avec un lecteur d'écran ou ceux qui ont besoin de clarifications supplémentaires. Cela peut entraîner une confusion sur le but et la fonctionnalité des éléments, rendant l'interaction avec ces formulaires moins intuitive et plus frustrante.

### Problème

L'élément `<input type="range">` n'est pas associé à un label explicite ou implicite. Il manque également d'autres attributs comme `aria-label`, `title` ou `placeholder`.

### Règle WCAG concernée

1.3.1 – Info et Relations (Level A)

### Cause technique

L'élément de formulaire n'a pas été correctement structuré avec des labels explicites ou implicites, ni d'autres attributs comme `aria-label`, `title` ou `placeholder`. Cela peut être causé par une mauvaise structure du DOM ou un manque de compréhension sur l'importance des labels pour les éléments de formulaire.

### Correction proposée

Pour chaque élément de formulaire, ajoutez un label explicite. Par exemple :

```html
<label for="rangeInput">Valeur</label> <input type="range" id="rangeInput" />
```

Si le texte du label est déjà présent dans le contenu visible et qu'il ne peut pas être ajouté directement comme balise `<label>`, vous pouvez utiliser `aria-label` ou `aria-labelledby`.

```html
<input type="range" aria-label="Valeur" />
```

### Recommandation

Assurez-vous que chaque élément de formulaire a un label explicite. Si le texte du label est déjà présent dans le contenu visible, utilisez `aria-label`. Cette pratique garantit une meilleure expérience utilisateur pour tous les utilisateurs, y compris ceux qui dépendent des lecteurs d'écran.

---

## Form Elements Sans Labels (Noeud 7)

### Résumé

Les formes sans labels peuvent causer des difficultés pour les utilisateurs qui naviguent avec un lecteur d'écran ou ceux qui ont besoin de clarifications supplémentaires. Cela peut entraîner une confusion sur le but et la fonctionnalité des éléments, rendant l'interaction avec ces formulaires moins intuitive et plus frustrante.

### Problème

L'élément `<input type="range">` n'est pas associé à un label explicite ou implicite. Il manque également d'autres attributs comme `aria-label`, `title` ou `placeholder`.

### Règle WCAG concernée

1.3.1 – Info et Relations (Level A)

### Cause technique

L'élément de formulaire n'a pas été correctement structuré avec des labels explicites ou implicites, ni d'autres attributs comme `aria-label`, `title` ou `placeholder`. Cela peut être causé par une mauvaise structure du DOM ou un manque de compréhension sur l'importance des labels pour les éléments de formulaire.

### Correction proposée

Pour chaque élément de formulaire, ajoutez un label explicite. Par exemple :

```html
<label for="rangeInput">Valeur</label> <input type="range" id="rangeInput" />
```

Si le texte du label est déjà présent dans le contenu visible et qu'il ne peut pas être ajouté directement comme balise `<label>`, vous pouvez utiliser `aria-label` ou `aria-labelledby`.

```html
<input type="range" aria-label="Valeur" />
```

### Recommandation

Assurez-vous que chaque élément de formulaire a un label explicite. Si le texte du label est déjà présent dans le contenu visible, utilisez `aria-label`. Cette pratique garantit une meilleure expérience utilisateur pour tous les utilisateurs, y compris ceux qui dépendent des lecteurs d'écran.

---

## Form Elements Sans Labels (Noeud 8)

### Résumé

Les formes sans labels peuvent causer des difficultés pour les utilisateurs qui naviguent avec un lecteur d'écran ou ceux qui ont besoin de clarifications supplémentaires. Cela peut entraîner une confusion sur le but et la fonctionnalité des éléments, rendant l'interaction avec ces formulaires moins intuitive et plus frustrante.

### Problème

L'élément `<input type="range">` n'est pas associé à un label explicite ou implicite. Il manque également d'autres attributs comme `aria-label`, `title` ou `placeholder`.

### Règle WCAG concernée

1.3.1 – Info et Relations (Level A)

### Cause technique

L'élément de formulaire n'a pas été correctement structuré avec des labels explicites ou implicites, ni d'autres attributs comme `aria-label`, `title` ou `placeholder`. Cela peut être causé par une mauvaise structure du DOM ou un manque de compréhension sur l'importance des labels pour les éléments de formulaire.

### Correction proposée

Pour chaque élément de formulaire, ajoutez un label explicite. Par exemple :

```html
<label for="rangeInput">Valeur</label> <input type="range" id="rangeInput" />
```

Si le texte du label est déjà présent dans le contenu visible et qu'il ne peut pas être ajouté directement comme balise `<label>`, vous pouvez utiliser `aria-label` ou `aria-labelledby`.

```html
<input type="range" aria-label="Valeur" />
```

### Recommandation

Assurez-vous que chaque élément de formulaire a un label explicite. Si le texte du label est déjà présent dans le contenu visible, utilisez `aria-label`. Cette pratique garantit une meilleure expérience utilisateur pour tous les utilisateurs, y compris ceux qui dépendent des lecteurs d'écran.

---

## Form Elements Sans Labels (Noeud 9)

### Résumé

Les formes sans labels peuvent causer des difficultés pour les utilisateurs qui naviguent avec un lecteur d'écran ou ceux qui ont besoin de clarifications supplémentaires. Cela peut entraîner une confusion sur le but et la fonctionnalité des éléments, rendant l'interaction avec ces formulaires moins intuitive et plus frustrante.

### Problème

L'élément `<input type="range">` n'est pas associé à un label explicite ou implicite. Il manque également d'autres attributs comme `aria-label`, `title` ou `placeholder`.

### Règle WCAG concernée

1.3.1 – Info et Relations (Level A)

### Cause technique

L'élément de formulaire n'a pas été correctement structuré avec des labels explicites ou implicites, ni d'autres attributs comme `aria-label`, `title` ou `placeholder`. Cela peut être causé par une mauvaise structure du DOM ou un manque de compréhension sur l'importance des labels pour les éléments de formulaire.

### Correction proposée

Pour chaque élément de formulaire, ajoutez un label explicite. Par exemple :

```html
<label for="rangeInput">Valeur</label> <input type="range" id="rangeInput" />
```

Si le texte du label est déjà présent dans le contenu visible et qu'il ne peut pas être ajouté directement comme balise `<label>`, vous pouvez utiliser `aria-label` ou `aria-labelledby`.

```html
<input type="range" aria-label="Valeur" />
```

### Recommandation

Assurez-vous que chaque élément de formulaire a un label explicite. Si le texte du label est déjà présent dans le contenu visible, utilisez `aria-label`. Cette pratique garantit une meilleure expérience utilisateur pour tous les utilisateurs, y compris ceux qui dépendent des lecteurs d'écran.

---

## Form Elements Sans Labels (Noeud 10)

### Résumé

Les formes sans labels peuvent causer des difficultés pour les utilisateurs qui naviguent avec un lecteur d'écran ou ceux qui ont besoin de clarifications supplémentaires. Cela peut entraîner une confusion sur le but et la fonctionnalité des éléments, rendant l'interaction avec ces formulaires moins intuitive et plus frustrante.

### Problème

L'élément `<input type="range">` n'est pas associé à un label explicite ou implicite. Il manque également d'autres attributs comme `aria-label`, `title` ou `placeholder`.

### Règle WCAG concernée

1.3.1 – Info et Relations (Level A)

### Cause technique

L'élément de formulaire n'a pas été correctement structuré avec des labels explicites ou implicites, ni d'autres attributs comme `aria-label`, `title` ou `placeholder`. Cela peut être causé par une mauvaise structure du DOM ou un manque de compréhension sur l'importance des labels pour les éléments de formulaire.

### Correction proposée

Pour chaque élément de formulaire, ajoutez un label explicite. Par exemple :

```html
<label for="rangeInput">Valeur</label> <input type="range" id="rangeInput" />
```

Si le texte du label est déjà présent dans le contenu visible et qu'il ne peut pas être ajouté directement comme bal

</div>

<div class="violation-card impact-moderate">

## Titre manquant : La page ne contient pas d'en-tête de niveau 1

### Résumé

La présence d'un en-tête de niveau 1 (H1) est essentielle pour les utilisateurs qui naviguent avec un lecteur d'écran, car elle leur permet de comprendre rapidement la structure et le contenu principal de la page. Sans cet élément, ces utilisateurs risquent de se perdre dans l'arborescence du site et de ne pas saisir immédiatement le sujet abordé.

### Problème

La page en question n'a aucun en-tête de niveau 1 (H1) qui sert de point d'entrée clair pour les utilisateurs. Cela peut entraîner une confusion pour ceux qui dépendent des lecteurs d'écran et qui cherchent à comprendre rapidement la structure du contenu.

### Règle WCAG concernée

2.4.6 – Titres (Level AA)

### Cause technique

Le problème est lié au manque d'un élément `<h1>` dans le DOM de la page, ce qui empêche les lecteurs d'écran et autres technologies d'accessibilité d'avoir un point d'entrée clair pour comprendre la structure du contenu.

### Correction proposée

Pour résoudre cette violation, il suffit d'ajouter un en-tête de niveau 1 (H1) qui décrit le sujet principal de la page. Voici un exemple :

```html
<h1>Titre principal de la page</h1>
```

Il est important que ce titre soit unique et résume clairement l'objet principal du contenu.

### Recommandation

Afin d'éviter une régression, assurez-vous que chaque nouvelle page contient un en-tête de niveau 1 (H1) qui décrit le sujet principal. Cela permettra aux utilisateurs ayant besoin d'un lecteur d'écran ou d'autres technologies d'accessibilité de naviguer plus facilement et efficacement sur votre site.

</div>

<div class="violation-card impact-moderate">

## Contenu non inclus dans des éléments landmark

### Résumé

Le contenu n'est pas inclus dans des éléments landmark (comme `main`, `header`, `footer`), ce qui rend la navigation pour les utilisateurs avec un lecteur d'écran plus difficile. Ils ne peuvent pas facilement sauter à certaines sections importantes du document.

### Problème

La structure de l'arborescence DOM n'inclut pas des éléments landmark, empêchant ainsi le lecteur d'écran d'aider les utilisateurs à naviguer efficacement dans la page.

### Règle WCAG concernée

2.4.1 – Titres et en-têtes (A).

### Cause technique

Les éléments de contenu ne sont pas entourés par des éléments landmark tels que `main`, `header`, `footer` ou d'autres éléments spécifiques pour structurer la page.

### Correction proposée

Ajoutez des éléments landmark à votre structure HTML pour améliorer l'accessibilité. Par exemple, vous pouvez ajouter un élément `main` autour du contenu principal de la page :

```html
<main>
  <!-- Contenu principal ici -->
</main>

<header>
  <!-- En-tête de la page ici -->
</header>

<footer>
  <!-- Pied de page ici -->
</footer>
```

### Recommandation

Incluez des éléments landmark dans votre structure HTML pour faciliter la navigation avec un lecteur d'écran. Utilisez les éléments appropriés comme `main`, `header`, `footer` et autres selon le besoin.

---

## Image décorative sans texte alternatif

### Résumé

Une image décorative n'a pas de texte alternatif, ce qui peut confondre les utilisateurs avec un lecteur d'écran. Ils entendent une description inutile ou manquante pour une image purement esthétique.

### Problème

L'image décorative ne possède pas l'attribut `alt` vide (`alt=""`) pour indiquer qu'elle n'a pas de sens contextuel et n'est pas nécessaire pour comprendre le contenu.

### Règle WCAG concernée

1.1.1 – Non-text Content (A).

### Cause technique

L'image décorative manque d'un attribut `alt` vide, ce qui peut entraîner une lecture inappropriée par les lecteurs d'écran.

### Correction proposée

Ajoutez un attribut `alt=""` à l'élément `<img>` pour indiquer qu'il s'agit d'une image décorative :

```html
<img src="image-decorative.jpg" alt="" />
```

### Recommandation

Utilisez toujours `alt=""` pour les images décoratives afin de signaler aux lecteurs d'écran que l'image n'a pas de sens contextuel.

---

## Lien non descriptif

### Résumé

Un lien ne contient pas un texte descriptif, ce qui rend difficile la navigation et la compréhension du contenu pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas comprendre où le lien mène sans contexte supplémentaire.

### Problème

Le lien n'a pas de texte descriptif ou utilise un texte générique comme "Cliquez ici" qui ne donne aucune indication sur la destination du lien.

### Règle WCAG concernée

2.4.4 – Liens (A).

### Cause technique

L'élément `<a>` manque d'un texte descriptif ou contient un texte générique non informatif.

### Correction proposée

Modifiez le texte du lien pour qu'il soit clair et descriptif :

```html
<a href="lien.html">Voir l'offre</a>
```

### Recommandation

Utilisez toujours un texte descriptif pour les liens afin de permettre aux utilisateurs d'identifier la destination du lien sans contexte supplémentaire.

---

## Titres manquants

### Résumé

Les titres sont absents ou mal structurés, ce qui rend difficile la navigation et l'organisation du contenu pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas facilement comprendre la structure hiérarchique de la page.

### Problème

La page manque de balises `<h1>`, `<h2>` ou autres titres structurants, ce qui entraîne une mauvaise organisation du contenu.

### Règle WCAG concernée

2.4.6 – Titres et en-têtes (AA).

### Cause technique

La page n'utilise pas correctement les balises de titre pour structurer le contenu.

### Correction proposée

Ajoutez des titres structurants à votre document HTML :

```html
<h1>Titre principal</h1>
<h2>Sous-titre</h2>
```

### Recommandation

Utilisez correctement les balises de titre pour organiser et hiérarchiser le contenu de la page.

---

## Contenu non accessible par clavier

### Résumé

Le contenu n'est pas entièrement accessible via un clavier, ce qui rend difficile l'utilisation pour les utilisateurs dépendant du clavier. Ils ne peuvent pas naviguer efficacement dans tous les éléments interactifs de la page.

### Problème

Certains éléments interagissants (comme des boutons ou des liens) ne sont pas accessibles via un clavier, ce qui peut entraîner une impossibilité d'interaction pour ces utilisateurs.

### Règle WCAG concernée

2.1.1 – Contenu accessible par clavier (A).

### Cause technique

Les éléments interagissants n'ont pas de focus visuel ou ne peuvent pas être activés via les touches du clavier.

### Correction proposée

Assurez-vous que tous les éléments interactifs sont accessibles et réactifs au clavier :

```html
<button tabindex="0">Bouton accessible</button> <a href="#" tabindex="0">Lien accessible</a>
```

### Recommandation

Utilisez `tabindex` pour rendre tous les éléments interagissants accessibles via un clavier.

---

## Lien sans texte

### Résumé

Un lien ne contient pas de texte, ce qui rend difficile la navigation et l'identification du contenu pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas comprendre où le lien mène sans contexte supplémentaire.

### Problème

Le lien n'a pas de texte descriptif ou utilise une image sans alt approprié, ce qui entraîne une lecture inappropriée par les lecteurs d'écran.

### Règle WCAG concernée

2.4.4 – Liens (A).

### Cause technique

L'élément `<a>` manque de texte descriptif ou contient un élément non textuel sans alt approprié.

### Correction proposée

Modifiez le lien pour qu'il contienne du texte descriptif :

```html
<a href="lien.html">Voir l'offre</a>
```

### Recommandation

Utilisez toujours du texte descriptif pour les liens afin de permettre aux utilisateurs d'identifier la destination du lien sans contexte supplémentaire.

---

## Contenu non inclus dans un élément landmark

### Résumé

Le contenu n'est pas inclus dans un élément landmark, ce qui rend difficile la navigation et l'identification des sections importantes pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas facilement sauter à certaines sections de la page.

### Problème

La structure de l'arborescence DOM n'inclut pas des éléments landmark, empêchant ainsi le lecteur d'écran d'aider les utilisateurs à naviguer efficacement dans la page.

### Règle WCAG concernée

2.4.1 – Titres et en-têtes (A).

### Cause technique

Les éléments de contenu ne sont pas entourés par des éléments landmark tels que `main`, `header`, `footer` ou d'autres éléments spécifiques pour structurer la page.

### Correction proposée

Ajoutez des éléments landmark à votre structure HTML pour améliorer l'accessibilité :

```html
<main>
  <!-- Contenu principal ici -->
</main>

<header>
  <!-- En-tête de la page ici -->
</header>

<footer>
  <!-- Pied de page ici -->
</footer>
```

### Recommandation

Incluez des éléments landmark dans votre structure HTML pour faciliter la navigation avec un lecteur d'écran. Utilisez les éléments appropriés comme `main`, `header`, `footer` et autres selon le besoin.

---

## Contenu non inclus dans un élément landmark

### Résumé

Le contenu n'est pas inclus dans des éléments landmark, ce qui rend difficile la navigation pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas facilement sauter à certaines sections importantes de la page.

### Problème

La structure de l'arborescence DOM n'inclut pas des éléments landmark tels que `main`, `header`, `footer` ou d'autres éléments spécifiques pour structurer la page.

### Règle WCAG concernée

2.4.1 – Titres et en-têtes (A).

### Cause technique

Les éléments de contenu ne sont pas entourés par des éléments landmark, empêchant ainsi le lecteur d'écran d'aider les utilisateurs à naviguer efficacement dans la page.

### Correction proposée

Ajoutez des éléments landmark à votre structure HTML pour améliorer l'accessibilité :

```html
<main>
  <!-- Contenu principal ici -->
</main>

<header>
  <!-- En-tête de la page ici -->
</header>

<footer>
  <!-- Pied de page ici -->
</footer>
```

### Recommandation

Incluez des éléments landmark dans votre structure HTML pour faciliter la navigation avec un lecteur d'écran. Utilisez les éléments appropriés comme `main`, `header`, `footer` et autres selon le besoin.

---

## Contenu non inclus dans un élément landmark

### Résumé

Le contenu n'est pas inclus dans des éléments landmark, ce qui rend difficile la navigation pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas facilement sauter à certaines sections importantes de la page.

### Problème

La structure de l'arborescence DOM n'inclut pas des éléments landmark tels que `main`, `header`, `footer` ou d'autres éléments spécifiques pour structurer la page.

### Règle WCAG concernée

2.4.1 – Titres et en-têtes (A).

### Cause technique

Les éléments de contenu ne sont pas entourés par des éléments landmark, empêchant ainsi le lecteur d'écran d'aider les utilisateurs à naviguer efficacement dans la page.

### Correction proposée

Ajoutez des éléments landmark à votre structure HTML pour améliorer l'accessibilité :

```html
<main>
  <!-- Contenu principal ici -->
</main>

<header>
  <!-- En-tête de la page ici -->
</header>

<footer>
  <!-- Pied de page ici -->
</footer>
```

### Recommandation

Incluez des éléments landmark dans votre structure HTML pour faciliter la navigation avec un lecteur d'écran. Utilisez les éléments appropriés comme `main`, `header`, `footer` et autres selon le besoin.

---

## Contenu non inclus dans un élément landmark

### Résumé

Le contenu n'est pas inclus dans des éléments landmark, ce qui rend difficile la navigation pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas facilement sauter à certaines sections importantes de la page.

### Problème

La structure de l'arborescence DOM n'inclut pas des éléments landmark tels que `main`, `header`, `footer` ou d'autres éléments spécifiques pour structurer la page.

### Règle WCAG concernée

2.4.1 – Titres et en-têtes (A).

### Cause technique

Les éléments de contenu ne sont pas entourés par des éléments landmark, empêchant ainsi le lecteur d'écran d'aider les utilisateurs à naviguer efficacement dans la page.

### Correction proposée

Ajoutez des éléments landmark à votre structure HTML pour améliorer l'accessibilité :

```html
<main>
  <!-- Contenu principal ici -->
</main>

<header>
  <!-- En-tête de la page ici -->
</header>

<footer>
  <!-- Pied de page ici -->
</footer>
```

### Recommandation

Incluez des éléments landmark dans votre structure HTML pour faciliter la navigation avec un lecteur d'écran. Utilisez les éléments appropriés comme `main`, `header`, `footer` et autres selon le besoin.

---

## Contenu non inclus dans un élément landmark

### Résumé

Le contenu n'est pas inclus dans des éléments landmark, ce qui rend difficile la navigation pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas facilement sauter à certaines sections importantes de la page.

### Problème

La structure de l'arborescence DOM n'inclut pas des éléments landmark tels que `main`, `header`, `footer` ou d'autres éléments spécifiques pour structurer la page.

### Règle WCAG concernée

2.4.1 – Titres et en-têtes (A).

### Cause technique

Les éléments de contenu ne sont pas entourés par des éléments landmark, empêchant ainsi le lecteur d'écran d'aider les utilisateurs à naviguer efficacement dans la page.

### Correction proposée

Ajoutez des éléments landmark à votre structure HTML pour améliorer l'accessibilité :

```html
<main>
  <!-- Contenu principal ici -->
</main>

<header>
  <!-- En-tête de la page ici -->
</header>

<footer>
  <!-- Pied de page ici -->
</footer>
```

### Recommandation

Incluez des éléments landmark dans votre structure HTML pour faciliter la navigation avec un lecteur d'écran. Utilisez les éléments appropriés comme `main`, `header`, `footer` et autres selon le besoin.

---

## Contenu non inclus dans un élément landmark

### Résumé

Le contenu n'est pas inclus dans des éléments landmark, ce qui rend difficile la navigation pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas facilement sauter à certaines sections importantes de la page.

### Problème

La structure de l'arborescence DOM n'inclut pas des éléments landmark tels que `main`, `header`, `footer` ou d'autres éléments spécifiques pour structurer la page.

### Règle WCAG concernée

2.4.1 – Titres et en-têtes (A).

### Cause technique

Les éléments de contenu ne sont pas entourés par des éléments landmark, empêchant ainsi le lecteur d'écran d'aider les utilisateurs à naviguer efficacement dans la page.

### Correction proposée

Ajoutez des éléments landmark à votre structure HTML pour améliorer l'accessibilité :

```html
<main>
  <!-- Contenu principal ici -->
</main>

<header>
  <!-- En-tête de la page ici -->
</header>

<footer>
  <!-- Pied de page ici -->
</footer>
```

### Recommandation

Incluez des éléments landmark dans votre structure HTML pour faciliter la navigation avec un lecteur d'écran. Utilisez les éléments appropriés comme `main`, `header`, `footer` et autres selon le besoin.

---

## Contenu non inclus dans un élément landmark

### Résumé

Le contenu n'est pas inclus dans des éléments landmark, ce qui rend difficile la navigation pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas facilement sauter à certaines sections importantes de la page.

### Problème

La structure de l'arborescence DOM n'inclut pas des éléments landmark tels que `main`, `header`, `footer` ou d'autres éléments spécifiques pour structurer la page.

### Règle WCAG concernée

2.4.1 – Titres et en-têtes (A).

### Cause technique

Les éléments de contenu ne sont pas entourés par des éléments landmark, empêchant ainsi le lecteur d'écran d'aider les utilisateurs à naviguer efficacement dans la page.

### Correction proposée

Ajoutez des éléments landmark à votre structure HTML pour améliorer l'accessibilité :

```html
<main>
  <!-- Contenu principal ici -->
</main>

<header>
  <!-- En-tête de la page ici -->
</header>

<footer>
  <!-- Pied de page ici -->
</footer>
```

### Recommandation

Incluez des éléments landmark dans votre structure HTML pour faciliter la navigation avec un lecteur d'écran. Utilisez les éléments appropriés comme `main`, `header`, `footer` et autres selon le besoin.

---

## Contenu non inclus dans un élément landmark

### Résumé

Le contenu n'est pas inclus dans des éléments landmark, ce qui rend difficile la navigation pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas facilement sauter à certaines sections importantes de la page.

### Problème

La structure de l'arborescence DOM n'inclut pas des éléments landmark tels que `main`, `header`, `footer` ou d'autres éléments spécifiques pour structurer la page.

### Règle WCAG concernée

2.4.1 – Titres et en-têtes (A).

### Cause technique

Les éléments de contenu ne sont pas entourés par des éléments landmark, empêchant ainsi le lecteur d'écran d'aider les utilisateurs à naviguer efficacement dans la page.

### Correction proposée

Ajoutez des éléments landmark à votre structure HTML pour améliorer l'accessibilité :

```html
<main>
  <!-- Contenu principal ici -->
</main>

<header>
  <!-- En-tête de la page ici -->
</header>

<footer>
  <!-- Pied de page ici -->
</footer>
```

### Recommandation

Incluez des éléments landmark dans votre structure HTML pour faciliter la navigation avec un lecteur d'écran. Utilisez les éléments appropriés comme `main`, `header`, `footer` et autres selon le besoin.

---

## Contenu non inclus dans un élément landmark

### Résumé

Le contenu n'est pas inclus dans des éléments landmark, ce qui rend difficile la navigation pour les utilisateurs avec un lecteur d'écran. Ils ne peuvent pas facilement sauter à certaines sections importantes de la page.

### Problème

La structure de l'arborescence DOM n'inclut pas des éléments landmark tels que `main`, `header`, `footer` ou d'autres éléments spécifiques pour structurer la page.

### Règle WCAG concernée

2.4.1 –

</div>

<div class="violation-card impact-serious">

## Éléments scrolables non accessibles au clavier

### Résumé

Les utilisateurs qui naviguent avec un clavier ou un lecteur d'écran peuvent rencontrer des difficultés pour accéder aux éléments contenant du contenu scrolable. Cela peut entraîner une perte de navigation fluide et rendre l'expérience utilisateur moins accessible, voire impossible dans certains cas.

### Problème

L'élément ciblé par cette violation est un élément avec la classe `.sm\:flex-row`, qui ne permet pas d'accéder à son contenu scrolable via le clavier. Cela signifie que les utilisateurs dépendant des entrées de type clavier sont incapables de naviguer et d'interagir correctement avec ce contenu.

### Règle WCAG concernée

2.1.3 – Les éléments scrolables doivent être accessibles par le clavier (niveau A).

### Cause technique

Le problème réside dans la structure du DOM qui ne permet pas à l'élément d'être focusable via un clavier. L'élément en question n'a pas de contenu focusable ou n'est pas lui-même focusable, ce qui empêche les utilisateurs de naviguer et d'interagir avec le contenu scrolable.

### Correction proposée

Pour résoudre cette violation, il est nécessaire d'ajouter un élément focusable (par exemple, une div avec `tabindex="0"`) autour du contenu scrolable. Voici comment cela pourrait être implémenté :

```html
<div class="sm:flex-row" tabindex="0">
  <!-- Contenu scrolable ici -->
</div>
```

### Recommandation

Assurez-vous que tous les éléments contenant des données scrolables soient entourés d'un élément qui peut recevoir le focus du clavier. Cela garantit une meilleure accessibilité pour les utilisateurs dépendant de l'entrée par clavier ou lecteur d'écran.

---

Ce rapport est conçu pour vous aider à comprendre et à corriger rapidement cette violation, améliorant ainsi l'expérience utilisateur pour tous les visiteurs du site.

</div>
