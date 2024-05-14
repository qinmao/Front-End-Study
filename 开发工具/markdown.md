# Markdown用法
## 基础语法
  - 代码块:``` 用来表示代码块，跟在后面的是语言类型，如 js、java 和  diff 等
  + 插入图片: 
    ```
    # 方式一
    ![图片描述](http://xxx.png)

    # 方式二:可设置宽高
    <img src='http://xxx.png' width=300px height=200px />
    ```
## 代码diff效果
  ```diff
    const unique = (arr)=>{
    -  return Array.from(new Set(arr))
    +  return [...new Set(arr)]
    }
  ```
## 勾选完成
- [x] 任务 1
- [x] 任务 2
- [ ] 任务 3
- [ ] 任务 3
## 折叠
```
 <details>
    <summary>展开查看规范</summary>
      这是展开后的内容
  </details>
```
## markdon 转html
- TOOD