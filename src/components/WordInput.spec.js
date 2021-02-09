import WordInput from './WordInput';

describe('WordInput 컴포넌트 테스트', () => {
  const onkeyup = (event) => {
    console.log(event.target.value);
  };
  const TestDom = new WordInput().render({
    id: 'test',
    className: 'word-input-test',
    isStarted: false,
    onkeyup,
  });

  document.body.appendChild(TestDom);
  const target = document.querySelector('#test');

  test('WordInput 컴포넌트 마운트.', () => {
    expect(target.className).toBe('word-input-test');
  });
});
