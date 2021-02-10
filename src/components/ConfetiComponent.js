import { div } from '~utils/vDom';

function ConfettiBox() {
  return div(
    { className: 'confetti' },
    // [
    //   div({ className: 'confetti-piece' }),
    //   div({ className: 'confetti-piece' }),
    //   div({ className: 'confetti-piece' }),
    // ]
    Array(18)
      .fill(null)
      .map(() => div({ className: 'confetti-piece' }))
  );
}

export default ConfettiBox;
