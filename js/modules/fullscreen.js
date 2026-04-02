/**
 * Fullscreen Module: toggles full‑screen mode using the Fullscreen API.
 */
export function initFullscreen() {
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  if (!fullscreenBtn) return;

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  fullscreenBtn.addEventListener("click", toggleFullscreen);

  function updateButtonText() {
    if (document.fullscreenElement) {
      fullscreenBtn.innerHTML = "✖ Exit";
      fullscreenBtn.title = "Exit full screen";
    } else {
      fullscreenBtn.innerHTML = "⛶ Fullscreen";
      fullscreenBtn.title = "Enter full screen";
    }
  }

  document.addEventListener("fullscreenchange", updateButtonText);
  updateButtonText();
}
