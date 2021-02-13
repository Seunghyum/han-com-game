import ReactiveComponentBase from './ReactiveComponentBase';
import { div } from '~utils/vDom';

describe('ReactiveComponentBase 테스트', () => {
  describe('default ', () => {
    const $MockComponent = new ReactiveComponentBase({
      state: {
        text: 'hello world',
      },
    });

    it('setState 함수로 this.state의 객체 속성값이 변경될 수 있다.', () => {
      $MockComponent.setState({ text: '111' });
      expect($MockComponent.state.text).toEqual('111');
    });

    it('setEffect 함수에 정의한 콜백은 등록한 변수의 값이 수정될 경우 실행된다.', () => {
      const alert = jest.fn();
      $MockComponent.setEffect(() => alert(), ['text']);
      $MockComponent.setState({ text: 'alert' });

      expect(alert).toBeCalled();
    });

    it('setState 함수로 수정시 해당 객체의 속성값이 this.state에 없을 경우 에러가 난다', () => {
      expect(() => $MockComponent.setState({ notExist: 'test' })).toThrow(
        'notExist is not defined in state'
      );
    });
  });

  describe('상속 테스트 ', () => {
    const testId = 'test';
    const initScore = 0;

    class MockComponent extends ReactiveComponentBase {
      constructor() {
        super({
          state: {
            score: initScore,
          },
        });
        this.element = div({ id: testId }, initScore.toString());

        this.setEffect((score) => (this.element.textContent = score), [
          'score',
        ]);
      }

      updateScore(num) {
        this.setState({ score: num });
      }

      render() {
        return this.element;
      }
    }

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
