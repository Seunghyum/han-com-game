import { historyRouter, ROUTE_PATH } from '~src/router';
import { div, p, h1, a, span, button, input } from '~utils/vDom';
import Timer from '~utils/timer';
import { getFetch } from '~api/fetch';

const initState = {
  $questionText: '문제 단어',
  $time: '-',
  $score: '-',
};

class GamePage {
  constructor() {
    this.isStarted = false;
    this.timer = new Timer();
    this.questions = [];
    this.qIndex = 0;
    this.score = 0;
    this.$questionText = p(
      { className: 'question-text' },
      initState.$questionText
    );
    this.$time = span({ className: 'question-board__time' }, initState.$time);
    this.$score = span(
      { className: 'question-board__score' },
      initState.$score
    );
    this.$gameControlBtn = button(
      {
        type: 'button',
        className: 'game-control__button',
      },
      '시작'
    );
    this.$gameInput = input({
      type: 'test',
      className: 'game-control__input',
      placeholder: '입력',
    });
  }

  setNextQuestion(qIndex) {
    this.qIndex = qIndex;
    this.timer.finish();
    this.$gameInput.value = '';
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

  async handleStartBtn() {
    if (this.isStarted) {
      this.$gameControlBtn.textContent = '시작';
      this.timer.finish();
      this.$gameInput.value = '';
      this.$score.textContent = initState.$score;
      this.$time.textContent = initState.$time;
      this.$questionText.textContent = initState.$questionText;
    } else {
      this.$gameControlBtn.textContent = '초기화';
      try {
        const result = await getFetch(
          'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
        );
        this.questions = result;
        this.score = result.length;
        this.$score.textContent = this.score;
        this.setNextQuestion(0);
      } catch (err) {
        alert('네트워크 연결이 안됩니다.');
      }
    }
    this.isStarted = !this.isStarted;
  }

  handleInputKeyUp(event) {
    if (event.key !== 'Enter') return;
    if (event.target.value !== this.questions[this.qIndex].text) return;
    this.setNextQuestion(this.qIndex + 1);
  }

  render() {
    const {
      $time,
      $score,
      $questionText,
      $gameControlBtn,
      $gameInput,
      handleStartBtn,
      handleInputKeyUp,
    } = this;

    $gameControlBtn.onclick = handleStartBtn.bind(this);
    $gameInput.onkeyup = handleInputKeyUp.bind(this);

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
          p({ className: 'question-board__time' }, `남은 시간 : `, $time, '초'),
          p({ className: 'question-board__score' }, `점수 : `, $score, '점'),
        ]),
        $questionText,
      ]),
      div({ className: 'game-control' }, [$gameInput, $gameControlBtn]),
    ]);
  }
}

export default GamePage;
