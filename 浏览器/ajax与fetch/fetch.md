# Fetch
  > Fetch API 提供了一个 JavaScript 接口，用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。它还提供了一个全局 fetch 方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

## 与 xhr 的区别
* Fetch 默认情况下不会发送同源的 Cookie，需要设置 fetch(url, {credentials: 'include'})
* 服务器返回 400，500 等错误码时并不会 reject，只有网络错误导致请求不能完成时，fetch 才会被 reject。
* IE 均不支持原生 Fetch

## 数据流式读取
  ```js
    async function sendPost(){
        // 第一个 awiat 等待的是请求头
       const response = await fetch("https://api.binjie.fun/api/generateStream?refer__1360=n4AxuDBDyDg0G%3DG8DlxGO4%2BrOb8p4iK03mQx", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            "referrer": "https://chat18.aichatos58.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"prompt\":\"取对象数组最后三条记录\",\"userId\":\"#/chat/1733396635331\",\"network\":true,\"system\":\"\",\"withoutContext\":false,\"stream\":false}",
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
        });
        // 第二个事请求体
        // const resJson= await response.json()
         const reader=response.body.getReader()
         // 解码器
         const textDecoder= new TextDecoder()
         let contetent=''
         while(true){
            const {done,value}= await reader.read()
            if(done){
                break
            }
            const txt=textDecoder.decode(value)
            contetent+=txt
         }
        console.log(contetent)

         
    }
    sendPost()
  ```
  
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