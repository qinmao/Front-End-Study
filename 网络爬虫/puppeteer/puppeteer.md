# puppeteer

## 介绍
> Puppeteer 是一个 Node.js 库，它提供了一个高级 API， 通过 DevTools 协议控制 Chrome/Chromium。Puppeteer 在默认情况下以无头模式运行，但是可以配置为完全运行(“头”) Chrome/Chromium。

## CDP（chrome DevTool Protocol） 
* CDP：
  - 基于 WebSocket，利用 WebSocket 实现与浏览器内核的快速数据通道，CDP 分为多个域（DOM，Debugger，Network，Profiler，Console...），每个域中都定义了相关的命令和事件
  - 基于 CDP 封装一些工具对 Chrome 浏览器进行调试及分析，比如我们常用的 “Chrome 开发者工具” 就是基于 CDP 实现的
* remote-debugging-port 参数启动 Chrome，那么就可以看到所有 Tab 页面的开发者调试前端页面，还会在同一端口上还提供了 http 服务，主要提供以下几个接口：
  - GET /json/version                     # 获取浏览器的一些元信息
  - GET /json or /json/list               # 当前浏览器上打开的一些页面信息
  - GET /json/protocol                    # 获取当前 CDP 的协议信息   
  - GET /json/new?{url}                   # 开启一共新的 Tab 页面
  - GET /json/activate/{targetId}         # 激活某个页面成为当前显示的页面
  - GET /json/close/{targetId}            # 关闭某个页面
  - GET /devtools/inspector.html          # 打开当前页面的开发者调试工具
  - WebSocket /devtools/page/{targetId}   # 获取某个页面的 websocket 地址

## puppeteer-core 
* 安装chromium对应版本的驱动：
  ```bash
    npm install puppeteer-core@chrome-71
  ```

## 如何创建一个 Browser 实例
* 方法一: puppeteer.launch: 每次都启动一个 Chrome 实例
  ```js
    (async () => {
     const browser = await puppeteer.launch({
         headless: false,   // 有浏览器界面启动
         slowMo: 100,       // 放慢浏览器执行速度，方便测试观察
         args: [            // 启动 Chrome 的参数，详见上文中的介绍
             headless: false, // false 有浏览器模式
             executablePath: "C:\\Users\\qinmao\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
             args: [
               `--window-size=1440,780`, // 设置窗口大小，defaultViewport 设置无效
               // "--start-fullscreen", //全屏打开页面
               "--no-sandbox", // 沙盒模式
               // 禁用功能提升速度
               "--disable-setuid-sandbox", // uid沙盒
               "--disable-dev-shm-usage", // 创建临时文件共享内存
               "--disable-accelerated-2d-canvas", // canvas渲染
               "--disable-gpu", // GPU硬件加速
               "--disable-extensions"
             ],
             // defaultViewport: { width: 1440, height: 780 },
             // devtools: true, 开启页面调试
             ignoreHTTPSErrors: true,
         ],
     });
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    await page.close();
    await browser.close();
    })();
  ```
* 方法二: puppeteer.connect: 连接一个已经存在的 Chrome 实例
  ```js
    const request = require('request-promise-native');
    //使用 puppeteer.connect 连接一个已经存在的 Chrome 实例
    (async () => {
        // 通过 9222 端口的 http 接口获取对应的 websocketUrl
        let version = await request({
            uri:  "http://127.0.0.1:9222/json/version",
            json: true
        });
        // 直接连接已经存在的 Chrome
        let browser = await puppeteer.connect({
            browserWSEndpoint: version.webSocketDebuggerUrl,
            ignoreHTTPSErrors:true,
        });
        const page = await browser.newPage();
        await page.goto('https://www.baidu.com');
        await page.close();
        await browser.disconnect();
    })();
  ```
* 这两种方式的对比：
  - puppeteer.launch 每次都要重新启动一个 Chrome 进程，启动平均耗时 100 到 150 ms，性能欠佳
  - puppeteer.connect 可以实现对于同一个 Chrome 实例的共用，减少启动关闭浏览器的时间消耗
  - 通过 puppeteer.connect 我们可以远程连接一个 Chrome 实例，部署在不同的机器上
  - puppeteer.connect 多个页面共用一个 chrome 实例，偶尔会出现 Page Crash 现象，需要进行并发控制，并定时重启 Chrome 实例
* 连接远程实例
  > 默认情况下，Chrome 绑定到127.0.0.1（仅本地接口）使用给定的地址而不是默认的环回接受远程调试连接 ,注意，远程调试协议不执行任何认证，所以将其暴露得过于宽泛可能会带来安全隐患 
  - 连接前要关闭所有Chrome浏览器
  - 打开远程调试
  ```bash
    // mac 
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222 

    // linux
    google-chrome --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222

    // windows
    xxx/chrome.exe --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222
  ```

