White = {};
H2 = {color:'Heart', value:2};
D2 = {color:'Diamond', value:2};
S2 = {color:'Spade', value:2};
C2 = {color:'Club', value:2};
D3 = {color:'Diamond', value:3};
D5 = {color:'Diamond', value:5};
H5 = {color:'Heart', value:5};
S5 = {color:'Spade', value:5};
C8 = {color:'Club', value:8};
C9 = {color:'Club', value:9};
SK = {color:'Spade', value:13};
DK = {color:'Diamond', value:13};

has_pair  = function(hand) {
 return [0,1,2,3].filter(function(x) {
     return has_pair_at(hand, x);
  }).length > 0;
}

has_pair_at = function(hand, index)
{
  return hand[index].value === hand[index+1].value;
}

has_double_paire = function(hand) {
  return has_pair_at(hand, 0) && has_pair_at(hand, 2) ||
         has_pair_at(hand, 0) && has_pair_at(hand, 3)||
         has_pair_at(hand, 1) && has_pair_at(hand, 3);
}

has_brelan = function(hand) {
  return has_pair_at(hand,0) && has_pair_at(hand,1) ||
         has_pair_at(hand,2) && has_pair_at(hand,3) ||
         has_pair_at(hand,1) && has_pair_at(hand,2)
;
}

best_hand = function()
{
 return {winner: White, combination: [C2,H2]};
}
