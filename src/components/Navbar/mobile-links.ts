const handler = document.querySelector("#hamburger-handler");
if (handler === null) throw new Error("Handler not found");
handler.addEventListener("click", () => {
  const existing = document.querySelector("#root-navbar>#navbar-mobile-links")!;
  existing.classList.toggle("hidden");
});
