class Timer {
  constructor(time = 0) {
    this.state = {
      seconds: time,
      interval: null,
    };
  }

  start(time, callback) {
    if (time) {
      this.state.seconds = time;
      callback(this.state.seconds);
    }
    setTimeout(() => {
      this.state.seconds -= 1;
      callback(this.state.seconds);
    }, 1000);

    const interval = setInterval(() => {
      if (this.state.seconds === 0) clearInterval(this.state.interval);
      callback(this.state.seconds);
      this.state.seconds -= 1;
    }, 1000);
    this.state.interval = interval;
  }

  finish() {
    if (this.state.interval) clearInterval(this.state.interval);
  }
}

export default Timer;
