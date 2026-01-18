let timer = null;
let intervalMs = 5000;
let runs = 0;
let lastRun = null;

function start(ms) {
  if (timer) return status();
  intervalMs = typeof ms === 'number' && ms > 0 ? ms : intervalMs;
  timer = setInterval(() => {
    // Simulated job work
    runs += 1;
    lastRun = new Date().toISOString();
  }, intervalMs);
  return status();
}

function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  return status();
}

function status() {
  return {
    running: !!timer,
    intervalMs,
    runs,
    lastRun,
  };
}

module.exports = { start, stop, status };
