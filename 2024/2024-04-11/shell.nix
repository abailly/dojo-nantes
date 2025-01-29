{ pkgs ? import <nixpkgs> { } }:
with pkgs;
mkShell {
  buildInputs = [
    (haskellPackages.ghcWithPackages
      (pkgs: with pkgs; [ cabal-install haskell-language-server ]))
  ];
}
