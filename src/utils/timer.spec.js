import Timer from './timer';

jest.useFakeTimers();

describe('Timer - setInterval 테스트', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('start(..., immediate=true)', () => {
    it('실행하자마자 콜백을 1회 실행한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, true);
      jest.advanceTimersByTime(0);

      expect(callback).toBeCalledTimes(1);
      timer.finish();
    });

    it('1초 뒤까지 콜백을 2번 호출한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, true);
      jest.advanceTimersByTime(1000);

      expect(callback).toBeCalledTimes(2);
      timer.finish();
    });

    it('3초 뒤까지 콜백을 4번 호출한다.', () => {
      const callback = jest.fn();

      const timer = new Timer();
      timer.start(callback, 10, true);

      jest.advanceTimersByTime(3000);

      expect(callback).toBeCalledTimes(4);
      timer.finish();
    });
  });

  describe('start(..., immediate=false)', () => {
    it('실행하자마자 콜백을 0회 실행한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, false);
      jest.advanceTimersByTime(0);

      expect(callback).toBeCalledTimes(0);
      timer.finish();
    });

    it('1초 뒤까지 콜백을 1번 호출한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, false);
      jest.advanceTimersByTime(1000);

      expect(callback).toBeCalledTimes(1);
      timer.finish();
    });

    it('3초 뒤까지 콜백을 3번 호출한다.', () => {
      const callback = jest.fn();

      const timer = new Timer();
      timer.start(callback, 10, false);

      jest.advanceTimersByTime(3000);

      expect(callback).toBeCalledTimes(3);
      timer.finish();
    });
  });

  describe('finish(..., immediate=true)', () => {
    it('start 후 바로 종료, 10초에도 콜백은 1번 호출한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, true);
      timer.finish();
      jest.advanceTimersByTime(1000);

      expect(callback).toBeCalledTimes(1);
    });
  });

  describe('finish(..., immediate=false)', () => {
    it('start 후 바로 종료, 10초에도 콜백은 0번 호출한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, false);
      timer.finish();
      jest.advanceTimersByTime(1000);

      expect(callback).toBeCalledTimes(0);
    });
  });
});
