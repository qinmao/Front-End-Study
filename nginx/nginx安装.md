# nginx 安装
## windows (是非服务的控制台应用程序)
  - 安装(http://nginx.org/en/download.html)
 ```bash
    cd c:\
    unzip nginx-1.17.2.zip
    cd nginx-1.17.2
    start nginx
  ```
## linux(centos)
  ```bash
    # 可以先查看一下
    yum list | grep nginx 
    yum install nginx
   ```
## mac
  ```bash
   brew install nginx
  ```
## 离线安装
* 方式一：yum
  ```bash
    # 默认epel 附带的不是最新，安装nginx三方源
    rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
    
    # 1. 下载离线rpm包
    yumdownloader --resolve --destdir /home/rpm  nginx-1.26.1-2.el7.ngx.x86_64  
    yum list nginx --showduplicates


    # 2.拷贝到离线机器上,进入目录
    cd /path/to/destination/home/rpm

    # 3. 使用 yum 安装软件包，这将安装当前目录下的所有 RPM 软件包。
    # yum 会解决依赖关系并进行装
    yum localinstall *.rpm
  ```
   
* 方式二：源码安装
