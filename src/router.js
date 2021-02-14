import GamePage from '~pages/GamePage';
import ScorePage from '~pages/ScorePage';

const $app = document.querySelector('#app');

export const ROUTE_PATH = {
  GamePage: '/',
  ScorePage: '/score',
};

const routesMemo = {
  '/': null,
  '/score': null,
};

const routeMap = {
  '/': () => new GamePage(),
  '/score': () => new ScorePage(),
};

const renderHTML = (route) => {
  $app.innerHTML = '';
  const renderNode = route.render();
  if (renderNode) $app.appendChild(renderNode);
};

export const initRoute = (pathName = window.location.pathname) => {
  renderHTML(getPathLazy(pathName));

  window.onpopstate = () => {
    renderHTML(getPathLazy(window.location.pathname));
  };
};

export function historyRouter(pathName = window.location.pathname, data) {
  window.history.pushState(data, pathName, window.location.origin + pathName);
  renderHTML(getPathLazy(pathName));
}

function getPathLazy(pathName) {
  if (!routesMemo[pathName]) routesMemo[pathName] = routeMap[pathName]();
  return routesMemo[pathName];
}
