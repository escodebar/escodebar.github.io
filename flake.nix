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
        python = pkgs.python3.withPackages (ps: with ps; [
          pytest
        ]);
      in {
        checks = {
          formatting =
            pkgs.runCommand "format-check" {
              buildInputs = with pkgs; [
                alejandra
                nodePackages.prettier
              ];
            } ''
              alejandra --quiet --check ${sources} \
                && prettier ${sources} --check \
                && touch $out
            '';
        };
        devShells = {
          default = pkgs.mkShell {
            packages = with pkgs; [
              hugo
              python
            ];
          };
        };
        formatter = pkgs.alejandra;
        packages = {
          default = pkgs.stdenv.mkDerivation {
            version = "1.0.0";
            pname = "pablo.codes";
            src = sources;
            buildInputs = with pkgs; [
              hugo
            ];
            buildPhase = ''
              hugo \
                --gc \
                --baseURL "https://pablo.codes/"
            '';
            installPhase = ''
              mkdir -p $out
              cp -R public/* $out/
            '';
            doCheck = true;
            checkInputs = with pkgs; [
              validator-nu
            ];
            checkPhase = ''
              vnu --skip-non-html public || exit 1
            '';
          };
        };
      };
    };
}
