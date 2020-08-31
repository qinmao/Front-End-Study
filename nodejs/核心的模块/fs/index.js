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

loads()



async function writeFile(data) {
    if (data) {
        fsPromises.writeFile('./data-out.json', data)
    }
}


// writeFile()
function appendFile(params) {

}
// readFile()