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
index.html        site vitrine (toutes les sections)
espace.html       espace membre : matchs, projets, classement, parrainages, tickets, profil
css/style.css     styles et couleurs (variables en haut du fichier)
js/i18n.js        textes FR / EN
js/main.js        langue, menu mobile, compteurs, animations, formulaire
js/espace.js      espace membre : données d'exemple, traductions, réservation (démo)
css/espace.css    styles de l'espace membre
assets/           favicon
assets/images/    vos photos (voir assets/images/LISEZMOI.md)
```

## Personnaliser

- **Couleurs et polices** : variables `:root` en haut de `css/style.css`.
- **Textes** : modifiez-les dans `js/i18n.js` (FR et EN). Le HTML contient la version FR par défaut.
- **Formulaire** : il valide les champs mais n'envoie rien. Branchez-le dans `js/main.js`
  (repère `TODO`) à un service comme Formspree ou Netlify Forms.
- **Photos** : déposez-les dans `assets/images/` avec les noms indiqués dans `assets/images/LISEZMOI.md`.

## Espace membre (`espace.html`)

Accessible depuis le lien « Espace membre » du menu. C'est une **démo sans serveur** :
- les matchs, projets et le classement sont des **données d'exemple** (équipes fictives),
  modifiables en haut de `js/espace.js` (`MATCHES`, `PROJECTS`, `STANDINGS`) ;
- la réservation, le profil et le code de parrainage sont enregistrés **uniquement dans le
  navigateur** (localStorage) : aucun paiement, aucun envoi de données.

Pour une vraie billetterie, il faudra un backend (comptes, base de données) et un
prestataire de paiement (ex. Konnect, Flouci, Stripe).

## Mettre en ligne

Glissez le dossier sur https://app.netlify.com/drop, ou activez GitHub Pages sur la branche.
