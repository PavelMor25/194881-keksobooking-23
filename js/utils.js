function getRandomNumber (firstArg, secondArg) {
  const minRange = Math.ceil(Math.min(Math.abs(firstArg), Math.abs(secondArg)));
  const maxRange = Math.floor(Math.max(Math.abs(firstArg), Math.abs(secondArg)));
  return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
}

function getRandomСoordinate (firstArg, secondArg, numbersAfterPoint = 1) {
  const minRange = Math.min(Math.abs(firstArg), Math.abs(secondArg));
  const maxRange =Math.max(Math.abs(firstArg), Math.abs(secondArg));
  return (maxRange - minRange) ? (Math.random() * (maxRange - minRange) + minRange).toFixed(numbersAfterPoint) : (Math.random() + minRange).toFixed(numbersAfterPoint);
}

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomArray = (elements) => elements.slice(getRandomNumber(0,elements.length - 1));

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '5px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const isEscEvent = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');


export {getRandomNumber, getRandomСoordinate, getRandomArrayElement, getRandomArray, isEscEvent, showAlert};
