/**
 * 把一个对象数组，按对象中的属性分组
 * @param {Array} array
 * @param {String} prop
 * @returns {Object}
 */
export const groupBy = (array, prop) => {
  const groups = {};
  array.forEach((item) => {
    if (!groups[item[prop]]) {
      groups[item[prop]] = [item];
    } else {
      groups[item[prop]].push(item);
    }
  });
  return groups;
};

/**
 * 把一个嵌套数组拉平
 * @param {Array} array
 * @returns {Array}
 */
export const deepFlatten = (arr) => {
  const flatten = (arr) => [].concat(...arr);
  return flatten(arr.map((x) => (Array.isArray(x) ? deepFlatten(x) : x)));
};
