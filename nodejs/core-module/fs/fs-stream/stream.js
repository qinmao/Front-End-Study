// Stream 有四种流类型：

// Readable - 可读操作。
// Writable - 可写操作。
// Duplex - 可读可写操作.
// Transform - 操作被写入数据，然后读出结果。

// Stream 对象都是 EventEmitter 的实例。

// 常用的事件有：
// data - 当有数据可读时触发。
// end - 没有更多的数据可读时触发。
// error - 在接收和写入过程中发生错误时触发。
// finish - 所有数据已被写入到底层系统时触发。
// close  - 在流或其底层资源（比如一个文件）关闭后触发

const fs = require("fs");
// 读取一个json 文件返回一个json对象
function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        const readerStream = createReadStream(filePath, {
            encoding: "utf8",
        });

        //文件读取中事件·····
        let data = [];
        readerStream.on("data", (chunk) => {
            data.push(chunk);
        });

        // 没有数据流出时触发
        readerStream.on("end", () => {
            console.log("读取已完成..");
            const dataStr = data.join("").replace("\\r\\n", "");
            resolve(dataStr);
        });

        readerStream.on("error", function (err) {
            console.log(err.stack);
            reject(err);
        });
    });
}

// 写入流

const data = "这是写入的流";
const writeStream = fs.createWriteStream("input.txt");
writeStream.write(data, "utf-8");
writeStream.end();
writeStream.on("finish", function () {
    console.log("写入完成");
});
writeStream.on("error", function (err) {
    console.log(err.stack);
});

//同一个文件会覆盖

// 管道流
// const readerStream=fs.createReadStream(`"input.txt")
// const writeStream=fs.createWriteStream("output.txt")

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
// readerStream.pipe(writeStream)
// console.log("程序执行完毕");

// 链式流
// 链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。
// 接下来我们就是用管道和链式来压缩和解压文件。
// 创建 compress.js 文件, 代码如下：
// const zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz

// fs.createReadStream('input.txt')
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream('input.txt.gz'));

// console.log("文件压缩完成。");

// 解压 input.txt.gz 文件为 input.txt

// fs.createReadStream('input.txt.gz')
//   .pipe(zlib.createGunzip())
//   .pipe(fs.createWriteStream('input.txt'));

// console.log("文件解压完成。");