## 如何等待加载
* 加载导航页面
  - page.goto：打开新页面
  - page.goBack ：回退到上一个页面
  - page.goForward ：前进到下一个页面
  - page.reload ：重新加载页面
  - page.waitForNavigation：等待页面跳转

  ```js
   await page.goto('https://www.baidu.com', {
     timeout: 30 * 1000,
     waitUntil: [
        'load',              //等待 “load” 事件触发
        'domcontentloaded',  //等待 “domcontentloaded” 事件触发
        'networkidle0',      //在 500ms 内没有任何网络连接
        'networkidle2'       //在 500ms 内网络连接个数不超过 2 个
    ]
  });

  ```
* 等待元素、请求、响应
  - page.waitForXPath：等待 xPath 对应的元素出现，返回对应的 ElementHandle 实例
  - page.waitForSelector ：等待选择器对应的元素出现，返回对应的 ElementHandle 实例
  - page.waitForResponse ：等待某个响应结束，返回 Response 实例
  - page.waitForRequest：等待某个请求出现，返回 Request 实例
  ```js
    await page.waitForXPath('//img');
    await page.waitForSelector('#uniqueId');
    await page.waitForResponse('https://d.youdata.netease.com/api/dash/hello');
    await page.waitForRequest('https://d.youdata.netease.com/api/dash/hello');

    // 以上不满足自定义等待
    await page.goto(url, { 
        timeout: 120000, 
        waitUntil: 'networkidle2' 
    });
    // 我们可以在页面中定义自己认为加载完的事件，在合适的时间点我们将该事件设置为 true
    // 以下是我们项目在触发截图时的判断逻辑，如果 renderdone 出现且为 true 那么就截图，如果是Object，说明页面加载出错了，我们可以捕获该异常进行提示
    let renderdoneHandle = await page.waitForFunction('window.renderdone', {
        polling: 120
    });
    const renderdone = await renderdoneHandle.jsonValue();
    if (typeof renderdone === 'object') {
        console.log(`加载页面失败：报表${renderdone.componentId}出错 -- ${renderdone.message}`);
    }else{
        console.log('页面加载成功');
    }
  ```

## 如何获取页面元素
  - page.$('#uniqueId')：获取某个选择器对应的第一个元素
  - page.$$('div')：获取某个选择器对应的所有元素
  - page.$x('//img')：获取某个 xPath 对应的所有元素
  - page.waitForXPath('//img')：等待某个 xPath 对应的元素出现
  - page.waitForSelector('#uniqueId')：等待某个选择器对应的元素出现

## ElementHandle 提供操作元素的函数
  - elementHandle.click()：点击某个元素
  - elementHandle.tap()：模拟手指触摸点击
  - elementHandle.focus()：聚焦到某个元素
  - elementHandle.hover()：鼠标 hover 到某个元素上
  - elementHandle.type('hello')：在输入框输入文本

## 跳转新 tab 页处理
  > 在点击一个按钮跳转到新的 Tab 页时会新开一个页面，这个时候我们如何获取改页面对应的 Page 实例呢？可以通过监听 Browser 上的 targetcreated 事件来实现，表示有新的页面创建：
  ```js
    let page = await browser.newPage();
    await page.goto(url);
    let btn = await page.waitForSelector('#btn');
    //在点击按钮之前，事先定义一个 Promise，用于返回新 tab 的 Page 对象
    const newPagePromise = new Promise(res => 
      browser.once('targetcreated', 
        target => res(target.page())
      )
    );
    await btn.click();
    //点击按钮后，等待新tab对象
    let newPage = await newPagePromise;
  ```

## 案例：模拟用户登录
  ```js
    (async () => {
        const browser = await puppeteer.launch({
            slowMo: 100,    //放慢速度
            headless: false,
            defaultViewport: {width: 1440, height: 780},
            ignoreHTTPSErrors: false, //忽略 https 报错
            args: ['--start-fullscreen'] //全屏打开页面
        });
        const page = await browser.newPage();
        await page.goto('https://demo.youdata.com');
        //输入账号密码
        const uniqueIdElement = await page.$('#uniqueId');
        await uniqueIdElement.type('admin@admin.com', {delay: 20});
        const passwordElement = await page.$('#password', {delay: 20});
        await passwordElement.type('123456');
        
        //点击确定按钮进行登录
        let okButtonElement = await page.$('#btn-ok');
        //等待页面跳转完成，一般点击某个按钮需要跳转时，都需要等待 page.waitForNavigation() 执行完毕才表示跳转成功
        await Promise.all([
            okButtonElement.click(),
            page.waitForNavigation()  
        ]);
        console.log('admin 登录成功');
        await page.close();
        await browser.close();
    })();
  ```

