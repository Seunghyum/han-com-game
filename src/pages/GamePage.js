import { historyRouter, ROUTE_PATH } from '~src/router';
import { div, p, h1, a, span, button } from '~utils/vDom';
import Timer from '~utils/timer';
import { getFetch } from '~api/fetch';

class GamePage {
  constructor() {
    this.isStarted = false;
    this.isMount = false;
    this.timer = new Timer();
    this.questions = [];
    this.qIndex = 0;
    this.score = 0;
    this.$questionText = p({ className: 'question-text' });
    this.$time = span({ className: 'question-board__time' }, '-');
    this.$score = span({ className: 'question-board__score' }, '-');
    this.$startBtn = button(
      {
        type: 'button',
        className: 'game-control__button',
      },
      '시작'
    );
  }

  setNextQuestion(qIndex) {
    this.timer.finish();
    if (this.questions.length - 1 < qIndex)
      return historyRouter(ROUTE_PATH.ScorePage);

    const { text: question, second } = this.questions[qIndex];
    this.$questionText.textContent = question;
    this.$score.textContent = this.score;
    this.timer.start(second, (time) => {
      this.$time.textContent = time;
      if (!time) {
        this.score -= 1;
        this.setNextQuestion(qIndex + 1);
      }
    });
  }

  async handleStartBtn(self) {
    if (self.isStarted) {
      self.$startBtn.textContent = '시작';
      self.timer.finish();
    } else {
      self.$startBtn.textContent = '초기화';
      try {
        const result = await getFetch(
          'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
        );
        self.questions = result;
        self.score = result.length;
        self.$score.textContent = self.score;
        self.setNextQuestion(0);
      } catch (err) {
        alert('네트워크 연결이 안됩니다.');
      }
    }
    self.isStarted = !self.isStarted;
  }

  render() {
    const self = this;
    const { $time, $score, $questionText, $startBtn, handleStartBtn } = this;

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
            p(
              { className: 'question-board__time' },
              `남은 시간 : `,
              $time,
              '초'
            ),
            p({ className: 'question-board__score' }, `점수 : `, $score, '점'),
          ]),
          $questionText,
        ]),
        div({ className: 'game-control' }, $startBtn),
      ]);
    }
  }
}

export default GamePage;
