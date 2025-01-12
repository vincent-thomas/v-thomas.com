build:
  rm target/lambda -rf
  nix build .
  mkdir -p target/lambda/v-thomas-com
  cp ./result/bin/v-thomas-com ./target/lambda/v-thomas-com/bootstrap
  rm result

dev:
  cargo watch -x run

deploy:
  just build
  pnpm --prefix=infra cdk deploy --require-approval never