## 案例：请求拦截
> 拦截一下没必要的请求提高性能
  ```js
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const blockTypes = new Set(['image', 'media', 'font']);
        await page.setRequestInterception(true); //开启请求拦截
        page.on('request', request => {
            const type = request.resourceType();
            const shouldBlock = blockTypes.has(type);
            if(shouldBlock){
                //直接阻止请求
                return request.abort();
            }else{
                //对请求重写
                return request.continue({
                    //可以对 url，method，postData，headers 进行覆盖
                    headers: Object.assign({}, request.headers(), {
                        'puppeteer-test': 'true'
                    })
                });
            }
        });
        await page.goto('https://demo.youdata.com');
        await page.close();
        await browser.close();
    })();
  ```

## 案例：注入脚本
  - page.evaluate(pageFunction[, ...args])：在浏览器环境中执行函数
  - page.evaluateHandle(pageFunction[, ...args])：在浏览器环境中执行函数，返回 JsHandle 对象
  - page.$$eval(selector, pageFunction[, ...args])：把 selector 对应的所有元素传入到函数并在浏览器环境执行
  - page.$eval(selector, pageFunction[, ...args])：把 selector 对应的第一个元素传入到函数在浏览器环境执行
  - page.evaluateOnNewDocument(pageFunction[, ...args])：创建一个新的 Document 时在浏览器环境中执行，会在页面所有脚本执行之前执行
  - page.exposeFunction(name, puppeteerFunction)：在 window 对象上注册一个函数，这个函数在 Node 环境中执行，有机会在浏览器环境中调用 Node.js 相关函数库

## 案例：抓取 iframe 中的元素
  ```js
    (async () => {
        const browser = await puppeteer.launch({headless: false, slowMo: 50});
        const page = await browser.newPage();
        await page.goto('https://www.188.com');
        //点击使用密码登录
        let passwordLogin = await page.waitForXPath('//*[@id="qcode"]/div/div[2]/a');
        await passwordLogin.click();
        for (const frame of page.mainFrame().childFrames()){
            //根据 url 找到登录页面对应的 iframe
            if (frame.url().includes('passport.188.com')){
                await frame.type('.dlemail', 'admin@admin.com');
                await frame.type('.dlpwd', '123456');
                await Promise.all([
                    frame.click('#dologin'),
                    page.waitForNavigation()
                ]);
                break;
            }
        }
        await page.close();
        await browser.close();
    })();
  ```

## 案例：文件的上传和下载
  ```js
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // 通过 CDP 会话设置下载路径
        const cdp = await page.target().createCDPSession();
        await cdp.send('Page.setDownloadBehavior', {
            behavior: 'allow', // 允许所有下载请求
            downloadPath: 'path/to/download'  // 设置下载路径
        });
        // 点击按钮触发下载
        await (await page.waitForSelector('#someButton')).click();
        // 等待文件出现，轮训判断文件是否出现
        await waitForFile('path/to/download/filename');


        // 上传时对应的 inputElement 必须是<input>元素
        let inputElement = await page.waitForXPath('//input[@type="file"]');
        await inputElement.uploadFile('/path/to/file');
        browser.close();

    })();
  ```


## 模拟不同的设备
  ```js
    const puppeteer = require('puppeteer');
    const iPhone = puppeteer.devices['iPhone 6'];

    puppeteer.launch().then(async browser => {
      const page = await browser.newPage();
      await page.emulate(iPhone);
      await page.goto('https://www.google.com');
      await browser.close();
    });
  ```
## linux 部署
* 依赖安装
  ```bash
  yum remove -y 

  yum install -y alsa-lib.x86_64 atk.x86_64 cups-libs.x86_64 gtk3.x86_64 ipa-gothic-fonts libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXrandr.x86_64 libXScrnSaver.x86_64 libXtst.x86_64 pango.x86_64 xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-fonts-cyrillic xorg-x11-fonts-misc xorg-x11-fonts-Type1 xorg-x11-utils
  ```
* 离线安装
  ```bash
  yumdownloader --resolve --destdir /home/rpm alsa-lib.x86_64 atk.x86_64 cups-libs.x86_64 gtk3.x86_64 ipa-gothic-fonts libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXrandr.x86_64 libXScrnSaver.x86_64 libXtst.x86_64 pango.x86_64 xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-fonts-cyrillic xorg-x11-fonts-misc xorg-x11-fonts-Type1 xorg-x11-utils

  ```
## 问题解决
* 离线环境缺少依赖
  - 在指定的chrome 安装路径下运行 ldd chrome | grep not 查找缺少的依赖安装
* 权限的问题：
  - 在指定的chrome 安装路径下运行  sudo chmod -R 777 /xxx/xxx/chrome-linux/chrome
