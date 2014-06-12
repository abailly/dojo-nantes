
require('./untitled.js');

describe("poker hands", function() {
/*
  it("computes the best hand", function() {
    expect(best_hand(
        [H2,D3,S5,C9,DK],
        [C2,H3,S4,C8,HA]))
       .toEqual({winner: White, combination: [HA]}); 
  });
*/

  it ("has a pair", function() {
    expect(has_pair(
        [H2,D2,S5,C9,DK])).toBe(true);
    }
  );

  it ("has a pair of five", function() {
    expect(has_pair(
        [H2,D5,S5,C9,DK])).toBe(true);
    }
  );

  it ("has no pair", function() {
    expect(has_pair(
        [H2,D3,S5,C9,DK])).toBe(false);
    }
  );

  it ("has a double pair", function() {
    expect(has_double_paire([H2,D2,D5,S5,DK])).toBe(true);
    });

  it ("has a double pair", function() {
    expect(has_double_paire([H2,D2,D5,SK,DK])).toBe(true);
    });

  it ("has a double pair", function() {
    expect(has_double_paire([H2,S5,D5,SK,DK])).toBe(true);
    });

  it ("has no double pair", function() {
    expect(has_double_paire([H2,D3,D5,S5,DK])).toBe(false);
    });

  it ("has a brelan", function() {
    expect(has_brelan([H2,D2,S2,S5,DK])).toBe(true);
    });

  it ("has no brelan", function() {
    expect(has_brelan([H2,D2,D5,S5,DK])).toBe(false);
    });

  it ("has a brelan", function() {
    expect(has_brelan([H2,D2,H5,S5,D5])).toBe(true);
    });

  it ("has a brelan", function() {
    expect(has_brelan([H2,D5,H5,S5,DK])).toBe(true);
    });

  it("computes the best hand", function() {
    expect(best_hand(
        [H2,D3,S5,C9,DK],
        [C2,S2,D5,C8,SK]))
       .toEqual({winner: White, combination: [C2,H2]}); 
  });

});
