import ComponentBase from './ComponentBase';
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
