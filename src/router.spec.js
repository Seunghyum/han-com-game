const { createBrowserHistory } = require('history');

describe('history.push(path, data) 테스트', () => {
  const history = createBrowserHistory(/* ... */);
  jest.spyOn(history, 'push');
  test('location.pathname가 path 설정 값과 같아야한다', () => {
    const pathName = '/store';

    history.push(pathName);

    expect(location.pathname).toBe(pathName);
  });

  test('histroy.location.state가 data 설정 값과 같아야한다', () => {
    const score = 130;
    const averageTime = 500;
    const pathName = '/store';

    history.push(pathName, { score, averageTime });

    expect(location.pathname).toBe(pathName);
    expect(history.location.state.score).toBe(score);
    expect(history.location.state.averageTime).toBe(averageTime);
  });
});
