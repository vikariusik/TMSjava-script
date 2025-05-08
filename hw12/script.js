let seconds = 0;
let intervalId = null;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');

function updateDisplay() {
  display.textContent = `${seconds} sec`;
}

startBtn.addEventListener('click', () => {
  if (intervalId === null) {
    intervalId = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
  }
});

pauseBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
});

updateDisplay();