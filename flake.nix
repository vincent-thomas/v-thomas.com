{
  description = "A Rust project development environment using Nix flakes";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    naersk.url = "github:nix-community/naersk";
    naersk.inputs.nixpkgs.follows = "nixpkgs";

    flake-utils.url = "github:numtide/flake-utils";

    rust-overlay.url = "github:oxalica/rust-overlay";
    rust-overlay.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs =
    {
      self,
      rust-overlay,
      naersk,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ (import rust-overlay) ];
        };

        toolchain = pkgs.rust-bin.fromRustupToolchainFile ./rust-toolchain.toml;

        naersk' = naersk.lib.${system}.override {
          cargo = toolchain;
          rustc = toolchain;
        };

      in
      {
        packages.default = naersk'.buildPackage {
          src = ./.;
          doCheck = true;
          nativeBuildInputs = with pkgs; [ pkgsStatic.stdenv.cc ];
          CARGO_BUILD_TARGET = "x86_64-unknown-linux-musl";
          CARGO_BUILD_RUSTFLAGS = "-C target-feature=+crt-static";
        };
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            toolchain
            cargo-watch
            cargo-lambda

            go
            pnpm_9

            just
          ];

        };
      }
    );
}

# };

#   outputs =
#     {
#       self,
#       nixpkgs,
#       rust-overlay,
#       flake-utils,
#     }:
#     flake-utils.lib.eachDefaultSystem (
#       system:
#       let
#         overlays = [ (import rust-overlay) ];
#         pkgs = import nixpkgs {
#           inherit system overlays;
#         };
#
#       in
#       {
#         devShells.default = pkgs.mkShell {
#           buildInputs = with pkgs; [
# kkkkkkkkkkk
