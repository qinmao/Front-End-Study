/**
 * 用取min, max 之间的随机数
 * @param {*} min 
 * @param {*} max 
 */
export const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}


/**
 *
 * @returns {string}
 */
export function generateUUID() {
    let d = new Date().getTime()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
}