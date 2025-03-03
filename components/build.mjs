import { buildSync } from "esbuild";

buildSync({
  entryPoints: ["./index.ts"],
  outfile: "../public/js/components.js",

  minify: true,
  external: [],
  format: "esm",
  bundle: true,
  platform: "browser",
});
