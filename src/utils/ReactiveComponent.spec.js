import ReactiveComponent from './ReactiveComponent';
import { div } from './vDom';

const testId = 'test';
const initScore = 0;

class MockComponent extends ReactiveComponent {
  constructor() {
    super({
      state: {
        score: initScore,
      },
    });
    this.element = div({ id: testId }, initScore.toString());

    this.setEffect((score) => (this.element.textContent = score), ['score']);
  }

  updateScore(num) {
    this.setState({ score: num });
  }

  render() {
    return this.element;
  }
}

describe('ReactiveComponent 테스트', () => {
  describe('변수값을 추적하여 변경시 등록된 콜백이 실행된다. ', () => {
    const $MockComponent = new MockComponent();

    document.body.appendChild($MockComponent.render());
    let target = document.getElementById(testId);
    it('setEffect 함수에 정의한 콜백은 등록한 변수의 값이 수정될 경우 실행된다. - 1000', () => {
      $MockComponent.updateScore(1000);
      expect(target.textContent).toEqual('1000');
    });

    it('setEffect 함수에 정의한 콜백은 등록한 변수의 값이 수정될 경우 실행된다. - 9', () => {
      $MockComponent.updateScore(9);
      expect(target.textContent).toEqual('9');
    });
  });
});
