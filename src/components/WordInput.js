import { input } from '~utils/vDom';

class WordInput {
  constructor() {
    this.domAttribute = {
      value: '',
      onkeyup: null,
      disabled: false,
      id: null,
      className: 'game-control__input',
      placeholder: '입력',
    };
    this.domControl = {
      focus: false,
    };
    this.state = {
      isStarted: false,
    };
    this.element = null;
  }

  addClass(className) {
    this.element.classList.add(className);
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }

  update(props = {}) {
    for (const [key, value] of Object.entries(props)) {
      if (this.domAttribute[key] !== undefined) this.domAttribute[key] = value;
      else if (this.state[key] !== undefined) this.state[key] = value;
    }

    const newNode = input(
      this.domAttribute,
      this.isStarted ? '초기화' : '시작'
    );
    this.element.replaceWith(newNode);
    if (props.focus) {
      this.domControl.focus = props.focus;
    }
    if (this.domControl.focus) setTimeout(() => this.element.focus(), 0);

    this.element = newNode;
  }

  render(props = {}) {
    for (const [key, value] of Object.entries(props)) {
      if (this.domAttribute[key] !== undefined) this.domAttribute[key] = value;
      else if (this.state[key] !== undefined) this.state[key] = value;
    }

    this.element = input(this.domAttribute, this.isStarted ? '초기화' : '시작');

    if (props.focus) {
      this.domControl.focus = props.focus;
    }
    if (this.domControl.focus) setTimeout(() => this.element.focus(), 0);

    return this.element;
  }
}

export default WordInput;
