class InputBase {
  constructor() {
    this.domAttribute = {
      value: '',
      onkeyup: null,
      disabled: false,
      id: null,
      className: null,
      placeholder: null,
    };
    this.domControl = {
      focus: false,
    };
    this.element = null;
  }

  addClass(className) {
    this.element.classList.add(className);
  }

  removeClass(className) {
    this.element.classList.remove(className);
  }

  updateDomAttribute(props = {}) {
    for (const [key, value] of Object.entries(props)) {
      if (this.domAttribute[key] !== undefined) this.domAttribute[key] = value;
    }
  }

  applyDomAttribute() {
    for (const [key, value] of Object.entries(this.domAttribute)) {
      this.element[key] = value;
    }
  }

  setFocus(focus) {
    if (focus) {
      this.domControl.focus = focus;
    }
    if (this.domControl.focus) setTimeout(() => this.element.focus(), 0);
  }

  update(props = {}) {
    this.updateDomAttribute(props);
    this.applyDomAttribute();
    this.setFocus(props.focus);
  }

  render(props = {}) {
    this.updateDomAttribute(props);
    this.element = props.element;
    this.applyDomAttribute();
    this.setFocus(props.focus);
    return this.element;
  }
}

export default InputBase;
