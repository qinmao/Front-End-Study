# redis 安装

## mac
* Homebrew 方式
  - brew install redis
* 常用命令
 ```bash
    redis-server -v

    # redis默认是前台启动，如果我们想以守护进程的方式运行（后台运行），
    # 可以在 redis.conf 中将 daemonize no,修改成yes即可。

    # 启动:方式一
    brew services start redis
    brew services restart redis

    # 启动:方式二
    redis-server /usr/local/etc/redis.conf

    # brew 关闭
    brew services stop redis

    # 强行终止
    sudu pkill redis-server

    # 查看redis服务状态
    brew services info redis

    # 查看redis服务进程
    ps axu | grep redis

  ```
## linux（centos）
* 源码安装
 ```bash
    wget https://download.redis.io/redis-stable.tar.gz
    tar -xzvf redis-stable.tar.gz
    cd redis-stable
    make

    # 编译成功后产出链两个文件夹在 src 下
    # redis-server: the Redis Server itself
    # redis-cli is the command line interface utility to talk with Redis.

    # 安装 redis 的二进制文件，在 /usr/local/bin 运行
    make install
    
    # 成功后在前台运行服务
    redis-server
  ```
* yum 包管理工具安装
 ```bash
    # 源上是 3.2的版本，如果安装最新版请安装第三方源
    # yum 安装 redis7，下载三方拓展源
    wget http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
    
    # 安装 remi.repo
    rpm -ivh remi-release-7.rpm
    # 更新yum 缓存
    
    yum clean all
    yum makecache

    # 因为多个扩展源包含了redis源，默认 epel 源优先，我们可以使用–enablerepo参数指定安装源。
    yum --enablerepo=remi install -y redis

    redis-server --version

    # 配置redis
    vim /etc/redis.conf
  ```
## windows
  * TODO
## 配置
* 设置密码（默认是没有开启用户认证的）
  - 修改配置文件 
 ```bash
   nano /usr/local/etc/redis.conf
   # 查找并修改 requirepass 配置项。如果该项被注释掉了（以 # 开头），则取消注释并设置密码。如果该项不存在，则在文件末尾添加以下内容：
   requirepass your_password
  ```
  - 重启 redis 服务

 