if (
  HTMLScriptElement.supports &&
  HTMLScriptElement.supports("speculationrules")
) {
  preloadWithSpeculation();
} else {
  preloadWithLinks();
}

function preloadWithSpeculation() {
  const tag = document.createElement("script");

  tag.type = "speculationrules";

  const rules = {
    prerender: [
      {
        source: "document",
        eagerness: "eager",
        where: {
          href_matches: "/*",
        },
      },
    ],
  };

  tag.textContent = JSON.stringify(rules);

  document.body.append(tag);
}

const data = window.atob("dmluY2VudEB2LXRob21hcy5jb20=");

document
  .querySelectorAll("[data-email-href]")
  .forEach((el) => el.setAttribute("href", `mailto:${data}`));

document.querySelectorAll("[data-email-inner]").forEach((el) => {
  el.textContent = data;
});

function preloadWithLinks() {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a").forEach((link) => {
      if (isAHrefValid(link)) return;
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
}

function isAHrefValid(tag: HTMLAnchorElement): boolean {
  const href = tag.href;
  const prefixes = ["tel", "mailto"];
  if (href == null) return false;

  if (tag.hasAttribute("data-preload-ignore")) return false;
  if (href.startsWith("#")) return false;

  // External source checking
  if (href.includes("://")) return false;
  if (!href.startsWith("/") && href.startsWith("//")) return false;
  let exit = false;
  for (const prefix of prefixes) {
    if (href.startsWith(`${prefix}:`)) {
      exit = true;
      break;
    }
  }

  if (exit) return false;

  return true;
}
