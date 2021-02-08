import { input } from '~utils/vDom';

function TypingFormInput({ isStarted = false, onKeyUp }) {
  return input(
    {
      type: 'text',
      autofocus: '',
      className: 'typing-form__input',
      onkeyup: onKeyUp,
    },
    isStarted ? '초기화' : '시작'
  );
}

export default TypingFormInput;
