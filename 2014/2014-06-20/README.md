# Session du 12 juin 2014

## Qui ?

* [Emmanuel Gaillot](http://github.com/egaillot)
* [Arnaud](http://github.com/abailly)
* [Cedric](http://github.com/cedricpineau)

## Quoi ?

* Frameworkd TDD, Assembleur Intel 64bits, kata

## Comment ?


* "Tu fais ca pour le plaisir" ??? dis CÃdric...
* Ya pas d'excuse pour ne pas ecrire des tests, quelque soit le langage
* Ecrire un jeu pour Atari 2600, assembleur beaucoup plus simple que le i386
* Ca nous renvoie 20 ans en arriere...
* Ca donne envie de refaire de l'assembleur :)
* On perd facilement ses repÃres en passant d'une plateforme a l'autre (ex. MacOS et Linux)

* Decouverte - avoir un terminal a fond transparent par dessus l'image Google Hangout
* tmux - c'est chouette, mais sans accent c'est triste.

### Assembleur
A explorer :
* macros
* pourquoi des fois $Adresse, et d'autres fois Adresse

### VI

* ctrl-N : complÃ©tion auto avec ce qui est au dessus
* :vsplit pour split vertical de vi

> while true; do (clear; date; gcc -o tests tests.s && ./tests; echo $?) 2>&1 | tail -2000; sleep 1; done  
