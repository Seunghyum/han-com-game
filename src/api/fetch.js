export const getFetch = (path) => {
  return fetch(path)
    .then((res) => res.json())
    .catch((err) => new Error(err));
};
