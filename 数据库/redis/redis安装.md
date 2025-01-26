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
    ps -ef | grep redis

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
    dnf install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
    # 列出已安装的 MySQL 官方仓库包
    dnf list installed | grep redis
    # 因为多个扩展源包含了redis源，默认 epel 源优先，我们可以使用–enablerepo参数指定安装源。
    dnf --enablerepo=remi install -y redis
    redis-server --version

    # 查看和启动
    systemctl status redis
    systemctl start redis
    #  Redis 在系统启动时自动启动
    systemctl enable redis

    # 配置redis
    # 默认情况下，Redis 仅允许从本地连接（127.0.0.1）。为了允许远程访问，您需要修改 Redis 配置文件中的 bind 和 protected-mode 设置。
    vim /etc/redis/redis.conf

    # 修改后
    bind 0.0.0.0
    protected-mode no
    # 配置 Redis 密码（可选，但推荐）
    requirepass your_password

    systemctl restart redis

    # 连接
    redis-cli -h <redis-server-ip> -p 6379 -a yourpassword

  ```

 