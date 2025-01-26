# mysql 备份与恢复

## mysqldump 逻辑备份
* 使用 mysqldump 工具备份 user_manager 数据库，执行以下命令：
  ```bash
    # 备份单个库
    mysqldump -u root -p --databases user_manager > user_manager_backup.sql

    # 备份 user_manager2 等多个数据库：
    mysqldump -u root -p --databases user_manager1 [user_manager2 ...] > user_managers_backup.sql

    # 备份所有数据库
    mysqldump -u root -p --all-databases > user_all.sql > all_backup.sql
  ```
* mysqldump 工具恢复
  ```bash
    mysql -u root -p user_manager < user_manager_backup.sql
  ```

## 文件系统备份
* 创建 MySQL 数据库的文件系统备份时，可将 MySQL 的数据、配置、日志等内容都拷贝到备份位置。
  ```bash
   # 1. 关闭 mysqld 服务：
   systemctl stop mysqld.service

   # 2. 拷贝数据、配置、日志文件等：
   cp -r /var/lib/mysql /back_path cp -r /etc/my.cnf /etc/my.cnf.d /back_path/configuration cp /var/log/mysql/* /back_path/logs

   # 3. 备份完毕后，执行以下命令 启动 mysqld 服务。
   systemctl start mysqld.service 

   # 4. 当备份恢复时，将备份数据从备份位置加载到 /var/lib/mysql 目录时，需确保 mysql:mysql 是 /var/lib/mysql 所有文件的所有者 ：

   chown -R mysql:mysql /var/lib/mysql

  ```

## navicat 备份
* 点击工具栏备份选项
* 按提示选择备份数据库