dev:
  @cargo watch -x "run"

docker:
  nix build .#image
  ./result | docker load

deploy:
  just docker
  fly deploy --local-only
