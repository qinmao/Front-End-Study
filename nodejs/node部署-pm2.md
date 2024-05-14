# 部署 nodejs 服务
## centos 离线部署
### nodejs 卸载
```bash
    whereis node    # 找到安装路径

    # 手动删除残留文件
    rm  /usr/local/bin/node
    rm  /usr/local/bin/npm
    rm  /usr/local/bin/pm2
    rm /usr/local/node-v16.15.1-linux-x64
```
### nodejs 安装
> 两种离线安装的方式
* 源码安装
  1. 官网下载指定版本（https://nodejs.org/zh-cn/download）包 如 node-v16.15.1-linux-x64.tar.xz
  2. 拷贝到linux服务器上 任意文件夹 如 /usr/local
  3. 在服务器上解压
    ```bash
      xz -d node-v16.15.1-linux-x64.tar.xz
      tar -xvf node-v16.15.1-linux-x64.tar
    
      # 创建软连接（类似windows建立快捷方式）
      ln -s  /usr/local/node-v16.15.1-linux-x64/bin/node /usr/local/bin/node 
      ln -s  /usr/local/node-v16.15.1-linux-x64/bin/npm /usr/local/bin/npm 
   ```
  4. 安装 pm2
    - 找到已下载好的 pm2 包拷贝到服务器 /usr/local/node-v16.15.1-linux-x64/lib/node_modules 文件夹下
    - 创建软连接 ln -s /usr/local/node-v16.15.1-linux-x64/lib/node_modules/pm2/bin/pm2 /usr/local/bin/pm2
    - 如果报权限问题：执行 chmod 777 /usr/local/bin/pm2
  5. 测试命令 
    ```bash
       node -v
       npm -v
       pm2 -v 
    ```
* yum 离线安装（通用方式）
  ```bash
    # 找一台联网的机器(yum源已切换国内)和内网的机器一样的配置
    
    # 版本过低可能要安装这个
    # yum install gcc-c++ make

    # 1. yum 源上的版本不是最新的 设置nodejs 源 注意：node 18 不支持 centos7 了
    curl --silent --location https://rpm.nodesource.com/setup_18.x | sudo bash

    yumdownloader --resolve --destdir=/home/rpm nodejs  

    # 2. 将第一步下载 的 /home/rpm 下的所有 rpm 文件, copy 上传到内网的机器 如 /home/rpm 文件夹下

    # 3. 进入内网机器 当前目录安装
    cd /home/rpm
    # 方式一（存在依赖的问题）
    rpm -ivh * --nodeps --force

    # 方式二（推荐 yum会自动搜寻依赖关系并安装 ）
    yum localinstall *.rpm -y

    # 安装 pm2 同上

    # 安装完后运行一下命令检测
    node -v 
    pm2 -v

    ```