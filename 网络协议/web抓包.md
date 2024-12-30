# web抓包

## telnet
是一种网络协议和命令行工具，用于远程登录到网络上的另一台计算机或设备，通常用于访问远程系统的命令行界面（CLI）。虽然现在 telnet 协议已经不常用于安全的远程访问（因为它不加密通信），但它在网络调试和测试中仍然有一些用途。已被更安全的协议（如 SSH）取代，尤其是用于远程管理和访问

* Telnet 命令的使用
  ```bash
   # telnet <hostname> <port>

   telnet 192.168.1.1
   telnet http://local_static.com
  ```