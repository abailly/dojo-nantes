<?php
function meilleureMain ($black, $white)
{
    
    return "White wins - high card: Ace";
}

function toMain ($str){
   return explode (' ', $str); 
}

function triMain($main) {
    rsort( $main );
    return $main;
}

function mainVersCombinaison($main){
    return array(
                "high" => array("4C","4H","4S","2D","2H")
                );
}
?>

