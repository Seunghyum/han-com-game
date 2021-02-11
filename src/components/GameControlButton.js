import ComponentBase from './ComponentBase';
import { button } from '~utils/vDom';

class GameControlButton extends ComponentBase {
  constructor() {
    super();
    this.isStart = false;
    this.element = button({
      type: 'button',
      className: 'game-control__button',
      textContent: '시작',
    });
  }

  updateState({ isStart }) {
    this.update({ textContent: isStart ? '초기화' : '시작' });
  }
}

export default GameControlButton;
