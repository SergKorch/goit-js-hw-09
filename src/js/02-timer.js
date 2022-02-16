import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  elInputDate: document.querySelector('input[type="text"]'),
  clockFace: document.querySelector('.timer'),
};
let dateStarted;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    dateStarted = selectedDates[0];
    if (dateStarted.getTime() - Date.now() <= 0) {
      Notiflix.Notify.warning('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', true);
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};
flatpickr(refs.elInputDate, options);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.init();
  }
  init() {
    const timeForm = this.convertMs(0);
    this.onTick(timeForm);
  }
  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const dataTime = dateStarted.getTime() - currentTime;
      if (dataTime <= 0) {
        return;
      }
      const timeForm = this.convertMs(dataTime);
      console.log(timeForm);
      this.onTick(timeForm);
    }, 1000);
  }
  stop() {
    this.isActive = false;
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }
  pad(element) {
    return String(element).padStart(2, '0');
  }
}
const timer = new Timer({
  onTick: timerFace,
});

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

function timerFace({ days, hours, minutes, seconds }) {
  refs.clockFace.innerHTML=`
  <div class="field">
    <span class="value" data-days>${days}</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>${hours}</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>${minutes}</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>${seconds}</span>
    <span class="label">Seconds</span>
  </div>
  `;
}
