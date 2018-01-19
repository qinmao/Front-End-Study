/**
 * 用js实现千位分隔符
 * @param {*} num  eg：如12000000.11转化为『12,000,000.11』
 */
function commafy(num) {
    return num && num
        .toString()
        .replace(/(\d)(?=(\d{3})+\.)/g, function ($1, $2) {
            return $2 + ',';
    });
}
/**
 * 用取min, max 之间的随机数
 * @param {*} num  eg：如12000000.11转化为『12,000,000.11』
 */
export const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}