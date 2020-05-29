import ticTacToe from '../../static/images/tic-tac-toe.png';
import dotGrid from '../../static/images/dot-grid.png';
import geometry from '../../static/images/geometry.png';
import foggyBirds from '../../static/images/foggy_birds.png';
import tinyGrid from '../../static/images/tiny_grid.png';
import watercolor from '../../static/images/watercolor.png';

export const UPDATE_INTERVAL = 15000;
export const SLICE_ID_INDEX = -7;

export const backgroundImages = [{
  name: 'Tic tac toe',
  url: ticTacToe,
}, {
  name: 'Dot grid',
  url: dotGrid,
}, {
  name: 'Geometry',
  url: geometry,
}, {
  name: 'Foggy bird',
  url: foggyBirds,
}, {
  name: 'Tiny grid',
  url: tinyGrid,
}, {
  name: 'Ware color',
  url: watercolor,
}];

export const colors = [{
  name: 'Красный',
  value: '#dc3545',
}, {
  name: 'Оранжевый',
  value: '#fd7e14',
}, {
  name: 'Голубой',
  value: '#007bff',
}, {
  name: 'Фиолетовый',
  value: '#6f42c1',
}, {
  name: 'Розовый',
  value: '#e83e8c',
}, {
  name: 'Бирюзовый',
  value: '#17a2b8',
}, {
  name: 'Светло-зелёный',
  value: '#03c978',
}];
