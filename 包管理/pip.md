# pip
> python 包管理工具

## pip 换源
  - 设置镜像源
  ```bash
    # window 设置全局变量后不加 python -m
    # mac 加 python3 -m 

    # 查看源
    pip config list

    python -m pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
    python -m pip config set global.trusted-host pypi.tuna.tsinghua.edu.cn

  ```
  + 常用的有镜像有
    - 清华大学镜像:https://pypi.tuna.tsinghua.edu.cn/simple/
    - 阿里云:http://mirrors.aliyun.com/pypi/simple/
    - 中科大镜像:https://pypi.mirrors.ustc.edu.cn/simple/ 
## 常用命令
```bash
  # 更新 pip 版本
  pip install --upgrade pip

  # 安装最新的包
  pip install novas
  
  # 安装特定版本的包
  pip install requests==2.6.0

  # 将软件包升级到最新版本:
  pip install --upgrade requests

  # 一个或多个要从虚拟环境中删除的包。
  pip uninstall xx1  xx2
  
  # 显示所有在虚拟环境中安装的包
  pip list 

  # 显示已安装包的信息
  pip show flask-socketio

  # 将产生一个类似的已安装包列表
  pip freeze 
  pip freeze > requirements.txt

  # 将 requirements.txt 提交给版本控制并作为应用程序的一部分提供。
  # 然后用户可以使用 install -r 安装所有必需的包：
  pip install -r requirements.txt
```
## 离线安装包
```bash
  # 下载包
  pip download -d pippackage/ flask flask-socketio

  # 下载 requirements.txt 下所有包
  pip download -d pippackage/ -r requirements.txt

  # 进入虚拟环境离线安装包：
  pip install --no-index --find-links=pipPackage xx1 xx2
  pip install --no-index --find-links=pipPackage -r requirements.txt
```
## 安装需要编译的包
  - TODO
## 发布 Python 模块
  - TODO

