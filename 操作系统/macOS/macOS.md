# mac 系统
## 快捷键
* 打开finder:command+space
* 打开截屏录屏：command+shift+5 或者 command+shift+4
* 4指上划打开多屏幕
* 开启分屏：将当前应用最大化，4指上划，拖入另一个程序进入当前应用的缩略图


## 包管理 brew
- [官网](http://brew.sh/index_zh-cn.html)
- 安装:
    ``` 
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    ```
- 换源：使用国内镜像
    ```
    # 步骤一
        cd "$(brew --repo)"
        git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

    # 步骤二
        cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
        git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

    # 步骤三
        brew update
    ```
- 还原
    ```
    # 步骤一
    cd "$(brew --repo)"
    git remote set-url origin https://github.com/Homebrew/brew.git

    # 步骤二
    cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
    git remote set-url origin https://github.com/Homebrew/homebrew-core

    #步骤三
    brew update
    ```

+ brew 用法
    - brew -v 
    - brew install 软件名  
    - brew uninstall  软件名称
    - brew list 可以查看所有安装的软件
    - brew info 软件名
    - brew update 更新homebrew
