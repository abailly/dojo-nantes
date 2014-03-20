module Tennis where

data Coup = AGagne | BGagne
          deriving (Eq,Show)

data Point = Zero
           | Quinze
           | Trente
           | Quarante
           deriving (Eq,Show)
                    
type Jeu = Int

data Score = Score { jeux::(Jeu, Jeu), points::(Point, Point) }
             deriving (Eq, Show)

scoreNul = Score {jeux = (0,0), points = (Zero, Zero)}

score :: [ Coup ] -> Score
score [ ]                = scoreNul
score (BGagne:coups)     = marqueUnPoint BGagne (score coups)
score (AGagne:coups)     = marqueUnPoint AGagne (score coups)

marqueUnPoint :: Coup -> Score -> Score
marqueUnPoint AGagne (Score j (scoreA,   Zero)) = Score j (incrementPoint scoreA,   Zero)
marqueUnPoint BGagne (Score j (Zero,   scoreB)) = Score j (Zero, incrementPoint scoreB)


incrementPoint :: Point -> Point
incrementPoint Zero = Quinze
incrementPoint Quinze = Trente
incrementPoint Trente = Quarante

