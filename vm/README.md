# Environment de développement

Ce répertoire contient du code [opentofu](https://opentofu.org) pour créer une VM contenant un environnement de développement pour divers langages:

* [Emacs](https://emacs.org) de base et [neovim](https://neovim.io) pour l'édition de code,
* Fichiers de configuration tirés de [https://github.com/abailly/dotfiles](https://github.com/abailly/dotfiles)
* [GHCup](https://www.haskell.org/ghcup/) pour du Haskell
* [SBCL](https://www.sbcl.org) avec [Quicklisp](https://www.quicklisp.org/beta/) pour du Common Lisp
* [rustup](https://rustup.rs) pour du Rust
* [nvm](https://github.com/nvm-sh/nvm) pour Javascript/Typescript

## Connexion

Pour pouvoir se connecter durant le dojo, ajoutez votre clé publique ssh au fichier [ssh_keys](./ssh_keys) en faisant une _pull request_, sous la forme:

```
curry:<key-type> <key encoded in base64>
```

Durant la session, les participants peuvent tou·te·s se connecter sur le même terminal dans la VM avec les commandes suivantes (où `x.y.z.t` est l'adresse IP de la VM qui est communiquée avavant le dojo):

```
ssh curry@x.y.z.t
tmux a
```
