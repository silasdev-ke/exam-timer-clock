import { formatHMS } from "../utils/helpers.js";

/**
 * Timer Module: manages countdown state, UI updates, and user interactions.
 */
export function initTimer() {
  // State
  let totalSeconds = 0;
  let remainingSeconds = 0;
  let timerInterval = null;
  let isRunning = false;
  let startMoment = null;

  // DOM elements
  const remainingDisplay = document.getElementById("remainingDisplay");
  const progressFill = document.getElementById("progressFill");
  const progressPercent = document.getElementById("progressPercent");
  const infoDuration = document.getElementById("infoDuration");
  const infoStart = document.getElementById("infoStart");
  const infoEnd = document.getElementById("infoEnd");
  const statusMsg = document.getElementById("statusMsg");
  const durationRow = document.getElementById("durationRow");
  const durationMins = document.getElementById("durationMins");
  const durationSecs = document.getElementById("durationSecs");
  const setDurationBtn = document.getElementById("setDurationBtn");
  const startBtn = document.getElementById("startTimerBtn");
  const pauseBtn = document.getElementById("pauseTimerBtn");
  const resetBtn = document.getElementById("resetTimerBtn");

  // Helper: update all UI elements from current state
  function refreshUI() {
    remainingDisplay.innerText = formatHMS(remainingSeconds);
    const percent =
      totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0;
    const clamped = Math.min(100, Math.max(0, percent));
    progressFill.style.width = `${clamped}%`;
    progressPercent.innerText = `${Math.round(clamped)}%`;
    infoDuration.innerText =
      totalSeconds > 0 ? formatHMS(totalSeconds) : "--:--:--";

    if (
      startMoment &&
      (isRunning || (!isRunning && remainingSeconds < totalSeconds))
    ) {
      infoStart.innerText = startMoment.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } else {
      infoStart.innerText = "--:--:--";
    }

    if (
      remainingSeconds > 0 &&
      totalSeconds > 0 &&
      (isRunning || (!isRunning && remainingSeconds < totalSeconds))
    ) {
      const endPrediction = new Date(Date.now() + remainingSeconds * 1000);
      infoEnd.innerText = endPrediction.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } else if (remainingSeconds === 0 && totalSeconds > 0) {
      infoEnd.innerText = "⏰ FINISHED";
    } else {
      infoEnd.innerText = "--:--:--";
    }

    // status messages
    if (remainingSeconds === 0 && totalSeconds > 0) {
      statusMsg.innerText = "⛔ Exam finished. Press RESET to start new.";
    } else if (isRunning) {
      statusMsg.innerText = "▶ Timer running — exam in progress";
    } else if (
      !isRunning &&
      remainingSeconds > 0 &&
      remainingSeconds < totalSeconds
    ) {
      statusMsg.innerText = "⏸ Paused — press START to resume";
    } else if (
      !isRunning &&
      totalSeconds > 0 &&
      remainingSeconds === totalSeconds
    ) {
      statusMsg.innerText = "✅ Ready. Press START to begin exam.";
    } else {
      statusMsg.innerText = "⚙️ Set duration above & start";
    }

    // show/hide duration input row
    if (isRunning) {
      durationRow.classList.add("hidden");
    } else {
      durationRow.classList.remove("hidden");
    }

    // auto‑stop when timer hits zero
    if (remainingSeconds <= 0 && totalSeconds > 0 && timerInterval) {
      stopTimer();
    }
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    isRunning = false;
    refreshUI();
  }

  function tick() {
    if (!isRunning) return;
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }
    remainingSeconds--;
    refreshUI();
    if (remainingSeconds === 0) stopTimer();
  }

  function startTimer() {
    if (totalSeconds === 0) {
      statusMsg.innerText = "⚠️ Please set a duration first!";
      return;
    }
    if (remainingSeconds === 0 && totalSeconds > 0) {
      statusMsg.innerText = "Timer expired. Press RESET to restart.";
      return;
    }
    if (isRunning) return;

    if (!startMoment && remainingSeconds === totalSeconds && totalSeconds > 0) {
      startMoment = new Date();
    } else if (
      !startMoment &&
      remainingSeconds > 0 &&
      remainingSeconds < totalSeconds
    ) {
      startMoment = new Date();
    }

    if (!timerInterval) {
      timerInterval = setInterval(tick, 1000);
    }
    isRunning = true;
    refreshUI();
  }

  function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    refreshUI();
  }

  function resetTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    isRunning = false;
    remainingSeconds = totalSeconds;
    startMoment = null;
    refreshUI();
  }

  function setDuration() {
    if (isRunning) {
      statusMsg.innerText = "⛔ Pause timer before changing duration.";
      return;
    }
    let mins = parseInt(durationMins.value, 10);
    let secs = parseInt(durationSecs.value, 10);
    if (isNaN(mins)) mins = 0;
    if (isNaN(secs)) secs = 0;
    secs = Math.min(59, Math.max(0, secs));
    mins = Math.min(720, Math.max(0, mins));
    let newTotal = mins * 60 + secs;
    if (newTotal <= 0) newTotal = 60;
    totalSeconds = newTotal;
    remainingSeconds = totalSeconds;
    startMoment = null;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    isRunning = false;
    refreshUI();
    durationMins.value = Math.floor(totalSeconds / 60);
    durationSecs.value = totalSeconds % 60;
    statusMsg.innerText = `✅ Duration set to ${formatHMS(totalSeconds)}. Press START.`;
  }

  // Attach event listeners
  setDurationBtn.addEventListener("click", setDuration);
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  // Initial state
  totalSeconds = 0;
  remainingSeconds = 0;
  startMoment = null;
  refreshUI();
  durationMins.value = 90;
  durationSecs.value = 0;
}
