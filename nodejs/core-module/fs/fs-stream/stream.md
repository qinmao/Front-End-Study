# nodejs 四大流
## 流的api
  ```js
    const stream = require('stream');

    // 可读流
    const Readable = stream.Readable;
    // 可写流
    const Writable = stream.Writable;
    // 双工流
    const Duplex = stream.Duplex;
    // 转换流
    const Transform = stream.Transform;
  ```
## 流的事件
* Stream 对象都是 EventEmitter 的实例。
* 常用的事件有：
  - data    当有数据可读时触发。
  - end     没有更多的数据可读时触发。
  - error   在接收和写入过程中发生错误时触发。
  - finish  所有数据已被写入到底层系统时触发。
  - close
## 可读流（readable）
* Readable 要实现 _read 方法，通过 push 返回具体的数据。
```js
    const Stream = require('stream');

    const readableStream = Stream.Readable();

    readableStream._read = function() {
        this.push('阿门阿前一棵葡萄树，');
        this.push('阿东阿东绿的刚发芽，');
        this.push('阿东背着那重重的的壳呀，');
        this.push('一步一步地往上爬。')
        // 当 push 一个 null 时，就代表结束流。
        this.push(null);
    }

    readableStream.on('data', (data)=> {
        console.log(data.toString())
    });

    readableStream.on('end', () => {
        console.log('done~');
    });
```
## 可写流(writable)
```js
    const Stream = require('stream');

    const writableStream = Stream.Writable();

    writableStream._write = function (data, enc, next) {
        console.log(data.toString());
        // 每秒写一次
        setTimeout(() => {
            next();
        }, 1000);
    }

    writableStream.on('finish', () => console.log('done~'));

    writableStream.write('阿门阿前一棵葡萄树，');
    writableStream.write('阿东阿东绿的刚发芽，');
    writableStream.write('阿东背着那重重的的壳呀，');
    writableStream.write('一步一步地往上爬。');
```
## 双工流（duplex）既可流入又可流出
```js
    const Stream = require('stream');

    var duplexStream = Stream.Duplex();

    duplexStream._read = function () {
        this.push('阿门阿前一棵葡萄树，');
        this.push('阿东阿东绿的刚发芽，');
        this.push('阿东背着那重重的的壳呀，');
        this.push('一步一步地往上爬。')
        this.push(null);
    }

    duplexStream._write = function (data, enc, next) {
        console.log(data.toString());
        next();
    }

    duplexStream.on('data', data => console.log(data.toString()));
    duplexStream.on('end', data => console.log('read done~'));
    duplexStream.on('finish', data => console.log('write done~'));

    duplexStream.write('阿门阿前一棵葡萄树，');
    duplexStream.write('阿东阿东绿的刚发芽，');
    duplexStream.write('阿东背着那重重的的壳呀，');
    duplexStream.write('一步一步地往上爬。');
    duplexStream.end();

```
## 转换流（transform）可流入又可流出，可对流入的内容做转换再流出
```js
    const Stream = require('stream');

    class TransformReverse extends Stream.Transform {

        constructor() {
            super()
        }

        _transform(buf, enc, next) {
            const res = buf.toString().split('').reverse().join('');
            this.push(res)
            next()
        }
    }

    var transformStream = new TransformReverse();

    transformStream.on('data', data => console.log(data.toString()))
    transformStream.on('end', data => console.log('read done~'));

    transformStream.write('阿门阿前一棵葡萄树');
    transformStream.write('阿东阿东绿的刚发芽');
    transformStream.write('阿东背着那重重的的壳呀');
    transformStream.write('一步一步地往上爬');
    transformStream.end()

    transformStream.on('finish', data => console.log('write done~'));
```
## 背压、负压
* 如果 Readable 读入数据的速率大于 Writable 写入速度的速率，这样就会积累一些数据在缓冲区，如果缓冲的数据过多，就会爆掉，会丢失数据。
* 如果 Readable 读入数据的速率小于 Writable 写入速度的速率呢？那没关系，最多就是中间有段空闲时期
* 这个缓冲区大小可以通过 readableHighWaterMark 和 writableHightWaterMark 来查看，是 16k。
## 解决被压
* 当没写完的时候，暂停读就行了。这样就不会读入的数据越来越多，驻留在缓冲区。
* 使用 pipe，pipe 内部已经做了读入速率的动态调节了
  ```js
    const rs = fs.createReadStream(src);
    const ws = fs.createWriteStream(dst);
    rs.pipe(ws);
  ```