/**
 * get average from array
 * @param {Array} arr 평균을 구할 타겟 Array
 * @param {number} toFixed 소수점 몇번째까지 표기할지
 */
export function getAverage(arr, toFixed = 0) {
  const sum = arr.reduce((a, b) => a + b, 0);
  let averageTime = 0;
  if (arr.length > 0) averageTime = (sum / arr.length).toFixed(toFixed);
  return averageTime;
}
