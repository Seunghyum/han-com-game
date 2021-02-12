import Timer from './timer';

jest.useFakeTimers();

describe('Timer - setInterval 테스트', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('time 인자가 0이면 에러 메시지가 나옵니다.', () => {
    const callback = jest.fn();
    const timer = new Timer();

    let thrownError;

    try {
      timer.start(callback, 0, true);
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toEqual(new Error('time 값은 0 보다 커야 합니다.'));
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

    it('start(..., immediate = false) 후 바로 종료, 3초 후에도 콜백은 총 0번 호출한다.', () => {
      const callback = jest.fn();
      const timer = new Timer();

      timer.start(callback, 10);
      timer.finish();
      jest.advanceTimersByTime(3000);

      expect(callback).toBeCalledTimes(0);
    });
  });

  describe('getSeconds() 매서드로 finish() 이후 지나간 값을 가져올 수 있다.', () => {
    it('start(..., immediate = true) 5.1초 후 콜백은 6번(5번 setInterval, 1번 setTimeout)실행되고 지나간 시간(getSeconds)은 5초이다.', () => {
      const callback = jest.fn();

      const timer = new Timer();
      timer.start(callback, 10, true);

      jest.advanceTimersByTime(5100);
      timer.finish();
      expect(timer.getSeconds()).toEqual(5);
      expect(callback).toBeCalledTimes(6);
    });

    it('start(..., immediate = false) 5.1초 후 콜백은 5번(5번 setInterval)실행되고 지나간 시간(getSeconds)은 5초이다.', () => {
      const callback = jest.fn();

      const timer = new Timer();
      timer.start(callback, 10);

      jest.advanceTimersByTime(5100);
      timer.finish();
      expect(timer.getSeconds()).toEqual(5);
      expect(callback).toBeCalledTimes(5);
    });
  });
});
