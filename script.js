(() => {
  const buttons = document.querySelectorAll("[data-lang]");
  const translatable = document.querySelectorAll("[data-es][data-en]");
  const nav = document.querySelector(".main-nav");
  const menu = document.querySelector(".menu-toggle");

  function setLanguage(language) {
    document.documentElement.lang = language;
    translatable.forEach((element) => {
      const value = element.dataset[language];
      if (value !== undefined) element.innerHTML = value;
    });
    buttons.forEach((button) => {
      const active = button.dataset.lang === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.title = language === "es"
      ? "Estudio Andalucía — Compañía de teatro"
      : "Estudio Andalucía — Theatre company";
    try { localStorage.setItem("estudio-language", language); } catch (_) {}
  }

  buttons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  menu?.addEventListener("click", () => {
    const expanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menu?.setAttribute("aria-expanded", "false");
  }));

  let language = "es";
  try {
    const saved = localStorage.getItem("estudio-language");
    if (saved === "es" || saved === "en") language = saved;
  } catch (_) {}
  setLanguage(language);
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();