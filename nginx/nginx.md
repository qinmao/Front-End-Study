# nginx
> nginx是一个高性能的HTTP和反向代理服务器，也是一个通用的TCP/UDP代理服务器，最初由俄罗斯人Igor Sysoev编写。
## nginx在应用程序中的作用(前端的视角)
* 解决跨域
* 静态资源服务器
* 请求过滤
* 配置gzip
* 负载均衡
## 优点
* 高并发，高性能
* 可拓展性好:第三方插件非常多
* 高可靠性
* 热部署
* BSD 许可证
## nginx 的组成
* nginx 二进制可执行文件
* nginx.conf 配置nginx 行为
* access.log 访问日志 纪录每一条http 请求信息
* error.log 错误日志 定位问题
## 编译nginx（linux）
* 下载nginx
* configure
* 编译
* 安装
## 常用命令
* mac
 ```bash
    # 启动：
    brew services start nginx
    # 停止：
    brew services stop nginx
    # 优雅的停止：
    brew services quiet nginx
 ```
+ 文件的位置
  - nginx.conf 配置文件位置：/usr/local/etc/nginx/nginx.conf
  - nginx 安装目录：/usr/local/Cellar/nginx
  - nginx 网站目录：/usr/local/var/www

* linux (需要加 systemctl)
 ```bash
    # 开机启动
    systemctl enable nginx
    # 启动 
    systemctl start nginx
    # 查看 Nginx 运行状态：
    systemctl status nginx

    systemctl stop nginx


    # 热重启(重新加载配置文件,-s 表示发送信号)：
    nginx -s reload
    # 重启
    nginx -s reopen  
    # 停止
    nginx -s stop

    # 检查配置文件是否出错：
    nginx -t 

    # 查看 nginx 的进程：
    ps -ef | grep nginx

    # 强制停止
    kill -9 nginx
  ```
## nginx配置
* nginx.conf 配置释义
    - worker_processes: Nginx 进程数，一般设置为和 CPU 核数一样
    - error_log: Nginx 的错误日志存放目录
    - pid  Nginx 服务启动时的 pid 存放位置
    + events
        - use epoll: 使用epoll的I/O模型(如果你不知道Nginx该使用哪种轮询方法，会自动选择一个最适合你操作系统的)
        - worker_connections 每个进程允许最大并发数
    
    - http：可嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。
    - server:配置虚拟主机的相关参数
    + location：配置请求的路由，以及各种页面的处理情况。
        - = 精确匹配路径，用于不含正则表达式的 uri 前，如果匹配成功，不再进行后续的查找；
        - ^~ 用于不含正则表达式的 uri 前，表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找；
        - ~ 表示用该符号后面的正则去匹配路径，区分大小写；
        - ~* 表示用该符号后面的正则去匹配路径，不区分大小写。跟 ~ 优先级都比较低，- 如有多个location的正则能匹配的话，则使用正则表达式最长的那个；
        - 如果 uri 包含正则表达式，则必须要有 ~ 或 ~* 标志。
    - upstream：配置后端服务器具体地址，负载均衡配置不可或缺的部分。

* 配置的语法规则
    - 配置文件由指令与指令块构成；
    - 每条指令以 ; 分号结尾，指令与参数间以空格符号分隔；
    - 指令块以 {} 大括号将多条指令组织在一起；
    - include 语句允许组合多个配置文件以提升可维护性；
    - 使用 # 符号添加注释，提高可读性；
    - 使用 $ 符号使用变量；
    - 部分指令的参数支持正则表达式；

* 常用的全局变量，你可以在配置的任何位置使用它们
    - $host 请求信息中的 Host，如果请求中没有 Host 行，则等于设置的服务器名，不包含端口
    - $request_method 客户端请求类型，如 GET、POST
    - $remote_addr 客户端的 IP 地址
    - $remote_port	客户端的端口
    - $args 请求中的参数
    - $http_user_agent	客户端agent信息
    - $http_cookie	客户端cookie信息
    - $server_protocol	请求使用的协议，如 HTTP/1.0、HTTP/1.1
    - $server_addr	服务器地址
    - $server_name	服务器名称
    - $server_port	服务器的端口号
    - $scheme	HTTP 方法（如http，https）

* 请求过滤
    - 根据状态码过滤
        ```
        error_page 500 501 502 503 504 506 /50x.html;
            location = /50x.html {
                #将跟路径改编为存放html的路径。
                root /root/static/html;
            }
        ```
    - 根据URL名称过滤，精准匹配URL，不匹配的URL全部重定向到主页。
        ```
        location / {
            rewrite  ^.*$ /index.html  redirect;
        }
        ```
    - 根据请求类型过滤。
        ```
        if ($request_method !~ ^(GET|POST|HEAD)$) {
                return 403;
            }

        ```

