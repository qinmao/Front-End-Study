/**
 * 用取min, max 之间的随机数
 * @param {*} min 
 * @param {*} max 
 */
export const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
