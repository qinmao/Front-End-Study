 # gulp study

1. 什么是gulp？
     gulpjs是一个前端构建工具，与gruntjs相比，gulpjs无需写一大堆繁杂的配置参数，简单，gulpjs使用的是nodejs中stream来读取和操作数据，速度更快。

2. install
        首先确保你已经正确安装了nodejs环境。然后以全局方式安装gulp：
        全局安装：
            npm install -g gulp
            国内使用淘宝镜像
            npm install -g gulp --registry=https://registry.npm.taobao.org
        本地安装：
            建一个文件夹（工作目录）接下来的代码就在里面写
            进入该目录，键入命令
            npm install gulp (--save)   加save表示保存在本地 不写save也不影响 

            如果想在安装的时候把gulp写进项目package.json文件的依赖中，则可以加上--save-dev：
            npm install --save-dev gulp
            淘宝镜像
            npm install gulp --registry=https://registry.npm.taobao.org

        gulp -v 查看是否成功

3. useage
    1. 创建gulpfile.js 文件 
         touch gulpfile.js    (bash 命令)   
         gulpfil.js(名字必须这样命名)

         node :var gulp = require(‘gulp’);

    2. 创建任务呢
         使用语法：
         gulp.task(‘任务名’，function(){
             //要执行的任务
         })
         
         eg:
         Gulp.task(‘apptest’，function(){
             Console.log(‘我是一个apptest的任务’)；
         })
    3. 执行gulp的任务
         在工作目录下执行命令：gulp 任务名；例子的任务名是什么
         gulp apptest

         Using gulpfile 表示使用这样一个文件
         Starting 表示开启这个任务
         执行任务时打印这句话：我是一个appTest的任务
         Finished 表示结束了这个任务       