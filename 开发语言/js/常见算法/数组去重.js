// 数组去重

// 类型一：普通数组
const array = [1, 55, 2, 2, 34, 555];
// 方式一
const uniqueArr1 = [...new Set(array)];
// 方式二
const uniqueArr2 = arr.filter((value, index, self) => self.indexOf(value) === index);
// 方式三
const uniqueArr = Object.keys(arr.reduce((acc, value) => {
    acc[value] = true;
    return acc;
  }, {})).map(Number);

// 类型二：对象数组
