# TypingGame

## 실행 방법

```SHELL
// webpack-dev-server 실행
$ yarn start

// 빌드
$ yarn build

// 테스트
$ yarn jest

// git commit message 포맷 설정
$ git config commit.template .gitmessage 

```

## 파일 구조
```
📦 build
 ┃ ┣ 📜 webpack.config.base.js
 ┃ ┣ 📜 webpack.config.dev.js 
 ┃ ┗ 📜 webpack.config.prod.js
 ┃
📦 public
 ┃ ┣ index.html
 ┃ ┗ favicon.png
 ┃
📦 src
 ┣ 📂 api // api 콜을 위한 fetch API 래핑 함수
 ┃ ┣ 📜 fetch.js
 ┃ ┗ 📜 fetch.spec.js
 ┃
 ┣ 📂 components       // UI 컴포넌트
 ┃ ┣ 📂 base           // UI 컴포넌트 기반 클래스
 ┃ ┃ ┣ 📜 ComponentBase.js // 모듈화를 위한 클래스
 ┃ ┃ ┣ 📜 ComponentBase.spec.js
 ┃ ┃ ┣ 📜 ReactiveComponentBase.js // state 값의 Observer 패턴을 위한 클래스
 ┃ ┃ ┗ 📜 ReactiveComponentBase.spec.js
 ┃ ┃
 ┃ ┣ 📜 ConfetiComponent.js // 완료페이지 꽃가루 효과를 위한 UI 모듈
 ┃ ┣ 📜 GameControlButton.js
 ┃ ┣ 📜 GameControlButton.spec.js
 ┃ ┣ 📜 WordInput.js
 ┃ ┗ 📜 WordInput.spec.js
 ┃  
 ┣ 📂 pages
 ┃ ┣ 📜 GamePage.js       // 게임 페이지
 ┃ ┗ 📜 ScorePage.js      // 완료페이지
 ┃
 ┣ 📂 styles
 ┃ ┣ 📜 confeti.scss
 ┃ ┣ 📜 index.scss
 ┃ ┗ 📜 reset.scss
 ┃
 ┣ 📂 utils
 ┃ ┣ 📜 getAverage.js
 ┃ ┣ 📜 getAverage.spec.js
 ┃ ┣ 📜 timer.js            // 타이머 구현 클래스
 ┃ ┣ 📜 timer.spec.js
 ┃ ┣ 📜 vDom.js             // DOM 조작 추상화 함수들
 ┃ ┗ 📜 vDom.spec.js
 ┃
 ┣ 📜 index.js
 ┣ 📜 router.js             // History API를 이용한 라우팅
 ┗ 📜 router.spec.js
```

## 문제 해결 전략

### 환경 구성 : Webpack

- webpack.config.dev.js / webpack.config.prod.js 으로 개발 / 배포 설정 분리.
- start script를 통해서 hot-loading 적용.
- build script를 구성하여 /public 폴더에 빌드한 html, js, css를 export.
- build 한 js 파일이 105KB 이므로 chunck로 나누지 않음.

### 작업 환경 구성 : Eslint, Prettier, Husky

Husky hook precommit 옵션을 설정하여

1. eslint 검사
2. prettier 수정
3. 커밋 대상인 파일과 관련된 *.spec.js파일의 jest 검사

이후에 에러 없을 시 커밋할 수 있게 구성.

### UI 렌더링 방식

- ```<div id="app"></div>```에 페이지 DOM Node를 한번에 렌더링 하는 방식.
  - 페이지를 한번에 메모리에 올리지 않고 방문한 페이지들만 올림 - router.js 확인
- vDom.js에서 createElement를 래핑하는 함수를 만듦.
  1. render 함수안의 Dom의 위치를 표현
  2. createElement 매서드를 가독성을 높임
- ComponentBase 클래스 정의
  - 주요기능 : UI 컴포넌트를 모듈화 시킬 수 있음
    1. 여러가지 DOM Attribute, event를 정의하고 수정할 때 사용할 수 있는 render, update 매서드를 제공. 가독성을 높임.
    2. Dom Attribute의 이전 속성을 비교해 변경시에만 업데이트 함.   ```ComponentBase.updateDomAttribute()```
- ReactiveComponent 클래스 정의
  - Proxy API를 사용하여 state의 속성값을 옵저빙함.
  - setEffect(Callback, [...stateName]) 함수로 this.state[stateName]값이 변경될 때 Callback을 실행시킴

### 백엔드 API 요청

- 요청 API가 하나만 존재하므로 env 파일로 관리 안하고 요청시 url 만 넣으면 작동하게 진행.
  코드 가독성을 높이기 위해 src/api/fetch.js의 getFetch 함수로 정의.

### 라우팅

- History API를 사용해서 history.pushState(data,title,url)로 history.state에 전달할 상태값을 data인자에 담아 다음 화면을 렌더링할 때 해당 data 값을 사용함. - 관련 테스트 src/router.spec.js
- 게임 화면에서 게임을 완료했을때 History API를 사용하여 브라우저의 세션 기록을 조작함
  ```javascript
    historyRouter(ROUTE_PATH.ScorePage, { score, averageTime });
  ```
  완료 페이지에선 위 데이터(```score```, ```avewrageTime```)를 받아(history.state.score, history.state.score) DOM Node를 만들때 넣어줌.
- window.onpopstate 에 페이지 전환시(history.back, history.go, history.forward) renderHTML 함수를 실행시켜서 화면을 렌더링 함. 게임 시작 이후에 score 페이지로 갔다가 돌아와도 게임이 살아있게 만듦
- React.Lazy처럼 페이지 라우팅 시 모든 페이지 클래스 인스턴스를 페이지 초기화 로딩때 한번에 생성하지 않고 방문한 페이지만 생성하도록 함.

### 단위 테스트 - Jest

- 테스트 커버리지
  - components(CSS 효과 구현을 위한 ConfettiComponent는 제외)
  - utils
  - router

- 세부 내용
  - **utils**
    - src/utils/vDom.spec.js : vDom 함수 테스트
    - src/utils/timer.spec.js : setInterval을 wrapping한 클래스 테스트
    - src/utils/getAverage.spec.js : Array에서 평균값을 리턴하는 함수 테스트
  - **components**
    - src/components/base/ReactiveComponentBase.spec.js : State 값을 관찰하여 setEffect 매서드에 등록한 콜백을 실행시키기 위한 클래스
    - src/components/base/ComponentBase.js
      - 목적 : 컴포넌트 모듈화를 위해 도입. DOM Element를 조작하는 컴포넌트 클래스 테스트.
      - 점수판, 남은 시간, 문제 단어에 사용.
      - 주요 기능
        1. 여러가지 DOM Attribute, event를 정의하고 수정할 때 사용할 수 있는 render, update 매서드를 제공. -> 가독성을 높임.
        2. Dom Attribute의 이전 속성을 비교해 변경시에만 업데이트 함.
    - src/components/GameControlButton.js : GameControlButton 컴포넌트 클래스 테스트
    - src/components/WordInput.js : WordInput 컴포넌트 클래스 테스트
  - **router**
    - src/router.spec.js : History API가 의도한 방식대로 작동하는지 mock 테스트
  - **api**
    - src/api/fetch.spec.js : Fetch API로 getFetch 함수 mock 테스트

### git 작업방식

- 커밋 메시지 포맷 : .gitmessage
- 브랜치 전략 : git flow
