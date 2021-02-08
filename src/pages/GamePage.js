import { historyRouter, ROUTE_PATH } from '~src/router';
import { div, p, h1, a, span } from '~utils/vDom';

class GamePage {
  constructor() {
    this.isMount = false;
    this.$questionText = p({
      className: 'question-text',
    });
    this.$time = span({ className: 'question-board__time' });
    this.$score = span({ className: 'question-board__score' });
  }

  render() {
    const { $time, $score, $questionText } = this;

    $time.textContent = '10초';
    $score.textContent = '9점';
    $questionText.textContent = '문제 단어';

    if (!this.isMount) {
      this.isMount = true;

      return div({ className: 'container' }, [
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
          div({ className: 'question-board' }, [
            p({ className: 'question-board__time' }, `남은 시간 : `, $time),
            p({ className: 'question-board__score' }, `점수 : `, $score),
          ]),
          $questionText,
        ]),
      ]);
    }
  }
}

export default GamePage;
