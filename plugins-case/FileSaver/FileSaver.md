# FileSaver
> web客户端保存文件的解决方案

## 安装
```
npm install file-saver --save

# ts 安装
npm install @types/file-saver --save-dev

```

## 语法
    ```js
        import { saveAs } from 'file-saver'
        // 语法
        saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom })

        // 保存成文本
        var FileSaver = require('file-saver');
        var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "hello world.txt");

        // 保存链接
        FileSaver.saveAs("https://httpbin.org/image", "image.jpg");

        // 保存canvas
        var canvas = document.getElementById("my-canvas");
        canvas.toBlob(function(blob) {
            saveAs(blob, "pretty image.png");
        });

        // 保存成一个文件
        // Note: Ie and Edge don't support the new File constructor,
        // so it's better to construct blobs and use saveAs(blob, filename)
        var file = new File(["Hello, world!"], "hello world.txt", {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(file);


    ```