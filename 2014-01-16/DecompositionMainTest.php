<?php

require_once 'PHPUnit/Framework.php';
require_once 'PokerHands.php';

class DecompositionMainTest extends PHPUnit_Framework_TestCase
{
    public function testTableauMain() { 
        $this->assertEquals(array("2H","4S","4C","2D","4H"),
                             toMain("2H 4S 4C 2D 4H"));
    }

    public function testMainVersMeilleurCombinaison() { 
        $this->assertEquals(
                "high 4",
                mainVersCombinaison(
            array(
                "2H","4S","4C","2D","4H"
            )
        ));
    
    }

    public function testTriCarte() { 
        $this->assertEquals(array("8S","7C","5H","4H","3D"), 
                triMain(array("7C","3D","5H","8S","4H"))
        );

        $this->assertEquals(array("9S", "8D", "6H", "5S", "4D"),
                triMain(array("5S","9S","6H","4D","8D") )
        );

    }

}

?>
