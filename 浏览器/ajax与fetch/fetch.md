# Fetch
  > Fetch API 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。
  > 它还提供了一个全局 fetch 方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

## 与 xhr 的区别
  - Fetch 不会发送跨域 cookie，需要设置 fetch(url, {credentials: 'include'})
  - 服务器返回 400，500 等错误码时并不会 reject，只有网络错误导致请求不能完成时，fetch 才会被 reject。
  - IE 均不支持原生 Fetch
## 几种使用方式
```js
    // 检测请求是否成功
    fetch('flowers.jpg')
    .then(response => response.blob())
    .then(blob => {
        // URL.createObjectURL(blob) 可以获取当前文件的一个内存URL
        myImage.src = URL.createObjectURL(blob);

        // FileReader.readAsDataURL(file)可以获取一段data:base64的字符串
        const reader = new FileReader();
        reader.onload = function (e) {
            console.log(e.target.result)
        };
        reader.readAsDataURL(blob);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

    // 上传文件
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    formData.append('username', 'abc123');
    formData.append('avatar', fileField.files[0]);

    fetch('https://example.com/profile/avatar', {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });


    // json
    fetch("http://localhost:3000/", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached   
        credentials: 'same-origin', // include, *same-origin, omit     
        headers: {
            'Content-Type': 'application/json' // 'application/x-www-form-urlencoded'、text/plain、multipart/form-data
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        });

    // text
    fetch("http://localhost:3000/", {
        credentials: "include",
        method: "get",
        mode: "cors",
    })
        .then((response) => response.text())
        .then((text) => {
            console.log(text);
        });

    // blob 解决返回的 html gbk 乱码问题
    fetch("http://localhost:3000/", {
        credentials: "include",
        method: "get",
        mode: "cors",
    })
        .then((response) => response.blob())
        .then((blob) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                var htmlData = reader.result;
                console.log(htmlData);
            };
            reader.readAsText(blob, "GBK");
        });
        
    // arrayBuffer
    fetch("http://localhost:3000/", {
        credentials: "include",
        method: "get",
        mode: "cors",
    })
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
           
        });
```