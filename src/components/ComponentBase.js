const domAttributes = new Set([
  'type',
  'value',
  'id',
  'className',
  'onkeyup',
  'onclick',
  'disabled',
  'placeholder',
]);

/**
 * ComponentBase의 주요 기능
 * 1. 여러가지 DOM Attribute, event를 정의하고 수정할 때 사용할 수 있는 render, update 매서드를 제공. 가독성을 높임.
 * 2. Dom Attribute의 이전 속성을 비교해 변경시에만 업데이트 함.
 */
class ComponentBase {
  constructor() {
    this.textContent = null;
    this.element = null;
  }

  /**
   * element의 classList에 className 추가
   * @param {string} className
   */
  addClass(className) {
    this.element.classList.add(className);
  }

  /**
   * element의 classList에서 className 제거
   * @param {string} className
   */
  removeClass(className) {
    this.element.classList.remove(className);
  }

  /**
   * update domAttribute and Element
   * @param {Props} props
   */
  updateDomAttribute(props = {}) {
    for (const key in props) {
      if (!domAttributes.has(key)) continue;
      const newValue = props[key];
      const oldValue = this.element[key];
      if (oldValue === newValue) continue;

      this.element[key] = newValue;
    }
  }

  /**
   * 엘리먼트에 focus() 함수 실행 여부
   * @param {boolean} focus
   */
  setFocus(focus) {
    if (!focus) return;

    setTimeout(() => this.element.focus(), 0);
  }

  /**
   * Node.textContent = textContent 값을 설정합니다.
   * @param {string} textContent
   */
  setInnerText(textContent) {
    if (textContent === undefined) return;
    if (textContent === this.textContent) return;

    this.textContent = textContent;
    this.element.textContent = textContent;
  }

  /**
   * value 값을 설정합니다.
   * @param {string} value
   */
  setValue(value) {
    if (value === undefined) return;
    if (value === this.element.value) return;

    this.element.value = value;
  }

  /**
   * update Dom Attributes, textContent and Element
   * @param {Props} props
   */
  update(props = {}) {
    this.updateDomAttribute(props);
    this.setFocus(props.focus);
    this.setInnerText(props.textContent);
    this.setValue(props.value);
  }

  /**
   * init and render element, update Dom Attributes, textContent and Element
   * @param {Props} props
   */
  render(props = {}) {
    if (props.element) this.element = props.element;
    this.update(props);
    return this.element;
  }
}

export default ComponentBase;

/**
 * @typedef {Object} Props
 * @property {string} type Element type 속성
 * @property {string} value Element value 속성
 * @property {string} id Element id 속성
 * @property {string} className Element class 속성
 * @property {Function} onkeyup Element onkeyup 속성
 * @property {Function} onclick Element onclick 속성
 * @property {boolean} disabled Element disabled 속성
 * @property {string} placeholder Element placeholder 속성
 * ....
 */
