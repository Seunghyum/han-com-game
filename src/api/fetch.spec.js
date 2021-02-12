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
  describe('성공 시', () => {
    it('호출 가능여부, json 속성값 검사', async () => {
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
      expect(new Set(Object.keys(json[0]))).toEqual(
        new Set(['text', 'second'])
      );
    });
  });

  describe('실패 시', () => {
    it('호출 가능여부, json 속성값 검사', async () => {
      const fetchMock = jest
        .spyOn(global, 'fetch')
        .mockImplementation(() => Promise.reject(new Error('error ocurred')));

      await getFetch(
        'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
      );

      expect(fetchMock).toHaveBeenCalledWith(
        'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
      );

      await expect(fetchMock).rejects.toThrow('error ocurred');
    });
  });
});
