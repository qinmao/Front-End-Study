# mysql
## centos7 安装 mysql(8.0.18)（使用yum安装）
* 配置 mysql 的 yum 源
  - 在mysql 官网找到对应的源 https://dev.mysql.com/downloads/repo/yum/
   ```bash
    # 下载 yum 源
    wget 'https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm' 
    
    # 安装yum 源 
    rpm -Uvh mysql80-community-release-el7-3.noarch.rpm
   
    # 查看有哪些版本的 mysql
    yum repolist all | grep mysql

    # 检查是否有老版本,有干掉
    yum list installed | grep mysql
    yum -y remove xxx

    # 安装
    yum install -y mysql-community-server
  ```
* 设置登录
  - 找到首次生成的密码，登录
    ```bash
      grep 'temporary password' /var/log/mysqld.log

      # 执行命令，输入上一步生成的密码
      mysql -uroot -p

      # 修改密码,成功后，mysql -uroot -p 后加密码 
     ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password';
    ```
  + 设置远程登录:
    - 开放云服务器3306端口
    - 配置可远程访问
    ```bash
        # 修改 host为 %,并刷新权限
        use mysql;
        select host, user, authentication_string, plugin from user
        GRANT ALL ON *.* TO 'root'@'%';
        flush privileges;
    
        # 查看是否修改好
        use mysql;
        select host, user, authentication_string, plugin from user
    ```
* CentOS 命令
 ```bash
    # 服务启动停止
    systemctl status mysqld
    systemctl start mysqld
    systemctl restart mysqld
    systemctl stop mysqld

    # 设置开机自启动
    systemctl enable mysqld
    systemctl daemon-reload

    # 修改配置 
    vim /etc/my.cnf
    # 修改字符集:
    character-set-server=utf8

    # 设置时区为东八区:
    default-time_zone = '+8:00'

    # 重启数据库：
    systemctl restart mysqld
  ```
## window
* [window10 安装](https://zhuanlan.zhihu.com/p/164991093)
* 服务启动或停止
  - 方式一：cmd中运行 services.msc 在服务中找到mysql服务右键启动或停止
  - 方式二：命令：
    ```bash
      net stop mysql
      net start mysql
    ``` 
## mac
* 方式一：官网下载 dmg
* 方式二：推荐 Homebrew 安装（更改成国内镜像）
 ```bash
    # 安装最新
    brew install mysql 

    # 安装指定版本
    brew install mysql@5.7

    # 查看版本
    mysql -V

    # 安装 MySQL9 
    # 运行以下命令启动 MySQL 安全脚本，该脚本将帮助你设置 root 密码和其他安全选项：
    mysql_secure_installation

    # 登录默认没有密码
    mysql -u root -p

    # 登录成功后，你可以使用以下命令来设置 root 用户的密码。将 your_new_password 替换为你想要设置的密码。
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password';

    # 如果 MySQL 版本支持 ALTER USER 使用如下
    SET PASSWORD FOR 'root'@'localhost' = PASSWORD('your_new_password');

    # 刷新权限
    FLUSH PRIVILEGES;

    # brew 中服务的命令
    brew services list

    # 开始服务
    brew services start mysql
    brew services restart mysql

    # 停止服务
    brew services stop mysql

  ```
## 卸载
```bash
   # mac 
   brew uninstall mysql
   # 移除配置文件
   /usr/etc/my.cnf
   /usr/local/var/mysql
```