import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify, Loading } from 'notiflix';
import 'notiflix/dist/notiflix-3.1.0.min.css';
import 'flatpickr/dist/themes/material_green.css';

const refs = {
  inputText: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

let intervalID = null;
let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onFlatpickrClose,
};

function onFlatpickrClose(selectedDates) {
  selectedTime = selectedDates[0].getTime();
  const currentTime = Date.now();

  if (selectedTime < currentTime) {
    handleValidDateSelection();
  } else {
    handleInvalidDateSelection(selectedDates);
  }
}

function handleValidDateSelection() {
  refs.startBtn.disabled = true;
  showFailureNotification();
  showLoadingAnimationToClose();
}

function handleInvalidDateSelection(selectedDates) {
  refs.startBtn.disabled = false;
  selectedTime = selectedDates;
}

function showFailureNotification() {
  Notify.failure('Please choose a date in the future', {
    cssAnimationDuration: 250,
    position: 'center-top',
    cssAnimationStyle: 'from-bottom',
  });
}

function showLoadingAnimationToClose() {
  Loading.pulse('Click mouse to close', {
    clickToClose: true,
    svgSize: '33px',
    cssAnimationDuration: 250,
  });
}

flatpickr(refs.inputText, options);
refs.startBtn.addEventListener('click', onStart);

function onStart() {
  intervalID = setInterval(() => {
    const currentTime = Date.now();
    const startTime = selectedTime[0].getTime();
    const deltaTime = startTime - currentTime;
    const time = convertMs(deltaTime);

    if (deltaTime < 1000) {
      clearInterval(intervalID);
    }
    updateClockface(time);
  }, 1000);

  refs.startBtn.disabled = true;
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
