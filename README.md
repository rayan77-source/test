# TOUS UNIS — site des supporters

Site vitrine statique (HTML / CSS / JS, sans dépendance) en français et anglais.
Direction artistique « Tribune » : rouge et blanc, lettrage varsity, énergie de stade.

## Lancer le site en local

Option 1 : ouvrir `index.html` dans le navigateur (double-clic).

Option 2 : serveur local (recommandé)

```bash
# avec Python
python3 -m http.server 8080
# ou avec Node
npx serve .
```

Puis ouvrir http://localhost:8080

## Structure

```
index.html        page unique (toutes les sections)
css/style.css     styles et couleurs (variables en haut du fichier)
js/i18n.js        textes FR / EN
js/main.js        langue, menu mobile, compteurs, animations, formulaire
assets/           favicon
assets/images/    vos photos (voir assets/images/LISEZMOI.md)
```

## Personnaliser

- **Couleurs et polices** : variables `:root` en haut de `css/style.css`.
- **Textes** : modifiez-les dans `js/i18n.js` (FR et EN). Le HTML contient la version FR par défaut.
- **Formulaire** : il valide les champs mais n'envoie rien. Branchez-le dans `js/main.js`
  (repère `TODO`) à un service comme Formspree ou Netlify Forms.
- **Photos** : déposez-les dans `assets/images/` avec les noms indiqués dans `assets/images/LISEZMOI.md`.

## Mettre en ligne

Glissez le dossier sur https://app.netlify.com/drop, ou activez GitHub Pages sur la branche.
