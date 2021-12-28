import { sayHi } from './components/component.js';
import './styles/styles.scss';
import logo from './assets/img/webpack-logo.png';

sayHi();

document.getElementById(
    'app'
).innerHTML = `<img src="${logo}" alt="webpack logo">`;
