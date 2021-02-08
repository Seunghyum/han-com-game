import { div } from '~utils/vDom';
import TypingFormInput from './TypingFormInput';

describe('TypingFormInput 컴포넌트 테스트', () => {
  const onKeyUp = (event) => {
    console.log(event.target.value);
  };
  const TestDom = div(
    { id: 'test' },
    TypingFormInput({ isStarted: false, onKeyUp })
  );

  document.body.appendChild(TestDom);
  const target = document.querySelector('#test');

  test('TypingFormInput 컴포넌트 마운트.', () => {
    expect(target.outerHTML).toBe(
      '<div id="test"><input type="text" class="typing-form__input"></div>'
    );
  });
});
