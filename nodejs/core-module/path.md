# path
  - path 模块提供了一些常用的方法和属性，用于处理文件路径的字符串
## 常用方法
  ```js
    const path = require("node:path");

    // 将所有给定的 path 片段连接到一起，并规范化生成的路径。这个方法会根据操作系统的规则来正确地拼接路径。
    path.join("pub", "index.html"); // '/Users/michael/pub/index.html'

    // path.resolve() 将路径或路径片段的序列解析为绝对路径
    // 第一个参数以斜杠开头，则表示它是绝对路径：
    path.resolve("/etc", "joe.txt"); //'/etc/joe.txt'

    // 如果是绝对路径，则返回 true
    const path_test='xxx'
    path.isAbsolute(path_test)


    // path.basename(path[, ext])：返回路径的最后一部分，即文件名。可选的 ext 参数可以过滤掉指定的文件扩展名。
    const notes = "/users/joe/notes.txt";
    path.basename(notes); // notes.txt
    // 指定第二个参数来获取不带扩展名的文件名
    path.basename(notes, path.extname(notes)); //notes

    
    path.parse(pathString)：返回一个对象，包含路径的各个部分，如 root、dir、base、ext 和 name。
  ```






