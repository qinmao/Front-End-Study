process.on("message", (msg) => {
    console.log("当前子进程收到主进程的指令:", msg);
    setTimeout(() => {
        console.log("经过长时间的运算得到结果并将结果发回主进程");
        process.send("运算结束");
    }, 2000);
});
