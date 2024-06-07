module Tests where  

import Test.HUnit
import  M

test1 = TestList [
   rempliLigne []  ~?= 0
 , rempliLigne [0] ~?= 0 
 , rempliLigne [0, 0] ~?= 0  
 , rempliLigne [1, 0, 1] ~?= 1
 , rempliLigne [1, 0, 0, 1] ~?= 2 
 , rempliLigne [1, 1, 0, 1] ~?= 1 
 , rempliLigne [0, 1, 0, 1] ~?= 1
 ]

tests = TestList [
 test1 
 ]

main = runTestTT tests 
