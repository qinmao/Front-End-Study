# npm 包发布
  
## 环境准备
* 私有内网环境：确保 GitLab 实例版本为 11.8 或更高，自带包管理
* 确保已安装 Node.js（自带 npm）。

## GitLab 包管理机制
* GitLab 的 NPM Registry 默认以项目为中心，所有包必须归属于某个具体项目。
* 发布到全局 Registry（仅限GitLab企业版）
* 如果必须实现类似 "全局包" 的效果，可通过以下方式模拟
  - 创建一个专门用于存放公共包的 GitLab 项目（如 shared-packages）。所有团队通过此项目的 Registry 发布/安装共享包：
    ```ini
        # .npmrc
        @shared:registry=http://gitlab.example.com/api/v4/projects/789/packages/npm/
    ```

## 使用注册表进行身份验证
  > 不管是什么环境，发布包都要身份验证，需要访问令牌来验证身份
* 公有环境：
   - 注册 npm 账号并登录，自动生成令牌
    ```bash
      # 第一次发布包
      npm adduser  # 按提示输入用户名、密码、邮箱,成功的时候默认你已经登陆了
      # 非第一次发布包，然后输入你创建的账号和密码和邮箱
      npm login
      npm token list  # 查看令牌
    ```
* 私有环境
  >必须向包注册表进行身份验证，才能从私有项目或私有组发布或安装包，如果是内部项目，您必须是 GitLab 实例的注册用户。 匿名用户无法从内部项目中提取包
  + 个人访问令牌（经验证发布包使用该 token 不行）
    - 用于个人账号的认证，允许访问 GitLab API 或私有仓库（如 NPM Registry）
    - 生成步骤：
      1. 点击头像，选择 “Settings”, 选择 Access Tokens，创建新令牌并保存：如 GITLAB_NPM_TOKEN
      2. 权限：最少勾选 api 和read_registry、write_registry， 过期时间：按需设置（建议长期项目选择无过期）
    - 适用场景：本地开发环境手动发布包，需要跨项目访问时的个人授权

  + 项目部署 Token （经验证发布包使用该 token 可以）
    - 允许访问项目中的所有包。适用于向多个项目授予和撤销访问权限 用户
    - 生成步骤：
      1. 进入项目 → Settings → Repository → Deply tokens。创建新令牌并保存：如 GITLAB_NPM_TOKEN
      2. 权限：勾选 read_package_registry/write_package_registry的选项

  + Group 部署 Token：（经验证发布包使用该 token 不行）
    - 允许访问组及其子组中的所有包

  + CI Job Token（CI 作业令牌）
    - GitLab CI/CD 作业运行时自动生成的临时令牌，用于访问当前项目资源。
    - 生成方式：无需手动创建，在 CI/CD 作业中通过 CI_JOB_TOKEN 环境变量自动注入。
    - 仅限当前项目和作业关联的权限（通常为 read_package 和 write_package）。
    - 适用场景：在 .gitlab-ci.yml 中自动发布包：
      ```yaml
        script:
            - echo "//gitlab.com/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=${CI_JOB_TOKEN}" > .npmrc
            - npm publish
      ```


## 创建并初始化项目
* 本地创建初始化
  ```bash
    mkdir my-package && cd my-package
    npm init  # 按提示填写字段（name, version, description, entry point 等）。
  ```
  + 关键字段：
    - name: 包名（全平台唯一，若被占用需改名）
    - version: 遵循语义化版本规则（SemVer，如 1.0.0）
    - main: 包的入口文件（如 index.js）
* 模版创建（GitLab创建为例）
  - 在 GitLab 中创建一个新项目：选择 Private（私有）
  - clone 到本地

## 修改项目内容
  - package.json 文件被创建后，创建一个当你的模块被需要的时候加载的文件。该文件的默认名称是index.js。添加一个函数作为 
  exports 对象。
  + 注意：
    - 你的项目里有部分私密的代码不想发布到 npm 上？将它写入.gitignore 或.npmignore中，上传就会被忽略了
  ```json
    {
        "name": "@<GROUP_OR_USERNAME>/<PACKAGE_NAME>", 
        "version": "1.0.0",
        "description": "My private npm package",
        "main": "index.js"
    }
  ```
  ```js
      // index.js
      exports.printMsg = function() {
        console.log("This is a message from the demo package");
      }
  ```

