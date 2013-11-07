module Tennis where



nouvellePartie = (Zero,Zero)

score partie = partie

data Point = Zero|Quinze|Trente|Quarante deriving (Eq, Show)

marque Zero = Quinze
marque Quinze = Trente
marque Trente = Quarante

joueur_A_marque (a,b) = (marque a, b) 
joueur_B_marque (a,b) = (a,marque b) 
