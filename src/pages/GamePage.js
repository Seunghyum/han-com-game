import { historyRouter, ROUTE_PATH } from '~src/router';
import { div, p, span } from '~utils/vDom';
import Timer from '~utils/timer';
import { getAverage } from '~utils/getAverage';
import ReactiveComponentBase from '~src/components/base/ReactiveComponentBase';

import { getFetch } from '~api/fetch';

import ComponentBase from '~src/components/base/ComponentBase';
import WordInput from '~components/WordInput';
import GameControlButton from '~components/GameControlButton';

const $QuestionText = new ComponentBase();
const $Time = new ComponentBase();
const $Score = new ComponentBase();

const $WordInput = new WordInput();
const $GameControlButton = new GameControlButton();

const initState = {
  questionText: '문제 단어',
  time: '-',
  score: '-',
};

class GamePage extends ReactiveComponentBase {
  constructor() {
    super({
      state: {
        isStart: false,
        score: initState.score,
        time: initState.time,
        questionText: initState.questionText,
      },
    });
    this.timer = new Timer();
    this.questions = [];
    this.qIndex = 0;
    this.allTimes = [];

    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.handleStartBtn = this.handleStartBtn.bind(this);

    this.initEffects();
  }

  initEffects() {
    this.setEffect((isStart) => $GameControlButton.updateState({ isStart }), [
      'isStart',
    ]);
    this.setEffect((score) => $Score.update({ textContent: score }), ['score']);
    this.setEffect((time) => $Time.update({ textContent: time }), ['time']);
    this.setEffect(
      (questionText) => $QuestionText.update({ textContent: questionText }),
      ['questionText'],
    );
  }

  finishGame() {
    const { allTimes } = this;
    const { score } = this.state;
    const averageTime = getAverage(allTimes);
    this.initGameSetting();
    historyRouter(ROUTE_PATH.ScorePage, { score, averageTime });
  }

  setNextQuestion(qIndex) {
    this.qIndex = qIndex;
    this.timer.finish();
    $WordInput.updateState({ isClean: true, isFocus: true });
    if (this.questions.length - 1 < qIndex) return this.finishGame();

    const { text: questionText, second } = this.questions[qIndex];
    this.setState({ questionText });
    this.timer.start(
      (time) => {
        if (!time) {
          let { score } = this.state;
          score--;
          this.setState({ score });
          this.setNextQuestion(qIndex + 1);
        } else this.setState({ time });
      },
      second,
      true,
    );
  }

  initGameSetting() {
    this.timer.finish(() => {
      this.setState({
        ...initState,
        isStart: false,
      });
    });
    $WordInput.updateState({ isClean: true });
  }

  async handleStartBtn() {
    if (this.state.isStart) this.initGameSetting();
    else {
      this.setState({ isStart: true, questionText: 'Start!' });
      try {
        const result = await getFetch(
          'https://my-json-server.typicode.com/kakaopay-fe/resources/words',
        );
        this.questions = result;
        this.setState({ score: result.length });
        this.setNextQuestion(0);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  handleInputKeyUp(event) {
    if (event.key !== 'Enter') return;
    const { text: question, second } = this.questions[this.qIndex];
    if (event.target.value !== question)
      return $WordInput.updateState({ isWrong: true });
    const remainSeconds = this.timer.getSeconds();

    this.allTimes.push(second - remainSeconds);
    this.setNextQuestion(this.qIndex + 1);
  }

  render() {
    const { handleStartBtn, handleInputKeyUp } = this;

    return div(
      { className: 'container' },
      div({ className: 'content-wrapper' }, [
        div([
          div({ className: 'question-board' }, [
            p(
              { className: 'question-board__time' },
              `남은 시간 : `,
              $Time.render({
                element: span(this.state.time),
                className: 'question-board__time-number',
              }),
              ' 초',
            ),
            p(
              { className: 'question-board__score' },
              `점수 : `,
              $Score.render({
                element: span(this.state.score),
                className: 'question-board__score-number',
              }),
              ' 점',
            ),
          ]),
          $QuestionText.render({
            className: 'question-text',
            element: p(this.state.questionText),
          }),
        ]),
        div({ className: 'game-control' }, [
          div(
            $WordInput.render({
              disabled: !this.state.isStart,
              onkeyup: handleInputKeyUp,
            }),
          ),
          $GameControlButton.render({
            onclick: handleStartBtn,
          }),
        ]),
      ]),
    );
  }
}

export default GamePage;
