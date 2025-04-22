# 自建 Git 服务（GitLab）

## 版本
> 推荐使用清华镜像下载Gitlab-community edition
* 社区版 Gitlab-ce 免费
* 企业版 GitLab-ee 收费 

## 环境要求
* CPU：2 核以上
* 内存：4GB+（GitLab 官方推荐至少 4GB，实际建议 8GB+）
* 存储：50GB+（根据项目规模调整）
* 操作系统：Ubuntu/CentOS 等主流 Linux 发行版
* 端口开放
  - 80/HTTP 或 443/HTTPS（Web 访问）
  - 22/SSH（Git 克隆/推送）

## 安装依赖
  ```bash
    # Ubuntu/Debian postfix是邮件服务
    sudo apt install -y curl openssh-server ca-certificates postfix

    # CentOS/RHEL
    sudo yum install -y curl openssh-server postfix
    sudo systemctl enable sshd postfix
    sudo systemctl start sshd postfix
  ```

## 服务器安装 GitLab 
  ```bash
    # 镜像参考 https://mirror.tuna.tsinghua.edu.cn/help/gitlab-ce/
    # 官方脚本安装
    # Ubuntu/Debian
    curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
    sudo apt install gitlab-ce

    # CentOS/RHEL
    # 新建 /etc/yum.repos.d/gitlab-ce.repo，内容为
    # [gitlab-ce]
    # name=Gitlab CE Repository
    # baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el$releasever/
    # gpgcheck=0
    # enabled=1

    yum makecache
    yum install gitlab-ce

  ```

## 手动下载安装包（无法访问外网）
* 访问 GitLab CE 下载页面，选择对应系统的安装包。
* 上传到服务器，执行安装：
  ```bash
    # Ubuntu/Debian
    sudo dpkg -i gitlab-ce-<version>.deb

    # CentOS/RHEL
    sudo rpm -i gitlab-ce-<version>.rpm

    # yum 会解决依赖关系并进行装(推荐)
    yum localinstall *.rpm
  ```

## docker 部署
1. mac|windows 安装 Docker Desktop 安装后启动,服务器命令行安装
2. 拉取 GitLab CE 镜像
  ```bash
    docker pull gitlab/gitlab-ce:latest
  ```
3. 运行 GitLab 容器（按需调整参数）
  ```bash
      # --restart always: 容器随 Docker 自动重启
      # -p 2222:22 避免影响本地的 ssh 的端口,gitlab 配置也要改

      # 创建专用数据卷,绕过文件系统同步开销，提升性能
      docker volume create gitlab_config
      docker volume create gitlab_logs
      docker volume create gitlab_data

      docker run \
       -d \
       --name gitlab \
       --restart always \
       --cpus 2 \
       --memory 8g \
       -p 443:443 \
       -p 80:80 \
       -p 2222:22 \
       -v gitlab_config:/etc/gitlab:delegated \
       -v gitlab_logs:/var/log/gitlab:delegated \
       -v gitlab_data:/var/opt/gitlab:delegated \
       -e GITLAB_OMNIBUS_CONFIG="
        gitlab_rails['gitlab_shell_ssh_port'] = 2222;
        prometheus_monitoring['enable'] = false;
        sidekiq['max_concurrency'] = 10;
        logging['logrotate_frequency'] = 'daily';
        logging['logrotate_size'] = '100M';
       " \
       gitlab/gitlab-ce:latest

       docker logs -f gitlab  # 查看安装日志
  ```
4. 访问 GitLab
  - 等待初始化完成,可通过以下命令查看日志,当看到 GitLab Shell self-check successful 表示启动成功。
  - 若配置域名访问，本地配置 hosts
  - 打开浏览器，访问 http://localhost（若修改了端口，如 8080，则访问 http://localhost:8080）
5. 后续配置见下一节
  - 重启容器使配置生效：
   ```bash
     docker restart gitlab
   ```

## docker compose 部署
  ```bash
    # 创建宿主机目录（如使用绑定卷）
    sudo mkdir -p /docker-volumes/gitlab/config

    # 启动服务
    docker compose up -d

    # 查看实时日志
    docker compose logs -f gitlab

    # 版本升级
    # 修改 Compose 文件中的镜像版本
    # image: gitlab/gitlab-ce:16.0.0-ce.0
    # 重新部署
    docker compose pull && docker compose up -d --force-recreate

    # 查看容器资源使用
    docker stats gitlab

    # 进入容器查看进程
    docker exec -it gitlab top

  ```

## 灾备恢复
  ```bash
    # 恢复备份（需先停止 GitLab）
    docker compose down
    docker run --rm -it \
      -v gitlab_data:/var/opt/gitlab \
      -v /backups:/backups \
      gitlab/gitlab-ce:latest \
      bash -c "cp /backups/gitlab-secrets.json /etc/gitlab/ && gitlab-backup restore BACKUP=备份文件名"
    docker compose up -d
  ```

## 配置 GitLab（普通安装配置）
  - 编辑配置文件 /etc/gitlab/gitlab.rb
  ```ruby
    # 设置内网访问地址（HTTP/HTTPS）
    external_url 'http://192.168.1.100'  # 或 'https://192.168.1.100'（需配置 SSL）

    # 配置邮箱（可选，用于通知）
    gitlab_rails['smtp_enable'] = true
    gitlab_rails['smtp_address'] = "smtp.example.com"
    gitlab_rails['smtp_port'] = 587
    gitlab_rails['smtp_user_name'] = "gitlab@example.com"
    gitlab_rails['smtp_password'] = "your-password"
    gitlab_rails['gitlab_email_from'] = 'gitlab@example.com'

    # 服务器资源少， 把下面3个取消注释，工作进程减少，最低为2 降低cpu使用率
    puma['worker_processes'] = 2
    puma['min_threads'] = 2
    puma['max_threads'] = 2

    # 关闭 Prometheus 监控（可选）
    prometheus_monitoring['enable'] = false

    # 禁用不必要的服务（如 Mattermost）
    mattermost['enable'] = false
  ```

## GitLab 命令
  ```bash
    gitlab-ctl reconfigure   # 自动配置并启动所有服务

    sudo gitlab-ctl status   # 检查服务状态

    # 启动/停止服务
    gitlab-ctl restart       # 重启
    sudo gitlab-ctl start
    sudo gitlab-ctl stop

    # 查看日志（如排查 Nginx 或数据库问题）
    sudo gitlab-ctl tail nginx
    sudo gitlab-ctl tail postgresql
  ```

## 首次访问与初始化
* 浏览器访问 http://192.168.1.100，首次登录需设置管理员密码。
  ```bash
    # 进入容器 查看密码 首次的管理员密码存在文件中
    docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password

    # 点击右上角用户头像 → Preferences → Password

    # 找不到 initial_root_password 文件,可重置密码
    docker exec -it <container_name> gitlab-rake "gitlab:password:reset[root]"
  ```
* 登录进入设置 关闭容许注册
* 创建用户和项目，通过 Web 界面管理仓库。

## 常见问题
* 端口冲突：修改 -p 参数中的主机端口（如 8080:80）
* 文件权限问题：确保挂载的本地目录（如 C:/GitLab）有写入权限
* Docker Desktop CPU 占满的问题
  - 观察进程监视器发现是 com.docker.backend.exe（Docker后端服务）占用大量cpu。经过分析原因是绑定挂载的目录包含大量文件（如 Git 仓库、日志）或 频繁文件变动（如代码编译、日志写入），会触发 Docker 后端持续监控和同步文件，导致 CPU 占用飙升。