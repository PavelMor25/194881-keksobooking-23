import {activateForm, diactivateForm, adAddressInput} from './form.js';
import {createCustomPopup} from './generate-similar-ads.js';

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

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  adAddressInput.value = evt.target.getLatLng();
});

const markerGroup = L.layerGroup().addTo(map);

const generatePinMarker = (ad) => {
  ad.slice(0, 10).forEach((element) => {
    const {lat, lng} = element['location'];

    const pinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker({
      lat,
      lng,
    },
    {
      pinIcon,
    });

    marker.addTo(markerGroup).bindPopup(createCustomPopup(element)),
    {
      keepInView: true,
    };
  });
};

export {resetMarker, generatePinMarker, markerGroup};
