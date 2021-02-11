import GameControlButton from './GameControlButton';

describe('GameControlButton 테스트', () => {
  const changedClassName = 'changed';
  const testData = {
    id: 'test-button',
    onclick: (event) => (event.target.className = changedClassName),
  };

  const $GameControlButton = new GameControlButton();

  document.body.appendChild($GameControlButton.render(testData));
  let target = document.querySelector('#' + testData.id);
  it('컴포넌크가 마운트 되면 상태값이 isStart == false 이므로 textContent는 "시작" 이어야 한다', () => {
    expect(target.innerHTML).toBe('시작');
  });

  it('상태값 isStart == true이면 textContent는 "초기화" 이어야 한다', () => {
    $GameControlButton.updateState({ isStart: true });
    expect(target.innerHTML).toBe('초기화');
  });
});
