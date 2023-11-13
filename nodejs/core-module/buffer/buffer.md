# 核心模块 - Buffer

## Buffer 的基本使用
* Buffer.from()	    根据已有数据生成一个 Buffer 对象
* Buffer.alloc()	创建一个初始化后的 Buffer 对象
* Buffer.allocUnsafe()	创建一个未初始化的 Buffer 对象
  ```js
    // 创建
    // 创建一个长度为 10、且用零填充的 Buffer。
    const buf1 = Buffer.alloc(10);  // <Buffer 00 00 00 00 00 00 00 00 00 00>

    // 创建一个长度为 10、且用 0x1 填充的 Buffer。 
    const buf2 = Buffer.alloc(10, 1);  // <Buffer 01 01 01 01 01 01 01 01 01 01>

    // 创建一个长度为 10、且未初始化的 Buffer。
    // 这个方法比调用 Buffer.alloc() 更快，
    // 但返回的 Buffer 实例可能包含旧数据，
    // 因此需要使用 fill() 或 write() 重写。
    const buf3 = Buffer.allocUnsafe(10);

    // 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
    const buf4 = Buffer.from([1, 2, 3]);  // <Buffer 01 02 03>

    // 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
    const buf5 = Buffer.from('tést');  // <Buffer 74 c3 a9 73 74>

    // 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
    const buf6 = Buffer.from('tést', 'latin1'); // <Buffer 74 e9 73 74>

    // Buffer常用属性
    // Buffer.byteLength
    console.log(Buffer.byteLength('test'))  // 4
    console.log(Buffer.byteLength('测试'))  // 6

    console.log(Buffer.from('test').length) // 4
    console.log(Buffer.from('测试').length) // 6

    // Buffer.isBuffer
    console.log(Buffer.isBuffer({}))                     // false
    console.log(Buffer.isBuffer(Buffer.from('test')))    // true
    console.log(Buffer.isBuffer(Buffer.from([1,2,3])))   // true

    // Buffer.concat
    const buf1 = Buffer.from('This ')
    const buf2 = Buffer.from('is ')
    const buf3 = Buffer.from('buffer ')
    const buf4 = Buffer.from('test ')
    const buf5 = Buffer.from('demo ')

    const bufConcat = Buffer.concat([buf1,buf2,buf3,buf4,buf5])

    // 根据encoding指定的字符编码将buf解码成字符串
    console.log(bufConcat.toString()) // This is buffer test demo 

  ```
## Buffer 的应用场景
* I/O 操作
  ```js
    const fs = require('fs');

    const inputStream = fs.createReadStream('input.txt'); // 创建可读流
    const outputStream = fs.createWriteStream('output.txt'); // 创建可写流

    inputStream.pipe(outputStream); // 管道读写
  ```
* zlib.js 
  - zlib.js为Node.js的核心库之一，其利用了缓冲区（Buffer）的功能来操作二进制数据流，提供了压缩或解压功能
* 加解密
