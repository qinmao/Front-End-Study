# 主从复制的配置

## 应用场景
* 数据备份
  - 主从复制可以作为一种数据备份策略，从服务器可以用来备份主服务器的数据，确保数据的安全性和完整性。
* 读写分离
  - 通过将读操作分配到从服务器，写操作保留在主服务器，可以有效地分担数据库的负载，提高系统的性能和响应速度。
* 高可用性
  - 在主服务器发生故障时，从服务器可以迅速接管，确保系统的高可用性和业务的连续性
* 数据分析
  - 从服务器可以用于数据分析和报表生成，而不会影响主服务器的性能
* 地理分布
  - 主从复制可以跨越不同的地理位置，将数据复制到不同的区域，提供更快的本地访问速度和灾难恢复能力。
  
## 背景
* 基于事务的复制
* 有两台已安装了MySQL

## 配置主服务器
1. 打开 MySQL 主服务器的配置文件 /etc/my.cnf.d/mysql-server.cnf。
2. 添加配置
  ```cnf
    [mysqld]
    # 服务器ID，必须是唯一的
    server-id=1  

    # 从副本到源的连接需要此选项
    bind-address=0.0.0.0 

    # 启用二进制日志，定义源服务器的二进制日志文件的路径
    log_bin=/var/log/mysql/mysql-bin.log

    # 表示二进制日志文件被保留的时间（以天为单位）
    expire_logs_days=7

    # 设置复制的格式，可以是 ROW、STATEMENT 或 MIXED，建议使用 ROW
    binlog_format=ROW

    # 在服务器上启用全局事务标识符 (GTID)
    gtid_mode=ON

    # 服务器通过只允许执行可以使用 GTID 安全记录的语句来强制执行 GTID 一致性
    enforce-gtid-consistency=ON
  ```
3. 重启服务
  ```bash
    systemctl restart mysqld.service
  ```
4. 创建复制用户并授权
  - 在主服务器上，创建一个用于复制的专用用户，并授予权限，允许该用户从从服务器进行读取操作。使用以下命令连接到 MySQL 服务器并执行 SQL 命令：
  ```bash
    mysql> CREATE USER 'repl_user'@'%' IDENTIFIED BY 'your_password';
    mysql> GRANT REPLICATION SLAVE ON *.* TO 'repl_user'@'%';
  ```
  - 重新加载MySQL数据库 中的授权表，并将主服务器设置为只读状态：
  ```bash
    mysql> FLUSH PRIVILEGES;
    mysql> SET @@GLOBAL.read_only = ON;
  ```

## 配置从服务器
1. 在从服务器上打开 MySQL 配置文件 /etc/my.cnf.d/mysql-server.cnf。
2. 在 [mysqld] 部分中添加以下配置后，重启 MySQL 服务器
   ```bash
    [mysqld]
    server-id=2
    # 设置从服务器的中继日志文件名，中继日志是 MySQL 副本服务器在复制过程中创建的一组日志文件
    relay-log=/var/log/mysql/mysqld-relay-bin.log

    log_bin=/var/log/mysql/mysql-bin.log
    gtid_mode=ON
    enforce-gtid-consistency=ON

    # 确保从源服务器接收的更新记录在副本的二进制日志中
    log-replica-updates=ON

    # 确保副本服务器在副本服务器启动时不会启动复制线程；
    skip-replica-start=ON
  ```
  ```bash
    systemctl restart mysqld.service
  ```

## 启动从服务器复制
1. 将从服务器设置为只读状态：
  ```bash
    mysql> SET @@GLOBAL.read_only = ON;
  ```
2. 配置复制源：
 ```bash
  mysql> CHANGE MASTER TO
  MASTER_HOST='<MASTER_HOST>',
  MASTER_USER='repl_user',
  MASTER_PASSWORD='your_password',
  # MASTER_LOG_FILE 和 MASTER_LOG_POS 指定从服务器开始复制的二进制日志文件和位置。
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=0;
```
3. 启动从服务器的复制进程：
  ```bash
  mysql> START SLAVE;     # 或执行START REPLICA;
  ```
4. 在主从服务器上取消设置只读状态：
  ```bash
    mysql> SET @@GLOBAL.read_only = OFF;
  ```

## 验证复制状态
* 如果显示为 Waiting for master to send event，复制正在正常运行；
* 如果 Seconds_Behind_Master 的值较小或为零，说明从服务器与主服务器之间的同步延迟较低。
  ```bash
    mysql> SHOW SLAVE STATUS;
  ```
