{-# LANGUAGE OverloadedStrings #-}
module Tests where  

import Prelude hiding ((^))
import Test.HUnit
import Derive

-- test_recette = 
--	derive "x" ^^ 2 + 3 *  "x" ^^ 3 ~?= 2 * "x" + 9 * "x" ^^ 2

derive_d_une_constante_est_0 = 
  derive 2 ~?= 0

derive_d_une_fonction_affine_est_une_constante = TestList [
    derive (3 * "x") ~?= 3
  , derive (42 * "x") ~?= 42
 ]

derive_d_une_fonction_de_degre_n_est_une_autre_fonction = TestList [
	  derive ("x" ^ 2) ~?= 2 * "x"
	, derive ("x" ^ 3) ~?= 3 * ("x" ^ 2)
 ]

tests = TestList [
--  test_recette
   derive_d_une_constante_est_0
  , derive_d_une_fonction_affine_est_une_constante
  , derive_d_une_fonction_de_degre_n_est_une_autre_fonction
 ]

main = runTestTT tests 

