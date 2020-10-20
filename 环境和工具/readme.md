# 环境和工具
* mac 
  - 包管理 brew[官网](http://brew.sh/index_zh-cn.html)
  - 安装:
    ``` 
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    ```
  + brew 用法
     - brew install 软件名  
     - brew uninstall  软件名称
     - brew list 可以查看所有安装的软件
     - brew info 软件名

* vscode 
   - file-size
   - html css support
   - minapp 
   - vetur
   - vscode-icons
   - vueHelper
   - [参考](https://juejin.im/post/5e89fb596fb9a03c75753eb0?utm_source=gold_browser_extension#comment)

* eslint
   - 是nodejs编写，提供一种代码编写规范。
   - [配置](note/eslint.md)
   - [参考](http://eslint.org/)

* Emmet(快捷编写html，vscode 内置了该功能)
   ```css
      div.className
      div#idName
      div.className#idName
      h1{text}
      a[href="#"]
      ul>li*3>a[href="#"]
    ```

* Fontmin/字蛛
* ImageOptim
* 文档工具
   - dash(mac)
   - zeal(windows)
    
* windows 连接服务器的工具
  - fileZillaClint 可视化ft工具
  - Xshell

* [git基本使用](git/readme.md)

* 目录生成命令
  -  安装 :brew install tree  ||  apt-get install tree
  +  exmple: tree -L 3 -I "node_modules"
    - tree -d 只显示文件夹；
    - tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3；
    - tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"；
    - tree > tree.md 将项目结构输出到tree.md这个文件。