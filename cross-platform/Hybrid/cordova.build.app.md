## 各种环境安装过程省略，自行百度
    默认环境安装ok了

 一、创建一个cordova工程

　　cordova create cordovaVue

　　cd cordovaVue

config.xml -包含应用相关信息，使用到的插件以及面向的平台

platforms - 包含应用运行平台如 Android 和 iOS 上对应的 Cordova 库

plugins - 包含应用所需插件的 Cordova 库，使得应用能够访问例如照相机和电池状态相关的事项。

www - 包含应用源代码，例如 HTML, JavaScript 和 CSS 文件

hooks - 包含为个性化应用编译系统所需的脚本
 

## 二、添加安卓平台

　　cordova platform add android --save

## 检测检查整体环境是否正确，注意查看提示
 cordova requirements

## 三、引入f-elm 的项目在config/index.js文件中修改build配置项。在vue项目中生成编译完成的源文件

　　npm run build

    在f-elm 下运行后就可以看到www 文件下生成的文件了

## 四、在cordova项目中创建Android应用

　　cordova build android

## 五、将手机连接在电脑上，运行该 Android 程序

　　cordova run android
    用数据线连上电脑之后（注意手机开启调试模式）默认安装好apk并打开

## 六、以上打的是dubug的包(操作比较繁琐)
    Android app 的打包流程大致分为 build , sign , align 三部分。
    build是构建 APK 的过程，分为 debug 和 release 两种。release 是发布到应用商店的版本

    release 打包过程
    Cordova 允许我们建立一个 build.json 配置文件来简化操作。文件内容如下：
```javascript
        {
        "android": {
            "release": {
            "keystore": "release-key.keystore",
            "alias": "vue-app",
            <!--"storePassword": "testing",-->
            <!--"password": "testing2"-->

            }
        }
        }
```
下次就可以直接用 cordova build --release 

为了安全性考虑，建议不要把密码放在在配置文件或者命令行中，而是手动输入。
你可以把密码相关的配置去掉，下次 build 过程中会弹出一个 Java 小窗口，提示你输入密码。
## 出现的问题及解决
    1.使用Cordova编译Android平台程序提示：Could not reserve enough space for 2097152KB object heap
    2017-01-07 20:01 by slmk, 741 阅读, 1 评论, 收藏, 编辑
    大体的意思是系统内存不够用，创建VM失败。试了网上好几种方法都不行，最后这个方法可以了：

    开始->控制面板->系统->高级设置->环境变量->系统变量

    新建变量：
    变量名: _JAVA_OPTIONS   
    变量值: -Xmx512M
    2. 证书的问题：
        mkdir "%ANDROID_HOME%\licenses"
        echo |set /p="8933bad161af4178b1185d1a37fbf41ea5269c55" > "%ANDROID_HOME%\licenses\android-sdk-license"

    3. Failed to install the following SDK components:
        [Android SDK Platform 25]
        The SDK directory (C:\Program Files (x86)\Android) is not writeable,
        please update the directory permissions.

        用管理员权限运行android sdk 下的 sdk manage 安装缺失的组件（Android SDK Platform 25相关的）

参考：
    http://blog.csdn.net/xxx9001/article/details/52056530
    http://www.cnblogs.com/sharpall/p/6780311.html

