import Timer from './timer';

jest.useFakeTimers();

describe('Timer - setInterval 테스트', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('start(..., immediate=true) 함수로 실행하자마자 콜백을 1번 실행시킬 수 있다', () => {
    it('실행하자마자 콜백을 총 1회 실행한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, true);
      jest.advanceTimersByTime(0);

      expect(callback).toBeCalledTimes(1);
      timer.finish();
    });

    it('1초 뒤까지 콜백을 총 2번 호출한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, true);
      jest.advanceTimersByTime(1000);

      expect(callback).toBeCalledTimes(2);
      timer.finish();
    });

    it('3초 뒤까지 콜백을 총 4번 호출한다.', () => {
      const callback = jest.fn();

      const timer = new Timer();
      timer.start(callback, 10, true);

      jest.advanceTimersByTime(3000);

      expect(callback).toBeCalledTimes(4);
      timer.finish();
    });
  });

  describe('start(..., immediate=false) 함수로 interval 시간 이후 콜백을 실행시킬 수 있다', () => {
    it('실행하자마자 콜백을 총 0회 실행한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, false);
      jest.advanceTimersByTime(0);

      expect(callback).toBeCalledTimes(0);
      timer.finish();
    });

    it('1초 뒤까지 콜백을 총 1번 호출한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, false);
      jest.advanceTimersByTime(1000);

      expect(callback).toBeCalledTimes(1);
      timer.finish();
    });

    it('3초 뒤까지 콜백을 총 3번 호출한다.', () => {
      const callback = jest.fn();

      const timer = new Timer();
      timer.start(callback, 10, false);

      jest.advanceTimersByTime(3000);

      expect(callback).toBeCalledTimes(3);
      timer.finish();
    });
  });

  describe('finish() 함수로 clearInterval 할 수 있다.', () => {
    it('start(..., immediate = true) 후 바로 종료, 3초 후에도 콜백은 총 1번 호출한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10, true);
      timer.finish();
      jest.advanceTimersByTime(3000);

      expect(callback).toBeCalledTimes(1);
    });
  });
});
