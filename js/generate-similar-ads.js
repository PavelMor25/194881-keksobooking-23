import {arrayLodging} from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAds = arrayLodging(2);

const similarListFragment = document.createDocumentFragment();

const renderPhotosAd = (element, photos) => {
  const listPhotos = element.querySelector('.popup__photos');
  const listFragment = document.createDocumentFragment();
  photos.forEach((item) => {
    const listItemPhoto = listPhotos.querySelector('.popup__photo').cloneNode(true);
    listItemPhoto.src = item;
    listFragment.appendChild(listItemPhoto);
  });
  listPhotos.innerHTML = '';
  listPhotos.appendChild(listFragment);
};

const renderFeaturesAd = (element, features) => {
  const listFeatures = element.querySelector('.popup__features');
  listFeatures.innerHTML = '';
  const listFragment = document.createDocumentFragment();
  features.map((feature) => `popup__feature--${feature}`).forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add(item);
    listFragment.appendChild(listItem);
  });
  listFeatures.appendChild(listFragment);
};

const typeTranslate = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

similarAds.forEach(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const adElement = similarAdTemplate.cloneNode(true);
  title ? adElement.querySelector('.popup__title').textContent = title : adElement.querySelector('.popup__title').classList.add('hidden');
  address ? adElement.querySelector('.popup__text--address').textContent = address : adElement.querySelector('.popup__text--address').classList.add('hidden');
  price ? adElement.querySelector('.popup__text--price').textContent = `${price  } ₽/ночь` : adElement.querySelector('.popup__text--price').classList.add('hidden');
  type ? adElement.querySelector('.popup__type').textContent = typeTranslate[type] : adElement.querySelector('.popup__type').classList.add('hidden');
  (rooms && guests) ? adElement.querySelector('.popup__text--capacity').textContent = `${rooms  } комнаты для ${  guests  } гостей` : adElement.querySelector('.popup__text--capacity').classList.add('hidden');
  (checkin && checkout) ? adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ checkin}, выезд до ${ checkout}` : adElement.querySelector('.popup__text--time').classList.add('hidden');
  renderFeaturesAd(adElement, features);
  description ? adElement.querySelector('.popup__description').textContent = description : adElement.querySelector('.popup__description').classList.add('hidden');
  renderPhotosAd(adElement, photos);
  adElement.querySelector('.popup__avatar').src = avatar;
  similarListFragment.appendChild(adElement);
});

mapCanvas.appendChild(similarListFragment);
