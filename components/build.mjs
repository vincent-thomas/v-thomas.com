import { buildSync } from "esbuild";

// Escaping
const banner = `/**
  __     _______
  \\ \\   / /_   _|
   \\ \\ / /  | |
    \\ V /   | |
     \\_/    |_|
**/`;

buildSync({
  entryPoints: ["./index.ts"],
  outfile: "../public/js/components.js",

  banner: {
    js: banner,
  },

  minify: true,
  external: [],
  format: "esm",
  bundle: true,
  platform: "browser",
});
