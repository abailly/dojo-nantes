module DojoSpec (spec) where

import           Test.Hspec

data Marque = Zero
            | Quinze
            | Trente
            deriving (Enum, Show, Eq)

incremente :: Marque -> Marque
incremente Zero   = Quinze
incremente Quinze = Trente

data Score = Score { scoreA :: Marque
                   , scoreB :: Marque
                   }
             deriving (Show, Eq)

data Coup = A | B

type Partie = [ Coup ]

partieVide = []

gagne :: Coup -> Score -> Score
gagne A (Score sa s)   = Score (incremente sa) s
gagne B (Score s Zero) = Score s Quinze

score :: Partie -> Score
score []        = scoreInitial
score (A:reste) = A `gagne` score reste
score (B:reste) = B `gagne` score reste

scoreInitial :: Score
scoreInitial = Score Zero Zero

spec :: Spec
spec = describe "Score de Tennis" $ do

  describe "Score dans un jeu" $ do

    it "le score initial est 0-0" $ do
      score partieVide `shouldBe` scoreInitial
    it "le score est 15-0"$ do
      score [A] `shouldBe` Score Quinze Zero
    it "le score est 0-15"$ do
      score [B] `shouldBe` Score Zero Quinze
    it "le score est 15-15"$ do
      score [A,B] `shouldBe` Score Quinze Quinze
    it "le score est 30-15"$ do
      score [A,B,A] `shouldBe` Score Trente Quinze

