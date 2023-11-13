# mysql
## centos7 安装 mysql(8.0.18)（使用yum安装）
* 配置 mysql 的 yum 源
  - 在mysql 官网找到对应的源 https://dev.mysql.com/downloads/repo/yum/
  - 下载 yum 源
   ```
     wget 'https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm' 
   ```
  - 安装yum 源 
   ```
     rpm -Uvh mysql80-community-release-el7-3.noarch.rpm
   ```
  - 查看有哪些版本的 mysql
  ```
   yum repolist all | grep mysql
  ```
* 安装
  ```
    # 检查是否有老版本,有干掉
    yum list installed | grep mysql
    yum -y remove xxx

    # 安装
    yum install -y mysql-community-server

  ```
* 设置登录
  - 找到首次生成的密码，登录
    ```
      grep 'temporary password' /var/log/mysqld.log
      # 执行命令，输入上一步生成的密码
      mysql -uroot -p

      # 修改密码,成功后，mysql -uroot -p 后加密码 
      ALTER USER 'root'@'localhost' IDENTIFIED BY 'xxxx';
    ```
  + 设置远程登录:
    - 开放云服务器3306端口
    - 配置可远程访问
    ```
     # 修改host为%,并刷新权限
     use mysql;
     select host, user, authentication_string, plugin from user
     GRANT ALL ON *.* TO 'root'@'%';
     flush privileges;
  
     # 查看是否修改好
     use mysql;
     select host, user, authentication_string, plugin from user
    ```
## window
* [window10 安装](https://zhuanlan.zhihu.com/p/164991093)
* 服务启动或停止
  - 方式一：cmd中运行 services.msc 在服务中找到mysql服务右键启动或停止
  - 方式二：命令：
    ```
      net stop mysql
      net start mysql
    ``` 
## mac
* 官网下载dmg
* 推荐 Homebrew 安装（更改成国内镜像）
 ```bash
  # 安装最新
  brew install mysql 

  # 安装指定版本
  brew install mysql@5.7

  # 查看版本
  mysql -V
  ```