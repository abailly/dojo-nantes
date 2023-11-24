# Le Dojo Virtuel

## Pourquoi ?

Parce que c'est compliqué pour beaucoup de gens de se retrouver tous les quinze jours à La Cantine mais que c'est
quand même sympa de trouver un moment pour pratiquer du code en groupe. Du coup est née l'idée d'utiliser la technologie moderne
pour se retrouver *virtuellement* et coder ensemble dans un environnement qui puisse être accessible au plus grand nombre.

## Comment ?

Deux canaux de communication:
* [Google hangout](https://tools.google.com/dlpage/hangoutplugin) pour la voix et l'image
* [SSH](https://en.wikipedia.org/wiki/Secure_Shell),  [tmux](http://tmux.sourceforge.net) et [Vim](http://www.vim.org) pour le code

Pour participer, il faut:

* envoyer sa clef ssh publique à Arnaud
* au jour et à l'heure prévus, se connecter sur un serveur dont les coordonnées sont transmises aux participants du dojo et se
  connecter sur hangout

### Tmux crash course

Créer un session tmux :

> tmux -L dojo new

Rejoindre une session tmux :

> tmux -L dojo attach

Toutes les commandes à l'intérieur de tmux commencent par un `Ctrl+b`:

* `Ctrl+b d` : Se détache de la session
* `Ctrl+b "` : Split le panel courant horizontalement
* `Ctrl+b %` : Split le panel courant verticalement
* `Ctrl+b flèche` : Passe d'un panel à l'autre
* `Ctrl+b maintenu et flèche` : redimensionne le panel courant

### Vim crash course

Voir [vim](http://www.vim.org) pour plus de documentation.

Deux modes : édition et commande
On passe en mode édition avec `i` (insert), `a` (append), on en sort avec `Echap`
En mode commande :
* `:q` pour quitter vi
* `:e` nom pour éditer un fichier (existant ou pas encore)
* `:w [nom]` : Enregistrement [sous le nom donné]
* `x` : Supprimer le caractère courant (sous le curseur)
* `dd` : Suppression de la ligne courante (sous le curseur)
* `yy` : Copie de la ligne courante (sous le curseur)
* `p` : Collage de la dernière valeur supprimée ou copiée
* déplacements :
  * `h`, `j`, `k`, `l` (ou les flèches directionnelles) : pour gauche, bas, haut, et droite respectivement
  * `^` : aller au premier caractère non blanc de la ligne
  * `0` : aller au premier caractère de la ligne
  * `$` : aller au dernier caractère de la ligne

# Links

* Une explication détaillée du binômage à distance: https://github.com/livingsocial/ls-pair
