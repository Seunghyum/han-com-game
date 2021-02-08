import GameStartPage from './pages/GamePage';
import GameEndPage from './pages/ScorePage';

const $app = document.querySelector('#app');

const routes = {
  '/': () => new GameStartPage(),
  '/score': () => new GameEndPage(),
};

const renderHTML = (route) => {
  $app.innerHTML = '';
  $app.appendChild(route.render());
};

export const initRoute = () => {
  renderHTML(getPath(window.location.pathname));
};

export function historyRouter(state, pathName) {
  window.history.pushState(state, pathName, window.location.origin + pathName);
  renderHTML(routes[pathName]);
}

const getPath = (path) => routes[path]();
