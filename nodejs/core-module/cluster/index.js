/**
 * 简单的进程守护器
 */
const cluster = require("cluster");

if (cluster.isMaster) {
    // console.log(require('os').cpus())
    for (let i = 0; i < require("os").cpus().length / 2; i++) {
        createWorker();
    }

    // 子进程退出检测
    cluster.on("exit", function () {
        setTimeout(() => {
            createWorker();
        }, 5000);
    });

    function createWorker() {
        // 创建子进程并进行心跳监控
        const worker = cluster.fork();

        let missed = 0; // 没有回应的ping次数

        // 心跳
        const timer = setInterval(function () {
            // 三次没回应，杀之
            if (missed == 3) {
                clearInterval(timer);
                console.log(worker.process.pid + " has become a zombie!");
                process.kill(worker.process.pid);
                return;
            }
            // 开始心跳
            missed++;
            worker.send("ping#" + worker.process.pid);
        }, 10*1000);

        worker.on("message", function (msg) {
            // 确认心跳回应。
            if (msg == "pong#" + worker.process.pid) {
                missed--;
            }
        });

        // 挂了就没必要再进行心跳了
        worker.on("exit", function () {
            clearInterval(timer);
        });
    }
} else {
    // 当进程出现会崩溃的错误
    process.on("uncaughtException", function (err) {
        // 这里可以做写日志的操作
        console.log(err);
        // 退出进程
        process.exit(1);
    });

    // 回应心跳信息
    process.on("message", function (msg) {
        if (msg == "ping#" + process.pid) {
            process.send("pong#" + process.pid);
        }
    });

    // 内存使用过多，自己退出进程
    if (process.memoryUsage().rss > 734003200) {
        process.exit(1);
    }

    require("./app");
}

// app.js

// const http = require('http');

// // console.log(11112222);
// module.exports = http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     res.end('hello world');
//     while (true) { }
// }).listen(3000, () => {
//     console.log('listened 3000')
// })
