// 类型一：普通数组
const array = [1, 55, 2, 2, 34, 555];
const nonUnique = [...new Set(array)];
console.log("nonUnique：", nonUnique);

// 类型二：对象数组