* 反向代理的配置
    ```
    location ~ ^/api {
        proxy_pass http://xxxx.com;

        # 获取代理时真实的请求
        proxy_set_header Host        $host;
        proxy_set_header X-Real-IP   $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    ```
  + 反向代理还有一些其他的指令
    - proxy_set_header：在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息；
    - proxy_connect_timeout：配置 Nginx 与后端代理服务器尝试建立连接的超时时间；
    - proxy_read_timeout：配置 Nginx 向后端服务器组发出 read 请求后，等待相应的超时时间；
    - proxy_send_timeout：配置 Nginx 向后端服务器组发出 write 请求后，等待相应的超时时间；
    - proxy_redirect：用于修改后端服务器返回的响应头中的 Location 和 Refresh。

* gzip配置
    + Nginx 在启用了GZip的情况下，不会等文件 GZip 完成再返回响应，而是边压缩边响应，这样可以显著提高 TTFB(Time To First Byte，首字节时间，WEB 性能优化重要指标)。
    ```
        gzip                    on;
        gzip_http_version       1.1;        
        gzip_comp_level         5;
        gzip_min_length         1k;
        gzip_types text/csv text/xml text/css text/plain text/javascript application/javascript application/x-javascript application/json application/xml;
    ```
    + gzip_http_version 启用 GZip 所需的 HTTP 最低版本，默认值为 HTTP/1.1
    + gzip_comp_level 压缩级别，级别越高压缩率越大，当然压缩时间也就越长（传输快但比较消耗cpu）。默认值为 1 压缩级别取值为1-9
    + gzip_min_length
        - 设置允许压缩的页面最小字节数，Content-Length小于该值的请求将不会被压缩
        - 默认值:0
        - 当设置的值较小时，压缩后的长度可能比原文件大，建议设置1k以上
    + gzip_types
        - 要采用gzip压缩的文件类型(MIME类型)
        - 默认值:text/html(默认不压缩js/css)

* 限制流量 set $limit_rate 1k;

* https 的配置
    ```
        server {
            listen 443 ssl http2 default_server;   # SSL 访问端口号为 443
            server_name sherlocked93.club;         # 填写绑定证书的域名

            ssl_certificate     /etc/nginx/https/1_sherlocked93.club_bundle.crt;   # 证书文件地址
            ssl_certificate_key /etc/nginx/https/2_sherlocked93.club.key;      # 私钥文件地址
            ssl_session_timeout 10m;

            ssl_protocols TLSv1 TLSv1.1 TLSv1.2;      # 请按照以下协议配置
            ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
            ssl_prefer_server_ciphers on;
            
            location / {
                root         /usr/share/nginx/html;
                index        index.html index.htm;
            }
        }
    ```

* HTTP请求转发到 HTTPS
    ```
        server {
            listen      80;
            server_name www.sherlocked93.club;

            # 单域名重定向
            if ($host = 'www.sherlocked93.club'){
                return 301 https://www.sherlocked93.club$request_uri;
            }
            # 全局非 https 协议时重定向
            if ($scheme != 'https') {
                return 301 https://$server_name$request_uri;
            }

            # 或者全部重定向
            return 301 https://$server_name$request_uri;

            # 以上配置选择自己需要的即可，不用全部加
        }
    ```
## 静态资源服务
  ```
    location / {
        alias /usr/share/nginx/html/static/;  # 静态资源目录
        autoindex on;                  # 开启静态资源列目录
        autoindex_exact_size    off;   # on(默认)显示文件的确切大小，单位是byte；off显示文件大概大小，单位KB、MB、GB
        autoindex_localtime     off;   # off(默认)时显示的文件时间为GMT时间；on显示的文件时间为服务器时间
        access_log  off;
        expires    10h; # 设置过期时间为10小时          
    }  
    # 图片防盗链配置
    location ~* \.(png|gif|jpg|jpeg)$ {
        valid_referers none blocked 192.168.0.2;  # 只允许本机 IP 外链引用
        if ($invalid_referer){
            return 403;
        }
    }  
  ```
## nginx实现负载均衡
* Upstream指定后端服务器地址列表(默认为轮询)
  ```
    upstream domain {
        # 最小连接数策略：将请求优先分配给压力较小的服务器，它可以平衡每个队列的长度，并避免向压力大的服务器添加更多的请求。
        least_conn;

        # 最快响应时间策略:优先分配给响应时间最短 依赖第三方插件 nginx-upstream-fair，需要先安装；
        fair;

        # 客户端ip绑定:来自同一个ip的请求永远只分配一台服务器，有效解决了动态网页存在的session共享问题。
        ip_hash;
        server 10.1.22.33:12345;
        server 10.1.22.34:12345;
        
        # weight，权重分配，指定轮询几率，权重越高，在被访问的概率越大，用于后端服务器性能不均的情况；
        server 10.1.22.35:12345 weight=10; 
    }

    server {
        server_name  fe.server.com;
        listen 80;
        location /api {
            proxy_pass http://domain;
        }
    }
  ```
## 最佳实践
* 为了使 Nginx 配置更易于维护，建议为每个服务创建一个单独的配置文件
    - 存储在 /nginx/conf.d 目录
    - 如：/nginx/conf.d/8081.xxx.com.conf, /nginx/conf.d/8080.xxx.com.conf
* 日志相关
    - /var/log/nginx
    - xxx.com.access.log 、xxx.com.error.log