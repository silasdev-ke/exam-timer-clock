/**
 * Format seconds as HH:MM:SS
 * @param {number} secs - total seconds
 * @returns {string} formatted time string
 */
export function formatHMS(secs) {
  if (secs < 0) secs = 0;
  const hrs = Math.floor(secs / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const secsLeft = secs % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secsLeft.toString().padStart(2, "0")}`;
}
