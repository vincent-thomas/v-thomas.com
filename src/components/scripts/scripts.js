import Swup from "https://unpkg.com/swup@4?module";
import SwupHead from "https://unpkg.com/@swup/head-plugin@2?module";
import SwupPreload from "https://unpkg.com/@swup/preload-plugin@3?module";

new Swup({
	containers: ["#app"],
	plugins: [new SwupPreload(), new SwupHead()],
});
