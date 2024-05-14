const {
    spawn,
    spawnSync,
    exec,
    execSync,
    execFile,
    execFileSync,
    fork,
} = require("node:child_process");

const util = require("node:util");

// exec  异步，提供回调函数，返回buffer,帮助我们执行shell 命令 或者与软件交互
// execSync 同步的方法
// exec("node -v", (error, stdout, stderr) => {
//     if (error) {
//         console.error(`exec error: ${error}`);
//         return;
//     }
//     console.log(`stdout: ${stdout.toString()}`);
//     // console.error(`stderr: ${stderr}`);
// });
const execPromise = util.promisify(exec);
execPromise("node -v")
    .then((res) => {
        console.log(`res:`,res);
    })
    .catch((err) => {
        console.log("err", err);
    });

// 执行较小的shell命令,返回字节上限200kb,{stdio:'inherit'} 表示输出一些信息
// const nodeVer = execSync("node -v",{stdio:'inherit'});
// console.log(nodeVer);
// 打开一个应用程序
// exec("open /Applications/DingTalk.app"); // 这里是Mac下的打开方式，Windows下需要修改命令

// spawn 没有字节上限，实时返回的是数据流,第二个参数是数组
// 在 macOS Catalina（10.15）及更新版本中，netstat 命令已被弃用，推荐使用 lsof 或 ss 命令来替代。
// const { stdout, stderr } = spawn("lsof", ["-i -a"]);

// stdout.on("data", (data) => {
//     // 返回buffer
//     console.log(`stdout: ${data.toString()}`);
// });
// stdout.on("close", (code) => {
//     console.log(`结束了`);
// });
// stderr.on("data", (data) => {
//     console.error(`stderr: ${data}`);
// });

// execFile 执行可执行文件

// fork 只能接受js模块，支持父子进程通信
// cpu 密集型任务耗时的任务可以在子进程中执行
// const testProcess = fork("./child_process.js");
// testProcess.send("来自主进程的开始");
// testProcess.on("message", (msg) => {
//     console.log("收到来自子进程的消息:", msg);
// });

// process.on("connection", () => {
//     console.log("连接成功。");
//     process.emit("data_received");
// });
// process.on("data_received", function () {
//     console.log("数据接收成功。");
// });
// // myEmitter.emit('event', 1, 2, 3, 4, 5);
// process.emit("connection");

// console.log("程序执行完毕。");
