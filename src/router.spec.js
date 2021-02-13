import { historyRouter, ROUTE_PATH } from './router';

const history = {};

jest.mock(
  './router',
  () => {
    return {
      __esModule: true,
      historyRouter: (url, data) => {
        history.data = data;
        history.pathName = url;
        history.url = url;
      },
      ROUTE_PATH: {
        GamePage: '/',
        ScorePage: '/score',
      },
    };
  },
  { virtual: true }
);

describe('history.push(path, data) 테스트', () => {
  it('historyRouter', () => {
    const url = ROUTE_PATH.ScorePage;
    const data = { test: 'hello world' };
    historyRouter(url, data);

    expect(history.data.text).toEqual(data.text);
    expect(history.pathName).toEqual(url);
    expect(history.url).toEqual(url);
  });
});
