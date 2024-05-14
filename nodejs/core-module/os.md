# os
  - 通过 OS 模块可以获取到当前系统一些基础信息的辅助函数.

## 常用的方法
* 返回操作系统信息
  - os.platform()	返回编译时指定的平台信息, 如 win32, linux, 同 process.platform()
  - os.release()	返回操作系统的分发版本号

* 返回硬件信息
  - os.arch()	返回当前系统的 CPU 架构, 如 'x86' 和 'x64'
  - os.cpus()	返回 CPU 每个核的信息
  - os.availableParallelism() 返回程序应使用的默认并行度的估计值。总是返回一个大于零的值。

  - os.freemem()	返回系统空闲内存的大小, 单位是字节
  - os.totalmem()	返回总内存大小(同内存条大小)

  - os.networkInterfaces()	返回网卡信息 (类似 ifconfig)
  - os.loadavg()	返回负载信息

* 其他信息
  - os.homedir()	返回当前用户的根目录
  - os.hostname()	返回当前系统的主机名

