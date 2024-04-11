module HelloSpec where

import Test.Hspec(Spec, shouldBe, it, shouldReturn)
import Test.Hspec.QuickCheck(prop)
import Test.QuickCheck (Positive(..), Property, Arbitrary(..), vectorOf, forAll) 
import Test.QuickCheck.Monadic(monadicIO, assert, run)
import Hello(greetings)
import Control.Monad(forM)

-- fonction d'appel toplevel
-- fn : dimension -> pattern -> randomizer -> Maybe string
--
-- structure de donné -> voisins probables pour un élément donné
-- topologie torique
-- exemple:
--  .xx -> . := { gauche: [x] , droite: [x] }
--      -> x := { gauche: [.,x], droite: [.,x]}
--               x { 'x' : 0,5, '.': 0,5}
-- pour étendre "abcde" -> char le + probable si 'e' a gauche et 'a' a droite             
-- trouver la cellule qui a le moins d'entropie -> propager 
generate :: Monad m => Size -> Pattern -> Random m -> m Sequence
generate n pattern _ = 
  forM [0 .. n - 1] $ \ p -> 
    head <$> waveFunction p pattern

waveFunction :: Monad m => Size -> Pattern -> m [Char]
waveFunction p (Pattern pat) = return $ take 1 pat

type Size = Int
type Random m = m Int 
type Sequence = String

rand :: Monad m => m Int 
rand = return 42 

spec :: Spec
spec = do
  prop "genere une sequence a partir d'un pattern de longueur 1" $ generateSequenceFromSingletonPattern 1
  prop "genere une sequence a partir d'un pattern de longueur 2" $ generateSequenceFromPatternOfLength2

newtype Pattern = Pattern String 
 deriving (Show, Eq)

generatePattern k = Pattern <$> vectorOf k arbitrary

generateSequenceFromSingletonPattern :: Int -> Positive Int -> Property
generateSequenceFromSingletonPattern k (Positive n) = 
 forAll (generatePattern k) $ \ p@(Pattern pat) -> 
  monadicIO $ do 
     seq <- run $ generate n p rand
     assert $ length seq == n
     assert $ all (== head pat) seq

generateSequenceFromPatternOfLength2 :: Positive Int -> Property
generateSequenceFromPatternOfLength2 (Positive n) = 
 forAll (generatePattern 2) $ \ p@(Pattern [a,b]) -> 
  monadicIO $ do 
     seq <- run $ generate n p rand
     assert $ length seq == n
     assert $ length (filter (== a) seq) == n `div` 2
     assert $ length (filter (== b) seq) == n `div` 2
   

-- Run me with `cabal test --test-show-details=direct`
