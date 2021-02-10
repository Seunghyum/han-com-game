/**
 * fetch API GET method Wrpper Func
 * @param {string} path URL Path
 * @returns {Promise<JSON>} JSON 반환
 */

export const getFetch = (path) => {
  return fetch(path)
    .then((res) => res.json())
    .catch((err) => new Error(err));
};
