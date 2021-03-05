/**
 * fetch API GET method Wrpper Func
 * @param {string} path URL Path
 * @returns {Promise<JSON>} JSON 반환
 */

export const getFetch = () => {
  return [
    {
      second: 10,
      text: 'hello',
    },
    {
      second: 10,
      text: 'world',
    },
    {
      second: 8,
      text: 'this',
    },
    {
      second: 3,
      text: 'is',
    },
    {
      second: 15,
      text: 'test',
    },
    {
      second: 15,
      text: 'frontend',
    },
    {
      second: 20,
      text: 'developers',
    },
    {
      second: 15,
      text: 'join',
    },
    {
      second: 10,
      text: 'us',
    },
  ];
};
// export const getFetch = (path) => {
//   return fetch(path)
//     .then((res) => res.json())
//     .catch((err) => new Error(err));
// };
