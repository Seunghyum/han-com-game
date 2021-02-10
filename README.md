# TypingGame

## 실행 방법

```SHELL
// webpack-dev-server 실행
$ yarn start

// 빌드
$ yarn build

// 테스트
$ yarn jest

```

## 문제 해결 전략

- 환경 구성 : Webpack
  - webpack.config.dev.js / webpack.config.prod.js 으로 개발 / 배포 설정 분리.
  - start script를 통해서 hot-loading 적용.
  - build script를 구성하여 /public 폴더에 빌드한 html, js, css를 export.
    - build 한 js 파일이 105KB 이므로 chunck로 나누지 않음.
- 작업 환경 구성 : Eslint, Prettier, Husky
  - Husky hook precommit 옵션을 설정하여 
    1. eslint 검사
    2. prettier 수정
    3. jest 검사 
    이후에 에러 없을 시 커밋할 수 있게 구성.
- UI 렌더링 방식
  - root(public/index.html의 ```<div id="app"></div>```)에 페이지 DOM Node를 한번에 렌더링 하는 방식.
  - src/utils/vDom.js에서 createElement를 래핑하는 함수를 만듦.
    1. render 함수안의 Dom의 위치를 가독성 좋게 표현
    2. createElement 매서드를 가독성을 높임 
  - src/components/ComponentBase를 정의
    - 주요기능
      1. 여러가지 DOM Attribute, event를 정의하고 수정할 때 사용할 수 있는 render, update 매서드를 제공. 가독성을 높임.
      2. Dom Attribute의 이전 속성을 비교해 변경시에만 업데이트 함.
  - 각 페이지마다 데이터가 바뀌는 DOM Element의 참조값을 가지고 있고 값이 바뀔때마다 해당 Node의 ```Node.textContent```만 수정하여 렌더링 비용을 줄임.
- 백엔드 API 요청
  - 요청 API가 하나만 존재. env 파일로 관리 안하고 요청시 url 만 넣으면 작동하게 진행.
- 라우팅
  - History API를 사용해서 history.pushState(data,title,url)로 history.state에 전달할 상태값을 data인자에 담아 다음 화면을 렌더링할 때 해당 data 값을 사용함. - 관련 테스트 src/router.spec.js
  - 게임 화면에서 게임을 완료했을때 History API를 사용하여 브라우저의 세션 기록을 조작함. 
    ```javascript
    historyRouter(ROUTE_PATH.ScorePage, { score, averageTime });
    ```
    완료 페이지에선 위 데이터(```score```, ```avewrageTime```)를 받아(history.state.score, history.state.score) DOM Node를 만들때 넣어줌.
  - window.onpopstate 에 페이지 전환시(history.back, history.go, history.forward) renderHTML 함수를 다시 실행시켜서 화면을 렌더링 함.
- 단위 테스트 환경 : Jest
  - src/utils/vDom.spec.js : vDom가 각기 다른 params 마다 제대로 작동하는지 테스트.
  - src/utils/timer.spec.js : setInterval을 wrapping한 클래스의 메서드들을 테스트.
  - src/utils/getAverage.spec.js : Array에서 평균값을 리턴하는 함수를 테스트.
  - src/components/ComponentBase.js : ComponentBase 로 추상화한 DOM Element를 조작하는 클래스 테스트
  - src/router.spec.js : History API가 의도한 방식대로 작동하는지 테스트. 
