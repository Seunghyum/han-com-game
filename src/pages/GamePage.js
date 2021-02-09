import { historyRouter, ROUTE_PATH } from '~src/router';
import { div, p, span, button, input } from '~utils/vDom';
import Timer from '~utils/timer';
import { getFetch } from '~api/fetch';

import ComponentBase from '~src/components/ComponentBase';

const $WordInput = new ComponentBase();
const $QuestionText = new ComponentBase();
const $Time = new ComponentBase();
const $Score = new ComponentBase();

const initState = {
  questionText: '문제 단어',
  time: '-',
  score: '-',
};

class GamePage {
  constructor() {
    this.isStarted = false;
    this.timer = new Timer();
    this.questions = [];
    this.qIndex = 0;
    this.score = 0;
    this.allTimes = [];
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
    let averageTime;
    if (allTimes.length === 0) averageTime = 0;
    else averageTime = (sum / allTimes.length).toFixed(1);

    historyRouter(ROUTE_PATH.ScorePage, { score, averageTime });
  }

  setNextQuestion(qIndex) {
    this.qIndex = qIndex;
    this.timer.finish();
    $WordInput.update({ value: '', focus: true });
    if (this.questions.length - 1 < qIndex) return this.finishGame();

    const { text: question, second } = this.questions[qIndex];
    $QuestionText.update({ innerText: question });
    $Score.update({ innerText: this.score });

    this.timer.start(second, (time) => {
      $Time.update({ innerText: time });
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
      $WordInput.update({ value: '', disabled: true });
      $Score.update({ innerText: initState.score });
      $Time.update({ innerText: initState.time });
      this.timer.finish();
      $QuestionText.update({ innerText: initState.questionText });
    } else {
      this.$gameControlBtn.textContent = '초기화';
      $QuestionText.update({ innerText: 'Start!' });
      $WordInput.update({ disabled: false, focus: true });
      try {
        const result = await getFetch(
          'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
        );
        this.questions = result;
        this.score = result.length;
        $Score.update({ innerText: this.score });
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
      $WordInput.addClass('error');
      setTimeout(() => $WordInput.removeClass('error'), 500);
      return;
    }

    this.allTimes.push(second);
    this.setNextQuestion(this.qIndex + 1);
  }

  render() {
    const { $gameControlBtn, handleStartBtn, handleInputKeyUp } = this;

    $gameControlBtn.onclick = handleStartBtn.bind(this);

    return div(
      { className: 'container' },
      div({ className: 'content-wrapper' }, [
        div([
          div({ className: 'question-board' }, [
            p(
              { className: 'question-board__time' },
              `남은 시간 : `,
              $Time.render({
                element: span(),
                className: 'question-board__time',
                innerText: initState.time,
              }),
              '초'
            ),
            p(
              { className: 'question-board__score' },
              `점수 : `,
              $Score.render({
                element: span(),
                className: 'question-board__score',
                innerText: initState.score,
              }),
              '점'
            ),
          ]),
          $QuestionText.render({
            className: 'question-text',
            element: p(),
            innerText: initState.questionText,
          }),
        ]),
        div({ className: 'game-control' }, [
          $WordInput.render({
            disabled: true,
            placeholder: '입력',
            className: 'game-control__input',
            onkeyup: handleInputKeyUp.bind(this),
            element: input(),
          }),
          $gameControlBtn,
        ]),
      ])
    );
  }
}

export default GamePage;
