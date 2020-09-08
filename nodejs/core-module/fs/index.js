const fs = require('fs');
const fsPromises = fs.promises;
// 异步地读取文件的全部内容。
// async function readFile() {
//     let filehandle;
//     try {
//         filehandle = await fsPromises.open('data.json');
//         let data = await filehandle.readFile("utf-8")
//         data = JSON.parse(data)
//         console.log(data)
//     } finally {
//         if (filehandle) {
//             await filehandle.close();
//         }

//     }
// }

async function readFile() {
    return await fsPromises.readFile('./data.json', "utf-8")
}

async function loads() {
    let readFns = []
    for (let index = 0; index < 300; index++) {
        readFns.push(readFile())
    }
    // 批量异步读取，并写入
    let arr = await Promise.all(readFns)
  
    console.log(arr)

    // writeFile(arr)
}

// fs.readFile() 和 fs.readFileSync() 都会在返回数据之前将文件的全部内容读取到内存中。
// 这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响。
// 在这种情况下，更好的选择是使用流来读写文件的内容

loads()

// const content = '一些内容'
// try {
//   const data = fs.writeFileSync('./data-out.json', content)
//   //文件写入成功。
// } catch (err) {
//   console.error(err)
// }

// fs.writeFile('./data-out.json', content, { flag: 'a+' }, err => {})
async function writeFile(data) {
    if (data) {
        fsPromises.writeFile('./data-out.json', data)
        // 默认情况下，此 API 会替换文件的内容（如果文件已经存在）
    }
}

// 修改默认行为
// r+ 打开文件用于读写。
// w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
// a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
// a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。