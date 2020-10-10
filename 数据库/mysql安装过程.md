# mysql
## centos7 安装mysql(8.0.18)（使用yum安装）
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
    - 查看有哪些版本的mysql
    ```
    yum repolist all | grep mysql
    ```
* 安装启动
    - 检查是否有老版本,有干掉
    ```
    yum list installed | grep mysql
    yum -y remove xxx
    ```
    - 安装： 
    ```
    yum install -y mysql-community-server
    ```
    - 启动：
    ```
    systemctl start mysqld
    systemctl restart mysqld
    systemctl stop mysqld
    ```
    - 查看状态
    ```
    systemctl status mysqld
    ```
    - 设置开机自启动
    ```
    systemctl enable mysqld
    systemctl daemon-reload
    ```
* 设置登录
    - 找到首次生成的密码
    ```
    grep 'temporary password' /var/log/mysqld.log
    ```
    - 执行命令，输入上一步生成的密码
    ```
    mysql -uroot -p 
    ```
    - 修改密码,成功后，mysql -uroot -p 后加密码 mysql命令要加分号，“;”
    ```
     ALTER USER 'root'@'localhost' IDENTIFIED BY 'xxxx';
    ```
    - 设置远程登录:
    1. 开放云服务器3306端口
    2. 配置可远程访问
    ```
    # 修改host为%,并刷新权限
    use mysql;
    select host, user, authentication_string, plugin from user
    GRANT ALL ON *.* TO 'root'@'%';
    flush privileges;
    # 查看是否修改好
    use mysql;
    select host, user, authentication_string, plugin from user
    
    # 修改密码的加密方式
    ALTER USER 'root'@'%' IDENTIFIED BY 'yourpassword' PASSWORD EXPIRE NEVER; 
    ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
    flush privileges;
    ```
* 修改配置 
    - vim /etc/my.cnf
    - 修改字符集: character-set-server=utf8
    - 设置时区为东八区:default-time_zone = '+8:00'
    - 重启数据库：systemctl restart mysqld

## window
* [window10 安装](http://www.itsoku.com/article/192)