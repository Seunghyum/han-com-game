import { historyRouter, ROUTE_PATH } from '~src/router';
import { div, p, h1, a } from '~utils/vDom';

class GamePage {
  render() {
    return div([
      div([
        h1('this is Game page'),
        a(
          {
            href: ROUTE_PATH.ScorePage,
            onclick: (event) => {
              event.preventDefault();
              historyRouter(ROUTE_PATH.ScorePage);
            },
          },
          'to Score page'
        ),
      ]),
      div([
        p({
          className: 'question-board__text',
        }),
      ]),
    ]);
  }
}

export default GamePage;
