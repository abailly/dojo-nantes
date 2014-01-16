<?php

require_once 'PHPUnit/Framework.php';
require_once 'PokerHands.php';

class PokerHandsTest extends PHPUnit_Framework_TestCase
{

    public function testDeRecette_avec_meilleure_carte() {
        $this->assertEquals("White wins - high card: Ace",
                             meilleureMain("2H 3D 5S 9C KD", "2C 3H 4S 8C AH"));  
    }


/*
    public function testDeRecette_avec_un_full() {
        $this->assertEquals("Black wins - full house",
                             meilleureMain("2H 4S 4C 2D 4H","2S 8S AS QS 3S"));  
    }

*/
}


?>
