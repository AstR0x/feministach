import ticTacToe from '../../static/images/tic-tac-toe.png';
import dotGrid from '../../static/images/dot-grid.png';
import geometry from '../../static/images/geometry.png';
import foggyBirds from '../../static/images/foggy_birds.png';
import tinyGrid from '../../static/images/tiny_grid.png';
import watercolor from '../../static/images/watercolor.png';
import copybook from '../../static/images/copybook.jpg';

export const UPDATE_INTERVAL = 15000;
export const SLICE_ID_INDEX = -7;

export const backgroundImages = [
  {
    name: 'Классический',
    url: null,
  },
  {
    name: 'Крестики-нолики',
    url: ticTacToe,
  },
  {
    name: 'Сетка точек',
    url: dotGrid,
  },
  {
    name: 'Геометрия',
    url: geometry,
  },
  {
    name: 'Туманная птица',
    url: foggyBirds,
  },
  {
    name: 'Маленькая сетка',
    url: tinyGrid,
  },
  {
    name: 'Акварель',
    url: watercolor,
  },
  {
    name: 'Тетрадь',
    url: copybook,
  },
];

export const colors = [{
  name: 'Классический',
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
