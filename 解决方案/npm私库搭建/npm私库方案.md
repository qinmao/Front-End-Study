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
