## 安装/启动:（阿里云CentOS）
 1) yum update -y 
 2）https://help.aliyun.com/document_detail/60742.html?spm=a2c4g.11186623.4.2.40787c2bANz9WC
 3) 使用:https://help.aliyun.com/document_detail/51853.html?spm=a2c4g.11174283.6.968.afaa52fewlNmJZ
     systemctl start docker     #运行Docker守护进程
     systemctl stop docker      #停止Docker守护进程
     systemctl restart docker   #重启Docker守护进程
## what Docker?
<!-- http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html -->
Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口

Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。
## docker 的常用命令:
    镜像仓库:
        1. login 登陆到一个Docker镜像仓库,未指定镜像仓库地址，默认为官方仓库 Docker Hub
        例子:docker login -u 用户名 -p 密码
            docker logout
        2. pull xxx:下载这xxx这个镜像
        3. push 将本地的镜像上传到镜像仓库,要先登陆到镜像仓库
        例子:docker push myapache:v1
        4. search:从 Docker Hub 网站来搜索镜像,找适合的下载

    本地镜像管理:
        1. docker image ls 来列出本地主机上的镜像。
        2. docker image rmi 删除本地一个或多个镜像。
       例子: docker image rmi -f ${image_id}  -f :强制删除；

    docker info 显示 Docker 系统信息，包括镜像和容器数
    docker kill 手动终止不会自动终止的容器
    docker create ：创建一个新的容器但不启动它
    例子：使用docker镜像nginx:latest创建一个容器,并将容器命名为myrunoob
    docker create  --name myrunoob  nginx:latest 

    容器:
        1. docker container ls 查看运行中的容器
        2. docker  ls -a 查看所有的容器
        3. docker logs -f ${container_id} 查看某容器内日志
        4. docker  start ${container_id} 启动已终止的容器
        5. docker  stop ${container_id}  停止容器
        6. docker  rm ${container_name || container_id} 删除容器
        7.进入某容器，并有shell执行环境
            # -i表示：交互式操作，-t表示：终端
            docker exec -it ${container_id} bash
            # 可通过输入 exit 退出 

        8. docker rm $(docker ps -aq) 删除所有容器
            docker rmi $(docker image ls)
        9. docker stop $(docker ps -q) & docker rm $(docker ps -aq) 停用并删除容器
## Docker的应用场景
Web 应用的自动化打包和发布。

自动化测试和持续集成、发布。

在服务型环境中部署和调整数据库或其他的后台应用。

Docker 的主要用途，目前有三大类。
（1）提供一次性的环境。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。

（2）提供弹性的云服务。因为 Docker 容器可以随开随关，很适合动态扩容和缩容。

（3）组建微服务架构。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。
## docker+node.js部署步骤？
docker 部署步骤:
构建镜像
1）编写Dockerfile文件（文本文件）
    # 使用node做为镜像 (:8.11可以加标签指定具体的版本)
    FROM node:8.11 
    # 在容器中创建该目录
    RUN mkdir -p /test
    # 设置容器的工作目录为该目录
    WORKDIR /test
    # 向外提供3000端口
    EXPOSE 3000
    # 容器创建完成后执行的命令
    CMD 

2）创建 image 文件:docker image build 命令创建 image 文件
    $ docker image build -t koa-demo .
    # 或者
    $ docker image build -t koa-demo:0.0.1 .

    -t 参数用来指定 image 文件的名字，后面还可以用冒号指定标签。
    如果不指定，默认的标签就是latest。
    最后的那个点表示 Dockerfile 文件所在的路径，上例是当前路径，所以是一个点。

3）查看创建成功后的image文件：
    docker image ls 就能看到image 文件koa-demo了

4.1）生成容器
    docker run 命令会从 image 文件生成容器。
    $ docker run -p 8000:3000 -it koa-demo /bin/bash
    # 或者
    $ docker run -p 8000:3000 -it koa-demo:0.0.1 /bin/bash

    -p参数：容器的 3000 端口映射到本机的 8000 端口。(应用外部访问的接口)

    -it参数：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器。
    --rm 容器退出后随之将其删除
    -d 后台运行
    koa-demo:0.0.1： image 文件的名字（如果有标签，还需要提供标签，默认是 latest 标签）。

    /bin/bash：容器启动以后，内部第一个执行的命令。这里是启动 Bash，保证用户可以使用 Shell。
    没问题容器创建成功，也可以docker container ls 查看运行中的容器

4.2) 也可以编写一个启动容器的shell脚本

以上是手动原始的构建，可以使用docker-compose 这个大杀器来构建
https://www.cnblogs.com/neptunemoon/p/6512121.html#toc_30
## jenkins

1）先写简单的node koa的项目并上传到GitHub上备用，拉取最新的jenkins镜像，并启动
    1. docker pull jenkins:latest
	2. 	sudo docker run -d -u 0 --privileged  --name jenkins_node1 -p 49003:8080 -v /etc/localtime:/etc/localtime -v /root/jenkins_node1:/var/jenkins_home jenkins:latest

    命令解析：

    1. -u 0

    指的是传入root账号ID，覆盖容器中内置的账号

    2. -v /root/jenkins_node1:/var/jenkins_home
    指的是 将docker容器内的目录/var/jenkins_home映射到宿主机/root/jenkins_node1目录上

    --name jenkins_node1

    将容器命名为 jenkins_node1

    -p 49003:8080

    端口映射，将容器的8080端口映射到宿主机的49003端口

    --privileged

    赋予最高权限

    整条命令的意思

    运行一个镜像为jenkins:latest的容器，命名为jenkins_node1，使用root账号覆盖容器中的账号，赋予最高权限，将容器的
    /var/jenkins_home映射到宿主机的
    /root/jenkins_node1目录下，映射容器中8080端口到宿主机49003端口

2) 查看jenkins密码
    cat /root/jenkins_node1/secrets/initialAdminPassword


用docker 部署的理由：

作者：他石
链接：https://zhuanlan.zhihu.com/p/39241059
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

1）提供一致的运行环境。在任何环境下使用 Docker 构建的镜像的运行环境都是确定的，Docker 给应用提供了一个从开发到上线均一致的环境。比如 Node.js 项目在不同版本下性能表现不一致，开发环境用的是 Node.js 6，UAT 环境用了 Node.js 10，那么很可能接口的压测结果不一致。

2）更轻松的迁移。由于 Docker 确保了运行环境的一致性，使得应用的迁移更加容易。可以很轻易将在一个平台上运行的应用，迁移到另一个平台上，而不用担心运行环境的变化导致应用无法正常运行。比如接到任务说下周要加一个分区，或者客户要求部署私有云，可以很放心的说镜像拿走，而不用担心环境问题。

3）持续交付和部署。代码从开发到最终在生产环境上的部署，需要经过很多中间环境，通过定制应用镜像来实现持续集成、持续交付，非常有助于降低构建持续交付流程的复杂程度。在中小型公司可以考虑直接使用 GitLab CI 搭建持续集成环境。

4）快速部署、回滚。得益于 Docker 使用的分层存储和镜像技术，使得扩展镜像变得非常简单。可以预先把程序需要的依赖，静态资源等在构建过程中添加到镜像，在需要的时候启动该容器实现快速部署、回滚、止血。比如当出现线上事故需要回滚时，传统做法是触发某些自动化工具去拉代码装依赖打包最后部署，一旦某个环节出了问题，譬如网络被墙了导致依赖拉不下来，构建失败等等，小事故可能会演变为 P0 事故。