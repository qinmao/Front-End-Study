# js基本功
## 变量提升
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
    // 涉及到js 执行机制 执行栈同步执行完，把异步队列拿到栈执行 10 次 
    // 输出10 次10 

    for (let index = 0; index < 10; index++) {
        setTimeout(()=>{
            console.log(index)
        },0);
    }
   ```
## 数组拉平
  - 编写一个函数，把数组作为参数，返回拉平后的数组？如把[1,[2,[3,4],5],6]=>[1,2,3,4,5,6]
 ```js
    function deepFlatten(arr) {
        flatten = (arr)=> [].concat(...arr);
        return flatten(arr.map(x=>Array.isArray(x)? deepFlatten(x): x));
    }
   console.log(deepFlatten([1,[2,[3,4],5],6])) 

    const data = [
                {
                    id: 1,
                    title: "课程 1",
                    children: [{ id: 4, title: "课程 1-1" },
                    {
                        id: 5,
                        title: "课程 1-2",
                        children: [{ id: 6, title: "课程 1-2-1" },
                        { id: 7, title: "课程 1-2-2" },
                        ],
                    },
                    ],
                },
                { id: 2, title: "课程 2" },
                { id: 3, title: "课程 3" },
            ];

            const deepFlatten = (arr) => {
                let newArr = []
                let flatten = (arr) => {
                    arr.forEach(item => {
                        if (item.children && Array.isArray(item.children)) {
                            const { id, title } = item
                            newArr.push({ id, title })
                            flatten(item.children)
                        } else {
                            newArr.push(item)
                        }
                    });
                }
                flatten(arr)
                flatten = null
                return newArr
            };

            // console.log(deepFlatten(data))
   
 ```