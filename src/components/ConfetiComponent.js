import { div } from '~utils/vDom';

function ConfettiBox() {
  return div(
    { className: 'confetti' },
    Array(18)
      .fill(null)
      .map(() => div({ className: 'confetti-piece' }))
  );
}

export default ConfettiBox;
