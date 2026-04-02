/**
 * View Module: handles switching between Classic (analog only), Modern (digital only),
 * Standard (both clocks, no timer), Split View (clocks + timer), and Exam Focus (timer only).
 */
export function initView() {
  const dashboard = document.getElementById("dashboard");
  const clockCard = document.getElementById("clockCard");
  const viewButtons = document.querySelectorAll(".mode-switch .view-option");

  // Map button data-view values to internal mode names
  const modeMap = {
    classic: "analog",
    modern: "digital",
    standard: "clock",
    split: "both",
    exam: "timer",
  };

  function setView(viewValue) {
    const mode = modeMap[viewValue];
    if (!mode) return;

    // Remove all mode classes from dashboard
    dashboard.classList.remove(
      "hide-timer",
      "analog-mode",
      "digital-mode",
      "clock-mode",
      "timer-mode",
    );
    // Remove internal visibility classes from clock card
    if (clockCard) {
      clockCard.classList.remove("hide-analog", "hide-digital");
    }

    switch (mode) {
      case "analog":
        dashboard.classList.add("analog-mode");
        if (clockCard) clockCard.classList.add("hide-digital");
        break;
      case "digital":
        dashboard.classList.add("digital-mode");
        if (clockCard) clockCard.classList.add("hide-analog");
        break;
      case "clock":
        dashboard.classList.add("clock-mode");
        // Both analog and digital remain visible
        break;
      case "both":
        // Split View – no extra dashboard classes
        break;
      case "timer":
        dashboard.classList.add("timer-mode");
        break;
      default:
        break;
    }

    // Update active button styling
    viewButtons.forEach((btn) => {
      const btnView = btn.getAttribute("data-view");
      if (btnView === viewValue) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Add event listeners to all view buttons (skip fullscreen button which has no data-view)
  viewButtons.forEach((btn) => {
    const view = btn.getAttribute("data-view");
    if (view) {
      btn.addEventListener("click", () => setView(view));
    }
  });

  // Default view: split (both clocks + timer)
  setView("split");
}
