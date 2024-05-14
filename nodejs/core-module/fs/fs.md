# fs 文件模块

## 读取文件
> readFile() 和 readFileSync() 都会在返回数据之前将文件的全部内容读取到内存中。小文件可考虑用同步的方法，读取大文件可考虑用的流的形式
* 简单用法
  ```js
    const { readFile,readFileSync } = require('node:fs');
    readFile('./test.txt',{ encoding:'utf8',flag:'r' },(err,data)=>{
        if(err) throw err
        console.log(data.toString())
    })

    // 同步方式
    const data= readFileSync('./test.txt')
    console.log(data.toString())

    // promise
    const { readFile,readFileSync } = require('node:fs/promise');
    readFile('./test.txt').then((data)=>{
        console.log(data.toString('utf-8'))
    }).catch((err)=>{})
  ````
## 可读流
  ```js
    // 处理读取大文件时使用
    const { createReadStream } = require('node:fs');
    const readerStream = createReadStream('./index.txt', {
        encoding: "utf8",
    });

    // 文件读取中事件·····
    let data = [];
    readerStream.on("data", (chunk) => {
        // 每次默认读取 64kb 的内容，也可以通过 highWaterMark 参数来动态改变每次内容流程的阈值。
        data.push(chunk.toString());
    });

    // 将在流中再没有数据可供消费时触发。
    readerStream.on("end", () => {
        console.log("读取已完成..");
        const dataStr = data.join("").replace("\\r\\n", "");
    });

    // 在流或其底层资源（比如一个文件）关闭后触发。'close' 事件触发后，该流将不会再触发任事件。
    readerStream.on("close", () => {
        console.log("close");
    });
    readerStream.on("error", function (err) {
        console.log(err.stack);
    });
  ```
## 文件夹管理
```js
    const { mkdir,mkdirSync }=require('node:fs')
    // 创建一个文件夹
    mkdirSync('./test')
    // 创建多层文件夹
    mkdirSync('./test/test1/test2'.{recursive:true})

    // 递归删除
    rmSync("./test", { recursive: true });

    // 重命名
    renameSync('./test','./test-new')

    // 判断路径是否存在
    // fs.existsSync(path)

    // 批量改名的小案例
    // 读取文件夹下的所有文件，并批量修改文件名
    const testPath = `/Users/qinmao/Desktop/零基础学Python（2023版）【完结】`;
    const paths = readdirSync(testPath);
    // console.log("paths:", paths);
    for (let index = 0; index < paths.length; index++) {
        const path = paths[index];
        const nameList = path.split("[防断更微coc3678].mp4");
        if (nameList.length > 1) {
            const name = nameList[0];
            const oldfileName = `${testPath}/${name}[防断更微coc3678].mp4`;
            const newFileName = `${testPath}/${name}.mp4`;
            rename(oldfileName, newFileName, (err) => {
                if (err) throw err;
                console.log("Rename complete!");
            });
        }
    }
```
## 写入文件（写入流）
  ```js
    const { writeFile,writeFileSync,appendFileSync,createWriteStream}=require('node:fs')
    writeFile('./test.txt', 'Node.js 中文网', 'utf8', callback);
    writeFileSync("./test.txt", "Node.js 中文网", { encoding: "utf8" });

    writeFile('./test.txt', '好好学习', 'utf8', callback);

    // 文件内容追加
    const data = new Uint8Array(Buffer.from("Node.js 中文网"));
    writeFile(
        "test.txt",
        data,
        {
            flag: "a", // 追加
        },
        (err) => {
            if (err) throw err;
            console.log("文件已被保存");
        }
    );
    // 追加数据到文件，如果文件尚不存在则创建文件。
    appendFileSync("test.txt",'hello world');

    // 大数据的批量写入使用流
    const list = ["北京", "南京", "上海", "深圳"];

    const writeStream = createWriteStream("./test.txt");
    list.forEach((text) => {
        writeStream.write(text + "\n");
    });
    // 写完关掉可写流
    writeStream.end();
    writeStream.on("finish", () => {
        console.log("写入完成");
    });
  ```
## 流 存在背压、负压的问题
* 如果 Readable 读入数据的速率大于 Writable 写入速度的速率，这样就会积累一些数据在缓冲区，如果缓冲的数据过多，就会爆掉，会丢失数据。
* 如果 Readable 读入数据的速率小于 Writable 写入速度的速率呢？那没关系，最多就是中间有段空闲时期
* 这个缓冲区大小可以通过 readableHighWaterMark 和 writableHightWaterMark 来查看，是 16k。
* 解决被压 问题
    1. 当没写完的时候，暂停读就行了。这样就不会读入的数据越来越多，驻留在缓冲区。
    2. 使用 pipe，其内部已经做了读入速率的动态调节了
    ```js
        const rs = fs.createReadStream(src);
        const ws = fs.createWriteStream(dst);
        rs.pipe(ws);
    ```