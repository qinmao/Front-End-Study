# promise 面试题
* 下面代码的输出结果，为什么？then 中的参数err 与catch 有什么区别？
  ```js
    new Promise(resove=>{
        resove('ok')
        console.log('1')
        throw new Error('err')
    })
    .then(console.log,err=>{console.log(err)})
    .catch(console.error)
  // 解析：1 ,0k
  // 1. resove 状态确定了,catch 就不会再捕获抛出的错误
  // 2. resove 不会阻碍后面代码的执行，除非return
  // 3. then 的第二个参数和catch 都能捕获，区别在于catch 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获。所以推荐catch
  // 4. promise 实例建立了会立即执行，同步先执行
  ```
 
* 执行顺序
 ```js
 let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
    resolve();
  });

  promise.then(function() {
    console.log('resolved.');
  });

  console.log('Hi!');
  // Promise
  // Hi!
  // resolved

  // 解析：Promise 新建后立即执行，所以首先输出的是Promise。
  // 然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出
 ```

* 以下代码谁先执行，为什么？（Promise里的代码为什么比setTimeout先执行）
  ```js
   setTimeout(()=>{
    console.log('setTimeout')
   },0)

  new Promise(resove=>{
    console.log('Promise')
  })

  ```