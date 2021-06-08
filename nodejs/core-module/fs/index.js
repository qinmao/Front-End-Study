const fs = require("fs");
const fsPromises = fs.promises;

// 读文件

// fs.readFile() 和 fs.readFileSync() 都会在返回数据之前将文件的全部内容读取到内存中。
// 这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响。
// 在这种情况下，更好的选择是使用流来读写文件的内容

// 案例1 filePath:文件路径

(async () => {
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


    // 案例：创建文件夹
    // const fileDirName=`./云搜-${new Date().getTime()}`
    // console.log('fileDirName:',fileDirName)
    // fs.mkdirSync(fileDirName)

})();





// 写文件

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

// 案例:文本附加写入
// appendFile;异步地追加数据到文件，如果文件尚不存在则创建文件。 data 可以是字符串或 Buffer。

// const arrIds = [317, 1, 3, 6];
// for (let index = 0; index < arrIds.length; index++) {
//     const item = arrIds[index];
//     const jsonStr = JSON.stringify(item) + "\n";
//     fs.appendFile("./data-out/out.txt", jsonStr, "utf8",()=>{});
// }
