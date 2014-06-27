module Derive where
import Data.String

data Fonction = N Integer
              | V String
              | F Integer String
              | P Integer String Integer 
  deriving (Eq,Show)

instance IsString Fonction where
  fromString s = V s

instance Num Fonction where
  N a + N b     = N (a+b)

  N a * N b     = N (a*b)
  N a * V v     = F a v 
  N a * P c v n = P (a*c) v n 

  N a - N b     = N (a-b)
  
  negate (N a)  = N (negate a)

  abs (N a )    = N (abs a)

  signum (N a)  = N (signum a)

  fromInteger a = N a 


(^) :: Fonction -> Fonction -> Fonction
V v ^ N n = P 1 v n 

derive :: Fonction -> Fonction
derive (F n _)   =  N n 
derive (P c v 2) =  F (c * 2) v 
derive (P c v n) =  P (c * n) v  (n-1)
derive _         =  0
