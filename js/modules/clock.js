/**
 * Clock Module: handles analog and digital real‑time clock
 */
export function initClock() {
  const hrHand = document.querySelector("#hr");
  const mnHand = document.querySelector("#mn");
  const scHand = document.querySelector("#sc");
  const hoursElem = document.getElementById("hours");
  const minutesElem = document.getElementById("minutes");
  const secondsElem = document.getElementById("seconds");
  const ampmElem = document.getElementById("ampm");

  function updateClock() {
    const now = new Date();
    const hh = now.getHours() * 30;
    const mm = now.getMinutes() * 6;
    const ss = now.getSeconds() * 6;
    hrHand.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    mnHand.style.transform = `rotateZ(${mm}deg)`;
    scHand.style.transform = `rotateZ(${ss}deg)`;

    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const amOrPm = h < 12 ? "AM" : "PM";
    h = h % 12 || 12;
    hoursElem.innerHTML = h;
    minutesElem.innerHTML = m < 10 ? "0" + m : m;
    secondsElem.innerHTML = s < 10 ? "0" + s : s;
    ampmElem.innerHTML = amOrPm;
  }

  updateClock();
  setInterval(updateClock, 1000);
}
