const { getAverage } = require('./getAverage');

describe('getAverage 함수 테스트', () => {
  test('빈 arr를 줄 경우 0을 반환한다', () => {
    const average = getAverage([]);
    expect(average).toEqual(0);
  });
  test('평균 케이스 1', () => {
    const average = getAverage([1, 2, 3, 4, 5]);
    expect(average).toEqual('3');
  });

  test('평균 케이스 1', () => {
    const average = getAverage([10, 6, 7, 2, 5, 20, 2, 1]);
    expect(average).toEqual('7');
  });
});
