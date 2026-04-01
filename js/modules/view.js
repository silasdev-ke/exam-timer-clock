/**
 * View Module: handles switching between Clock‑only, Timer‑only, and Both views.
 */
export function initView() {
  const dashboard = document.getElementById("dashboard");
  const viewButtons = document.querySelectorAll(".mode-switch .view-option");

  function setView(view) {
    dashboard.classList.remove("hide-clock", "hide-timer");
    if (view === "clock") {
      dashboard.classList.add("hide-timer");
    } else if (view === "timer") {
      dashboard.classList.add("hide-clock");
    }
    // 'both' needs no extra class

    viewButtons.forEach((btn) => {
      if (btn.getAttribute("data-view") === view) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  viewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.getAttribute("data-view");
      setView(view);
    });
  });

  // default: both
  setView("both");
}
