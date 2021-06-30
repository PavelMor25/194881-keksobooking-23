import {showAlert} from './utils.js';
import {createCustomPopup} from './generate-similar-ads.js';
import {diactivateForm, activateForm, adAddressInput, resetForm, dataUserFormSubmit} from './form.js';
import {getData} from './api.js';

const resetButton = document.querySelector('.ad-form__reset');

diactivateForm();

const map = L.map('map-canvas').on('load',() => {activateForm();}).setView({lat: 35.6894, lng: 139.692}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6894,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const resetMarker = () => mainPinMarker.setLatLng({lat: 35.6894, lng: 139.692});

resetButton.addEventListener('click', (evt) =>{
  evt.preventDefault();
  resetForm(resetMarker);
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  adAddressInput.value = evt.target.getLatLng();
});

const generatePinMarker = (ad) =>{
  ad.forEach((element) => {
    const {lat, lng} = element['location'];

    const pinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });

    const marker = L.marker({
      lat,
      lng,
    },
    {
      pinIcon,
    });

    marker.addTo(map).bindPopup(createCustomPopup(element)),
    {
      keepInView: true,
    };
  });
};

getData(generatePinMarker, showAlert);
dataUserFormSubmit(resetMarker);
