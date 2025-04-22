# 搭建npm私有仓库
在内网环境下安装包

## 应用场景
* 发布私有包，不被团队外部的人使用
* 通过 proxy 下载私有仓库没有的包
* 缓存私有仓库没有的包，方便下次安装更快

## 搭建npm私服仓库方案
* Verdaccio（https://verdaccio.org）
  - 简介：轻量级、开源的 npm 私有仓库工具，基于 Node.js 开发，支持插件扩展。
  + 特点：
    - 零配置快速启动，适合小型团队或个人使用。
    - 支持代理公共 npm 仓库（缓存公共包）。
    - 支持用户权限管理（基于 htpasswd 或插件扩展）。
    - 支持 Docker 部署。
* Nexus Repository OSS/Pro（https://www.sonatype.com/products/nexus-repository）
  - 简介：Sonatype 公司推出的仓库管理工具（Nexus Repository Manager），支持多种包格式（npm、Maven、Docker 等）。
  + 特点：
    - 支持 npm 私有仓库、代理仓库和分组仓库（Group Repository）。
    - 提供企业级权限管理、审计、高可用性支持。
  - 适用场景：中大型企业、需要统一管理多语言依赖的场景。
* JFrog Artifactory（https://jfrog.com/artifactory/）
  - 简介：功能强大的通用仓库管理工具，支持 npm、Docker、Python 等 25+ 包格式。
  + 特点：
    - 提供企业级安全控制（RBAC、漏洞扫描）。
    - 支持高可用部署、异地复制、CI/CD 集成。
    - 提供 SaaS 版本（Artifactory Cloud）和本地部署。
    - 商业付费工具，功能全面。
  - 适用场景：大型企业、需要多语言依赖管理和 DevOps 集成。
* 云原生的方案
  - GitHub Packages
  - GitLab Package Registry
  - AWS CodeArtifact
  - Azure Artifacts

## verdaccio 搭建私库
* 环境要求
  - Node.js v18 或更高版本
* npm 安装运行
  ```bash
   # npm 安装
   npm install -g verdaccio 

   # npm 全局安装直接执行
   verdaccio
  ```
* docker 安装运行
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
* 发布 npm 包到 verdaccio 私有库
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
* verdaccio 配置
  - 首次运行会生成 config.yaml 
  ```bash
   verdaccio --config ~./config.yaml
  ```
* 离线同步包
  - 防止缓存导致的问题，最好先把本地缓存清理，安装后再同步
  - 将 storage 中的文件拷贝到内网环境下的指定位置
* 配置 npm 客户端使用私有仓库
  - 方式一
    ```bash
      npm set registry http://localhost:4873/
    ```
  - 方式二（推荐）：在你的 .npmrc 中设置一个 registry 属性
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
