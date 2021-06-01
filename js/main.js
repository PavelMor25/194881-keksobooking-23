function getRandomNumber (minRange, maxRange) {
  if (minRange < 0 || maxRange < 0) {
    throw new Error('Параметры должен быть положительным');
  }
  if (maxRange <= minRange) {
    throw new Error('Вверхняя граница диапазона должна быть больше нижней');
  }
  return Math.floor(Math.random() * (maxRange - minRange)) + minRange;
}

getRandomNumber(30, 60);

function getRandomСoordinate (minRange, maxRange, numbersAfterPoint) {
  if (minRange < 0 || maxRange < 0) {
    throw new Error('Параметры должен быть положительным');
  }
  if (maxRange < minRange) {
    throw new Error('Вверхняя граница диапазона должна быть больше или равна нижней');
  }
  return (maxRange - minRange) ? (Math.random() * (maxRange - minRange) + minRange).toFixed(numbersAfterPoint) : (Math.random() + minRange).toFixed(numbersAfterPoint);
}

getRandomСoordinate(30, 60, 4);
