module Tennis where

data Points = Zero
           | Quinze
           | Trente
           | Quarante
           | Avantage
           deriving (Eq,Show,Enum)
type Jeu = Int                      
                    
type ScoreJoueur = (Jeu, Points)           
type Partie      = (ScoreJoueur, ScoreJoueur)

nouvellePartie :: Partie
nouvellePartie = ((0, Zero),(0,Zero))

incremente :: ScoreJoueur -> ScoreJoueur
incremente (j,Quarante) = (j+1,Zero)
incremente (j,Avantage) = (j+1,Zero)
incremente (j,p)        = (j, toEnum $ (+1) $ fromEnum p)

avantage :: ScoreJoueur -> ScoreJoueur
avantage (j,_) = (j,Avantage)

a_marque :: Partie -> Partie
a_marque (a@(jeuA, Quarante), b@(jeuB, Quarante)) = (avantage a  , b)
a_marque (a@(jeuA, Quarante), (jeuB, Avantage))   = (a           , (jeuB, Quarante))
a_marque (a@(jeuA, Avantage), (jeuB, _))          = (incremente a, (jeuB, Zero))
a_marque (a@(jeuA, Quarante), (jeuB, _))          = (incremente a, (jeuB, Zero))
a_marque (a                 , (jeuB, b))          = (incremente a, (jeuB, b))

b_marque :: Partie -> Partie
b_marque ((jeuA, a),b) = ((jeuA,  a), incremente b)
