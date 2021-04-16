# linux 学习(CentOS)
## yum 命令:软件包管理器
- 列出所有可更新的软件清单命令：yum check-update
- 更新所有软件命令：yum update
- 仅安装指定的软件命令：yum install <package_name>
- 仅更新指定的软件命令：yum update <package_name>
- 列出所有可安裝的软件清单命令：yum list
- 删除软件包命令：yum remove <package_name>
- 查找软件包 命令：yum search <keyword>
+ 清除缓存命令:
    - yum clean packages: 清除缓存目录下的软件包
    - yum clean headers: 清除缓存目录下的 headers
    - yum clean oldheaders: 清除缓存目录下旧的 headers
    - yum clean, yum clean all (= yum clean packages; yum clean oldheaders) :清除缓存目录下的软件包及旧的headers

+ 国内 yum 源
    - 查看当前使用的源 yum repolist enabled
    - 网易（163）yum源是国内最好的yum源之一 ，无论是速度还是软件版本，都非常的不错。
    - 将yum源设置为163 yum，可以提升软件包安装和更新的速度，同时避免一些常见软件版本无法找到。
    - [如何设置](http://www.runoob.com/linux/linux-yum.html)

## 网络
+ 网卡接口关闭与激活
    - ifdown eth0   关闭网络
    - ifup eth0     启动网络

+ 网络服务启动与关闭
    - service network restart 重启网络服务

## 文件操作
* 文件和文件夹
    + 查询
        - ls: 列出当前文件下文件目录
        - pwd：显示目前的目录
        - du -h -s 查看文件夹大小
        - 查看文件夹下的文件大小并排序
            ```
                find . -type f -size +1M  -print0 | xargs -0 du -h | sort -nr 
            ```
    + 增
        - mkdir：创建一个新的目录 -p 确保目录名称存在，不存在的就建一个
        - cp: 复制文件或目录

    + 删
        - rmdir：删除一个空的目录
        - rm: 移除文件或目录
        - rm -rf /var/log/httpd/access 删除文件夹

    + cd 切换目录
    + mv: 移动文件与目录，或修改文件与目录的名称

    + 压缩、解压
        * zip
            - zip -r xxx.zip ./*  当前目录下的所有文件和文件夹全部压缩为xxx.zip文件
            - unzip filename.zip  解压zip文件到当前目录
            + unzip -o -d /home/sunny myfile.zip 把myfile.zip文件解压到 /home/sunny/
            - -o:不提示的情况下覆盖文件；
            - -d:-d /home/sunny 指明将文件解压缩到/home/sunny目录下

            > tip: 有些服务器没有安装zip包执行不了zip命令，但基本上都可以用tar命令的
        * tar
    
    + 传输文件
        - scp :命令用于Linux之间复制文件和目录，-r：递归复制整个目录。
        
        + 本地到远程
            - scp local_file remote_username@remote_ip:remote_folder 
            - 或者 
            - scp local_file remote_username@remote_ip:remote_file 
            - 或者 
            - scp local_file remote_ip:remote_folder 
            - 或者 
            - scp local_file remote_ip:remote_file 

            > 例子:'scp -r dist/* root@39.96.190.20:/data/www/static' 

        + 远程到本地
            - scp remote_username@remote_ip:remote_folder  local_file
            > 例子：scp -r www.runoob.com:/home/root/others/ /home/space/music/

## 查看命令使用文档：
    - 使用 man [命令] 来查看各个命令的使用文档，如 ：man cp。
    - cat  由第一行开始显示文件内容

## vim 编辑器使用
+ vim 共分为三种模式，分别是
    - 命令模式（Command mode）:启动Vim，进入了命令模式
    - 按下i，切换到输入模式。
+ 输入模式（Insert mode）:
    1. 字符按键以及Shift组合，输入字符
    2. ENTER，回车键，换行
    3. BACK SPACE，退格键，删除光标前一个字符
    4. DEL，删除键，删除光标后一个字符
    5. 方向键，在文本中移动光标
    6. HOME/END，移动光标到行首/行尾
    7. Page Up/Page Down，上/下翻页
    8. Insert，切换光标为输入/替换模式，光标将变成竖线/下划线
    9. ESC，退出输入模式，切换到命令模式,：wq 保存文件退出程序.
>例如:打开host  sudo vi /etc/hosts
## shell 脚本编程
* #!/bin/sh，
    - 它同样也可以改为 #!/bin/bash
    - #! 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。

* 运行:
    - chmod +x ./test.sh  使脚本具有执行权限
    - 将上述指令保存为test.sh
    - ./test.sh  执行此脚本

* 注释
    - Shell 注释:以 # 开头的行就是注释，会被解释器忽略。

## 本地虚拟机安装Linux 并且设置静态ip时 注意事项
- 找到虚拟机网络设置，不能设置与本机mac共享网络，选择wifi
- 不能与本机ip 设置成一样 并在本地ping 你要设置的静态IP 看有没有被别人占用
- GATEWAY 要与本地dns 一样
