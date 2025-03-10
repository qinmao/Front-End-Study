# nodejs 安装

## nvm 安装 nodejs
* Mac|Linux 推荐安装 nvm 来切换 node 版本
  - 注意: 从 v18 开始，由于 glibc 版本不兼容，Node.js 不再支持 centos 7和其他一些 Linux 发行版。
* windows 推荐使用[nvm-windows](https://github.com/coreybutler/nvm-windows)

* 使用 nvm 安装 nodejs
  ```bash
    # 安装 nvm（Node 版本管理器）
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    # 下载并安装 Node.js（可能需要重新启动终端）
    # 设置代理,打开nvm目录，找到 setting.txt 文件夹打开没有创建
    # node_mirror: https://npmmirror.com/mirrors/node/
    # npm_mirror: https://npmmirror.com/mirrors/npm/

    nvm install 20

    # 验证环境中是否存在正确的 Node.js 版本
    node -v # 应打印 `v20.16.0`

    # 验证环境中是否存在正确的 npm 版本
    npm -v # 应打印 `10.8.1`

    # nvm 提供 nvm reinstall-packages 命令
    # 如你新安装的是 14.17.3 老版本是 14.17.0
    # 执行 就可以把老版本上的全局包重新安装在新版本上了
    nvm reinstall-packages 14.17.0 
  ```

## 源码编译安装
1. 安装依赖
  ```bash
   yum install g++ curl libssl-dev apache2-utils git-core build-essential
  ```
2. 下载源码编译
  ```bash
    git clone https://github.com/nodejs/node.git
    cd node
    
    # 指定安装目录
    ./configure --prefix=/usr/local/node  

    # 编译成二进制可执行程序
    # 手动指定：j2表示用2个逻辑cpu
    make -j2  

    # macOS，使用 sysctl -n hw.ncpu 获取 CPU 核心数
    # centos cat /proc/cpuinfo | grep processor | wc -l
    make -j$(sysctl -n hw.ncpu)   

    make install
  ```

## 下载预编译好的nodejs二进制包