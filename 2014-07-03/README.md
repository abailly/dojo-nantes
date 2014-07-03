# Session du 12 juin 2014

## Qui ?

* [Romain Touzé](http://github.com/rtouze)
* [Arnaud](http://github.com/abailly)

## Quoi ?

* python, number names, randori sur [cyber-dojo](http://cyber-dojo.org/kata/edit/4859A7?avatar=koala)

## Tests

```.python
import speller
import unittest

class TestSpellNumbers(unittest.TestCase):

    def setUp(self):
        self.enonce = speller.Speller()

    def test_enoncer_un_nombre_simple_donne_son_nom(self):        
        self.assertEqual("un", self.enonce.spell(1))
        self.assertEqual("deux", self.enonce.spell(2))

    def test_enoncer_une_dizaine_donne_son_nom(self):        
        self.assertEqual("vingt", self.enonce.spell(20))

    def test_enoncer_une_vingtaine_donne_vingt_et_le_nom_de_l_unite(self):
        self.assertEqual("vingt deux", self.enonce.spell(22))
        self.assertEqual("vingt trois", self.enonce.spell(23))

    def test_enoncer_une_trentaine_donne_trente_et_l_unite(self):
        self.assertEqual("trente trois", self.enonce.spell(33))

    def test_enoncer_soixante_dix_donne_soixante_et_dizaine_simple(self):
        self.assertEqual("soixante douze", self.enonce.spell(72))

    def test_enoncer_soixantaine_donne_soixante_et_le_nom_de_l_unite(self):
        self.assertEqual("soixante deux", self.enonce.spell(62))

    def test_enoncer_quatre_vingtaine_donne_quatre_vingt_et_le_nom_de_l_unite(self):
        self.assertEqual("quatre-vingt trois", self.enonce.spell(83))

    def test_enoncer_centaine_donne_cent_et_le_nom_de_l_unite(self):
        self.assertEqual("cent un", self.enonce.spell(101))

    def test_enoncer_122_donne_cent_vingt_deux(self):
        self.assertEqual("cent vingt deux", self.enonce.spell(122))

    def test_enoncer_21_done_vingt_ET_un(self):
        self.assertEqual("vingt et un", self.enonce.spell(21))


if __name__ == '__main__':
    unittest.main()
```

## Code

```.python
class Speller:

    single_digit = { 1: "un", 
                     2: "deux" , 
                     3: "trois", 
                     12: "douze",
                     20: "vingt",
                     30: "trente",
                     60: "soixante",
                     80: "quatre-vingt",
                     100: "cent",
                     }
 
    def spell(self, number):
        if number in self.single_digit:
            return self.single_digit[number]
        return self.composite(number)

    def composite(self, number):
        if 20 < number < 60:
            dizaine = (number // 10) * 10
            if number % 10 != 1:
                return self.decompose(number, dizaine)
            else:
                return self.decompose_et(number, dizaine)
            
        if 60 < number < 80:
            return self.decompose(number, 60)

        if 80 < number < 100:
            return self.decompose(number, 80)

        if 100 < number:
            return self.decompose(number, 100)

    def decompose(self, number, composant):
        return compose(self.spell(composant), self.spell(number - composant))

    def decompose_et(self, number, composant):
        return compose(self.spell(composant), "et", self.spell(number - composant))

def compose(*args):        
    return " ".join(args)
```

## Comment ?

* Cyber dojo c'est toujours aussi bien!
* Avec des raccourcis VI ce serait mieux!
* on a fait un pomodoro du pauvre en shell...
* on a pas traité les milliers qui sont intéressants mais sinon on a pas mal couvert le truc...
* python c'est sympa aussi... On retrouve vite le truc, ça reste longtemps clair mais on peut avancer très loin
* on n'était pas nombreux (2!) mais c'était bien quand même
