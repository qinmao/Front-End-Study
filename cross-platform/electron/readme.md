# electron
## electron-forge
> electron-forge 相当于 electron 的一个脚手架，可以让我们更方便的创建、运行、打包 electron 项目
    ```
    npm install -g electron-forge 

    electron-forge init my-app 

    cd my-app

    npm start

    ```

## 主进程和渲染进程
 * 主进程
    - Electron 运行 package.json 的 main 脚本的进程被称为主进程。 在主进程中运行的脚本通过创建web页面来展示用户界面。
    - 一个 Electron 应用总是有且只有一个主进程。
    - 主进程使用 BrowserWindow 实例创建页面。 每个 BrowserWindow 实例都在自己的渲染进程里运行页面。 当一个 BrowserWindow 实例被销毁后，相应的渲染进程也会被终止。

 * 渲染进程
    - 由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的渲染进程中

## 进程间的通讯(如何在两个网页间共享数据)
 * ipcRender
 * ipcMain
 * remote
    ```js
    // 将数据存在主进程的某个全局变量中，然后在多个渲染进程中使用 remote 模块来访问它
    // 在主进程中
    global.sharedObject = {
        someProperty: 'default value'
    }
    
    // 在第一个页面中
    require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
    // 在第二个页面中
    console.log(require('electron').remote.getGlobal('sharedObject').someProperty)

    ```
