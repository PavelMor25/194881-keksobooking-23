import {resetForm, dataUserFormSubmit, mapFilterChange} from './form.js';
import {getData} from './api.js';
import {debounce} from './utils/debounce.js';
import {compareAd} from './filter.js';
import {resetMarker, generatePinMarker, markerGroup} from './map.js';

const resetButton = document.querySelector('.ad-form__reset');

getData((ad) => {
  generatePinMarker(ad);

  resetButton.addEventListener('click', (evt) =>{
    evt.preventDefault();
    resetForm(resetMarker);
    markerGroup.clearLayers();
    generatePinMarker(ad);
  });

  mapFilterChange(debounce(() => {
    markerGroup.clearLayers();
    const filteredAd = compareAd(ad);
    generatePinMarker(filteredAd);}));

  dataUserFormSubmit(() =>{
    resetForm(resetMarker);
    markerGroup.clearLayers();
    generatePinMarker(ad);
  });
});
