# android
> 是一种基于Linux内核的自由及开放的操作系统

## 工程目录结构
* app 
  > 代表app模块
  + mainfests
    - AndroidMainfest.xml app的运行配置文件
  + java
    - 有三个com.example.xxx包，第一个包存放java源码，后两个存放测试文件
  + res
    > 存放当前模块的资源文件，下面有4个子目录
    - drawble 存放图形描述文件和图片文件
    - layout 布局文件
    - mipmap app启动图标
    - values 常量定义文件
* Gradle
  - 是一个项目自动化构建工具，帮我们做依赖、打包、部署、发布各种渠道的差异管理等工作
* Gradle scripts 
  > 工程的编译配置文件
  - build.gradle        描述app工程编译规则
  - proguard-rules.pro  java代码混淆规则
  - gradle.properties   配置编译工程的命令行参数，一般无须改动
  - settings.gradle     需要编译哪些模块，默认只编译app模块
  - local.properties    项目的本地配置文件，工程编译是自动生成，用于描述开发者电脑环境配置。包括SDK、NDK 的本地路径

## 真机调试
> adb 工具
1. 连接数据线
2. 打开手机的开发者选项并启用usb调试（系统->关于手机->版本信息（多点加下））
3. 手机设为文件传输模式，并允许进行usb调试
