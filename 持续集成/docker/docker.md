# docker
## what Docker?它解决了什么问题？
* 背景：开发最麻烦的事之一就是环境配置的问题，不同的环境代码运行可能存在问题
* 虚拟机：为了解决环境的问题出现了虚拟机，虚拟机自带环境但是有几个缺点
  - 资源占用多
  - 冗余步骤多
  - 启动慢
* linux 容器：为了解决虚拟机的这些缺点，linux 发展出了另一种虚拟化技术：Linux 容器（Linux Containers，缩写为 LXC） Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离，由于容器是进程级别的，相比虚拟机有很多优势。
  - 启动快
  - 资源占用少
  - 体积小
* docker 是属于linux 容器的一种封装，提供简单易用的容器使用接口。它是目前最流行的 Linux 容器解决方案。Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。
## Docker 实现原理的三大基础技术：
* Namespace：实现各种资源的隔离
* Control Group：实现容器进程的资源访问限制
* UnionFS：实现容器文件系统的分层存储，写时复制，镜像合并
## docker的用途
  > Docker 的主要用途，目前有三大类。
  - 提供一次性的环境。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。
  - 提供弹性的云服务。因为 Docker 容器可以随开随关，很适合动态扩容和缩容。
  - 组建微服务架构。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。
## 用 docker 部署的好处：
  - 提供一致的运行环境
  - 更轻松的迁移
  - 持续交付和部署
  - 快速部署、回滚
## 镜像选择标准
* 选择标准
  - 官方的
  - 经常维护的
  - 体积小的
* Node Docker tag
  + node:<version>基于 Debian,官方默认镜像。当你不确定你需要什么的时候选择这个就对了。这个被设计成可以丢弃的镜像，也就是可以用作构建源码使用。体积挺大。
  + node:<version>-slim 基于 Debian，删除了很多默认公共的软件包，只有node运行的最小环境。除非你有空间限制，否则推荐使用默认镜像。
  + node:<version>-alpine 基于 alpine 比 Debian 小的多。如果想要最小的镜像，可以选择这个做为 base。需要注意的是，alpine 使用 musl 代替 glibc。一些c环境的软件可能不兼容
  + 综合考虑选择 lts-bullseye-slim
## image 文件
* 特性
  - Docker 把应用程序及其依赖，打包在 image 文件里面，通过这个文件，才能生成 Docker 容器，image 文件可以看作是容器的模板
  - image 是二进制文件，一个 image 文件往往通过继承另一个 image 文件，加上一些个性化设置而生成
  - image 文件是通用的，一台机器的 image 文件拷贝到另一台机器，照样可以使用
* 本地image管理
  ```bash
  docker image ls   # 来列出本地主机上的image文件
  docker image rmi [image_id|imageName] # 删除本地一个或多个镜像，-f 强制删除；
  docker rmi $(docker images -q)        # 删除所有docker镜像：
  ```
## Dockerfile 文件
* 它是一个文本文件，用来配置 image。Docker 根据该文件生成二进制的 image 文件。
 ```Dockerfile
    FROM node:18.16.0-bullseye-slim
    # 设置容器上海时间
    ENV TZ=Asia/Shanghai \
        DEBIAN_FRONTEND=noninteractive
    RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata && rm -rf /var/lib/apt/lists/*
    #  指定工作目录
    WORKDIR /usr/src/app

    # 拷贝包管理文件到/usr/src/app 根目录下
    COPY package*.json ./

    # npm 源，选用国内镜像源以提高下载速度
    RUN npm config set registry https://mirrors.cloud.tencent.com/npm/

    # npm 安装依赖
    RUN npm install --only=production

    # 将当前目录（dockerfile所在目录）下所有文件都拷贝到工作目录下
    COPY . ./

    EXPOSE 3000

    ENTRYPOINT ["npm", "run"]
    # 执行启动命令
    CMD ["start"]
  ```
## 生成image文件
```bash
  # -t 参数用来指定 image 文件的名字，后面还可以用冒号指定标签。如果不指定，默认的标签就是latest。
  # 点表示 Dockerfile 文件所在的路径
  docker build  -t gateway:0.0.1 .   # 根据 Dockerfile 配置文件 生成一个名为 ateway:0.0.1的 镜像文件
```
## 容器
* 特性
  - image 文件生成的容器实例，本身也是一个文件，称为容器文件，一旦容器生成，就会同时存在两个文件： image 文件和容器文件
  - 而且关闭容器并不会删除容器文件，只是容器停止运行而已
