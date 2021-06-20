const adForm = document.querySelector('.ad-form');
const adFormElement = adForm.querySelectorAll('.ad-form__element');
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

export {diactivateForm, activateForm};
