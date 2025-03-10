# ArrayBuffer
> ArrayBuffer对象、TypedArray 视图和 DataView 视图是 JavaScript 操作二进制数据的一个接口
## 二进制数组由三类对象组成:
  - ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。
  - TypedArray视图：共包括 9 种类型的视图，比如 Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。
  - DataView视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。
> 简单说，ArrayBuffer 对象代表原始的二进制数据，TypedArray 视图用来读写简单类型的二进制数据，DataView 视图用来读写复杂类型的二进制数据。

## ArrayBuffer 基本使用
  ```js
    // 生成了一段 32 字节的内存区域，每个字节的值默认都是 0
    const buf = new ArrayBuffer(32);
    buffer.byteLength     // 32

    // 为了读写这段内容，需要为它指定视图。
    // DataView视图的创建，需要提供 ArrayBuffer 对象实例作为参数

    const dataView = new DataView(buf);
    // 以不带符号的 8 位整数格式，从头读取 8 位二进制数据，结果得到 0
    dataView.getUint8(0) // 0


    const typedArray = new Uint8Array([0,1,2]);
    typedArray.length // 3

    typedArray[0] = 5;
    typedArray // [5, 1, 2]
  ```

## 二进制数组的应用
* 网页 Canvas 元素输出的二进制像素数据，就是 TypedArray 数组。
  ```js
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const uint8ClampedArray = imageData.data;
    // 上面代码的uint8ClampedArray虽然是一个 TypedArray 数组，但是它的视图类型是一种针对Canvas元素的专有类型Uint8ClampedArray。这个视图类型的特点，就是专门针对颜色，把每个字节解读为无符号的 8 位整数，即只能取值 0 ～ 255，而且发生运算的时候自动过滤高位溢出。这为图像处理带来了巨大的方便。
  ```
* WebSocket可以通过 ArrayBuffer，发送或接收二进制数据。
  ```js
    let socket = new WebSocket('ws://127.0.0.1:8081');
    socket.binaryType = 'arraybuffer';
    // Wait until socket is open
    socket.addEventListener('open', function (event) {
        // Send binary data
        const typedArray = new Uint8Array(4);
        socket.send(typedArray.buffer);
    });

    // Receive binary data
    socket.addEventListener('message', function (event) {
        const arrayBuffer = event.data;
        // ···
    });

  ```
* Fetch API 取回的数据，就是ArrayBuffer对象。
  ```js
    fetch(url)
    .then(function(response){
        return response.arrayBuffer()
    })
    .then(function(arrayBuffer){
        // ...
    });
  ```
* File API
  ```js
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
        const arrayBuffer = reader.result;
        // ···
    };
  ```
