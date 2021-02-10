class ComponentBase {
  constructor() {
    this.domAttribute = {
      type: null,
      value: null,
      onkeyup: null,
      onclick: null,
      disabled: null,
      id: null,
      className: null,
      placeholder: null,
    };
    this.domControl = {
      focus: false,
      innerText: null,
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
    for (const attr in this.domAttribute) {
      const newValue = props[attr];
      if (props[attr] === undefined) continue;
      if (attr == undefined)
        throw new Error(`${attr} is not defined in ComponentBase class`);
      if (attr === newValue) continue;

      this.domAttribute[attr] = newValue;
      this.element[attr] = newValue;
    }
  }

  setFocus(focus) {
    if (focus) {
      this.domControl.focus = focus;
    }
    if (this.domControl.focus) setTimeout(() => this.element.focus(), 0);
  }

  setInnerText(innerText) {
    if (innerText) {
      this.domControl.innerText = innerText;
    }
    if (this.domControl.innerText)
      this.element.textContent = this.domControl.innerText;
  }

  update(props = {}) {
    this.updateDomAttribute(props);
    this.setFocus(props.focus);
    this.setInnerText(props.innerText);
  }

  render(props = {}) {
    this.element = props.element;
    this.updateDomAttribute(props);
    this.setFocus(props.focus);
    this.setInnerText(props.innerText);
    return this.element;
  }
}

export default ComponentBase;
