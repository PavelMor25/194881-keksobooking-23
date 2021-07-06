import {isEscEvent} from './utils.js';
import {typeInform} from './generate-similar-ads.js';
import {sendData} from './api.js';

const adForm = document.querySelector('.ad-form');
const adFormElement = adForm.querySelectorAll('.ad-form__element');
const adTitleInput = adForm.querySelector('#title');
const adTypeSelect = adForm.querySelector('#type');
const adPriceInput = adForm.querySelector('#price');
const adRoomNumberSelect = adForm.querySelector('#room_number');
const adCapacitySelect = adForm.querySelector('#capacity');
const adCapacitySelectOption = adCapacitySelect.querySelectorAll('option');
const adTimeInSelect = adForm.querySelector('#timein');
const adTimeOutSelect = adForm.querySelector('#timeout');
const adAddressInput = adForm.querySelector('#address');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');
const mapFiltersFormFeatures = mapFiltersForm.querySelector('.map__features');

const diactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElement.forEach((item) => item.setAttribute('disabled', 'disabled'));
  mapFiltersForm.classList.add('ad-form--disabled');
  mapFiltersFormElements.forEach((item) => item.setAttribute('disabled', 'disabled'));
  mapFiltersFormFeatures.setAttribute('disabled', 'disabled');
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElement.forEach((item) => item.removeAttribute('disabled', null));
  mapFiltersForm.classList.remove('ad-form--disabled');
  mapFiltersFormElements.forEach((item) => item.removeAttribute('disabled', null));
  mapFiltersFormFeatures.removeAttribute('disabled', null);
};


const RoomsValue = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const onRoomChange = (evt) => {
  adCapacitySelectOption.forEach((option) => {
    option.disabled = true;
  });

  RoomsValue[evt.value].forEach((seatsAmount) => {
    adCapacitySelectOption.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const mapFilterChange = (cb) => {
  mapFiltersForm.addEventListener('change', () => {

    cb();
  });
};

adTitleInput.addEventListener('input', () => {
  const valueLength = adTitleInput.value.length;
  const minLengthTitle = adTitleInput.getAttribute('minlength');
  const maxLengthTitle = adTitleInput.getAttribute('maxlength');

  if (valueLength < minLengthTitle) {
    adTitleInput.setCustomValidity(`Ещё ${ minLengthTitle - valueLength}`);
  } else if (valueLength > maxLengthTitle) {
    adTitleInput.setCustomValidity(`Удалите лишние ${valueLength - maxLengthTitle} симв.`);
  } else {
    adTitleInput.setCustomValidity('');
  }

  adTitleInput.reportValidity();
});

adTypeSelect.addEventListener('change', (evt) => {
  adPriceInput.setAttribute('placeholder', typeInform[evt.target.value].minPrice);
  adPriceInput.setAttribute('min', typeInform[evt.target.value].minPrice);
});

adPriceInput.addEventListener('input', () =>{
  const valueInput = adPriceInput.value;
  const minPrice = adPriceInput.getAttribute('min');
  const maxPrice = adPriceInput.getAttribute('max');

  if (valueInput < minPrice) {
    adPriceInput.setCustomValidity(`Минимальная цена ${ minPrice}`);
  } else if (valueInput > maxPrice) {
    adPriceInput.setCustomValidity(`Максимальная цена ${ maxPrice}`);
  } else {
    adPriceInput.setCustomValidity('');
  }

  adPriceInput.reportValidity();
});

adTimeInSelect.addEventListener('change', () => {
  adTimeOutSelect.value = adTimeInSelect.value;
});

adTimeOutSelect.addEventListener('change', () => {
  adTimeInSelect.value = adTimeOutSelect.value;
});

onRoomChange(adRoomNumberSelect);

adRoomNumberSelect.addEventListener('change', (evt) =>{
  onRoomChange(evt.target);
});

const createMessage = (message) => {
  const messageTemplate = document.querySelector(`#${message}`).content.querySelector(`.${message}`);
  const element = messageTemplate.cloneNode(true);
  document.body.appendChild(element);

  const onMessageEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      element.remove();
      closeMessage();
    }
  };

  const openMessage = () => document.addEventListener('keydown', onMessageEscKeyDown);

  const closeMessage = () => document.removeEventListener('keydown', onMessageEscKeyDown);

  openMessage();

  element.addEventListener('click', () => {
    element.remove();
    closeMessage();
  });

};

const resetForm = (resetMarker) => {
  adForm.reset();
  mapFiltersForm.reset();
  onRoomChange(adRoomNumberSelect);
  resetMarker();
};

const dataUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {onSuccess(); createMessage('success');},
      () => createMessage('error'),
      new FormData(evt.target),
    );
  });
};

export {diactivateForm, activateForm, adAddressInput, dataUserFormSubmit, resetForm, mapFilterChange};
