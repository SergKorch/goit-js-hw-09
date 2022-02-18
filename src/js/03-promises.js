import Notiflix from 'notiflix';
const firstDelay = document.querySelector('input[name="delay"]');
console.log(firstDelay);
const delayStep = document.querySelector('input[name="step"]');
console.log(delayStep);
const amount = document.querySelector('input[name="amount"]');
console.log(amount);
const button = document.querySelector('button[type="submit"]');
console.log(button);
const form = document.querySelector('.form');
console.log(form);
form.addEventListener('submit', createPromiseSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success('Sol lucet omnibus');
      } else {
        Notiflix.Notify.failure('Qui timide rogat docet negare');
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
    console.log(position);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    console.log(delay);
    delay = Number(delay) + Number(delayStep.value); //delayStep
  }
}
