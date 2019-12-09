const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch(
        {
            headless: false,
            devtools: true
        });
    const page = (await browser.newPage())[0];
    // 设置浏览器视窗
    page.setViewport({
        width: 1376,
        height: 768,
    });
    
    await page.goto('https://www.baidu.com/?tn=98012088_5_dg&ch=12');
    // await page.screenshot({ path: 'baidu.png' });

    // 获取 html
    // 获取上下文句柄
    // Page.$ 可以理解为我们常用的 document.querySelector, 
    //  Page.$$ 则对应 document.querySelectorAll。

    const htmlHandle = await page.$('html');
    // 执行计算
    const html = await page.evaluate(body => body.outerHTML, htmlHandle);

    // 销毁句柄
    await htmlHandle.dispose();

    console.log('html:', html);

    // await browser.close();
})();
