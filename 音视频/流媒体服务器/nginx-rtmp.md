# nginx-rtmp 模块搭建与使用

## 安装
  > 必要条件： 要想搭建 RTMP 流媒体服务器，除了需要 Nginx 之外，还需要另外两个库 Nginx RTMP Module 和 OpenSSL。
  + Nginx RTMP Module 是 Nginx 的一个插件。它的功能非常强大：
    - 支持 RTMP/HLS/MPEG-DASH 协议的音视频直播；
    - 支持 FLV/MP4 文件的视频点播功能；
    - 支持以推拉流方式进行数据流的中继；
    - 支持将音视频流录制成多个 FLV 文件； 
  ```bash
    # 卸载已安装的源码版本（没有可忽略）
    nginx -s stop
    sudo rm -rf /usr/local/nginx
    sudo rm -rf /usr/local/bin/nginx

    # 1. 下载最新稳定版源码包
    wget -c http://nginx.org/download/nginx-1.27.1.tar.gz
    # 解压
    tar -zvxf nginx-1.27.1.tar.gz 

    # 下载 nginx-rtmp-module 源码，存放的位置最好与 Nginx 源码目录并行
    # git clone https://github.com/arut/nginx-rtmp-module.git
    wget -c https://github.com/arut/nginx-rtmp-module/archive/refs/tags/v1.2.2.tar.gz 
    tar -zvxf nginx-rtmp-module-1.2.2.tar.gz

    # 下载 openssl 下载失败可以模拟浏览器下载 --user-agent="Mozilla/5.0"
    wget -c https://github.com/openssl/openssl/releases/download/openssl-3.3.2/openssl-3.3.2.tar.gz
    tar -zvxf openssl-3.3.2.tar.gz

    # 2. 编译 OpenSSL & Nginx
    cd openssl-3.3.2
    ./config
    make && sudo make install

    # 编译带 RTMP Module 功能的 Nginx
    cd nginx-1.27.1

    ./configure --prefix=/usr/local/nginx --with-http_ssl_module  --add-module=../nginx-rtmp-module-1.2.2 --with-debug

    # add-module：指明在生成 Nginx Makefile 的同时，也将 nginx-rtmp-module 模块的编译命令添加到 Makefile 中。
    # http_ssl_module：指定 Ngnix 服务器支持 SSL 功能。
    # with-debug：输出 debug 信息,要做的是实验环境，所以输出点信息是没问题的。

    make CFLAGS="-Wno-unused-but-set-variable" && sudo make install

    # 3. 创建软连接到 Nginx 执行文件
    sudo ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/nginx

    # 启动
    nginx

    # 检查模块是否加载：
    nginx -t

    # 查看 Nginx 的编译信息：
    nginx -V

    # 4. 配置 Nginx 见 nginx的配置文件
    # Linux 上查看 1935 端口是否已打开
    netstat -ntpl | grep 1935 
    lsof -i:1935

    # 服务配置后 向服务推流
    # -re，代表按视频的帧率发送数据，否则 FFmpeg 会按最高的速率发送数据
    # -c copy，表示不对输入文件进行重新编码；
    # -f flv，表示推流时按 RTMP 协议推流

    # IP 后面的子路径 live 是在 Nginx.conf 中配置的 application 名字
    # live 子路径后面的名字是可以任意填写的流名。你可以把它当作一个房间号来看待，在拉流时你要指定同样的名字才可以看到该节目

    ffmpeg -re -i xxx.mp4 -c copy -f flv rtmp://IP/live/stream

    # 将远程监控摄像头推流
    # 如：rtsp://username:password@camera_ip:port/stream
    ffmpeg -i "<rtsp_url>" -c:v libx264 -preset ultrafast -tune zerolatency -f flv rtmp://127.0.0.1/live/stream

    # 服务配置后 向服务拉流观看
    # 方式一：VLC。在 PC 机上可以使用 VLC 播放器观看，操作步骤是点击右侧的openmedia->网络->输入rtmp://IP/live/test
    # 方式二：FFplay。它是由 FFmpeg 实现的播放器，可以说是目前世界上最牛的播放器了。使用 FFplay 的具体命令如下：
    ffplay rtmp://host/live/test
  ```

## 配置
* 点播视频服务器的配置
  ```
    worker_processes  1;
    events {
        worker_connections  1024;
    }
    rtmp {                # RTMP服务
        server {
            listen 1935;  # 服务端口
            chunk_size 4096;   # 数据传输块的大小

            application vod {
                # 如 将 test.mp4 文件放在该目录下
                # 拉流使用我们要点播的节目地址 rtmp://localhost/vod/test.mp4

                play /opt/video/vod; # 视频文件存放位置。
            }
        }
    }
  ```

* 直播服务器的配置
  ```
    http {
        # ..

        # 拉流 hls/dash
        server{
            listen 8082;
            server_name localhost;
            charset utf-8;

            location /hls {
                # Serve HLS fragments
                types {
                    application/vnd.apple.mpegurl m3u8;
                    video/mp2t ts;
                }
                root /tmp;
                add_header Cache-Control no-cache;
            }

            location /dash {
                # Serve DASH fragments
                root /tmp;
                add_header Cache-Control no-cache;
            }
        }
    }


    # RTMP 服务
    rtmp_auto_push on;
    rtmp {
        server {
            # 指定服务端口
            listen 1935;     # RTMP协议使用的默认端口
            chunk_size 2048; # 减少 chunk_size 以进一步降低延迟

            application webcam {
                live on;
                # Stream from local webcam
                exec_static ffmpeg -f video4linux2 -i /dev/video0 -c:v libx264 -an
                                -f flv rtmp://localhost:1935/webcam/mystream;
            }

            # 指定RTMP流应用  

            # 推流：远程监控摄像头
            # 如：rtsp://username:password@camera_ip:port/stream
            # ffmpeg -i "<rtsp_url>" -framerate 25 -c:v libx264 -preset veryfast -tune zerolatency -f flv rtmp://127.0.0.1/live/stream

            # 输出 rtmp
            # 推流： rtmp://127.0.0.1/live/stream
            # 拉流：ffplay rtmp://127.0.0.1/live/stream  

            # 输出 hls 
            # 推流：rtmp://127.0.0.1/hls/111
            # 拉流：ffplay http://localhost:8082/hls/111/index.m3u8

            
            application live {     # 推送地址
                live on;       # 打开直播流
                record off;    # 禁用录制功能以减少额外的延迟
                allow play all;
            }

            # 指定 HLS 流应用

            application hls {
                live on;                            # 启用直播流
                record off;                         # 禁用录制以减少延迟
                hls on;                             # 启用 HLS
                hls_path /tmp/hls;                  # HLS 文件存储路径
                hls_fragment 2s;                    # 每个 HLS 片段的长度
                hls_playlist_length 10s;            # 播放列表的长度
                hls_nested on;                      # 启用嵌套 HLS 目录
                hls_cleanup on;                     # 启用自动删除旧片段
                hls_continuous on;                  # 确保片段不会被过早删除
            }

            # MPEG-DASH is similar to HLS
            application dash {
                live on;
                dash on;
                dash_path /tmp/dash;
            }

        }

    }
  ```