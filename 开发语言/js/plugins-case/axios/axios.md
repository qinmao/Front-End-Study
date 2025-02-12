# axios
## responseType
* 表示服务器响应的数据类型: 
  - 'arraybuffer','blob','document','json','text','stream' 默认是json
## 获取图片
* node.js
    ```js
    axios({
        method: 'get',
        url: 'http://bit.ly/2mTM3nY',
        responseType: 'stream'
    })
    .then(function (response) {
        response.data.pipe(fs.createWriteStream('test.jpg'))
    });

    axios({
        method: "post",
        url: `/wxa/getwxacodeunlimit`,
        data: params,
        responseType: "arraybuffer",
        transformResponse: [
        function (data) {
            const base64 = Buffer.from(data, "binary").toString("base64");
            return `data:image/jpeg;base64,${base64}`;
        },
        ],
    });
* browser
  ```js
    axios({
        method: 'get',
        url: 'http://bit.ly/2mTM3nY',
        responseType: 'blob',
        transformResponse: [
        function (blob) {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onload = function (e) {
                // e.target.result 图片的base64位编码
            console.log(e.target.result)
                // 直接给img 的src 赋值可以显示图片
            }
        },
        ],
    })
  ```
## 数据类型
* 浏览器专属: FormData, File, Blob
* Node 专属: Stream, Buffer
## 请求体编码
    ```js
    // By default, axios serializes JavaScript objects to JSON.
    // To send data in the application/x-www-form-urlencoded format instead,
    // you can use one of the following options.

    // In a browser
    // 方法1
    const params = new URLSearchParams();
    params.append('param1', 'value1');
    params.append('param2', 'value2');
    axios.post('/foo', params);

    // 方法2 browser and Node.js 都支持 推荐使用
    const qs = require('qs');
    // import qs from 'qs';
    axios.post('/foo', qs.stringify({ 'bar': 123 }));

    // In a Node.js
    const querystring = require('querystring');
    axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));

    const url = require('url');
    const params = new url.URLSearchParams({ foo: 'bar' });
    axios.post('http://something.com/', params.toString());

    const FormData = require('form-data');
    const form = new FormData();
    form.append('my_field', 'my value');
    form.append('my_buffer', new Buffer(10));
    form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

    axios.post('https://example.com', form, { headers: form.getHeaders() })

    ```
## GBK 解码
  ```js
    axios({
        // 后台返回的是GBK导致乱码，转成GBK才能取到中文的值
        responseType: 'arraybuffer',
        transformResponse: [
        function (data) {
            const htmlStr = iconv.decode(Buffer.from(data), 'GBK')
            return htmlStr
        },
        ],
    })
  ```
## axios 取消请求（v0.22.0+）
  - Axios 支持以 fetch API方式—— AbortController 取消请求：
  ```js
    const controller = new AbortController();
    axios.get('/foo/bar', {
        signal: controller.signal
    }).then(function(response) {
        //...
    });
    // 取消请求
    controller.abort()
  ```