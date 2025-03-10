/**
 * 获取到当前节点的信息
 * @param {*} tree
 * @param {*} id
 * @returns
 */
export const findNodeById = (tree, id) => {
    if (!Array.isArray(tree)) {
        console.warn("menuTree must be an array");
        return [];
    }
    if (!tree || tree.length === 0) return [];

    const stack = [...tree]; // 使用数组模拟栈

    while (stack.length > 0) {
        const node = stack.pop();
        if (node.id === id) return node;

        if (node.children && node.children.length > 0) {
            // 如果当前节点有子节点，则将子节点加入栈中
            stack.push(...node.children);
        }
    }

    // 没有找到目标节点，返回 null
    return null;
};

/**
 * @description 向当前唯一uniqueId节点中追加字段
 * @param tree 树 any[]
 * @param uniqueId 唯一uniqueId  number | string,
 * @param fields 需要追加的字段 object
 * @returns 追加字段后的树
 */
export const appendFieldByUniqueId = (tree, uniqueId, fields) => {
    if (!Array.isArray(tree)) {
        console.warn("menuTree must be an array");
        return [];
    }
    if (!tree || tree.length === 0) return [];

    const fieldsType = Object.prototype.toString.call(fields);

    for (const node of tree) {
        const hasChildren = node.children && node.children.length > 0;
        if (node.uniqueId === uniqueId && fieldsType === "[object Object]") {
            Object.assign(node, fields);
        }
        if (hasChildren) {
            appendFieldByUniqueId(node.children, uniqueId, fields);
        }
    }
    return tree;
};

/**
 * 将扁平结构数据转换为树形结构
 * @param {Array} flatNodes - 扁平结构数组
 * @param {string} idField - 节点 ID 字段名
 * @param {string} parentIdField - 父节点 ID 字段名
 * @returns {Array} - 转换后的树形结构数组
 */
export const buildTree = (flatNodes, idField = "id", parentIdField = "pId") => {
    const nodeMap = new Map();
    const tree = [];

    // 初始化每个节点并建立映射
    flatNodes.forEach((node) => {
        nodeMap.set(node[idField], { ...node, children: [] });
    });

    // 构建树形结构
    flatNodes.forEach((node) => {
        const currentNode = nodeMap.get(node[idField]);
        const parentNode = nodeMap.get(node[parentIdField]);

        if (parentNode) {
            parentNode.children.push(currentNode); // 将当前节点添加到父节点的 children 中
        } else {
            tree.push(currentNode); // 如果没有父节点，则视为根节点
        }
    });

    return tree;
};

/**
 * 将树形结构数组扁平化为扁平结构数组
 * @param {Array} tree 层级数组
 * @returns {Array} - 扁平结构数组
 */
export const flatTree = (tree) => {
    const flatArray = [];
    const stack = [...tree];

    while (stack.length > 0) {
        const node = stack.pop();
        const { children, ...rest } = node;
        flatArray.push(rest);

        // 如果有子节点，逆序添加到栈中，以保证顺序
        if (node.children && node.children.length > 0) {
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push(node.children[i]);
            }
        }
    }
    
    return flatArray;
};

/**
 * 计算树形结构中从根节点到所有叶子节点的路径
 * @param {Array} tree - 树形结构数组
 * @returns {Array} - 所有路径的数组
 */
export const getAllPathsFromTree = (tree) => {
    const paths = [];

    const findPaths = (nodes, path) => {
        for (const node of nodes) {
            const newPath = [...path, node]; // 创建当前路径的副本并添加当前节点

            // 如果当前节点是叶子节点，保存路径
            if (!node.children || node.children.length === 0) {
                paths.push(newPath);
            } else {
                // 如果有子节点，递归查找
                findPaths(node.children, newPath);
            }
        }
    };

    findPaths(tree, []);
    return paths;
};
