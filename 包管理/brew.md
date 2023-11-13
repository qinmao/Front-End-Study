# brew
* [官网](http://brew.sh/index_zh-cn.html)
## homebrew 的组成
* brew              
  - Homebrew 源代码仓库
* homebrew-core     
  - Homebrew 核心软件仓库
* homebrew-bottles
  - Homebrew 预编译二进制软件包
* homebrew-cask
  - MacOS 客户端应用
## 安装:
  ```bash 
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```
## 卸载：
  ```bash
    cd `brew --prefix`
    rm -rf Cellar
    brew prune
    rm `git ls-files`
    rm -r Library/Homebrew Library/Aliases Library/Formula Library/Contributions
    rm -rf .git
    rm -rf ~/Library/Caches/Homebrew
  ```
## 查看当前源
  ```bash
    # 查看 brew.git 当前源
    cd "$(brew --repo)" && git remote -v
    # 查看homebre-core.git 当前源
    cd "$(brew --repo homebrew/core)" && git remote -v
  ```
## 设置国内源
  ```bash
    # 步骤一
    cd "$(brew --repo)" && git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
    cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core" && git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
    # 更新一下下载地址
    brew update 
    # 来检查一下地址是否更新成功
    brew config 

    # 步骤二
    echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew' >> ~/.zshrc
    source ~/.zshrc
  ```
## 还原
  ```bash
    # 步骤一
    cd "$(brew --repo)"
    git remote set-url origin https://github.com/Homebrew/brew.git

    # 步骤二
    brew update
  ```
## brew 用法
  - brew -v 
  - brew config 查看 brew 的配置
  - brew install 软件名  
  - brew uninstall  软件名称
  - brew list 可以查看所有安装的软件
  - brew info 软件名
  - brew update 更新 homebrew
  - brew doctor 检测问题
  - brew upgrade 升级所有包
  + 服务相关
    - brew services list  查看本地运行服务列表
    - brew services start xxx 后台开始某个服务
    - brew services stop  xxx 后台停止某个服务
    - brew services start --all 启动所有服务
    - brew services stop  --all 停止所有服务