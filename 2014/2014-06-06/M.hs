module M where

compte borne [1] = 0
compte borne (0:reste) = (compte borne reste) + 1
compte borne (1:reste) = compte borne reste

rempliLigne [] = 0 
rempliLigne (1:reste) = compte 1 reste
rempliLigne (0:reste) = rempliLigne reste 
