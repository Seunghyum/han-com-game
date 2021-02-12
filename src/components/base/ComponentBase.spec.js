import ComponentBase from './ComponentBase';
import { button, input, p } from '~utils/vDom';

describe('ComponentBase 컴포넌트 - Input 테스트', () => {
  const testData = {
    id: 'test',
    className: 'word-input-test',
    value: 'test value',
    placeholder: 'test placeholder',
    disabled: true,
    focus: true,
    element: input(),
  };

  const TestInput = new ComponentBase();

  document.body.appendChild(TestInput.render(testData));
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

  it('focus를 props로 설정 가능하다', () => {
    setTimeout(() => expect(target).toHaveFocus(), 100);
  });

  it('setValue매서드로 value 설정이 가능하다', () => {
    TestInput.setValue('test setValue');
    expect(target.value).toBe('test setValue');
  });

  it('removeClass 매서드로 class 삭제가 가능하다', () => {
    TestInput.addClass('class-test');
    TestInput.removeClass(testData.className);
    expect(target.className).toBe('class-test');
  });
});

describe('ComponentBase 컴포넌트 - textContent param 테스트', () => {
  const testData = {
    id: 'test-textContent',
    textContent: 'hello world',
    element: p(),
  };

  const TestP = new ComponentBase().render(testData);

  document.body.appendChild(TestP);
  let target = document.querySelector('#' + testData.id);
  test('textContent를 props로 설정 가능하다.', () => {
    expect(target.innerHTML).toBe(testData.textContent);
  });
});

describe('ComponentBase 컴포넌트 - button param 테스트', () => {
  const changedClassName = 'changed';
  const testData = {
    id: 'test-button',
    textContent: 'hello world',
    element: button(),
    onclick: (event) => (event.target.className = changedClassName),
  };

  const TestP = new ComponentBase().render(testData);

  document.body.appendChild(TestP);
  let target = document.querySelector('#' + testData.id);
  test('textContent를 props로 설정 가능하다.', () => {
    expect(target.innerHTML).toBe(testData.textContent);
  });

  test('클릭을 props로 설정 가능하다.', () => {
    target.click();
    expect(target.className).toBe(changedClassName);
  });
});
