/** setInterval을 선언적으로 쓸 수 있게 wrapping 한 클래스 */
class Timer {
  /** @param {number} time setInterval에 설정할 interver time */
  constructor(time = 0) {
    this.state = {
      seconds: time,
      interval: null,
    };
  }

  /**
   * setInterval instance 생성 및 실행
   * @param {function} callback 실행할 콜백함수
   * @param {number} time setInterval에 설정할 interver time
   * @param {boolean} immediate 즉시 실행 여부. true 설정시 즉시 한번 실행함
   */
  start(callback, time, immediate = false) {
    if (time) {
      this.state.seconds = time;
    }
    if (immediate) {
      callback(this.state.seconds);
    }

    const interval = setInterval(() => {
      if (this.state.seconds === 0) clearInterval(this.state.interval);
      this.state.seconds -= 1;
      callback(this.state.seconds);
    }, 1000);
    this.state.interval = interval;
  }

  /**
   * clearInterval 실행
   * @param {Function} callback
   */
  finish(callback) {
    if (this.state.interval) clearInterval(this.state.interval);
    if (callback) callback();
  }

  /**
   * @returns {number} this.state.seconds 값 리턴
   */

  getSeconds() {
    return this.state.seconds;
  }
}

export default Timer;
