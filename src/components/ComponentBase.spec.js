import ComponentBase from './ComponentBase';
import { input, p } from '~utils/vDom';

describe('ComponentBase 컴포넌트 - Input 테스트', () => {
  const testData = {
    id: 'test',
    className: 'word-input-test',
    value: 'test value',
    placeholder: 'test placeholder',
    disabled: true,
    element: input(),
  };

  const TestInput = new ComponentBase().render(testData);

  document.body.appendChild(TestInput);
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

describe('ComponentBase 컴포넌트 - innerText param 테스트', () => {
  const testData = {
    id: 'test-innerText',
    innerText: 'hello world',
    element: p(),
  };

  const TestP = new ComponentBase().render(testData);

  document.body.appendChild(TestP);
  let target = document.querySelector('#test-innerText');
  test('id, className를 props로 설정 가능하다.', () => {
    expect(target.innerHTML).toBe(testData.innerText);
  });
});
