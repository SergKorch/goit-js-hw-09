import Notiflix from 'notiflix';
const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');
form.addEventListener('submit', createPromiseSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
function createPromiseSubmit(event) {
  event.preventDefault();
  let position = 0;
  let delay = firstDelay.value;
  for (let i = 1; i <= amount.value; i++) {
    position += 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = Number(delay) + Number(delayStep.value); //delayStep
  }
}
