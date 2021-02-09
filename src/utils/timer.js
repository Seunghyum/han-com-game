class Timer {
  constructor(time = 0) {
    this.state = {
      seconds: time,
      interval: null,
    };
  }

  start(callback, time, Immediate = false) {
    if (time) {
      this.state.seconds = time;
    }
    if (Immediate) {
      callback(this.state.seconds);
    }

    const interval = setInterval(() => {
      if (this.state.seconds === 0) clearInterval(this.state.interval);
      this.state.seconds -= 1;
      callback(this.state.seconds);
    }, 1000);
    this.state.interval = interval;
  }

  finish() {
    if (this.state.interval) clearInterval(this.state.interval);
  }
}

export default Timer;
