{
  description = "Editor description";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        buildDeps = with pkgs; [
          pnpm_10
          nodejs_22
          dart-sass
        ];
      in
      {
        devShells = {
          docker = pkgs.mkShell {
            buildInputs = buildDeps;
          };
          default = pkgs.mkShell {
            buildInputs =
              buildDeps
              ++ (with pkgs; [
                http-server
                flyctl
              ]);
          };
        };
      }
    );
}
