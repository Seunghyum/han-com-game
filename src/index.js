import { initRoute } from './router';

window.addEventListener('DOMContentLoaded', () => {
  initRoute();
});

window.onpopstate = ({ state, title, url }) => {
  document.title = title;
  console.log(
    `
    location: ${document.location}, 
    state: ${JSON.stringify(state)}
    title: ${JSON.stringify(title)}
    url: ${JSON.stringify(url)}
    `
  );
};
