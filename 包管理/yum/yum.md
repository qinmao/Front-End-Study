# yum包管理  
> centos、redhat 使用的包管理器，自动帮助我们处理安装依赖关系。 软件安装包格式为 rpm

## 介绍
  - YUM是RPM族(CentOS/Redhat/Fedora/SuSE...)Linux系统软件包的管理工具。该工具以rpm软件包的包头(header)写入的依赖信息为依据，分析软件之间依赖关系，在安装软件时如果有依赖软件能够自动安装。
  - yum 在得到正确的参数后，会首先从/etc/yum.repo.d/*.repo路径下的repo文件中取得软件仓库的地址并下载"元数据"(metadata)，metadata含注册于该软件仓库内所有软件包的包名及其所需的依赖环境等信息，yum得到这些信息后会和本地已有环境做对比，进而列出确认需要安装哪些包，并在用户确认后开始安装。

## yum 配置
> 默认路径为 /etc/yum.conf
* 常见参数说明
  - cachedir： 下载的rpm包的存放位置 
  - keepcache：值为0时，不长期保留下载的rpm包，值为1时则会保留
  - debuglevel：除错级别，0──10,默认是2
  - pkgpolicy：包的策略。若设置了多个repository，而同一软件在不同的repository中同时存在，newest值 安装最新版本。last则yum会将服务器id以字母表排序，并选择最后的那个服务器上的软件安装。一般都是选newest。

* yum客户端repo配置
  - 主要是配置repo文件。当repo配置好了之后，用户可以使用配置文件中的yum源来安装一个软件或一组软件。
  - 默认的 repo 文件会保存在 /etc/yum.repo.d/ 目录下，以.repo为后缀。

  + repo 文件常用属性
    - serverid：是用于区别各个不同的repository，必须有一个独一无二的名称。
    - name：是对repository的描述，支持像 $releasever $basearch 这样的变量。
    - mirrorlist：指定了一个URL地址，该地址是一个包含有众多源镜像地址的列表，当用户通过yum安装或升级软件时，yum会试图依次从列表中所示的镜像源中进行下载，如果从一个镜像源下载失败，则会自动尝试列表中的下一个。若列表遍历完成依然没有成功下载到目标软件包，则向用户抛错。
    - baseurl：后可以跟多个url，你可以自己改为速度比较快的镜像站，但baseurl只能有一个。
    - failovermethod： 多源可供选择时，决定其选择的顺序 默认oundrobin随机选择，priority则根据url的次序从第一个开始
    - enabled=0 禁用软件仓库，1 启用

  + repo文件常用变量
    - $releasever：发行版的版本，从[main]部分的distroverpkg获取，如果没有，则根据redhat-release包进行判断。
    - $arch：cpu体系，如i386、x86_64等。
    - $basearch：cpu的基本体系组，如i686和athlon同属i386，alpha和alphaev6同属alpha。

* yum源配置
  - 官方源：库都是比较旧的
  - epel 三方拓展软件源，比较新  yum install -y epel-release

  ```bash
    yum repolist enabled         # 查看当前使用的源
    yum repolist all             # 列出所有的源

    wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

    yum clean all        # 清楚所有缓存packages/headers/oldheaders
    yum makecache        # 生成元数据缓存

  ```

## yum-utils
> 该工具是YUM工具包的子集
* 安装：yum install yum-utils -y
* 添加源
  - yum-config-manager --add-repo=源url地址
  - 添加阿里源: yum-config-manager --add-repo https://mirrors.aliyun.com/repo/Centos-7.repo
* 下载离线的rpm包
  ```bash
    # 主软件包和基于你现在的操作系统所缺少的依赖包一并下载 
    yumdownloader --resolve --destdir /home/rpm package1 

    # 下载全量依赖包
    repotrack packageName
  ```
* 清理本地安装的RPM软件包
  - package-cleanup --dupes       列出重复的rpm包 
  - package-cleanup --cleandupes  扫描重复安装的软件包，并删除老版本的软件包

## 列出存储库中的包
  ```bash
    yum list             # 列出所有已经安装和可以安装的程序包
    yum list xxx --showduplicates  # 查看源中提供哪些包版本
    yum list installed   # 列出所有已安装的包
    yum list extras      # 列出已安装的但不在官方库中的rpm包，如安装了epel源的rpm包会列出来
    yum list kernel
    yum check-update     # 列出所有可更新的软件清单

  ```

## 查看包信息
  ```bash
    yum info package1        # 查看软件包描述信息和概要信息
    yum deplist  package1    # 显示rpm软件包的所有依赖关系
  ```

## 清理缓存
  ```bash
    yum clean packages    # 清除缓存目录下的软件包
    yum clean headers     # 清除缓存目录下的 headers
    yum clean oldheaders  # 清除缓存目录下旧的 headers
    yum clean all         # 清楚所有缓存packages/headers/oldheaders
  ```

## rpm
* 命令参数
  - -q 查询已安装的包
  - -i 安装 
  - -U 升级
  - -e 卸载
  - -V 验证软件包
  - -h 显示安装进度
* 查询    
  - rpm -qa|grep php
  - rpm -qa|grep nginx
* 安装
  - rpm -ivh xxx.rpm 
  - 安装的问题：
    ```bash
    # 包中的部分文件已经存在，会报"某个文件已经存在"的错误，replacefiles 忽略这个报错而覆盖安装
    rpm -ivh --replacefiles 包名.rpm

    # 如果软件包已经安装，那么此选项可以把软件包重复安装一遍。
    rpm -ivh --replacepkgs 包名.rpm
  ```
* 升级
  - rpm -Uvh xxx.rpm
* 卸载
  ```bash
    # 卸载时注意依赖顺序
    rpm -qa|grep php      # 查看还有哪些包未卸载 如 php
    rpm -e xxx.rpm        # 卸载指定的包
  ```
* 缺陷
  - 它无法自动解决RPM包之间的依赖性。

## 在线安装
* yum 安装
  - yum install -y 包名

## 离线安装
* yum
  - yum localinstall xxx.rpm -y
* rpm
* 源码安装(nodejs为例)
  - 下载源码包：node-v16.15.1-linux-x64.tar.xz
  - 拷贝到离线机器上，解压到指定文件夹
    ```bash
      xz -d node-v16.15.1-linux-x64.tar.xz
      tar -xvf node-v16.15.1-linux-x64.tar
    ```
  - 创建软连接（类似windows建立快捷方式）
    ```bash
      ln -s  /usr/local/node-v16.15.1-linux-x64/bin/node /usr/local/bin/node 
      ln -s  /usr/local/node-v16.15.1-linux-x64/bin/npm /usr/local/bin/npm 
    ```     
  - 权限问题：执行 chmod 777 /usr/local/bin/pm2
    

## 卸载
* yum 
  - yum remove xxx  卸载指定的包
  - yum autoremove 包名 卸载指定包并自动移除依赖包
* rpm 
* 源码安装卸载
  ```bash
    whereis node    # 找到安装路径

    # 手动删除残留文件
    rm  /usr/local/bin/node
    rm  /usr/local/bin/npm
    rm  /usr/local/bin/pm2
    rm  /usr/local/node-v16.15.1-linux-x64
```

## 更新
  ```bash
    yum update       # 更新全部包,会保留旧版本和配置(生产环境中建议使用)
    yum update package1 # 更新指定的包
    yum upgrade      # 更新全部包,删除旧版本的 package
  ```