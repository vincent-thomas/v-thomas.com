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

        manifest = (pkgs.lib.importTOML ./Cargo.toml).package;

        package = pkgs.rustPlatform.buildRustPackage {
          pname = "v-thomas-com";
          version = manifest.version;
          src = pkgs.lib.cleanSource ./.;

          cargoLock.lockFile = ./Cargo.lock;

          nativeBuildInputs = with pkgs; [
            cargo
            rustc
          ];
        };
      in
      {
        packages = {
          default = package;

          image = pkgs.dockerTools.streamLayeredImage {
            name = "v-thomas-com";
            tag = "latest";
            contents = [ package ];
            config.Cmd = "${package}/bin/v-thomas-com";
          };

        };
        devShells.default = pkgs.mkShell {
          inputsFrom = [ package ];
          buildInputs = with pkgs; [
            # rustc
            #
            # cargo
            cargo-watch
            clippy

            just

            flyctl
          ];

        };
      }
    );
}
