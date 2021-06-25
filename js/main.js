import './utils.js';
import {createCustomPopup, similarAds} from './generate-similar-ads.js';
import {diactivateForm, activateForm, adAddressInput} from './form.js';

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

const MainPinmarker = L.marker(
  {
    lat: 35.6894,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

MainPinmarker.addTo(map);

MainPinmarker.on('moveend', (evt) => {
  adAddressInput.value = evt.target.getLatLng();
});

similarAds.forEach((aD) => {
  const {lat, lng} = aD['location'];

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

  marker.addTo(map).bindPopup(createCustomPopup(aD)),
  {
    keepInView: true,
  };
});
