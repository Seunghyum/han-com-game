import { historyRouter, ROUTE_PATH } from '~src/router';
class ScorePage {
  render() {
    const div = document.createElement('div');
    const test = document.createElement('h1');
    test.innerText = 'this is Score page';
    const linkToScorePage = document.createElement('a');
    linkToScorePage.innerText = 'to Game Page';
    linkToScorePage.href = ROUTE_PATH.GamePage;
    linkToScorePage.onclick = (event) => {
      event.preventDefault();
      historyRouter(ROUTE_PATH.GamePage);
    };

    div.appendChild(test);
    div.appendChild(linkToScorePage);
    return div;
  }
}

export default ScorePage;
