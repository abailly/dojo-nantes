import Test.HUnit
import Tennis
  

-- acceptance = score [ AGagne, AGagne, AGagne, AGagne, AGagne ] ~?=
--              Score { sets = (0,0),
--                      jeux   = (1,0),
--                      points = (Quinze,Zero)}

initialement :: Test
initialement = points (score [ ]) ~?= (Zero,Zero)

aGagneUnPoint :: Test
aGagneUnPoint = points (score [ AGagne ]) ~?= (Quinze,Zero)

bGagneUnPoint :: Test
bGagneUnPoint = points (score [ BGagne ]) ~?= (Zero, Quinze)

aGagneDeuxPoints :: Test
aGagneDeuxPoints = points ( score [ AGagne, AGagne ]) ~?= (Trente, Zero)

aGagneTroisPoints :: Test
aGagneTroisPoints = points (score [ AGagne, AGagne, AGagne ]) ~?= (Quarante, Zero)

aGagneUnJeu = score [ AGagne, AGagne, AGagne, AGagne ] ~?= Score {
  jeux = (1,0),
  points = (Zero, Zero) }

tests :: Test
tests = TestList [
  initialement
  , aGagneUnPoint
  , bGagneUnPoint
  , aGagneDeuxPoints
  , aGagneTroisPoints
  , aGagneUnJeu
  ]

main = runTestTT tests
