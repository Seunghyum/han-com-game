/**
 * State 값을 관찰하여 setEffect 매서드에 등록한 콜백을 실행시키기 위한 클래스
 */

class ReactiveComponentBase {
  constructor(props = {}) {
    const self = this;
    this.effects = {};
    this.state = new Proxy(props.state || {}, {
      set: function (state, key, value) {
        if (state[key] === undefined)
          throw Error(`${key} is not defined in state`);
        if (state[key] === value) return true;

        if (Array.isArray(self.effects[key])) {
          self.effects[key].forEach((event) => {
            event(value);
          });
        }

        state[key] = value;
        return true;
      },
    });
  }

  /**
   * 변수명을 받아 effects에 콜백을 등록하는 함수
   * @param {Function} callback
   * @param {string[]} targetValueNames
   */
  setEffect(callback, targetValueNames) {
    if (this.effects[targetValueNames] === undefined)
      this.effects[targetValueNames] = [];
    this.effects[targetValueNames].push(callback);
  }

  /**
   * this.state에 업데이트 할 속성값들을 object로 설정
   * @param {Object} obj
   */
  setState(obj) {
    for (const key in obj) {
      this.state[key] = obj[key];
    }
  }
}

export default ReactiveComponentBase;
