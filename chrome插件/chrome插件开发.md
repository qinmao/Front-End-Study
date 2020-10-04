# chrome插件开发
* 首先要有一个manifest.json清单文件
   - [参数列表](http://chrome.liuyixi.com/manifest.html)
* 在清单文件中提供了代码文件
* 插件完成后，将其导入到Chrome中
   - 首先将所有相关文件都放到一个文件夹中
   - 用Chrome打开chrome://settings/extensions 这个网址是Chrome的扩展程序管理页面。点击“加载正在开发的扩展程序”，选择刚才创建的文件夹，- 确定，即成功导入。如果导入出错会有提示信息显示，可能是json文件配置有问题等。
   
* [文章])(https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)