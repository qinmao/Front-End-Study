# util

## 常用的方法
* promisify
```js
    import { promisify } from 'node:util';
    const execPromise = promisify(exec);
    execPromise("node -v")
    .then((res) => {
        console.log(`res:`,res);
    })
    .catch((err) => {
        console.log("err", err);
    });
```