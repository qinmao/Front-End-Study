# chrome 调试技巧

## Elements
* computed 看盒模型信息

## Sources
* js 代码的断点调试

## Network
* 接口重新请求
  - 点击Fetch/XHR
  - 选择要重新发送的请求
  - 右键选择 Replay XHR
* 复制请求
  - 点击Fetch/XHR
  - 选择 Copy as fetch，或其他
  - 控制台粘贴代码(fetch),终端（curl）

## 其他一些小技巧
* 使用copy函数，复制JavaScript变量，将对象作为入参执行即可
* 截取一张全屏的网页
  - 准备好需要截屏的内容（注意懒加载）
  - 打开开发者工具，cmd + shift + p 执行Command命令
  - 输入 Capture full size screenshot 按下回车