import {getRandomNumber, getRandomСoordinate, getRandomArrayElement, getRandomArray} from './utils.js';

const TITLE = ['от частного лица', 'от агенства'];
const TYPE_LODGING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


const generateObject = (index) => {
  const lat = getRandomСoordinate(35.65, 35.7, 5);
  const lng = getRandomСoordinate(139.7, 139.8, 5);
  return {
    author: {avatar: `img/avatars/user0${  index  }.png`},
    offer: {
      title: getRandomArrayElement(TITLE),
      address: `${lat  } ${  lng}`,
      price: getRandomNumber(5000, 25000),
      type: getRandomArrayElement(TYPE_LODGING),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 9),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
      features: getRandomArray(FEATURES),
      description: 'Сдается по прекрасной цене',
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

const arrayLodging = (arrayLength) => new Array(arrayLength).fill(null).map((__, index) => generateObject(index + 1));

export {arrayLodging};
