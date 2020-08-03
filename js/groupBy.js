/**
 * 把一个对象数组，按对象中的属性分组
 * @param {Array} array
 * @param {String} prop
 * @returns {Object}
 */
export const groupBy = (array, prop) => {
    const groups = {}
    array.forEach(item => {
      if (!groups[item[prop]]) {
        groups[item[prop]] = [item]
      } else {
        groups[item[prop]].push(item)
      }
    })
    return groups
  }