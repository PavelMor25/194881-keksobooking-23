import './utils.js';
import './generate-similar-ads.js';
import {diactivateForm, activateForm} from './form.js';

diactivateForm();

const map = L.map('map-canvas').on('load',() => {activateForm();}).setView({lat: 35.6894, lng: 139.692}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
