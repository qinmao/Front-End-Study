## 使用IONIC制作APP
    制作混合app 
## 环境搭建
 1. 系统环境搭建
     Android:
        1. Java jdk（android ADT需要）
            添加到环境变量 JAVA_HOME  中
            http://jingyan.baidu.com/article/f96699bb8b38e0894e3c1bef.html
           
        2. C++环境（Node需要）
        3. Android ADT（打包android应用的时候需要）
            ANDROID_HOME
            http://jingyan.baidu.com/article/22a299b51c59d69e19376af8.html

        4. Node（插件环境需要）
        5. Git（从github上下载模板，团队代码管理）

     IOS
        1. XCode（打包ios应用的时候需要）
        2. Node（插件环境需要）
        3. Git（从github上下载模板，团队代码管理）

 2. 项目依赖环境搭建
    1. cordova（打包工具）  npm install -g  cordova
    2. ionic（框架）        npm  install  -g  ionic
## 项目搭建 
 1. 创建项目模板
    Ionic start myApp
       1. Ionic start  myApp  blank
       2. Ionic start  myApp  tabs
       3. Ionic start  myApp  sidemenu
 2. 模拟器运行
        android
            ionic   emulate   android
        ios 
            ionic   emulate   ios
 3. 打包app
    1、添加项目平台
        android     ionic   platform  add   android
        ios         ionic   platform  add   ios
    2、打包
        android     ionic    build    android
        ios         ionic    build     ios
    3、直接运行在手机
        ionic  run   android
## 问题解决
   1. 在运行ionic build android的时候报错
    [Error:ANDROID_HOME is not set and “android” command not in your PATH.
     这个时候要这样设置：
        ANDROID_HOME：C:\environment\adt-bundle-windows-x86-20130917\sdk
        在path中写：%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
# 不错的插件
    qrcode.js（二维码）
    官网：http://davidshimjs.github.io/qrcodejs/
    h5uploader （上传）
    官网：https://github.com/wewoor/h5uploader
    Echo.js（图片延迟加载）
    官网：http://toddmotto.com/echo-js-simple-javascript-image-lazy-loading/
    使用方法：http://www.jq22.com/jquery-info660
# 常用接口
    极光推送：http://my.oschina.net/u/1416844/blog/514952
    Ping++支付：http://my.oschina.net/u/1416844/blog/509194
    分享：https://github.com/iVanPan/Cordova_QQ
    定位：https://github.com/mrwutong/cordova-qdc-baidu-location
    微信：https://github.com/xu-li/cordova-plugin-wechat
