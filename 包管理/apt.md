# apt包管理  
> Debian、Ubuntu 使用的包管理器，软件安装包格式为 deb

## 换源

## 常用命令
```bash
    sudo apt update  # 更新包列表

    sudo apt install python3.10
    sudo apt list --installed
    sudo apt remove example-package
    sudo apt autoremove   # 删除不再需要的依赖包

    sudo apt clean        # 清理下载的包文件

```