# python 环境配置
## 卸载
* mac 中卸载默认安装的python
  ```bash
    rm -rf /Library/Frameworks/Python.framework
    rm -rf /Applications/Python3.9.6
    rm  -rf /usr/bin/python3
    rm  -rf /usr/bin/pip3
  ```
* windows 直接卸载
## 安装
* windows 直接官网下载安装包
  - 官网下载太慢可以到镜像站去下载
  - 镜像站：https://registry.npmmirror.com/binary.html?path=python/3.8.10/

* mac:
  - 方式一：直接下载Mac安装包 https://registry.npmmirror.com/binary.html?path=python/
  - 方式二：homebrew 安装
* 验证是否成功
  ```bash
    # MacOS
    python3 -V
    # windows
    python -V
  ```
## pip 下载包很慢
  - 设置镜像源
  ```bash
    # window 设置全局变量后不加 python -m
    # mac 加 python3 -m 
    python3 -m pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
    python3 -m pip config set global.trusted-host pypi.tuna.tsinghua.edu.cn
  ```
  + 常用的有镜像有
    - 清华大学镜像:https://pypi.tuna.tsinghua.edu.cn/simple/
    - 阿里云:http://mirrors.aliyun.com/pypi/simple/
    - 中科大镜像:https://pypi.mirrors.ustc.edu.cn/simple/
    
## Python 的版本管理(类似于nvm)
* brew 安装 pyenv 来管理 python 的版本
  ```bash
    brew install pyenv
    brew upgrade pyenv

    # pyenv的版本
    pyenv -v
    
    # 列出系统中安装的 python 版本
    pyenv versions 

    # 显示当前目录下采用的 python 版本
    pyenv version    
                                   
    # 查看 pyenv 可用的 python 版本
    pyenv install --list

    # 1. 下载到缓存文件下
    wget https://registry.npmmirror.com/-/binary/python/3.11.4/Python-3.11.4.tar.xz -P ~/.pyenv/cache/
    # 2. 安装指定的版本
    pyenv install 3.11.4

    # 删除指定版本
    pyenv uninstall 3.11.4

    # 在当前目录下设置 python 版本，则在该目录下运行的 python 都是 3.6.1 版本。
    pyenv local 3.6.1

    # 切换python版本
    pyenv global 3.11.4

  ```
## 开发工具配置
- [参考](https://blog.csdn.net/weixin_49895216/article/details/131696960)