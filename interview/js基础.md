# js基本功
* 下面alert 结果
    ```js
        var tt="aa"
        function test(){
            alert(tt)
            var tt='dd'
            alert(tt)
        }
        test()

    // 变量提升后，考察的是函数变量提升
     var tt="aa"
     function test(){
         var tt;
            alert(tt)
            tt='dd'
            alert(tt)
        }
       // undefined
       //  dd
    ```

* 变量提升与异步
  ``` js
    for (var index = 0; index < 10; index++) {
            setTimeout(() => {
                console.log(index)
            },0 ); 
    }
    // 涉及到js 执行机制 执行栈同步执行完，把异步队列拿到栈执行10 次 
    // 输出10 次10 

    for (let index = 0; index < 10; index++) {
        setTimeout(()=>{
            console.log(index)
        },0);
    }
   ```

* 数组拉平，编写一个函数，把数组作为参数，返回拉平后的数组？
 比如把[1,[2,[3,4],5],6]=>[1,2,3,4,5,6]
 ```js
    function deepFlatten(arr) {
        flatten = (arr)=> [].concat(...arr);
        return flatten(arr.map(x=>Array.isArray(x)? deepFlatten(x): x));
    }
   console.log(deepFlatten([1,[2,[3,4],5],6])) 
 ```
 
