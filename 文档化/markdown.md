# Markdown用法
* 基础语法
  - 代码块:``` 用来表示代码块，跟在后面的是语言类型，如 js、java 和  diff 等
  + 插入图片: 
    - 方式一
        ```
        ![图片描述](http://xxx.png)
        ```
    - 方式二:可设置宽高
     ```
     <img src='http://xxx.png' width=300px height=200px />

     ```

* 代码diff效果
    ```diff
    const unique = (arr)=>{
    -  return Array.from(new Set(arr))
    +  return [...new Set(arr)]
    }
    ```

* 折叠
    ```
    <details>
    <summary>展开查看规范</summary>
    这是展开后的内容1
    </details>
    ```

    <details>
    <summary>展开查看规范</summary>
    这是展开后的内容1,这是展开后的内容1
    </details>

* 锚点链接（2种写法）
    ```
        [点击我跳转到目录树](#目录树)
    ```
    - [点击跳转文档化](#文档化)
    - [点击跳转Markdown用法](##Markdown用法)