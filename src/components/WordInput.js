import ComponentBase from '~components/base/ComponentBase';
import { input } from '~utils/vDom';

class WordInput extends ComponentBase {
  constructor() {
    super();
    this.isWrong = false;
    this.isClean = false;
    this.isFocus = false;
    this.element = input({
      placeholder: '입력',
      className: 'game-control__input',
    });
  }

  /**
   * 상태값 별로 분기처리된 로직을 수행하기 위한 상태 업데이트 로직
   * @param {updateStateProp}
   */
  updateState({ isWrong, isClean, isFocus }) {
    if (isWrong) {
      this.addClass('error');
      this.updateDomAttribute({ value: '' });
      setTimeout(() => this.removeClass('error'), 500);
    }

    if (isClean) {
      this.updateDomAttribute({ disabled: false, value: '' });
    }

    if (isFocus) {
      this.setFocus(true);
    }
  }
}

export default WordInput;

/**
 * @typedef {Object} updateStateProp
 * @property {boolean} isWrong
 * @property {boolean} isClean
 * @property {boolean} isFocus
 */
