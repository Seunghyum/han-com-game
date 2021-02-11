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

  /**
   * 상태값 별로 분기처리된 로직을 수행하기 위한 상태 업데이트 로직
   * @param {updateStateProp}
   */
  updateState({ isStart }) {
    this.update({ textContent: isStart ? '초기화' : '시작' });
  }
}

export default GameControlButton;

/**
 * @typedef {Object} updateStateProp
 * @property {boolean} isWrong
 * @property {boolean} isClean
 * @property {boolean} isFocus
 */
