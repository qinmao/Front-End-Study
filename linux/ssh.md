# SSH

## SSH 是什么 
* （Secure Shell 的缩写）是一种网络协议，用于加密两台计算机之间的通信，并且支持各种身份验证机制。
* 历史上，网络主机之间的通信是不加密的，属于明文通信，SSH 就是为了解决这个问题而诞生的，它能够加密计算机之间的通信，保证不被窃听或篡改
* 基于OpenSSH实现，Linux 的所有发行版几乎都自带 OpenSSH,没有可以安装
  ```
    # Ubuntu 和 Debian
    $ sudo apt install openssh-client

    # CentOS 和 Fedora
    $ sudo dnf install openssh-clients

    # 输出版本号，查看一下是否安装成功
    ssh -V 

   ```
* 

## 应用场景
*  SSH 是 Linux 系统的登录工具，现在广泛用于服务器登录和各种加密通信。

* 登录linux 
    - ssh 用户名@IP地址 -p 端口号 如：
    - ssh root@39.96.190.20

* 与服务器建立连接
    + SSH key
        - SSH key 可以让你在你的电脑和Code服务器之间建立安全的加密连接
        - cat ~/.ssh/id_rsa.pub 判断本地是否已经存在公钥
        - ssh-keygen -t rsa  生成公钥和私钥

    + 免密登录：ssh-copy-id -i ~/.ssh/id_rsa.pub root@你的IP地址
        - 输入密码后，下次登录就不用输入密码了
        - 把公钥复制到远程主机上：
        - 命令也会给远程主机的用户主目录（home）和~/.ssh, 和~/.ssh/authorized_keys设置合适的权限。
            
    + 代码远程托管仓库服务器和web服务器做授权
        - 复制web公钥放到托管仓库服务器的个人设置中的SSH/My SSH Keys下，
        > 请完整拷贝从ssh-开始直到你的用户名和主机名为止的内容。

    + 查看远程主机上已授权的本地机器
        - 默认是 .ssh/authorized_keys 存放远程免密登录的公钥,主要通过这个文件记录多台机器的公钥