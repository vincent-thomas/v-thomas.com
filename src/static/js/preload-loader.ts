const data = atob("dmluY2VudEB2LXRob21hcy5jb20=");

document
  .querySelectorAll("[data-email-href]")
  .forEach((el) => el.setAttribute("href", `mailto:${data}`));

document.querySelectorAll("[data-email-inner]").forEach((el) => {
  el.textContent = data;
});

const prefixes = ["tel", "mailto"];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");

    if (href == null) return;

    if (link.hasAttribute("data-preload-ignore")) return;
    if (href.startsWith("#")) return;

    // External source checking
    if (href.includes("://")) return;
    if (!href.startsWith("/") && href.startsWith("//")) return;
    let exit = false;
    for (const prefix of prefixes) {
      if (href.startsWith(`${prefix}:`)) {
        exit = true;
        break;
      }
    }

    if (exit) return;

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
  });
});
