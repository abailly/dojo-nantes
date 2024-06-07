import Test.HUnit
import Tennis


tata = toto `par` tata

premier_coup_de_A = joueur_A_marque nouvellePartie

quand_la_partie_demarre_le_score_est_zero_zero = 
  score nouvellePartie ~?= (Zero,Zero)
  
quand_le_joueur_A_marque =
  score (premier_coup_de_A) ~?= (Quinze,Zero)
  
quand_le_joueur_A_marque_2_fois = TestList [
  score (joueur_A_marque (premier_coup_de_A)) ~?= (Trente,Zero),
  score (joueur_A_marque (joueur_B_marque nouvellePartie)) ~?= (Quinze,Quinze),
  score (joueur_A_marque (joueur_B_marque (joueur_B_marque nouvellePartie))) ~?= (Quinze,Trente)
  ]
  
quand_le_joueur_B_marque = TestList [
  score (joueur_B_marque nouvellePartie)                                    ~?= (Zero,Quinze),
  score (joueur_B_marque (joueur_B_marque nouvellePartie))                  ~?= (Zero,Trente),
  score (joueur_B_marque (joueur_B_marque(joueur_B_marque nouvellePartie))) ~?= (Zero,Quarante),
    score (joueur_B_marque (joueur_B_marque ( premier_coup_de_A)))          ~?= (Quinze,Trente)
  ]
  
  
tests = TestList [
  quand_la_partie_demarre_le_score_est_zero_zero,
  quand_le_joueur_A_marque,
  quand_le_joueur_A_marque_2_fois,
  quand_le_joueur_B_marque
  
  ]
        
main = runTestTT tests
