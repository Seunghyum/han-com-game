class ReactiveComponent {
  constructor(props) {
    const self = this;
    this.effects = {};
    this.state = new Proxy(props.state || {}, {
      set: function (state, key, value) {
        if (state[key] === undefined)
          throw Error(`${key} is not defined in state`);
        if (state[key] === value) return;

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

  setEffect(callback, targetValueNames = []) {
    targetValueNames.forEach((name) => {
      if (this.effects[name] === undefined) this.effects[name] = [];
      this.effects[name].push(callback);
    });
  }

  setState(obj) {
    for (const key in obj) {
      if (this.state[key] === undefined)
        throw Error(`${key} is not defined in this.state`);
      this.state[key] = obj[key];
    }
  }
}

export default ReactiveComponent;
