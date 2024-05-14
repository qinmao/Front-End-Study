# zlib

## 压缩
  ```js
    // gzip 适应文本压缩
    const zlib=require('node:zlib')
    const fs=require('node:fs')

    const readStream=fs.createReadStream('index.txt')
    const writeSteam=fs.createWriteStream('index.txt.gz')
    readStream.pipe(zlib.createGzip()).pipe(writeSteam)
  ```
## 解压
 ```js
    const zlib=require('node:zlib')
    const fs=require('node:fs')

    const readStream=fs.createReadStream('index.txt.gz')
    const writeSteam=fs.createWriteStream('index.txt')
    readStream.pipe(zlib.createGunzip()).pipe(writeSteam)
  ```