import { historyRouter, ROUTE_PATH } from '~src/router';
import { div, p, h1, a, span, button } from '~utils/vDom';
import Timer from '~utils/timer';

class GamePage {
  constructor() {
    this.isStarted = false;
    this.isMount = false;
    this.timer = new Timer();
    this.$questionText = p({
      className: 'question-text',
    });
    this.$time = span({ className: 'question-board__time' });
    this.$score = span({ className: 'question-board__score' });
    this.$startBtn = button(
      {
        type: 'button',
        className: 'game-control__button',
      },
      '시작'
    );
  }

  handleStartBtn(self) {
    self.isStarted = !self.isStarted;
    if (self.isStarted) {
      self.$startBtn.textContent = '초기화';
      self.timer.start(10, (time) => {
        self.$time.textContent = time + '초';
      });
    } else {
      self.$startBtn.textContent = '시작';
      self.timer.finish();
    }
  }

  render() {
    const self = this;
    const { $time, $score, $questionText, $startBtn, handleStartBtn } = this;

    $time.textContent = '10초';
    $score.textContent = '9점';
    $questionText.textContent = '문제 단어';

    if (!this.isMount) {
      this.isMount = true;
      this.$startBtn.onclick = () => handleStartBtn(self);

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
        div({ className: 'game-control' }, $startBtn),
      ]);
    }
  }
}

export default GamePage;
