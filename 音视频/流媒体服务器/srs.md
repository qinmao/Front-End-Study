# SRS
  - SRS是一个开源的（MIT协议）简单高效的实时视频服务器，支持RTMP、WebRTC、HLS、HTTP-FLV、SRT、MPEG-DASH和GB28181等协议
  - SRS使用ANSI C++ (98)开发，只使用了基本的C++能力，可以在Linux、Windows、macOS等多个平台运行。推荐使用 Ubuntu 20+系统开发和调试

## 应用场景
* SRS主要用于直播和WebRTC领域。
  - 在直播领域，SRS支持RTMP、HLS、SRT、MPEG-DASH和HTTP-FLV等典型协议。
  - 在WebRTC领域，SRS支持WebRTC、 WHIP和WHEP等协议。SRS可以为直播和WebRTC实现协议转换

## 安装运行
```bash
  git clone -b develop https://gitee.com/ossrs/srs.git
  # 编译
  cd srs/trunk
  ./configure
  make

  # 运行
  ./objs/srs -c conf/srs.conf
```

## webRTC 推流
```bash
    # 设置 CANDIDATE

    # For macOS
    CANDIDATE=$(ifconfig en0 inet| grep 'inet '|awk '{print $2}')

    # For CentOS
    CANDIDATE=$(ifconfig eth0|grep 'inet '|awk '{print $2}')

    # Directly set ip.
    CANDIDATE="192.168.3.10"
   
    # 启动 srs 流媒体服务
    CANDIDATE="192.168.0.104" \
    ./objs/srs -c conf/rtc.conf

    # 启动 https
    CANDIDATE="192.168.3.10" \
    ./objs/srs -c conf/https.rtc.conf

    # 直播转WebRTC，rtmp推直播流，使用WebRTC观看
    CANDIDATE="192.168.1.10"
    ./objs/srs -c conf/rtmp2rtc.conf
```


