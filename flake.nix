{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
    };
  };

  outputs = inputs @ {flake-parts, ...}:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = [
        "aarch64-darwin"
        "aarch64-linux"
        "x86_64-darwin"
        "x86_64-linux"
      ];
      perSystem = {pkgs, ...}: let
        sources = ./.;
      in {
        checks = {
          formatting =
            pkgs.runCommand "nix-format-check" {
              buildInputs = [
                pkgs.alejandra
              ];
            } ''
              alejandra --quiet --check ${sources}
              touch $out
            '';
        };
        devShells = {
          default = pkgs.mkShell {
            packages = with pkgs; [
              hugo
            ];
          };
        };
        formatter = pkgs.alejandra;
      };
    };
}
