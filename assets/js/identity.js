document.addEventListener("DOMContentLoaded", () => {
  const levels = ["h1", "h2", "h3", "h4"];

  levels.forEach((tag, i) => {
    const headers = document.querySelectorAll(tag);
    headers.forEach((header) => {
      for (let j = i; j >= 2; j--) {
        const glyph = document.createElement("span");
        glyph.classList.add("pl-glyph", levels[j]);
        glyph.setAttribute("aria-hidden", "true");
        glyph.textContent = "";
        header.prepend(glyph);
      }
    });
  });
});
