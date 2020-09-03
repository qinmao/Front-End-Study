# react
* ReactDOM.render() 
  ```js
    // 用于将模板转为 HTML 语言，并插入指定的 DOM 节点
    ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('example')
    );
  ```
* 组件：从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素

## 脚手架
 ```
  npx create-react-app my-app 

  npx create-react-app my-app --template typescript
 ```

## ssr
* Next.js