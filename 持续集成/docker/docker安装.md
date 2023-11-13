# docker 各环境下的安装
## docker 的版本
* Docker 是一个开源的商业产品，有两个版本：社区版（Community Edition，缩写为 CE）和企业版（Enterprise Edition，缩写为 EE），一般我们说的都是 CE 版本
## CentOS（阿里云）
* 安装新版本之前先卸载旧的
  ```bash
    sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
  ```
  - Images, containers, volumes, and networks stored in /var/lib/docker/ aren’t automatically removed when you uninstall Docker.
* 安装
  ```bash
    # Install the yum-utils package (which provides the yum-config-manager utility) and set up the repository.
    yum install -y yum-utils

    # 添加稳定的Docker软件源
    yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

    # 安装 docker 
    yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    # 安装完测试
    docker -v
    docker info

    # Docker 需要用户具有 sudo 权限，为了避免每次命令都输入sudo，可以把用户加入 Docker 用户组
    sudo usermod -aG docker $USER
  ```
## 启动
  ```bash
   # service 命令的用法
   sudo service docker start

   # systemctl 命令的用法
   systemctl start docker    # 启动 Docker 
   systemctl stop docker     # 停止 Docker服务
   systemctl restart docker  # 重启 Docker

   systemctl enable docker    # 设置Docker开机自启动
   systemctl status docker    # 查看Docker的运行状态
  ```
## mac 安装 Docker 软件
  - brew 安装
  - 客户端 安装