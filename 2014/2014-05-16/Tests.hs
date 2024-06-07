module Tests where  

import Test.HUnit
import  M

--recette = "La meilleure main est " ~: TestList [
--    bestHand [H2,D3,S5,C9,DK] [C2,H3,S4,C8,HA] ~?= (White,[HA]) 
-- ]

can_detect_pair = TestList [
  combination [ d2 ]     ~?= HighCard 2,   
  combination [ h3 ]     ~?= HighCard 3,   
  combination [ d4 ]      ~?= HighCard 3,   
  combination [ h2, d3 ] ~?= HighCard 3,    
  combination [ h2, d2 ] ~?= Pair 2,
  combination [ h3, d3 ] ~?= Pair 3,
  combination [ h3, d3, h4 ] ~?= Pair 3      
 , combination [ h2, d3, h4 ] ~?= HighCard 4     
 , combination [ h2, d3, h3 ] ~?= Pair 3     
 , combination [ h2, d2, h3, d3] ~?= DoublePair 2 3     
 ]

can_compare_hand = TestList [
   bestHand [h2] [h3] ~?= (White,HighCard 3) 
 , bestHand [d3] [h2, d2] ~?= (White, Pair 2) 
 , bestHand [d3] [h2] ~?= (Black, HighCard 3) 
 , bestHand [d3, h3] [h2, d2] ~?= (Black, Pair 3) 
 ]

tests = TestList [
--  recette
  can_detect_pair,
  can_compare_hand
 ]

main = runTestTT tests 