* 容器的管理
  ```bash
    docker container ls         # 列出本机正在运行的容器
    docker container ls -a      # 查看所有的容器,包括终止运行的容器
    docker ps 
    docker ps -a                          

    docker rm [containerID]    # 删除容器
    docker rm $(docker ps -aq) # 删除所有容器
    docker run  ${container_id}  # 启动容器

    # 根据镜像文件启动容器，每运行一次，就会新建一个容器
    docker run -p --name=c3 8000:3000 gateway:0.0.1   # 启动容器 并映射容器端口 3000 到本机 8000
    docker run -p 8000:3000 -itd gateway:0.0.1 # 启动容器 并映射容器端口 3000 到本机 8000 以守护的形式
    # 或者
    docker run -p 8000:3000 -itd gateway:0.0.1 /bin/bash

    docker exec -it [containerID] /bin/bash  # 进入一个正在运行的 docker 容器
    # 或者
    docker exec -it [containerID] /bin/sh

    # 启动已经生成、已经停止运行的容器文件。
    docker start ${container_id} # 启动已终止的容器
    docker stop ${container_id}  # 停止容器
    docker stop $(docker ps -q) & docker rm $(docker ps -aq)  # 停用并删除容器
   
    docker kill                    # 终止容器运行
    docker kill $(docker ps -aq) # 杀死docker有关的容器：

  ```
## CMD与RUN命令
* RUN 
  - run 命令在 image 文件的构建阶段执行，执行结果都会打包进入 image 文件
  - 一个 Dockerfile 可以包含多个RUN命令
* CMD 表示容器启动后执行,只能有一个CMD 命令 
## 镜像仓库
* login
  - 登陆到一个Docker镜像仓库,未指定镜像仓库地址，默认为官方仓库 Docker Hub
  - 例子:docker login -u 用户名 -p 密码
  - docker logout
* 操作
  - pull xxx:下载这xxx这个镜像
  - push 将本地的镜像上传到镜像仓库,要先登陆到镜像仓库, 例子:docker push myapache:v1
  - search: 从 Docker Hub 网站来搜索镜像,找适合的下载
## 数据卷
* 概念
  - 是宿主机中的一个目录或文件
  - 容器目录和数据卷目录绑定后，对方的修改会立即同步
  - 一个数据卷可被多个容器同时挂载
  - 一个容器也可被挂载多个数据卷
* 作用
  - 容器数据持久化
  - 外部机器和容器间接通信
  - 容器之间数据交换
* 配置数据卷
  - 语法：docker run .. -v 宿主机目录（文件）:容器内目录（文件）...
  + 注意
    - 目录必须是绝对路径
    - 目录不存在会自动创建
    - 可挂载多个数据卷
  ```bash
    docker run -it --name=c3 -v /home/data:/home/data centos:7
  ```
* 配置数据卷容器
  ```bash
  # 创建c3 数据卷容器 -v 参数设置数据卷
  docker run -it --name=c3 -v /volume centos:7 /bin/bash

  # 创建c1 c2 容器 使用 --volume-from 参数设置数据卷
  docker run -it --name=c1 --volume-from c3 centos:7 /bin/bash
  docker run -it --name=c2 --volume-from c3 /bin/bash
  ```
## 容器部署遇到的问题
* docker容器内应用访问宿主机的MySQL？
 ```bash
   # 1. 开放数据库端口
   # 开放3306端口
   firewall-cmd --zone=public --add-port=3306/tcp --permanent
   # 刷新一下
   firewall-cmd --reload

  # 2. 查看容器是从哪个IP连宿主机MySQL
  docker exec -it 容器ID ip addr

  # 开放权限给这个IP
  mysql -u root -p
  # 进入mysql后，开放权限，当root用户以pwd（密码记得换成自己的）从端口172.17.0.3登入时，允许它操作数据库的所有表，下面的单引号别省了
  grant all privileges on *.* to 'root'@'IP' identified by 'pwd' with grant option;

  ```
* docker容器内访问宿主机的或第三方接口？
## 日志
 ```bash
 docker logs --since 30m 容器id
 ```
## 网络问题
* TODO
## docker compose
* TODO
