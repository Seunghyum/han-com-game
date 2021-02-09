class ComponentBase {
  constructor() {
    this.domAttribute = {
      value: null,
      onkeyup: null,
      disabled: false,
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
    for (const [key, value] of Object.entries(props)) {
      if (this.domAttribute[key] !== undefined) this.domAttribute[key] = value;
    }
  }

  applyDomAttribute() {
    for (const [key, value] of Object.entries(this.domAttribute)) {
      const attr = this.domAttribute[key];
      if (attr !== undefined && attr !== null) this.element[key] = value;
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
    this.applyDomAttribute();
    this.setFocus(props.focus);
    this.setInnerText(props.innerText);
  }

  render(props = {}) {
    this.updateDomAttribute(props);
    this.element = props.element;
    this.applyDomAttribute();
    this.setFocus(props.focus);
    this.setInnerText(props.innerText);
    return this.element;
  }
}

export default ComponentBase;