## npm发布配置
* 公有包发布配置
  ```bash
    npm login  # 输入用户名、密码、邮箱（需通过邮箱验证）。
    # 配置发布到哪个仓库或者写在 package.json 配置中
    npm config set registry https://registry.npmjs.org 
  ```
  ```json
    # package.json (推荐)
    "publishConfig": {
        "registry": "https://registry.npmjs.org/"
    }

  ```

* 私有包发布配置
  - 通过 .npmrc 文件定义 registry 和认证信息
  - 使用环境变量注入敏感信息（如 Token）创建 .env 文件（添加到 .gitignore）
  - gitlab npm 仓库有两种：一种是全局的 npm 仓库，一种是包存储在具体项目的仓库中，与项目绑定
   ```ini
    # .env
    GITLAB_NPM_TOKEN=<ACCESS_TOKEN>
   ```

   ```ini
    # .npmrc 替换以下变量：
    # <GITLAB_DOMAIN>：你的 GitLab 域名（如 gitlab.com 或私有部署地址）
    # <ACCESS_TOKEN>：生成的个人访问令牌
    # @your-scope 设置我们的想要的名称
    # projectId 在 GitLab上的具体的项目中获取到

    # 作用域包 (@your-scope) 的私有 Registry 地址
    # 对于项目
    # 作用域 (@your-scope) 必须与包名一致
    # GITLAB_NPM_TOKEN 取的项目的部署token
    # 指定npm 包发布的仓库地址
    @your-scope:registry=http://<GITLAB_DOMAIN>/api/v4/projects/<projectId>/packages/npm/
    # 发布认证
    //<GITLAB_DOMAIN/api/v4/projects/<project-id>/packages/npm/:_authToken=${GITLAB_NPM_TOKEN}

    # 如果使用私有证书，添加：
    # strict-ssl=false
   ```
   - 运行 npm publish 时，npm 默认会将包发布到 https://registry.npmjs.org（官方公共仓库）
   - publishConfig 覆盖全局的配置，将包发布到指定目标仓库地址，表示所有以 @your-scope 开头的包，发布时自动使用指定的 Registry URL
   - .npmrc 中配置了推送的仓库，publishConfig 可以省略，publishConfig 的优先级高于.npmrc
   - 推荐加上，指向行更明确，一旦本地.npmrc的配置不一样额可以统一发布的配置
   ```json
      "name": "@your-scope/your-package",
      "version": "1.0.0",
      "publishConfig": {
        "@your-scope:registry": "http://<GITLAB_DOMAIN>/api/v4/projects/<projectId>/packages/npm/"
      }
    ```

## 手动发布和更新
  ```bash
    # 发布包
    npm publish
    # 如果未在.env中配置环境变量，可直接在命令行注入
    # git bash
    GITLAB_NPM_TOKEN=your_token_here npm publish
    # 示例
    GITLAB_NPM_TOKEN=git-xxx npm publish
    # powershell
    $env:GITLAB_NPM_TOKEN=your_token
    npm publish

    npm view packageName  # 查看是否发布成功
    # 若包名为作用域包（如 @username/package-name），需添加 --access public
    npm publish   --access public

    # 更新包
    # 手动修改 package.json 中的 version。
    # 自动更新（推荐）
    npm version patch  # 修订号（1.0.1）
    npm version minor  # 次版本号（1.1.0）
    npm version major  # 主版本号（2.0.0）
    npm publish        # 重新发布

    #  撤销发布的包
    npm  unpublish 你的包名  # 72 小时内可撤销（慎用）
    # npm unpublish 的推荐替代命令 并不会在社区里撤销你已有的包，但会在任何人尝试安装这个包的时候得到警告
    npm deprecate <pkg>[@<version>] <message> 
    # 如
    npm deprecate penghuwanapp '这个包我已经不再维护了哟～'
  ```

## CI/CD 自动发布
参见[CICD](/解决方案/gitlab工具链/CICD.md)

## 安装发布的包
* 公有包：直接安装：npm install 包名
* 私有包: npm install @your-scope/your-package
  ```ini
    # 项目中 .npmrc 配置
    @your-scope:registry=https://<GITLAB_DOMAIN>/api/v4/packages/npm/
    # 设置允许下载包，就不用这个
    //gitlab.com/api/v4/packages/npm/:_authToken=${GITLAB_NPM_TOKEN}
   
  ```

## 遇到的问题
* npm ERR! you do not have permission to publish "your module name". Are you logged in as the correct user?
  - 提示没有权限，其实就是你的 module 名在 npm 上已经被占用啦，
  - 去 npm 搜索你的模块名称，搜不到，就能用，并且把 package.json 里的 name 修改过来，重新发布