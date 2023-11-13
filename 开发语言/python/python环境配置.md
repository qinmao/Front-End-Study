# python 环境配置
## 卸载
* mac 中卸载默认安装的python
  ```bash
    rm -rf /Library/Frameworks/Python.framework
    rm -rf /Applications/Python3.9.6
    rm  -rf /usr/bin/python3
    rm  -rf /usr/bin/pip3
  ```
## 安装
* mac 
  1. 直接官网下载安装包
  2. homebrew 
## Python 的版本管理(类似于nvm)
* brew 安装 pyenv 来管理 python 的版本
  ```bash
   brew update
   brew install pyenv

   pyenv -v
  
   # 查看当前的版本
   pyenv versions 

   # 查看pyenv已经安装的python版本
   pyenv install -l|--list

   # 下载到缓存文件下
   wget https://registry.npmmirror.com/-/binary/python/3.11.4/Python-3.11.4.tar.xz -P ~/.pyenv/cache/
   # 安装指定的版本
   pyenv install 3.11.4
   # 删除指定版本
   pyenv uninstall 3.11.4

   # 切换python版本
   pyenv global 3.11.4

  ```