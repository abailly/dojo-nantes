module M where

data Player = White | Black
        deriving (Eq,Show)

data Color = D | S | C | H 
	deriving (Eq,Show)

data Card = Card Color Int
	deriving (Eq, Show)

data Combination = HighCard Int
                 | Pair Int
                 | DoublePair Int Int
	deriving (Eq, Show, Ord)

type Hand = [ Card ]

h2 = Card H 2
h3 = Card H 3
d3 = Card D 3
d2 = Card D 2
h4 = Card H 4

combination :: Hand -> Combination 
combination [Card _ a] = HighCard a
combination (Card _ a: Card _ b: Card _ c: Card _ d : []) = DoublePair a c 
combination (Card _ b: c@(Card _ a): cards) 
     | b == a    = Pair a
     | otherwise = combination (c:cards)

bestHand hb hw = bestCombination (combination hb) (combination hw)

bestCombination cb cw | cb < cw   = (White, cw)
		      | otherwise = (Black, cb) 
