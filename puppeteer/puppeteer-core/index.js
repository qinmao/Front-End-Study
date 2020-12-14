// //安装对应chrome@71对应的puppeteer
// npm install puppeteer-core@chrome-71
// //安装Carlo
// npm i carlo
// //或 yarn add carlo

const puppeteer = require('puppeteer-core');
//find_chrome模块来源于GoogleChromeLabs的Carlo,可以查看本机安装Chrome目录

const findChrome = require('carlo/lib/find_chrome');

(async () => {
    let findChromePath = await findChrome({});
    let executablePath = findChromePath.executablePath;
    const browser = await puppeteer.launch({
        executablePath,
        headless: false
    });

    const page = await browser.newPage();
    // 设置浏览器视窗
    page.setViewport({
        width: 1376,
        height: 768,
    });
    await page.goto('https://www.baidu.com/?tn=98012088_5_dg&ch=12');
    /*
          dosomeThing
    */

    //   await browser.close();
})();