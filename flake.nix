{
  description = "A Rust project development environment using Nix flakes";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        packages =
          let
            manifest = (pkgs.lib.importTOML ./Cargo.toml).package;
          in
          rec {
            default = pkgs.rustPlatform.buildRustPackage {
              pname = manifest.name;
              version = manifest.version;
              src = pkgs.lib.cleanSource ./.;

              cargoLock.lockFile = ./Cargo.lock;

              nativeBuildInputs = with pkgs; [
                cargo
                rustc
              ];
            };

            image = pkgs.dockerTools.buildImage {
              name = manifest.name;
              tag = manifest.version;
              copyToRoot = [ default ];
              config.Cmd = "${default}/bin/v-thomas-com";
            };

          };
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            rustc

            cargo
            cargo-watch
            clippy

            just

            flyctl
          ];

        };
      }
    );
}
