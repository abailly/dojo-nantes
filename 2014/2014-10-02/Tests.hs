import Test.HUnit

wordWrap :: String -> Int -> [ String ]
wordWrap texte _ = let (premier, second) = break (== ' ') texte
                   in if second == [] then
                        [premier]
                      else
                        [premier, tail second]

testDeRecette :: Test
testDeRecette  =
  wordWrap "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 80 ~?= [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
    ,"incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis"
    ,"nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
    ,"consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum"
    ,"dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,"
    ,"sunt in culpa qui officia deserunt mollit anim id est laborum."  ]

texteInferieurALaTailleRetourneLaTaille = TestList [
    wordWrap "toto" 10  ~?= ["toto"]
  , wordWrap "toto2" 10 ~?= ["toto2"]
  , wordWrap "toto3" 10 ~?= ["toto3"]
 ]

texteAvecCoupureSimple = TestList [
  wordWrap "Lorem_ipsum dolor" 10 ~?= [ "Lorem_ipsum", "dolor" ]
 , wordWrap "Lorem ipsum" 8 ~?= [ "Lorem", "ipsum" ]
  ]

tests :: Test
tests = TestList [
 --  testDeRecette,
  texteInferieurALaTailleRetourneLaTaille,
  texteAvecCoupureSimple
  ]

main :: IO Counts
main = runTestTT tests 
