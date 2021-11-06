const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
  // refs.startBtn.disabled = true;
  setBtnDisabledState(refs.startBtn, true);
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  // refs.stopBtn.disabled = false;
  setBtnDisabledState(refs.stopBtn, false);
}

function onStopBtnClick() {
  // refs.stopBtn.disabled = true;
  setBtnDisabledState(refs.stopBtn, true);
  clearInterval(timerId);
  // refs.startBtn.disabled = false;
  setBtnDisabledState(refs.startBtn, false);
}

function setBtnDisabledState(btn, disabled) {
  btn.disabled = disabled;
}
