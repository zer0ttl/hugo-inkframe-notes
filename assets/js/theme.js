(function () {
  var root = document.documentElement;
  var modeButton = document.querySelector("[data-theme-toggle]");
  var modeIcon = document.querySelector("[data-mode-icon]");
  var modeLabel = document.querySelector("[data-mode-label]");
  var paletteSelect = document.querySelector("[data-palette-select]");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var validModes = ["light", "dark"];
  var validPalettes = ["ivory", "sage", "mist", "lavender", "sand", "rose"];

  function normalize(value, allowed, fallback) {
    return allowed.indexOf(value) === -1 ? fallback : value;
  }

  function currentMode() {
    return normalize(root.dataset.theme, validModes, "light");
  }

  function currentPalette() {
    return normalize(root.dataset.palette, validPalettes, "ivory");
  }

  function setTheme(mode, palette) {
    mode = normalize(mode, validModes, "light");
    palette = normalize(palette, validPalettes, "ivory");

    root.dataset.theme = mode;
    root.dataset.palette = palette;

    if (modeIcon) modeIcon.textContent = mode === "dark" ? "\u2600" : "\u263E";
    if (modeLabel) modeLabel.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
    if (modeButton) modeButton.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
    if (paletteSelect) paletteSelect.value = palette;

    try {
      localStorage.setItem("inkframe-notes-mode", mode);
      localStorage.setItem("inkframe-notes-palette", palette);
    } catch (error) {}

    if (themeMeta) {
      var bg = getComputedStyle(root).getPropertyValue("--bg").trim();
      if (bg) themeMeta.setAttribute("content", bg);
    }
  }

  if (modeButton) {
    modeButton.addEventListener("click", function () {
      setTheme(currentMode() === "dark" ? "light" : "dark", currentPalette());
    });
  }

  if (paletteSelect) {
    paletteSelect.addEventListener("change", function (event) {
      setTheme(currentMode(), event.target.value);
    });
  }

  setTheme(currentMode(), currentPalette());

  if (navigator.clipboard && navigator.clipboard.writeText) {
    document.querySelectorAll("[data-copy-code]").forEach(function (button) {
      var resetState;
      var status = button.parentElement.querySelector(".code-copy-status");

      button.hidden = false;
      button.addEventListener("click", async function () {
        clearTimeout(resetState);
        status.textContent = "";
        try {
          await navigator.clipboard.writeText(button.dataset.copyCode);
          button.dataset.copyState = "copied";
          status.textContent = "Code copied.";
        } catch (error) {
          button.dataset.copyState = "failed";
          status.textContent = "Could not copy code.";
        }

        resetState = setTimeout(function () {
          delete button.dataset.copyState;
          status.textContent = "";
        }, 2000);
      });
    });
  }

  var backToTop = document.querySelector("[data-back-to-top]");
  var header = document.querySelector(".site-header");

  if (backToTop && header) {
    function updateBackToTop() {
      var viewportTop = window.visualViewport ? window.visualViewport.offsetTop : 0;
      backToTop.hidden = header.getBoundingClientRect().bottom > viewportTop;
    }

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    window.addEventListener("resize", updateBackToTop);
    window.addEventListener("pageshow", updateBackToTop);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("scroll", updateBackToTop, { passive: true });
      window.visualViewport.addEventListener("resize", updateBackToTop);
    }
    updateBackToTop();
    backToTop.addEventListener("click", function () {
      var behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
      header.querySelector(".brand").focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: behavior });
    });
  }
})();
