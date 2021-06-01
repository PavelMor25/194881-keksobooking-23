function getRandomNumber (minRange, maxRange) {
  if (minRange < 0 || maxRange < 0) {
    return 'Параметры должен быть положительным';
  }
  if (maxRange <= minRange) {
    return 'Вверхняя граница диапазона должна быть больше нижней';
  }
  return Math.floor(Math.random()*(maxRange - minRange)) + minRange;
}

getRandomNumber(30, 60);

function getRandomСoordinate (minRange, maxRange, numbersAfterPoint) {
  if (minRange < 0 || maxRange < 0) {
    return 'Параметры должен быть положительным';
  }
  if (maxRange < minRange) {
    return 'Вверхняя граница диапазона должна быть больше нижней';
  }
  let coordinate = Math.floor(Math.random()*(maxRange - minRange) + minRange) + '.';
  for (let i = 1; i <= numbersAfterPoint; i++) {
    coordinate += Math.floor(Math.random()*9);
  }
  return Number(coordinate);
}

getRandomСoordinate(30, 60, 4);
