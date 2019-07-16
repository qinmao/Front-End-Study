# electron
## electron-forge
> electron-forge 相当于 electron 的一个脚手架，可以让我们更方便的创建、运行、打包 electron 项目
    ```
    npm install -g electron-forge 
    electron-forge init my-app 
    ```

## 运行流程
 * 执行的过程
    1. 在package.json 中main 定义app入口的文件app.js
    2. 在主进程中也就是app.js中创建一个渲染进程
    3. 在渲染进程中布局和画app的界面（index.html）

 * 主进程
    - Electron 运行 package.json 的 main 脚本的进程被称为主进程。 在主进程中运行的脚本通过创建web页面来展示用户界面。
    - 一个 Electron 应用总是有且只有一个主进程。
    - 主进程使用 BrowserWindow 实例创建页面。 每个 BrowserWindow 实例都在自己的渲染进程里运行页面。 当一个 BrowserWindow 实例被销毁后，相应的渲染进程也会被终止。

 * 渲染进程
    - 由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的渲染进程中
    - lectron 渲染进程中通过 Nodejs 读取本地文件

## 如何开启调试
```js
    const { app, BrowserWindow } = require('electron')
    let mainWindow
    app.on('ready', () => {
        mainWindow = new BrowserWindow({
            width:600
            height:400
        })
        if (process.env.NODE_ENV === "debug") {
            mainWindow.webContents.openDevTools()  
        }
    })
```

