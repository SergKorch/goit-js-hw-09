const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const backGr = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let stopBg;
function backGrColor() {
  stopBg = setInterval(() => {
    backGr.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function backGrColorStop() {
  clearInterval(stopBg);
}

startBtn.addEventListener('click', backGrColor);
stopBtn.addEventListener('click', backGrColorStop);
