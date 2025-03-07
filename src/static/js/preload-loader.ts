const els = document.querySelectorAll("[data-email-href]");

const data = atob("dmluY2VudEB2LXRob21hcy5jb20=");
for (const el of els) {
  el.setAttribute("href", `mailto:${data}`);
}
const els2 = document.querySelectorAll("[data-email-inner]");
for (const el of els2) {
  el.textContent = data;
}

const prefixes = ["tel", "mailto"];

document.addEventListener("DOMContentLoaded", () => {
  for (const link of document.getElementsByTagName("a")) {
    const href = link.getAttribute("href");

    if (href == null) continue;

    if (link.hasAttribute("data-preload-ignore")) continue;
    if (href.startsWith("#")) continue;

    // External source checking
    if (href.includes("://")) continue;
    if (!href.startsWith("/") && href.startsWith("//")) continue;
    let exit = false;
    for (const prefix of prefixes) {
      if (href.startsWith(`${prefix}:`)) {
        exit = true;
        break;
      }
    }

    if (exit) continue;

    link.addEventListener(
      "mouseover",
      () => {
        const href = link.getAttribute("href");
        if (!href) return;
        const prefetch = document.createElement("link");
        prefetch.rel = "prefetch";
        prefetch.href = href;
        document.head.appendChild(prefetch);
      },
      { once: true },
    );
  }
});
