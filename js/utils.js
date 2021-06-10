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

export {getRandomNumber, getRandomСoordinate, getRandomArrayElement, getRandomArray};
