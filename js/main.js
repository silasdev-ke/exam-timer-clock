import { initClock } from "./modules/clock.js";
import { initTimer } from "./modules/timer.js";
import { initView } from "./modules/view.js";
import { initFullscreen } from "./modules/fullscreen.js";

// Initialize all modules when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initTimer();
  initView();
  initFullscreen();
});
