import { historyRouter, ROUTE_PATH } from '../router';

class GamePage {
  render() {
    const div = document.createElement('div');
    const test = document.createElement('h1');
    test.innerText = 'this is Game page';
    const linkToScorePage = document.createElement('a');
    linkToScorePage.innerText = 'to Score page';
    linkToScorePage.href = ROUTE_PATH.ScorePage;
    linkToScorePage.onclick = (event) => {
      event.preventDefault();
      historyRouter(ROUTE_PATH.ScorePage);
    };

    div.appendChild(test);
    div.appendChild(linkToScorePage);
    return div;
  }
}

export default GamePage;
