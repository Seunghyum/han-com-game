/**
 * 변수에 반응하여 등록된 콜백을 실행하는 반응형 컴포넌트를 사용할때 쓸 클래스 정의
 */

class ReactiveComponent {
  constructor(props) {
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
  setEffect(callback, targetValueNames = []) {
    targetValueNames.forEach((name) => {
      if (this.effects[name] === undefined) this.effects[name] = [];
      this.effects[name].push(callback);
    });
  }

  /**
   * this.state에 업데이트 할 속성값들을 object로 설정
   * @param {Object} obj
   */
  setState(obj) {
    for (const key in obj) {
      if (this.state[key] === undefined)
        throw Error(`${key} is not defined in this.state`);
      this.state[key] = obj[key];
    }
  }
}

export default ReactiveComponent;
