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
    # brew 安装文件的位置
    # nginx.conf 配置文件位置：/usr/local/etc/nginx/nginx.conf
    # nginx 安装目录：/usr/local/Cellar/nginx
    # nginx 网站目录：/usr/local/var/www

    brew install nginx
    
    # 启动：
    brew services start nginx
    # 停止：
    brew services stop nginx

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
* 方式二：源码安装 nginx 流媒体服务
  - 要想搭建 RTMP 流媒体服务器，除了需要 Nginx 之外，还需要另外两个库 Nginx RTMP Module 和 OpenSSL。
  + Nginx RTMP Module 是 Nginx 的一个插件。它的功能非常强大：
    - 支持 RTMP/HLS/MPEG-DASH 协议的音视频直播；
    - 支持 FLV/MP4 文件的视频点播功能；
    - 支持以推拉流方式进行数据流的中继；
    - 支持将音视频流录制成多个 FLV 文件； 
  ```bash
    # 卸载已安装的源码版本
    nginx -s stop
    sudo rm -rf /usr/local/nginx
    sudo rm -rf /usr/local/bin/nginx

    # 1. 下载最新稳定版源码包
    wget -c http://nginx.org/download/nginx-1.27.2.tar.gz
    # 解压
    tar -zvxf nginx-1.27.1.tar.gz 

    # 下载 nginx-rtmp-module 源码，存放的位置最好与 Nginx 源码目录并行
    # git clone https://github.com/arut/nginx-rtmp-module.git
    wget -c https://github.com/arut/nginx-rtmp-module/archive/refs/tags/v1.2.2.tar.gz 
    tar -zvxf nginx-rtmp-module-1.2.2.tar.gz

    # 下载 openssl 下载失败可以模拟浏览器下载 --user-agent="Mozilla/5.0"
    wget -c https://github.com/openssl/openssl/releases/download/openssl-3.3.2/openssl-3.3.2.tar.gz
    tar -zvxf openssl-3.3.2.tar.gz

    # 2. 编译 OpenSSL & Nginx
    cd openssl-3.3.2
    ./config
    make && sudo make install

    # 编译带 RTMP Module 功能的 Nginx
    cd nginx-1.27.1

    # 传统的方式，推荐使用动态模块的形式
    # 查看支持哪些参数
    ./configure --help|more 

    ./configure --prefix=/usr/local/nginx --with-http_ssl_module  --add-module=../nginx-rtmp-module-1.2.2 --with-debug

    # add-module：指明在生成 Nginx Makefile 的同时，也将 nginx-rtmp-module 模块的编译命令添加到 Makefile 中。
    # http_ssl_module：指定 Ngnix 服务器支持 SSL 功能。
    # with-debug：输出 debug 信息,要做的是实验环境，所以输出点信息是没问题的。

    make CFLAGS="-Wno-unused-but-set-variable" && sudo make install

    # 3. 创建软连接到 Nginx 执行文件
    sudo ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/nginx

    # 启动
    nginx

    # 检查模块是否加载：
    nginx -t

    # 查看 Nginx 的编译信息：
    nginx -V

    # 4. 配置 Nginx 见nginx的配置文件

    # Linux上查看 1935 端口是否已打开
    netstat -ntpl | grep 1935 
    lsof -i:1935

    # 服务配置后 向服务推流
    # -re，代表按视频的帧率发送数据，否则 FFmpeg 会按最高的速率发送数据
    # -c copy，表示不对输入文件进行重新编码；
    # -f flv，表示推流时按 RTMP 协议推流

    # IP 后面的子路径 live 是在 Nginx.conf 中配置的 application 名字
    # live 子路径后面的名字是可以任意填写的流名。你可以把它当作一个房间号来看待，在拉流时你要指定同样的名字才可以看到该节目

    ffmpeg -re -i xxx.mp4 -c copy -f flv rtmp://IP/live/stream

    # 服务配置后 向服务拉流观看
    # 方式一：VLC。在 PC 机上可以使用 VLC 播放器观看，操作步骤是点击右侧的openmedia->网络->输入rtmp://IP/live/test
    # 方式二：FFplay。它是由 FFmpeg 实现的播放器，可以说是目前世界上最牛的播放器了。使用 FFplay 的具体命令如下：ffplay rtmp://host/live/test。

  ```
## 动态模块安装
  > 从 Nginx 1.9.11 开始，Nginx 支持动态模块（即在运行时加载的模块）。这意味着可以编译并加载模块而无需重新编译 Nginx 本身
  ```bash
   # 如：新添加一个模块
   # 1. 配置和编译
   ./configure --add-dynamic-module=../ngx_http_new_module
   # 临时禁用警告
   make modules CFLAGS="-Wno-unused-but-set-variable"

    # 2. 将编译好的模块复制到 Nginx 模块目录
    # 编译出的模块会存放在 objs/ 目录下，你需要将它复制到 Nginx 模块目录（如 /usr/local/nginx/modules/）
    sudo cp objs/ngx_http_new_module.so /usr/local/nginx/modules/
  
    # 3. 修改 Nginx 配置文件 /usr/local/nginx/conf/nginx.conf
    # 加载动态模块，必须在 http 块和 events 块之前
    load_module modules/ngx_http_new_module.so;

    # 重启 Nginx
    sudo nginx -s reload
    
    # 验证模块是否成功加载
    nginx -V

  ```