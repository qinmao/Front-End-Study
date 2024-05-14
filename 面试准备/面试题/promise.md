# promise 面试题
* 下面代码的输出结果，为什么？then 中的参数 err 与catch 有什么区别？
  ```js
    new Promise((resove,reject)=>{
        resove('ok')
        // reject('err')
        console.log('1')
        throw new Error('err')
    })
    .then((res)=>{
       console.log('res:',res)
    },(err)=>{console.log('err:',err)})
    .catch(console.error)

  // 解析：1 ,0k
  // 1. resove 状态确定了,catch 就不会再捕获抛出的错误
  // 2. resove 不会阻碍后面代码的执行，除非 return
  // 3. then 的第二个参数和 catch 都能捕获错误，区别在于 catch 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获。所以推荐 catch
  // 4. promise 实例建立了会立即执行，同步先执行
  ```
* 执行顺序
  ```js
    // 题目1
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

    // 题目2
    setTimeout(()=>{
        console.log('setTimeout')
    },0)
    new Promise(resove=>{
        console.log('Promise')
    })
    
    // 题目3
    async function async1() {
		console.log('async1 start')
		await async2(); 
		console.log('async1 end')
	}
	async function async2() {
		console.log('async2')
	}
	setTimeout(function () {
		console.log('setTimeout')
	}, 0)

	async1()

	new Promise(function (resolve) {
		console.log('promise1')
		resolve()
	}).then(function () {
		console.log('promise2')
	})
    console.log('script end')
    
      // async1 start
      // async2
      // promise1
      // script end
      // async1 end
      // promise2
      // setTimeout

    // 题目4
    setTimeout(function() {
        console.log(1)
    }, 0);
    new Promise(function executor(resolve) {
        console.log(2);
        for( var i=0 ; i<10000 ; i++ ) {
            i == 9999 && resolve();
        }
        console.log(3);
    }).then(function() {
        console.log(4);
    });
    console.log(5);
   ```

  ```js
    let doSth = new Promise((resolve, reject) => {
    console.log('hello');
        resolve();
    });

    setTimeout(() => {
        doSth.then(() => {
            console.log('over');
        })
    }, 10000);
  ```