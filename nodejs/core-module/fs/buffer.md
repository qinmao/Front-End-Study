# 核心模块 - Buffer

## Buffer 常用属性

## Buffer 常用方法
* Buffer.isBuffer
  ````js
    console.log(Buffer.isBuffer({}))                     // false
    console.log(Buffer.isBuffer(Buffer.from('test')))    // true
    console.log(Buffer.isBuffer(Buffer.from([1,2,3])))   // true
  ```

* Buffer.from()	  根据已有数据生成一个 Buffer 对象
  ```js
    // Buffer.byteLength
    console.log(Buffer.byteLength('test'))  // 4
    console.log(Buffer.byteLength('测试'))  // 6

    console.log(Buffer.from('test').length) // 4
    console.log(Buffer.from('测试').length) // 6

  ```

* Buffer.concat
  ```js
    // Buffer.concat
    const buf1 = Buffer.from('This ')
    const buf2 = Buffer.from('is ')
    const buf3 = Buffer.from('buffer ')
    const buf4 = Buffer.from('test ')
    const buf5 = Buffer.from('demo ')

    const bufConcat = Buffer.concat([buf1,buf2,buf3,buf4,buf5])
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

* 将字符串和 base64 转换
  ```js
    const base64 = Buffer.from("341182199306224817").toString("base64");
    console.log(base64);

    const str = Buffer.from(base64, "base64").toString();
    console.log(str);
  ```
