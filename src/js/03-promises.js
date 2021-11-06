import { Notify } from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  btnEl: document.querySelector('button'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  totalPromises(Number(delay.value), Number(step.value), Number(amount.value));

  evt.currentTarget.reset();
}

function totalPromises(delay, step, amount) {
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, Number(delay) + Number(step) * i)
      .then(onSuccess)
      .catch(onError);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
