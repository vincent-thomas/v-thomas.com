import { buildSync } from "esbuild";
import { readdirSync, writeFileSync } from "fs";
// Escaping
const banner = `/**
  __     _______
  \\ \\   / /_   _|
   \\ \\ / /  | |
    \\ V /   | |
     \\_/    |_|
**/`;

const files = readdirSync("./lib");

let indexTs = "";

for (const file of files) {
  indexTs += "import './lib/" + file + "';\n";
}

writeFileSync("./index.ts", indexTs);

////      .join('\n')
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
