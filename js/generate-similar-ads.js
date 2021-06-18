import {arrayLodging} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAds = arrayLodging(1);
console.log(similarAds);

const similarListFragment = document.createDocumentFragment();

const photoAd = (element, amountPhoto) => {
  const listPhotos = element.querySelector('.popup__photos');
  for(let i = 1; i < amountPhoto.length; i++) {
    listPhotos.appendChild(listPhotos.querySelector('.popup__photo').cloneNode(true));
  }
};


similarAds.forEach(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const typeTranslate = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
    hotel: 'Отель',
  };
  const adElement = similarAdTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = title;
  adElement.querySelector('.popup__text--address').textContent = address;
  adElement.querySelector('.popup__text--price').textContent = `${price  } ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = typeTranslate[type];
  adElement.querySelector('.popup__text--capacity').textContent = `${rooms  } комнаты для ${  guests  } гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ checkin}, выезд до ${ checkout}`;
  adElement.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];

    if (! features.map((feature) => `popup__feature--${feature}`).includes(modifier)) {
      item.remove();
    }
  });
  adElement.querySelector('.popup__description').textContent = description;
  photoAd(adElement, photos);
  adElement.querySelectorAll('.popup__photo').forEach((item, index) => {
    item.src = photos[index];
  });
  adElement.querySelector('.popup__avatar').src = avatar;
  similarListFragment.appendChild(adElement);
});

mapCanvas.appendChild(similarListFragment);
