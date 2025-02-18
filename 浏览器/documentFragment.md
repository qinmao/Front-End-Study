# DocumentFragment
- 浏览器提供的一个轻量级 DOM 节点容器，用于高效地操作和插入多个 DOM 节点。
- 它本身不属于主文档树的一部分，因此在操作时不会触发页面重排（reflow）或重绘（repaint）
- 适合批量操作 DOM 的场景。

## 核心特性
* 轻量级：不在主文档树中，操作时不会触发页面渲染。
* 批量插入：可以将多个 DOM 节点一次性插入到文档中，减少重排次数。
* 无额外渲染开销：在插入到文档前，DocumentFragment 的内容不会显示在页面上。
* 节点操作：支持所有标准的 DOM 操作方法（如 appendChild、removeChild 等）。

## 基础用法
  ```js
   // 1. 创建 DocumentFragment
   const fragment = document.createDocumentFragment();

    // 2. 添加节点到 DocumentFragment
    for (let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.textContent = `Item ${i}`;
        fragment.appendChild(div); // 将节点添加到 fragment
    }
    // 将 DocumentFragment 插入到文档
    document.body.appendChild(fragment); // 一次性插入所有节点
  ```

## 使用场景
* 动态生成表格
  - 在生成复杂表格时，使用 DocumentFragment 可以避免频繁操作 DOM。
  ```js
    const table = document.createElement('table');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('td');
            cell.textContent = `Row ${i}, Col ${j}`;
            row.appendChild(cell);
        }
        fragment.appendChild(row);
    }

    table.appendChild(fragment);
    document.body.appendChild(table);
  ```
* 节点操作
  - 在需要频繁操作 DOM 节点时，使用 DocumentFragment 可以避免直接操作主文档树。
* 虚拟 DOM 实现
  - 在实现虚拟 DOM 时，DocumentFragment 可以作为中间容器，用于批量更新 DOM。

## 注意
* 插入后清空：将 DocumentFragment 插入文档后，其内容会被移动到文档中，fragment 变为空。
* DocumentFragment 不支持 innerHTML 和 outerHTML，但可以通过 appendChild 或 insertBefore 添加节点。