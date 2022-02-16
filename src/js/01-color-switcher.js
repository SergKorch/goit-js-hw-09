const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const backGr = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let stopBg;
function backGrColorStart() {
  stopBg = setInterval(() => {
    backGr.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.removeEventListener('click', backGrColorStart);
  startBtn.disabled = 'true';
  stopBtn.removeAttribute('disabled');
}
function backGrColorStop() {
  clearInterval(stopBg);
  stopBtn.removeEventListener('click', backGrColorStop);
  startBtn.removeAttribute('disabled');
  stopBtn.disabled = 'true';
}
stopBtn.disabled = 'true';
startBtn.addEventListener('click', backGrColorStart);
stopBtn.addEventListener('click', backGrColorStop);
