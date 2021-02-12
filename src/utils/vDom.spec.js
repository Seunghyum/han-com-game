import { a, div, p } from './vDom';

describe('Virtual Dom 함수 테스트', () => {
  it('', () => {
    const TestLink = div(a('hello world'));
    document.body.appendChild(TestLink);
    expect(document.querySelector('div').outerHTML).toBe(
      `<div><a>hello world</a></div>`
    );
    document.body.innerHTML = '';
  });

  it('params의 요소로 string이 들어갈 경우 해당 Dom의 innerText에 들어간다.', () => {
    const TestLink = a('hello world');
    document.body.appendChild(TestLink);
    expect(document.querySelector('a').outerHTML).toBe(`<a>hello world</a>`);
    document.body.innerHTML = '';
  });
  it('params의 요소로 [Node]가 들어갈 경우 해당 Dom의 children으로에 들어간다.', () => {
    const TestChildren = div([p('hello world 1'), p('hello world 2')]);
    document.body.appendChild(TestChildren);
    expect(document.querySelector('div').outerHTML).toBe(
      '<div>' + '<p>hello world 1</p>' + '<p>hello world 2</p>' + '</div>'
    );
    document.body.innerHTML = '';
  });
  it('params가 (object, string) 으로 들어갈 경우 해당 Dom의 attrubute에 속성이 들어간다.', () => {
    const TestLink = a({ className: 'test1' }, 'hello world');
    document.body.appendChild(TestLink);
    expect(document.querySelector('.test1').outerHTML).toBe(
      `<a class="test1">hello world</a>`
    );
  });

  it('params가 (object, string, children)으로 들어갈 경우 해당 Dom의 children안에 append된다.', () => {
    const TestLink = div({ className: 'wrapper' }, 'hello world', [
      div({ className: 'row-1' }),
      div({ className: 'row-2' }),
      div({ className: 'row-3' }),
    ]);
    document.body.appendChild(TestLink);
    expect(document.querySelector('.wrapper').outerHTML).toBe(
      '<div class="wrapper">' +
        'hello world' +
        '<div class="row-1"></div>' +
        '<div class="row-2"></div>' +
        '<div class="row-3"></div>' +
        '</div>'
    );
  });
});
