import {activateForm, fillAddressInput} from './form.js';
import {createCustomPopup} from './generate-similar-ads.js';

const START_LAT = 35.6894;
const START_LNG = 139.692;

const setStartAdress = () => fillAddressInput(START_LAT, START_LNG);

const map = L.map('map-canvas')
  .on('load',() => {
    activateForm();
    setStartAdress();
  })
  .setView({lat: START_LAT, lng: START_LNG}, 10);

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
    lat: START_LAT,
    lng: START_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const resetMarker = () => mainPinMarker.setLatLng({lat: START_LAT, lng: START_LNG});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coordinate = evt.target.getLatLng();
  fillAddressInput(coordinate.lat, coordinate.lng);
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

export {resetMarker, generatePinMarker, markerGroup, setStartAdress};
