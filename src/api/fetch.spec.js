const { getFetch } = require('./fetch');

const unmockedFetch = global.fetch;

describe('fetch API - getFetch', () => {
  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      });
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
  test('호출 가능여부, json 속성값 검사', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              text: 'kakao',
              second: 10,
            },
          ]),
      })
    );

    const json = await getFetch(
      'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
    );

    expect(Array.isArray(json)).toEqual(true);
    expect(new Set(Object.keys(json[0]))).toEqual(new Set(['text', 'second']));
  });
});
