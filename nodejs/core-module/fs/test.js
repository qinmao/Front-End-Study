const {
    mkdir,
    mkdirSync,
    rmSync,
    rename,
    renameSync,
    readdirSync,
    existsSync,
    writeFile,
    writeFileSync,
    appendFileSync,
    createWriteStream,
} = require("node:fs");

// mkdirSync("./test");
// // 创建多层文件夹
// mkdirSync("./test/test1/test2", { recursive: true });
// // 递归删除
// rmSync("./test", { recursive: true });
// renameSync('./test','./test-new')

// 读取文件夹下的所有文件，并批量修改文件名
const testPath = `/Users/qinmao/Desktop/反爬虫20讲`;
const paths = readdirSync(testPath);
// console.log("paths:", paths);
const splitStr=`[防断更微ccc57585].pdf`
for (let index = 0; index < paths.length; index++) {
    const path = paths[index];
    const nameList = path.split(splitStr);
    if (nameList.length > 1) {
        const name = nameList[0];
        const oldfileName = `${testPath}/${name}${splitStr}`;
        const newFileName = `${testPath}/${name}.pdf`;
        rename(oldfileName, newFileName, (err) => {
            if (err) throw err;
            console.log("Rename complete!");
        });
    }
}

// // 案例:文本写入
// const data = new Uint8Array(Buffer.from("Node.js 中文网"));
// writeFile(
//     "test.txt",
//     data,
//     {
//         flag: "a",
//     },
//     (err) => {
//         if (err) throw err;
//         console.log("文件已被保存");
//     }
// );

// writeFileSync("test.txt", "Node.js 中文网");
// // 追加写入
// writeFileSync("test.txt", "hello world", {
//     flag: "a",
// });
// // 追加数据到文件，如果文件尚不存在则创建文件。
// appendFileSync("test.txt",'hello world');

// 大数据的批量写入
// const list = ["北京", "南京", "上海", "深圳"];

// const writeStream = createWriteStream("./test.txt");
// list.forEach((text) => {
//     writeStream.write(text + "\n");
// });
// // 写完关掉可写流
// writeStream.end();
// writeStream.on("finish", () => {
//     console.log("写入完成");
// });
