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
  - 镜像站：https://registry.npmmirror.com/binary.html?path=python/3.12.5/
* mac
  - 方式一：直接下载Mac安装包 https://registry.npmmirror.com/binary.html?path=python/
  - 方式二：homebrew 安装
* centos:
   - 方式一： 
     ```bash
        # 1. 更新系统,首先确保您的系统已经更新到最新状态：
        sudo yum update
        # 如果您使用的是较新的 CentOS 版本，可以使用 dnf
        sudo dnf update

        # 2. 查看可用的 Python 版本
        sudo yum search python3

        # 3. 选择要安装的 Python 版本后，使用 yum 安装：
        # yum 会自动安装 Python 所需的依赖包，并将 Python 安装到系统默认路径中。
        sudo yum install python3

        # 4. 验证安装
        python3 --version

        # yum 离线安装
        # 这将下载 Python 3.12.4 及其依赖的 RPM 包到当前目录。
        yumdownloader --resolve --destdir /home/rpm python3.10
        # 拷贝到离线机器上
        cd /home/rpm

        # 使用 yum 安装软件包，这将安装当前目录下的所有 RPM 软件包。yum 会解决依赖关系并进行安装
        sudo yum localinstall *.rpm

     ```
   - 方式二：源码安装
     ```bash
       # 依赖准备：系统已经安装了必要的构建工具和依赖项：
       # 详情查看 https://docs.python.org/zh-cn/3/using/configure.html
       # 3.12 环境依赖
       # 1）OpenSSL 1.1.1 或更新版本
       # 2）在 Windows 上，需要 Microsoft Visual Studio 2017 或更新版本
       # 3）c11编译器

        dnf install dnf-plugins-core  # install this to use 'dnf builddep'
        dnf builddep python3

        yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel

       # 1. 下载 Python 安装包
       # 镜像站 https://registry.npmmirror.com/binary.html?path=python/3.12.4/
       wget https://registry.npmmirror.com/binary.html?path=python/3.12.4/Python-3.12.4.tgz

       # 2. 传输安装包到目标 CentOS 主机,使用工具如 scp 或者将安装包拷贝到可访问的共享目录中。
       scp Python-3.12.4.tgz username@centos_host:/path/to/destination

       # 3. 解压安装包,通常建议解压到 /usr/local/src 或者用户偏好的目录下。
       tar -zxvf Python-3.12.4.tgz
       cd Python-3.12.4

       # 4. 配置
       # 命令会将 Python 安装到 /usr/local/python3 目录下。您可以根据需要调整 --prefix 的路径来改变安装目录
       # preadv2 需要 ： glibc glibc 2.20 版本中引入， ldd --version 查看glibc的版本

       mkdir /usr/local/python3.12.4
       # --enable-optimizations 它会为 Python 启用一些优化以提高其性能
       ./configure --enable-optimizations CFLAGS="-std=c11"  --prefix=/usr/local/python3.12.4

       # 5. 开始编译成可执行程序
       #  对于 macOS，使用 sysctl -n hw.ncpu 获取 CPU 核心数
       # centos cat /proc/cpuinfo | grep processor | wc -l
       # 注意：报错之后，make clean 之后重新编译
       make -j$(sysctl -n hw.ncpu)  

       # altinstall 是为了避免覆盖系统默认的 Python 版本
       make altinstall

       # 5. 验证安装
       /usr/local/python3.12.4/bin/python3 --version

       # 配置环境变量（可选）
       # 您可能希望配置环境变量，使其能够全局访问到新安装的 Python 可执行文件
       # 编辑 .bashrc 或者其他 Shell 配置文件，添加如下行（假设您选择了 /usr/local/python3 作为安装路径）：
       export PATH=/usr/local/python3.12.4/bin:$PATH

       # 使修改生效：
       source ~/.bashrc

     ```
* 验证是否成功
  ```bash
   python3 -V
  ```
## 虚拟环境
* 虚拟环境：
  - 为了解决程序包版本依赖问题而创建，不同的应用将可以使用不同的虚拟环境，在虚拟环境下使用不影响全局环境
  - 用于创建和管理虚拟环境的模块称为 venv，最新版本的 Python 自带
* Venv 
  > Python 内置的虚拟环境管理工具，用于创建隔离的 Python 环境，以避免包冲突,并不提供包管理功能。
  1. 创建：python3 -m venv .venv
    - 注意：在 macos 中存在多python版本加具体版号，如 python3.10 -m venv .venv
    - windows： python -m venv .venv
  2. 激活：
    - 在 windows 上激活: .venv\Scripts\activate
    - 在 Unix 或 MacOS 上激活: source .venv/bin/activate 
  3. 在虚拟环境下安装包： pip install xxx
  4. 撤销虚拟环境：终端输入 deactivate
* [Conda](./conda.md)
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