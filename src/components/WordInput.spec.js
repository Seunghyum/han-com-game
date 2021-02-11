import WordInput from './WordInput';

describe('WordInput 컴포넌트 테스트', () => {
  const testData = {
    id: 'test',
    className: 'word-input-test',
    value: 'test value',
    placeholder: 'test placeholder',
    disabled: true,
  };

  const $WordInput = new WordInput();

  document.body.appendChild($WordInput.render(testData));
  let target = document.querySelector('#test');

  it('isClean = true 일 경우', () => {
    $WordInput.updateState({ isClean: true });

    expect(target.disabled).toEqual(false);
    expect(target.value).toEqual('');
  });

  it('isWrong = true 일 경우', () => {
    const testValue = 'test value';
    $WordInput.update({ value: testValue });
    $WordInput.updateState({ isWrong: true });

    expect($WordInput.element.classList.contains('error')).toBe(true);
    expect($WordInput.element.value).toBe('');

    setTimeout(() => {
      expect($WordInput.element.classList.contains('error')).toBe(false);
    }, 1000);
  });
});
