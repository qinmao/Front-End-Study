## linux 学习(CentOS)
1) yum 命令:前端软件包管理器
    1.列出所有可更新的软件清单命令：yum check-update
    2.更新所有软件命令：yum update
    3.仅安装指定的软件命令：yum install <package_name>
    4.仅更新指定的软件命令：yum update <package_name>
    5.列出所有可安裝的软件清单命令：yum list
    6.删除软件包命令：yum remove <package_name>
    7.查找软件包 命令：yum search <keyword>
    8.清除缓存命令:
        yum clean packages: 清除缓存目录下的软件包
        yum clean headers: 清除缓存目录下的 headers
        yum clean oldheaders: 清除缓存目录下旧的 headers
        yum clean, yum clean all (= yum clean packages; yum clean oldheaders) :清除缓存目录下的软件包及旧的headers

    国内 yum 源
    网易（163）yum源是国内最好的yum源之一 ，无论是速度还是软件版本，都非常的不错。
    将yum源设置为163 yum，可以提升软件包安装和更新的速度，同时避免一些常见软件版本无法找到。
    如何设置：http://www.runoob.com/linux/linux-yum.html

2）文件操作

ls: 列出目录

cd：切换目录

pwd：显示目前的目录

mkdir：创建一个新的目录 
    -p 确保目录名称存在，不存在的就建一个

rmdir：删除一个空的目录

cp: 复制文件或目录

rm: 移除文件或目录
    删除文件夹
    rm -rf /var/log/httpd/access
mv: 移动文件与目录，或修改文件与目录的名称

使用 man [命令] 来查看各个命令的使用文档，如 ：man cp。

cat  由第一行开始显示文件内容

3）vim  编辑器使用
vim 共分为三种模式，分别是
命令模式（Command mode）:启动Vim，进入了命令模式，按下i，切换到输入模式。
输入模式（Insert mode）:
    1) 字符按键以及Shift组合，输入字符
    2) ENTER，回车键，换行
    3) BACK SPACE，退格键，删除光标前一个字符
    4) DEL，删除键，删除光标后一个字符
    5) 方向键，在文本中移动光标
    6) HOME/END，移动光标到行首/行尾
    7) Page Up/Page Down，上/下翻页
    8) Insert，切换光标为输入/替换模式，光标将变成竖线/下划线
    9) ESC，退出输入模式，切换到命令模式

底线命令模式（Last line mode）:
在输入模式下：wq 保存文件退出程序
例如:打开host  vim /etc/hosts

4) shell 脚本编程
像 #!/bin/sh，它同样也可以改为 #!/bin/bash。
    #! 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。
1. 运行:
 chmod +x ./test.sh  #使脚本具有执行权限
    将上述指令保存为test.sh

   ./test.sh  #执行脚本
2. 变量
定义:
your_name="qm"
rule:
    命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
    中间不能有空格，可以使用下划线（_）。
    不能使用标点符号。
    不能使用bash里的关键字（可用help命令查看保留关键字）。
使用：
your_name="qm"
echo $your_name
<!-- 变量名外面的花括号是可选的，加不加都行(推荐给所有变量加上花括号,目的是为了确定边界值) -->
echo ${your_name} 

myUrl="http://www.google.com"
readonly myUrl
<!--  readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。 -->

Shell 注释:以 # 开头的行就是注释，会被解释器忽略。

获取参数：
脚本内获取参数的格式为：$n。n 代表一个数字
