import { historyRouter, ROUTE_PATH } from '~src/router';
import { div, p, span, button } from '~utils/vDom';
import Timer from '~utils/timer';
import { getFetch } from '~api/fetch';

import WordInputClass from '~components/WordInput';

const WordInput = new WordInputClass();

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
    this.allTimes = [];
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
  }

  finishGame() {
    const { score, allTimes } = this;
    const sum = allTimes.reduce((a, b) => a + b, 0);
    const averageTime = (sum / allTimes.length).toFixed(1);

    historyRouter(ROUTE_PATH.ScorePage, { score, averageTime });
  }

  setNextQuestion(qIndex) {
    this.qIndex = qIndex;
    this.timer.finish();
    WordInput.update({ value: '', focus: true });
    if (this.questions.length - 1 < qIndex) return this.finishGame();

    const { text: question, second } = this.questions[qIndex];
    this.$questionText.textContent = question;

    this.$score.textContent = this.score;
    this.timer.start(second, (time) => {
      if (this.isStarted) this.$time.textContent = time;
      if (!time) {
        this.score -= 1;
        this.setNextQuestion(qIndex + 1);
      }
    });
  }

  async handleStartBtn() {
    if (this.isStarted) {
      this.timer.finish();
      this.$gameControlBtn.textContent = '시작';
      WordInput.update({ value: '', disabled: true });
      this.$score.textContent = initState.$score;
      this.$time.textContent = initState.$time;
      this.$questionText.textContent = initState.$questionText;
    } else {
      this.$gameControlBtn.textContent = '초기화';
      this.$questionText.textContent = 'Start!';
      WordInput.update({ disabled: false, focus: true });
      try {
        const result = await getFetch(
          'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
        );
        this.questions = result;
        this.score = result.length;
        this.$score.textContent = this.score;
        this.setNextQuestion(0);
      } catch (err) {
        throw new Error(err);
      }
    }
    this.isStarted = !this.isStarted;
  }

  handleInputKeyUp(event) {
    if (event.key !== 'Enter') return;
    const { text: question, second } = this.questions[this.qIndex];
    if (event.target.value !== question) {
      WordInput.addClass('error');
      setTimeout(() => WordInput.removeClass('error'), 500);
      return;
    }

    this.allTimes.push(second);
    this.setNextQuestion(this.qIndex + 1);
  }

  render() {
    const {
      $time,
      $score,
      $questionText,
      $gameControlBtn,
      handleStartBtn,
      handleInputKeyUp,
    } = this;

    $gameControlBtn.onclick = handleStartBtn.bind(this);

    return div(
      { className: 'container' },
      div({ className: 'content-wrapper' }, [
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
        div({ className: 'game-control' }, [
          WordInput.render({
            disabled: true,
            isStarted: this.isStarted,
            onkeyup: handleInputKeyUp.bind(this),
          }),
          $gameControlBtn,
        ]),
      ])
    );
  }
}

export default GamePage;
