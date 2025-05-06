# verdaccio 搭建私库

## 环境要求
  - Node.js v18 或更高版本

## npm 安装运行
  ```bash
   # npm 安装
   npm install -g verdaccio 

   # npm 全局安装直接执行
   verdaccio
  ```

## docker 安装运行
  ```bash
    docker pull verdaccio/verdaccio:nightly-master

    # 离线安装：导出
    docker save -o <输出文件名>.tar <镜像名称>:<标签>
    # 在离线环境中导入镜像
    docker load -i <文件名>.tar  # 示例：docker load -i nginx.tar
    docker images   # 验证镜像是否导入成功

    # Docker 镜像运行
    docker run -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
  ```

## verdaccio 配置
  - 首次运行会生成 config.yaml 
  ```bash
   verdaccio --config ~./config.yaml
  ```

## 发布 npm 包到 verdaccio 私有库
  ```bash
   # 1. 创建用户
   # 输入用户名、密码、邮箱
   npm adduser --registry http://localhost:4873/

   # 2. 发布
   # 防止包发布到其他注册中心，在 package.json 中配置 publishConfig
   # { "publishConfig": { "registry": "http://localhost:4873" } }

   # 在项目根目录登录
   npm login --registry http://localhost:4873
   npm publish

   # 从本地仓库删除包
   npm unpublish <package-name>
  ```


## 离线同步包
  - 防止缓存导致的问题，最好先把本地缓存清理，安装后再同步
  - 将 storage 中的文件拷贝到内网环境下的指定位置
  
## 配置 npm 客户端使用私有仓库
  - 推荐方式：在你的 .npmrc 中设置一个 registry 属性
  ```bash
    registry=http://localhost:4873
  ```

## 服务自启动
  - 使用 pm2 管理进程：
  ```bash
    npm install -g pm2

    pm2 start verdaccio
    pm2 save
    pm2 startup

    pm2 restart verdaccio
    pm2 logs verdaccio

  ```
