// fs-extra
// 1. 更简单的读写用法,和原生的写法没什么区别
// 2. 弥补原生 fs 库的不足：如删除一个目录，存在子目录如要递归删除，
const fs = require("fs-extra");
// const fs = require('node:fs');

// 1.读文件

// fs.readFile() 和 fs.readFileSync() 都会在返回数据之前将文件的全部内容读取到内存中。
// 这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响。
// 在这种情况下，更好的选择是使用流来读写文件的内容

// 案例：读取文件夹内的文件
// const filesPaths = fs.readdirSync("./imgs/");

// 案例：使用流来读json文件的内容

// 自定义流函数读取：读取一个json 文件返回一个json对象
function readJsonFile(filePath) {
    return new Promise((resolve, reject) => {
        const readerStream = fs.createReadStream(filePath, {
            encoding: "utf8",
        });

        // 文件读取中事件·····
        let data = [];
        readerStream.on("data", (chunk) => {
            // 每次默认读取 64kb 的内容，也可以通过 highWaterMark 参数来动态改变每次内容流程的阈值。
            data.push(chunk);
        });

        // 在流或其底层资源（比如一个文件）关闭后触发。'close' 事件触发后，该流将不会再触发任何事件。
        readerStream.on("close", () => {
            console.log("close");
        });

        // 将在流中再没有数据可供消费时触发。
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
// 案例：使用 fs-extra
async function example() {
    try {
        const packageObj = await fs.readJson("./package.json");
        console.log(packageObj.version); // => 0.1.3
    } catch (err) {
        console.error(err);
    }
}

// 2. 写文件
// Almost the same as writeFile (i.e. it overwrites),
// except that if the parent directory does not exist, it's created.
// With async/await:
// async function example (f) {
//     try {
//       await fs.outputFile(f, 'hello!')
//       const data = await fs.readFile(f, 'utf8')
//       console.log(data) // => hello!
//     } catch (err) {
//       console.error(err)
//     }
//   }
//   example(file)

// 案例:流写入
// 当 file 是文件名时，则异步地写入数据到文件（如果文件已存在，则覆盖文件）。 data 可以是字符串或 buffer。
// 如果 data 是 buffer，则 encoding 选项会被忽略。 如果 data 是普通的对象，则它必须具有自身的 toString 函数属性。

// const data = new Uint8Array(Buffer.from('Node.js 中文网'));
// fs.writeFile('./out/异步流写入.txt', data, (err) => {
//   if (err) throw err;
//   console.log('文件已被保存');
// });

// 案例:文本写入
// fs.writeFile('文件.txt', 'Node.js 中文网', 'utf8', callback);
// fs.writeFileSync("./data-out/文件.txt", "Node.js 中文网", { encoding: "utf8" });

// 案例:文本附加写入
// appendFile;异步地追加数据到文件，如果文件尚不存在则创建文件。 data 可以是字符串或 Buffer。

// const arrIds = [317, 1, 3, 6];
// for (let index = 0; index < arrIds.length; index++) {
//     const item = arrIds[index];
//     const jsonStr = JSON.stringify(item) + "\n";
//     fs.appendFile("./data-out/out.txt", jsonStr, "utf8",()=>{});
// }

// 3. 删除文件
// fs.remove()

// 4.
// 判断目录是否存在
// pathExists(file: string [, callback: func])

// 判断目录是否存在，不存在创建
// fs.ensureDirSync()

// 5. 确保目录为空。如果目录不为空，则删除目录内容。如果该目录不存在，则创建该目录。目录本身不会被删除。
//  emptyDir(dir: string, [callback: function])

// 6. 读取JSON文件，然后将其解析为对象
// readJson(file: string, [options: object, callback: func])

// 将对象写入JSON文件, 几乎与outputJson相同，除了必须保证目录存在外。
// writeJson(file, object, [options, callback])

// 读写综合案例
// const readDataStr = await fsPromises.readFile(
//     "./data-in/data-in.json",
//     "utf-8"
// );
// const readData = JSON.parse(readDataStr).data;
// console.log("data:", readData);

// // 读取文件夹内的文件
// const filesPaths = fs.readdirSync("./imgs/");
// let doneIds = [];
// filesPaths.forEach((path) => {
//     const idStr =path.split("_")[0]
//     doneIds.push(idStr);
// });
// console.log("doneIds:", doneIds);
