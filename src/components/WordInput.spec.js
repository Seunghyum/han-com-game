import WordInputClass from './WordInput';

describe('WordInput 컴포넌트 테스트', () => {
  const testData = {
    id: 'test',
    className: 'word-input-test',
    value: 'test value',
    placeholder: 'test placeholder',
    disabled: true,
  };

  const WordInput = new WordInputClass().render(testData);

  document.body.appendChild(WordInput);
  let target = document.querySelector('#test');

  test('id, className를 props로 설정 가능하다.', () => {
    expect(target.className).toBe(testData.className);
  });

  test('value를 props로 설정 가능하다.', () => {
    expect(target.value).toBe(testData.value);
  });
  test('placeholder를 props로 설정 가능하다.', () => {
    expect(target.placeholder).toBe(testData.placeholder);
  });
  test('disabled를 props로 설정 가능하다.', () => {
    expect(target.disabled).toBe(testData.disabled);
  });
});
