const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderPhotosAd = (element, photos) => {
  const listPhotos = element.querySelector('.popup__photos');
  if (!photos) {
    listPhotos.classList.add('hidden');
    listPhotos.innerHTML = '';
    return;
  }
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
  if (!features) {
    listFeatures.classList.add('hidden');
    listFeatures.innerHTML = '';
    return;
  }
  listFeatures.innerHTML = '';
  const listFragment = document.createDocumentFragment();
  features.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add(`popup__feature--${item}`);
    listFragment.appendChild(listItem);
  });
  listFeatures.appendChild(listFragment);
};

const checkFillData = (firstData, element, selector, otherResult, secondData = 1) => {
  if (firstData && secondData) {
    return otherResult ? element.querySelector(selector).textContent = otherResult : element.querySelector(selector).textContent = firstData;
  }
  return element.querySelector(selector).classList.add('hidden');
};

const typeInform = {
  palace: {nameTranslate: 'Дворец', minPrice: 10000},
  flat: {nameTranslate: 'Квартира', minPrice: 1000},
  house: {nameTranslate: 'Дом', minPrice: 5000},
  bungalow: {nameTranslate: 'Бунгало', minPrice: 0},
  hotel: {nameTranslate: 'Отель', minPrice: 3000},
};

const createCustomPopup = ({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {

  const popupElement = similarAdTemplate.cloneNode(true);
  checkFillData(title, popupElement, '.popup__title');
  checkFillData(address, popupElement, '.popup__text--address');
  checkFillData(price, popupElement, '.popup__text--price', `${price  } ₽/ночь`);
  checkFillData(type, popupElement, '.popup__type', typeInform[type].nameTranslate);
  checkFillData(rooms, popupElement, '.popup__text--capacity', `${rooms  } комнаты для ${  guests  } гостей`, guests);
  checkFillData(checkin, popupElement, '.popup__text--time', `Заезд после ${ checkin}, выезд до ${ checkout}`, checkout);
  renderFeaturesAd(popupElement, features);
  checkFillData(description, popupElement, '.popup__description');
  renderPhotosAd(popupElement, photos);
  popupElement.querySelector('.popup__avatar').src = avatar;

  return popupElement;
};

export {typeInform, createCustomPopup};
