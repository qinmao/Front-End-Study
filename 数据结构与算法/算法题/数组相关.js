// 数组相关算法题

// 1. 给定两个数组，写一个方法来计算它们的交集
function intersection(arr1, arr2) {
    return arr1.filter((item) => arr2.includes(item));
}

// 2. (携程)编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
function flatten(arr) {
    if (!Array.isArray(arr)) {
        return;
    }
    return Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b);
}

// 3. 使用选代的方式实现 flatten 函数
function flatten(arr) {
    const stack = [...arr]; // 将数组元素复制到栈中
    const result = []; // 用于存储扁平化后的结果
    while (stack.length) {
        const item = stack.pop(); // 从栈中取出一个元素
        if (Array.isArray(item)) {
            // 如果元素是数组，将其展开并压入栈中
            stack.push(...item);
        } else {
            // 如果元素不是数组，直接添加到结果数组中
            result.push(item);
        }
    }
    // 返回去重和排序后的结果
    return Array.from(new Set(result)).sort((a, b) => a - b);
}

// 示例测试
const arr = [1, [2, [3, 4]], [5, [6, [7, 8]]], 9];
console.log(flatten(arr)); // 输出: [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 4. (阿里)如何实现数组的随机排序？使用 Fisher-Yates（也称为 Knuth）洗牌算法
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交换元素
    }
    return array;
}
// 5. (阿里)介绍下深度优先遍历和广度优先遍历，如何实现？