## 常用模块
 * 主进程
    + app
    + autoUpdater
    + BrowerWindow
    + dialog
    + menu
    + MenuItem
    + global-shortcut
        - 全局快捷键
    + Tray
        - 系统托盘，托盘右键菜单、托盘图标闪烁 点击右上角关闭按钮隐藏到托盘(仿杀毒软件)
    + session
    + webContents
    + ipcMain

 * 渲染进程
    + desktopCapturer
    + remote
        - 与 GUI 相关的模块(如 dialog, menu 等)只存在于主进程,渲染进程中要使用它们，需要用ipc模块来给主进程发送进程间消息。使用 remote 模块，可以调用主进程对象的方法
    + webFrame
    + ipcRender

 * 通用模块
  + clipboard
  + crashReporter
  + nativeImage
  + screen
  + shell
    - 在用户默认浏览器 中打开 URL 以及 Electron DOM webview 标签

 * 常用模块的使用
    + 在主进程中初始化一个窗口
        ```js
        // app 控制应用生命周期的模块 
        // BrowserWindow 创建本地浏览器窗口的模块 
        const {app,BrowserWindow} = require('electron'); 
        // 指向窗口对象的一个全局引用，如果没有这个引用，那么当该 javascript 对象被垃圾回收 的
        // 时候该窗口将会自动关闭
        let win;
        function createWindow() {
            // 创建一个新的浏览器窗口
            win = new BrowserWindow({width: 1104, height: 620});
            
            // 并且装载应用的 index.html 页面
            win.loadURL(`file://${__dirname}/html/index.html`);
            
            // 打开开发工具页面
            if (process.env.NODE_ENV === "debug") {
                win.webContents.openDevTools()  
            }
            
            //当窗口关闭时调用的方法
            win.on('closed', () => {
                // 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里 
                // 存放窗口对象，在窗口关闭的时候应当删除相应的元素。
                win = null;
            });
        }

        // 当 Electron 完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。
        // 有些 API 只能在该事件发生后才能被使用
        app.on('ready', createWindow);

        // 当所有的窗口被关闭后退出应用 
        app.on('window-all-closed', () => {
            // 对于 OS X 系统，应用和相应的菜单栏会一直激活直到用户通过 Cmd + Q 显式退出 
            if (process.platform !== 'darwin') {
                app.quit(); 
            }
        });
        app.on('activate', () => {
            // 对于 OS X 系统，当 dock 图标被点击后会重新创建一个 app 窗口，并且不会有其他
            // 窗口打开
            if (win === null) {
                createWindow(); 
            }
        });

        ```
    + 在渲染模块中打开新的窗口
        - ```js
            const btn = document.querySelector('#btn');
            const path = require('path');
            const BrowerWindow = require('electron').remote.BrowserWindow;

            btn.onclick = () => {
                win = new BrowerWindow({ 
                    width: 300,
                    height: 200, 
                    frame: false, // false隐藏关闭按钮、菜单选项 true显示
                    fullscreen:true, // 全屏展示
                    transparent: true 
                }) 

                win.loadURL(path.join('file:',__dirname,'news.html'));

                win.on('close',()=>{win = null});
            }
        ```
    + 自定义顶部菜单/右键菜单
        - Menu 模块可以用来创建原生菜单，它可用作应用菜单和 context 菜单
        - 主进程中初始化菜单(menu.js) 在主进程中require 导入
        ```js
            const { Menu }  = require('electron')
            const menus = [
            {
                label: '文件',
                submenu: [
                    {
                        label: '新建文件',
                        accelerator: 'ctrl+n', // 绑定快捷键
                        click: function () { // 绑定事件
                            console.log('新建文件')
                        }
                    }
                ]
            },
            {
                label: '编辑',
                submenu: [
                    {
                        label: '复制',
                        role: 'copy' // 调用内置角色实现对应功能
                    },
                    {
                        label: '剪切',
                        role: 'cut'  // 调用内置角色实现对应功能
                    }
                ]
            }
        ]

        let m = Menu.buildFromTemplate(menus)
        Menu.setApplicationMenu(m)

        ```
    + 创建任务栏图标与右键菜单/图标闪烁
        ```js
        // src/main/tray.js
        var {
            Menu, Tray, app, BrowserWindow
        } = require('electron');

        const path = require('path');

        var appIcon = new Tray(path.join(__dirname, '../static/lover.png'));

        const menu = Menu.buildFromTemplate([
            {
                label: '关于',
                click: function() {}
            },
            {
                label: '退出',
                click: function() { 
                app.quit();
                }
        }])
        // 鼠标放上去提示信息
        appIcon.setToolTip('hello poetries');
        appIcon.setContextMenu(menu);

        timer = setInterval(function() {
            count++;
            if (count % 2 == 0) {
                appIcon.setImage(path.join(__dirname, '../static/empty.ico'))
            } else {
                appIcon.setImage(path.join(__dirname, '../static/lover.png'))
            }
            },
        500);

        ```
    + 监听任务栏图标的单击双击事件
        ```js
            // 实现点击关闭按钮，让应用保存在托盘里面，双击托盘打开
            let win = BrowserWindow.getFocusedWindow()

            win.on('close', (e)=>{
                console.log(win.isFocused());
                if (!win.isFocused()) {
                    win = null;
                } else {
                    e.preventDefault();/*阻止应用退出*/
                    win.hide();/*隐藏当前窗口*/
                }
            })

            iconTray.on('double-click', (e)=>{
                win.show()
            })
        ```
    + 网络监测与消息通知(基于h5api实现通知)
        ```js
        // 断开网络 再次连接测试
        // 监听网络变化实现消息通知
        window.addEventListener('online', function(){
            console.log('online')
        }); 
        window.addEventListener('offline', function(){
            // 断开网络触发事件
            const options = {
                title: 'QQ邮箱',
                body: '网络异常，请检查你的网络',
                icon: path.join('../static/img/favicon2.ico') // 通知图标
            }
            var myNotification  = new window.Notification(options.title, options)
            myNotification.onclick = function () {
                console.log('click notification')
            }
        });


        ```
    + 注册全局快捷键/剪切板
        ```js
        const {globalShortcut, app} = require('electron')
        app.on('ready', ()=>{
            // 注册全局快捷键
            globalShortcut.register('command+e', ()=>{
                console.log(1)
            })
            // 检测快捷键是否注册成功 true是注册成功
            let isRegister = globalShortcut.isRegistered('command+e')
            console.log(isRegister)
        })

        // 退出的时候取消全局快捷键
        app.on('will-quit', ()=>{
            globalShortcut.unregister('command+e')
        })

        ```
        ```js
            // clipboard可以在主进程或渲染进程使用
            const { clipboard, nativeImage }  = require('electron')

            //复制
            // 运行ctrl+v可看到复制的内容
            // clipboard.writeText('poetries')

            // clipboard.readText() //获取复制的内容 粘贴

            // 双击复制消息
            let msg = document.querySelector('#msg')
            let plat = document.querySelector('#plat')
            let text = document.querySelector('#text')

            msg.ondblclick  = function () {
                clipboard.writeText(msg.innerHTML)
                alert(msg.innerHTML)
            }
            plat.onclick = function () {
                text.value = clipboard.readText()
            }

            // 复制图片显示到界面
            let copyImg = document.querySelector('#copyImg')
            copyImg.onclick = function () {
                // 结合nativeImage模块
                let image = nativeImage.createFromPath('../static/img/lover.png') 

                // 复制图片
                clipboard.writeImage(image)

                // 粘贴图片
                let imgSrc = clipboard.readImage().toDataURL() // base64图片

                // 显示到页面上
                let imgDom = new Image()
                imgDom.src = imgSrc 
                document.body.appendChild(imgDom)
            }

        ```
        ```html
            <!--src/index.html-->
            <div>
                <h2>双击下面信息复制</h2>
                <p id='msg'>123456789</p>
                <button id="plat">粘贴</button><br />
                <input id="text" type="text"/>
                </div>.
                <div>
                <h2>复制图片到界面</h2>
                <button id="copyImg">复制图片</button><br />
            </div>
            <script src="render/clipboard.js"></script>
        ```

## 进程间的通讯
 * 通讯的工具
    - ipcMain
    > 当在主进程中使用时，它处理从渲染器进程(网页)发送出来的异步和同步信息,当然也有可能从主进程向渲染进程发送消息。
    - ipcRender
    > 使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。 也可以接收主进程回复的消息

 * 具体通讯的方式
    + 渲染进程-->主进程发送异步消息
        - 渲染进程发消息
            ```js
            // src/render/ipcRender.js
            //渲染进程
            let send = document.querySelector('#send');
            const { ipcRenderer } = require('electron');
            send.onclick = function () {
                // 传递消息给主进程
                ipcRenderer.send('sendMsg', {name:'poetries', age: 23})
            }

            // 向主进程发送消息后，接收主进程广播的事件
            ipcRenderer.on('sendFeedbackToRender', (e, data)=>{
                console.log('event\n ', e)
                console.log('data\n ', data)
            })

            ```
            ```html
                <!--src/index.html-->
                <button id="send">在 渲染进程中执行主进程里的方法（异步）</button>
                <script src="render/ipcRender.js"></script>

            ```
        - 主进程接收消息
            ```js
            // src/main/ipcMain.js
            const { ipcMain }  = require('electron')
            // 主进程处理渲染进程广播数据
            ipcMain.on('sendMsg', (event, data)=> {
                console.log('data\n ', data)
                console.log('event\n ', event) 
                // 主进程给渲染进程广播数据
                event.sender.send('sendFeedbackToRender', '来自主进程的反馈')
            })
           
            ```

    + 渲染进程-->主进程发送同步消息
        - 发消息
        ```js
        let sendSync = document.querySelector('#sendSync');
        // 渲染进程和主进程同步通信
        sendSync.onclick = function () {
            // 同步广播数据
            let msg =  ipcRenderer.sendSync('sendsync', {name:'poetries', age: 23})
            // 同步返回主进程反馈的数据
            console.log('msg\n ', msg)
        }

        ```
        - 接消息
        ```js
            // 渲染进程和主进程同步通信 接收同步广播
            ipcMain.on('sendsync', (event, data)=> {
                // console.log('data\n ', data)
                // console.log('event\n ', event)
                // 主进程给渲染进程广播数据
                event.returnValue ='渲染进程和主进程同步通信 接收同步广播，来自主进程的反馈.';
            })
        ```
    + sendToHost 
        - 就像 ipcRenderer.send，不同的是消息会被发送到 host 页面上的 <webview> 元素，而不是主进程。
    + send(webview) 
        - 向渲染进程发送消息

    + 渲染进程间通讯
     - localstorage
     + BrowserWindow和webContents
        - webContents 是一个事件发出者.它负责渲染并控制网页，也是 BrowserWindow 对象的属性 
        - 前置知识
            1. 获取当前窗口的 id
            ```js
                const winId = BrowserWindow.getFocusedWindow().id;
            ```
            2. 监听当前窗口加载完成的事件
             ```js
                win.webContents.on('did-finish-load',(event) => {

                })

            ```
            3. 同一窗口之间广播数据
             ```js
                win.webContents.on('did-finish-load',(event) => {
                    win.webContents.send('msg',winId,'我是 index.html 的数据');
                })

            ```
            4. 通过 id 查找窗口
             ```js
                let win = BrowserWindow.fromId(winId);
            ```

## webview
```html
<webview src="http://www.google.com/" preload="./test.js" nodeintegration></webview>
```
+ nodeintegration 
 - 当有此属性时, webview 中的访客页（guest page）将具有Node集成, 并且可以使用像 require 和 process 这样的node APIs 去访问低层系统资源。 Node 集成在访客页中默认是禁用的。

+ preload
 - 指定一个脚本在访客页中其他脚本执行之前先加载。 该脚本的URL的协议必须是 file: asar:二者之一，因为在访客页中，它是通过“内部”的 require 去加载的
 - 当访客页没有 node integration ，这个脚本仍然有能力去访问所有的 Node APIs, 但是当这个脚本执行执行完成之后，通过Node 注入的全局对象（global objects）将会被删除。

+ 方法
 ```js
    const webview = document.querySelector('webview')
    webview.addEventListener('dom-ready', () => {
        webview.openDevTools()
    })
 ```
 
## electron-vue
 - 隐藏顶部菜单
    ```js
        // src/main/index.js
        mainWindow.setMenu(null)
    ```
    ```js
    // src/main/index.js
        mainWindow = new BrowserWindow({
            height: 620,
            useContentSize: true,
            width: 1280,
            frame: false /*去掉顶部导航 去掉关闭按钮 最大化最小化按钮*/
        })

    ```
 - [文档](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/)

## 多平台打包