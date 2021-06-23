import {typeInform} from './generate-similar-ads.js';

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

  RoomsValue[evt.target.value].forEach((seatsAmount) => {
    adCapacitySelectOption.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const onRoomStart = (item) => {
  adCapacitySelectOption.forEach((option) => {
    option.disabled = true;
  });

  RoomsValue[item.value].forEach((seatsAmount) => {
    adCapacitySelectOption.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });

  if (!RoomsValue[item.value].includes(Number(adCapacitySelect.value))) {
    adCapacitySelect.value = adRoomNumberSelect.value;
  }
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

onRoomStart(adRoomNumberSelect);

adRoomNumberSelect.addEventListener('change', (evt) =>{
  onRoomChange(evt);
});

export {diactivateForm, activateForm};
