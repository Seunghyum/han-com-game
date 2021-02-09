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
- UI 렌더링 방식
  - root(public/index.html의 ```<div id="app"></div>```)에 페이지 DOM Node를 한번에 렌더링 하는 방식.
  - vDom이라는 util 함수를 정의해서 좀 더 선언적으로 render 함수를 호출하게끔 설계.
  - 각 페이지마다 데이터가 바뀌는 DOM Node의 참조값을 가지고 있고 값이 바뀔때마다 해당 노드의 textContent만 수정하여 렌더링 비용을 줄임.
- 테스트 환경 : Jest
  - src/test/vDom.spec.js : vDom가 각기 다른 params 마다 제대로 작동하는지 테스트.
- 백엔드 API 요청
  - 요청 API가 하나만 존재. env 파일로 관리 안하고 요청시 url 만 넣으면 작동하게 진행.
- 라우팅
  - History API를 사용하여 브라우저의 세션 기록을 조작함.
  - window.onpopstate 에 콘솔로그를 넣어 페이지 이동시(back, go, forward) 로그를 남김
