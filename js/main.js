function getRandomNumber (firstArg, secondArg) {
  const minRange = Math.ceil(Math.min(Math.abs(firstArg), Math.abs(secondArg)));
  const maxRange = Math.floor(Math.max(Math.abs(firstArg), Math.abs(secondArg)));
  return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
}

getRandomNumber(30, 60);

function getRandomСoordinate (firstArg, secondArg, numbersAfterPoint = 1) {
  const minRange = Math.min(Math.abs(firstArg), Math.abs(secondArg));
  const maxRange =Math.max(Math.abs(firstArg), Math.abs(secondArg));
  return (maxRange - minRange) ? (Math.random() * (maxRange - minRange) + minRange).toFixed(numbersAfterPoint) : (Math.random() + minRange).toFixed(numbersAfterPoint);
}

getRandomСoordinate(30, 60, 4);
