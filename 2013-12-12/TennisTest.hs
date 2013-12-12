import Test.HUnit
import Tennis
  
au_debut_le_score_est_0_0 =
  nouvellePartie ~?= ((0,Zero),(0,Zero))
  
quand_joueur_a_marque = TestList [
  a_marque nouvellePartie ~?= ((0,Quinze),(0,Zero))
  , a_marque (a_marque nouvellePartie) ~?= ((0,Trente),(0,Zero))
  , a_marque (a_marque (a_marque nouvellePartie)) ~?= ((0,Quarante),(0,Zero))
    ]
  
quand_joueur_b_marque = TestList [
  b_marque nouvellePartie ~?= ((0,Zero),(0,Quinze))
  , b_marque (b_marque nouvellePartie) ~?= ((0,Zero),(0,Trente))
  , b_marque (b_marque (b_marque nouvellePartie)) ~?= ((0,Zero),(0,Quarante))
    ]
                         
quand_a_marque_pour_le_jeu = TestList [                        
  a_marque ((0,Quarante),(0,Zero)) ~?= ((1,Zero), (0,Zero))
  , a_marque ((0,Avantage),(0,Quarante)) ~?= ((1,Zero), (0,Zero))
    ]

quand_a_marque_et_le_score_est_40_40 = 
  a_marque ((0,Quarante),(0,Quarante)) ~?= ((0,Avantage), (0,Quarante))
  
quand_a_marque_et_le_score_est_avantage_b = 
  a_marque ((0,Quarante),(0,Avantage)) ~?= ((0,Quarante), (0,Quarante))
  
tests = TestList [
  au_debut_le_score_est_0_0
  ,quand_joueur_a_marque
  ,quand_joueur_b_marque
  ,quand_a_marque_pour_le_jeu
  ,quand_a_marque_et_le_score_est_40_40
  ,quand_a_marque_et_le_score_est_avantage_b
  ]
        
main = runTestTT tests
