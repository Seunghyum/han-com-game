import GamePage from '~pages/GamePage';
import ScorePage from '~pages/ScorePage';

const $app = document.querySelector('#app');

export const ROUTE_PATH = {
  GamePage: '/',
  ScorePage: '/score',
};

const routes = {
  '/': () => new GamePage(),
  '/score': () => new ScorePage(),
};

const renderHTML = (route) => {
  $app.innerHTML = '';
  $app.appendChild(route.render());
};

export const initRoute = (pathName = window.location.pathname) => {
  renderHTML(getPath(pathName));

  window.onpopstate = () => {
    renderHTML(getPath(window.location.pathname));
  };
};

export function historyRouter(pathName = window.location.pathname) {
  window.history.pushState({}, '', window.location.origin + pathName);
  renderHTML(getPath(pathName));
}

const getPath = (pathName) => routes[pathName]();
