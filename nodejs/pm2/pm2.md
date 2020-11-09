## pm2
```
npm install pm2 -g
```
### pm2部署的优点:
1. 监听文件变化，自动重启程序
2. 支持性能监控
3. 负载均衡
4. 程序崩溃自动重启
5. 服务器重新启动时自动重新启动
6. 自动化部署项目

### 常用命令：
- 启动一个node程序
    ```
    pm2 start start.js
    ```
- 启动进程并指定应用的程序名
    ```
    pm2 start app.js --name application
    ```

- 添加进程监视（在文件改变的时候会重新启动程序）
    ```
    pm2 start app.js --name start --watch
    ```

- 进程管理
    ```
    pm2 ls 
    pm2 delete [appname] | id
    pm2 delete app   指定进程名删除
    pm2 delete 0     指定进程id删除
    pm2 delete all

    pm2 describe app 查看某个进程具体情况
    pm2 monit        查看进程的资源消耗情况

    pm2 restart app  重启指定名称的进程
    pm2 restart all  重启所有进
    pm2 logs app     查看该名称进程的日志
    pm2 logs all     查看所有进程的日志

    pm2 startup centos 设置pm2开机自启
    pm2 save 保存设置
    ```
+ 配置文件
    - pm2 init 生成一个 ecosystem.config.js 模版
    - 一次性启动，停止，重启并重载您的所有应用程序：
    - 命令
        ```
        pm2 start ecosystem.config.js
        pm2 stop ecosystem.config.js
        pm2 restart ecosystem.config.js
        pm2 reload ecosystem.config.js
        ```