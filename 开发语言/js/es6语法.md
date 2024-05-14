# es6知识点
## 解构赋值
 * 数组的解构赋值
    ```js
        let [a, b, c] = [1, 2, 3];

        let [foo, [[bar], baz]] = [1, [[2], 3]];
        foo // 1
        bar // 2
        baz // 3

        let [ , , third] = ["foo", "bar", "baz"];
        third // "baz"

        let [x, , y] = [1, 2, 3];
        x // 1
        y // 3

        let [head, ...tail] = [1, 2, 3, 4];
        head // 1
        tail // [2, 3, 4]

        let [x, y, ...z] = ['a'];
        x // "a"
        y // undefined
        z // []
    ```

 * 对象的解构赋值
    let { foo, bar } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb

 * 字符串的解构赋值
        const [a, b, c, d, e] = 'hello';
        a // "h"
        b // "e"
        c // "l"
        d // "l"
        e // "o"

 * 函数参数的解构赋值
    function add([x, y]){
        return x + y;
    }

    add([1, 2]); // 3

 * 应用场景
    1. 交换变量的值
        let x = 1;
        let y = 2;
        [x, y] = [y, x];

    2. 从函数返回多个值
        ```js
        // 返回一个数组
        function example() {
            return [1, 2, 3];
        }
        let [a, b, c] = example();

        // 返回一个对象
        function example() {
            return {
                foo: 1,
                bar: 2
            };
        }
        let { foo, bar } = example();
       ```

    3. 函数参数的定义
        ```js
        // 参数是一组有次序的值
        function f([x, y, z]) { ...  }
        f([1, 2, 3]);

        // 参数是一组无次序的值
        function f({x, y, z}) { ...  }
        f({z: 3, y: 2, x: 1});
        ```

    4. 提取JSON数据
        ```js
        let jsonData = {
            id: 42,
            status: "OK",
            data: [867, 5309]
        };

        let { id, status, data: number } = jsonData;

        console.log(id, status, number);
        // 42, "OK", [867, 5309]
        ```

    5. 函数参数的默认值
        ```js
        jQuery.ajax = function (url, {
            async = true,
            beforeSend = function () {},
            cache = true,
            complete = function () {},
            crossDomain = false,
            global = true,
            // ...  more config
        }) {
        // ...  do stuff
        };
        // 指定参数的默认值.就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。
        ```

    6. 遍历 Map 结构
        - 任何部署了 Iterator 接口的对象.都可以用 for...of 循环遍历。Map 结构原生支持 Iterator 接口配合变量的解构赋值.获取键名和键值就非常方便。
        ```js
            var map = new Map();
            map.set('first', 'hello');
            map.set('second', 'world');

            for (let [key, value] of map) {
                console.log(key + " is " + value);
            }
            // first is hello
            // second is world
            如果只想获取键名.或者只想获取键值.可以写成下面这样。

            // 获取键名
            for (let [key] of map) {
              // ...
            }

            // 获取键值
            for (let [,value] of map) {
              // ...
            }
        ```

    7. 输入模块的指定方法
       - const { SourceMapConsumer, SourceNode } = require("source-map");
## 字符串的扩展
* 新增的方法(实例方法)：
    - includes()：返回布尔值.表示是否找到了参数字符串，区分大小写。
    - startsWith()：返回布尔值.表示参数字符串是否在源字符串的头部。
    - endsWith()：返回布尔值.表示参数字符串是否在源字符串的尾部。 
    - matchAll(): 返回一个正则表达式在当前字符串的所有匹配。
    ```js
        var s = 'Hello world!';

        s.startsWith('Hello') // true
        s.endsWith('!') // true
        s.includes('o') // true
        // 这三个方法都支持第二个参数.表示开始搜索的位置。

        var s = 'Hello world!';
        s.startsWith('world', 6) // true
        s.endsWith('Hello', 5) // true
        s.includes('Hello', 6) // false
    ```

* 字符串添加了遍历器接口
    ```js
    // 字符串可以被for...of循环遍历。
    for (let codePoint of 'foo') {
        console.log(codePoint)
    }
    ```

* 模板字符串
    ```js
        // 普通字符串
        `In JavaScript '\n' is a line-feed.`

        // 多行字符串
        `In JavaScript this is
        not legal.`

        console.log(`string text line 1
        string text line 2`);

        // 字符串中嵌入变量
        var name = "Bob", time = "today";
        `Hello ${name}, how are you ${time}?`
    ```
## 数值的扩展
* Number.parseInt
* Number.parseFloat
* Number.isInteger() 用来判断一个数值是否为整数
    ```js
    Number.isInteger(25) // true
    Number.isInteger(25.1) // false
    Number.isInteger(25.0) // true
    // 如果参数不是数值，Number.isInteger返回false

    Number.isInteger(3.0000000000000002) // true
    // 原因就是这个小数的精度达到了小数点后16个十进制位，转成二进制位超过了53个二进制位，导致最后的那个2被丢弃了

    // 对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。

    ```
* Math.trunc 去除一个数的小数部分，返回整数部分。
## 函数的扩展
 * 函数参数的默认值
    ```js
    // es6 之前使用短路或操作给参数赋初值
    // es6直接使用类似c#语法
    function log(x, y = 'World') {
        console.log(x, y);
    }

    // 参数变量是默认声明的，所以不能用let或const再次声明。
    function foo(x = 5) {
        let x = 1; // error
        const x = 2; // error
    }

    // 与解构赋值默认值可以结合使用 
    // 例一
    function f(x = 1, y) {
        return [x, y];
    }

    f() // [1, undefined]
    f(2) // [2, undefined])
    f(, 1) // 报错
    f(undefined, 1) // [1, 1]

    // 例二
    function f(x, y = 5, z) {
        return [x, y, z];
    }

    f() // [undefined, 5, undefined]
    f(1) // [1, 5, undefined]
    f(1, ,2) // 报错
    f(1, undefined, 2) // [1, 5, 2]

    ```
        
 * rest参数
    ```js
        function add(...values) {
            let sum = 0;
            for (let val of values) {
                sum += val;
            }
            return sum;
        }

        add(2, 5, 3) // 10

        //es5
        return Array.prototype.slice.call(arguments).sort();

        // rest参数的写法
        const sortNumbers = (...numbers) => numbers.sort();

        // 函数的length属性，不包括 rest 参数。

    ```

 * 扩展运算符
    - 简单定义：
        扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

    - 基本语法：
        ```js
            console.log(...[1, 2, 3])
            // 1 2 3

            [...document.querySelectorAll('div')]
            // [<div>, <div>, <div>]

            function push(array, ...items) {
                array.push(...items);
            }

            function add(x, y) {
                return x + y;
            }

            var numbers = [4, 38];
            add(...numbers) // 42

            // ES5的写法
            Math.max.apply(null, [14, 3, 77])

            // ES6的写法
            Math.max(...[14, 3, 77])

            // 等同于
            Math.max(14, 3, 77);
        ```

    + 应用:
        1. 合并数组
            // ES5
            const more=[122,111,33]
            const newArr= [1, 2].concat(more)

            // ES6
            [1, 2, ...more]

        2. 与解构赋值结合
            const [first, ...rest] = [1, 2, 3, 4, 5];
            first  1
            rest   [2, 3, 4, 5]
            const [first, ...rest] = [];
            first  undefined
            rest   []:

            const [first, ...rest] = ["foo"];
            first  "foo"
            rest   []

        3. 字符串
            [...'hello']
            [ "h", "e", "l", "l", "o" ]

        4. 任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组。
            var nodeList = document.querySelectorAll('div');
            var array = [...nodeList]

 * 严格模式
    >《ECMAScript 2016标准》规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

    + 两种方法可以规避这种限制。
       - 第一种是设定全局性的严格模式，这是合法的
            ```js
                'use strict';
                function doSomething(a, b = a) {
                    // code
                }
            ```

       - 第二种是把函数包在一个无参数的立即执行函数里面。
            ```js
                const doSomething = (function () {
                'use strict';
                    return function(value = 42) {
                        return value;
                    };
                }());
            ```

 * name 属性
    ```js
        var f = function () {};
        // ES5
        f.name // ""

        // ES6
        f.name // "f"

        // 如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。

        // Function构造函数返回的函数实例，name属性的值为anonymous。

        (new Function).name // "anonymous"

        // bind返回的函数，name属性值会加上bound前缀。

        (function(){}).bind({}).name // "bound "

    ```

 * 箭头函数
    ```js
        var f = v => v;

        var sum = (num1, num2) => num1 + num2;

        var sum = (num1, num2) => { return num1 + num2; }

        // 注意 this指向 不需要在函数外捕获 this
    ```
## 数组的扩展
 * Array.from()
    + Array.from 将两类对象转为真正的数组：
        - 类似数组的对象（array-like object）
        - 可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）
        ```js
        let arrayLike = {
            '0': 'a',
            '1': 'b',
            '2': 'c',
            length: 3
        };

        // ES5的写法
        var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

        // ES6的写法
        let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
        // 实际应用中.常见的类似数组的对象是DOM操作返回的NodeList集合.以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。

        // 1. NodeList对象
        let ps = document.querySelectorAll('p');
        Array.from(ps).forEach(function (p) {
            console.log(p);
        });

        // 2. arguments对象
        function foo() {
            var args = Array.from(arguments);
        }
        // 上面代码中.querySelectorAll方法返回的是一个类似数组的对象.只有将这个对象转为真正的数组.才能使用forEach方法。

        // 3. 只要是部署了Iterator接口的数据结构.Array.from都能将其转为数组。

        Array.from('hello')
        // ['h', 'e', 'l', 'l', 'o']

        let namesSet = new Set(['a', 'b'])
        Array.from(namesSet) // ['a', 'b']
        // 上面代码中.字符串和Set结构都具有Iterator接口.因此可以被Array.from转为真正的数组。

        // 如果参数是一个真正的数组.Array.from会返回一个一模一样的新数组。

        Array.from([1, 2, 3])
        // [1, 2, 3]
        // 值得提醒的是.扩展运算符（...）也可以将某些数据结构转为数组。

        // arguments对象
        function foo() {
            var args = [...arguments];
        }

        // NodeList对象
        [...document.querySelectorAll('div')]
        // 扩展运算符背后调用的是遍历器接口（Symbol.iterator）Array.from方法则是还支持类似数组的对象。所谓类似数组的对象.本质特征只有一点.即必须有length属性。
        Array.from({ length: 3 });
        // [ undefined, undefined, undefined ]
        // 上面代码中.Array.from返回了一个具有三个成员的数组.每个位置的值都是undefined。扩展运算符转换不了这个对象。

        // 对于还没有部署该方法的浏览器.可以用Array.prototype.slice方法替代。

        const toArray = (() =>
            Array.from ? Array.from : obj => [].slice.call(obj)
        )();
        // Array.from还可以接受第二个参数.作用类似于数组的map方法.用来对每个元素进行处理.将处理后的值放入返回的数组。

        Array.from(arrayLike, x => x * x);
        // 等同于
        Array.from(arrayLike).map(x => x * x);

        Array.from([1, 2, 3], (x) => x * x)
        // [1, 4, 9]
        // 下面的例子是取出一组DOM节点的文本内容。

        let spans = document.querySelectorAll('span.name');

        // map()
        let names1 = Array.prototype.map.call(spans, s => s.textContent);

        // Array.from()
        let names2 = Array.from(spans, s => s.textContent)
        // 下面的例子将数组中布尔值为false的成员转为0。

        Array.from([1, , 2, , 3], (n) => n || 0)
        // [1, 0, 2, 0, 3]

        function typesOf () {
            return Array.from(arguments, value => typeof value)
        }
        typesOf(null, [], NaN)
        // ['object', 'object', 'number']
        // 如果map函数里面用到了this关键字.还可以传入Array.from的第三个参数.用来绑定this。

        Array.from()
        // 可以将各种值转为真正的数组.并且还提供map功能。这实际上意味着.只要有一个原始的数据结构.你就可以先对它的值进行处理.然后转成规范的数组结构.进而就可以使用数量众多的数组方法。

        Array.from({ length: 2 }, () => 'jack')
        // ['jack', 'jack']
        // 上面代码中.Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

        Array.from()
        // 另一个应用是.将字符串转为数组.然后返回字符串的长度。因为它能正确处理各种Unicode字符.可以避免JavaScript将大于\uFFFF的Unicode字符.算作两个字符的bug。

        function countSymbols(string) {
            return Array.from(string).length;
        }

        ```

 * Array.of()
    ```js
        // Array.of方法用于将一组值，转换为数组。
        Array.of(3, 11, 8) // [3,11,8]
        Array.of(3) // [3]
        Array.of(3).length // 1

        Array.of 
        // 基本上可以用来替代Array()或new Array()，
        // 并且不存在由于参数不同而导致的重载。它的行为非常统一。

        Array.of() // []
        Array.of(undefined) // [undefined]
        Array.of(1) // [1]
        Array.of(1, 2) // [1, 2]

        // Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
        // Array.of方法可以用下面的代码模拟实现。
        function ArrayOf(){
            return [].slice.call(arguments);
        }
    ```

 * find findIndex
   - find 返回第一个符合条件的数组成员，没有返回 undefined
    ```js
        [1, 4, -5, 10].find((n) => n < 0)
        // -5
        [1, 5, 10, 15].find(function(value, index, arr) {
            return value > 9;
        }) // 10

    ```
   - findIndex 与find 类似，返回的是数组成员的索引，没有符合条件的成员，返回-1

 * includes
    - 表示某个数组是否包含给定的值，与字符串的includes方法类似
## 对象的扩展
* 属性的简洁表示法
  ```js
    var foo = 'bar';
    var baz = {foo};
    // 等同于
    var baz = {foo: foo};

    function f(x, y) {
        return {x, y};
    }
    f(1, 2) // Object {x: 1, y: 2}

    // 方法的简写
    var o = {
       method() {
        return "Hello!";
       }
    };

    // 等同于
    var o = {
      method: function() {
        return "Hello!";
      }
    };

    // CommonJS模块输出变量
    module.exports = { getItem, setItem, clear };
    // 等同于
    module.exports = {
        getItem: getItem,
        setItem: setItem,
        clear: clear
    };
  ```

* 属性名表达式
    ```js
        let obj = {
            ['h' + 'ello']() {
                return 'hi';
            }
        };
        obj.hello() // hi
    ```

* Object.assign() 合并对象
    ```js
        var target = { a: 1, b: 1 };

        var source1 = { b: 2, c: 2 };
        var source2 = { c: 3 };

        Object.assign(target, source1, source2);
        target // {a:1, b:2, c:3}
    ```
    
* ES2017 引入了跟Object.keys配套的 Object.values 和 Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。
    ```js
        const {keys, values, entries} = Object;
        const obj = { a: 1, b: 2, c: 3 };

        for (let key of keys(obj)) {
            console.log(key); // 'a', 'b', 'c'
        }

        for (let value of values(obj)) {
            console.log(value); // 1, 2, 3
        }

        for (let [key, value] of entries(obj)) {
            console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
        }
    ```

* 判断对象上是否有某个属性
    - hasOwnProperty 方法会返回一个布尔值，表示对象自身属性中是否具有对应的值（原型链上的属性不会读取）
     ```js
        const Person = function (age) {
            this.age = age
        }
        Person.prototype.name = 'fatfish'

        const p1 = new Person(24)
        console.log(p1.hasOwnProperty('age')) // true 
        console.log(p1.hasOwnProperty('name')) // fasle  注意这里

        Object.create(null).hasOwnProperty('name')
        // Uncaught TypeError: Object.create(...).hasOwnProperty is not a function
     ```
    - 使用 Object.hasOwn 避免这两个问题，这比“obj.hasOwnProperty”方法更加方便、安全。

    ```js
        let object = { age: 24 }
        Object.hasOwn(object, 'age') // true

        let object2 = Object.create({ age: 24 })
        Object.hasOwn(object2, 'age') // false  

        let object3 = Object.create(null)
        Object.hasOwn(object3, 'age') // false 
    ```
## Symbol
  > ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值,Symbol 值通过 Symbol 函数生成
* 基本用法
    ```js
        // 没有参数的情况
        let s1 = Symbol();
        let s2 = Symbol();

        s1 === s2 // false

        // 有参数的情况
        let s1 = Symbol('foo');
        let s2 = Symbol('foo');

        s1 === s2 // false

        let mySymbol = Symbol();

        // 第一种写法
        let a = {};
        a[mySymbol] = 'Hello!';

        // 第二种写法
        let a = {
            [mySymbol]: 'Hello!'
        };

        // 第三种写法
        let a = {};
        Object.defineProperty(a, mySymbol, { value: 'Hello!' });

        // 以上写法都得到同样结果
        a[mySymbol] // "Hello!"
    ```
* 应用场景
  - class 的私有属性
## Set
* ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
* 基本用法:
  ```js
    const s = new Set();
    [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
    for (let i of s) {
        console.log(i);
    }
    //  2 3 5 4
    // Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
    const set = new Set([1, 2, 3, 4, 4]);
    [...set]
    // [1, 2, 3, 4]

    // 向 Set 加入值的时候，不会发生类型转换 5和"5"是两个不同的值,类似===

  ```
* Set 实例的属性和方法
  - set.size 返回Set实例的成员总数。
  - add()    添加某个值，返回 Set 结构本身。
  - delete() 删除某个值，返回一个布尔值，表示删除是
  - has()    返回一个布尔值，表示该值是否为Set的成员
  - clear()  清除所有成员，没有返回值。
  + 遍历操作
    ```js
       // 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
        let set = new Set(['red', 'green', 'blue']);

        for (let item of set.keys()) {
            console.log(item);
        }
        // red
        // green
        // blue

        for (let item of set.values()) {
            console.log(item);
        }
        // red
        // green
        // blue

        for (let item of set.entries()) {
            console.log(item);
        }
        // ["red", "red"]
        // ["green", "green"]
        // ["blue", "blue"]

        // 可以用 of 直接遍历
        for (let x of set) {
            console.log(x);
        }
        set.forEach((value, key) => console.log(key + ' : ' + value))
        // 数组的 map 和 filter 方法也可以间接用于 Set 了。

    ```
* 应用场景
  - 去重
  ```js
    // 数组
    [...new Set(array)]
    Array.from(new Set(array));

    // 字符串
    [...new Set('ababbc')].join('')
  ```
  - 取交集、并集、差集
   ```js
    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);

    // 并集
    let union = new Set([...a, ...b]);
    // Set {1, 2, 3, 4}

    // 交集
    let intersect = new Set([...a].filter(x => b.has(x)));
    // set {2, 3}

    // （a 相对于 b 的）差集
    let difference = new Set([...a].filter(x => !b.has(x)));
    // Set {1}
   ```
## Map
> JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
* 基本用法
  ```js
    const m = new Map();
    const o = {p: 'Hello World'};

    m.set(o, 'content')
    m.get(o) // "content"

    m.has(o) // true
    m.delete(o) // true
    m.has(o) // false

    //Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
    const map = new Map([
        ['name', '张三'],
        ['title', 'Author']
    ]);

    map.size // 2
    map.has('name') // true
    map.get('name') // "张三"
    map.has('title') // true
    map.get('title') // "Author"
  ```
* 实例的属性和方法
  ```js
    const map = new Map([
        ['F', 'no'],
        ['T',  'yes'],
    ]);

    for (let key of map.keys()) {
        console.log(key);
    }
    // "F"
    // "T"

    for (let value of map.values()) {
        console.log(value);
    }
    // "no"
    // "yes"

    for (let item of map.entries()) {
        console.log(item[0], item[1]);
    }
    // "F" "no"
    // "T" "yes"

    // 或者
    for (let [key, value] of map.entries()) {
        console.log(key, value);
    }
    // "F" "no"
    // "T" "yes"

    // 等同于使用map.entries()
    for (let [key, value] of map) {
        console.log(key, value);
    }
    // "F" "no"
    // "T" "yes"

    const map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]);

    [...map.keys()]
    // [1, 2, 3]

    [...map.values()]
    // ['one', 'two', 'three']

    [...map.entries()]
    // [[1,'one'], [2, 'two'], [3, 'three']]

    [...map]
    // [[1,'one'], [2, 'two'], [3, 'three']]
  ```
## Module 模块
 > ES6 之前，js 没有 module，不利于大程序的开发，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于node，后者用于浏览器。
* 为什么要模块化(有什么好处)？
  - 解决命名冲突
  - 提供复用性
  - 提高代码可维护性

* 有哪些模块化的方案
  + 沙箱模式(实质是匿名的立即执行函数)
    - 在早期，使用立即执行函数实现模块化是常见的手段，通过函数作用域解决了命名冲突、污染全局作用域的问题
    - 例如jq插件开发

  + AMD 和 CMD
    - 现在很少看到
    - 用法如下
        ```js
            // AMD
            define(['./a', './b'], function(a, b) {
                // 加载模块完毕可以使用
                a.do()
                b.do()
            })
            // CMD
            define(function(require, exports, module) {
                // 加载模块
                // 可以把 require 写在函数体的任意地方实现延迟加载
                var a = require('./a')
                a.doSomething()
            })
        ```

  + CommonJS
    - module.exports/require
    - 语法如下:
        ```js
            const { stat, exists, readFile } = require('fs');
            // 等同于
            const _fs = require('fs');
            const stat = _fs.stat;
            const exists = _fs.exists;
            const readfile = _fs.readfile;
            // 上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。
            // 这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
        ```
    - module.exports 是全局的对象 可简写成 exports，
    - nodejs 帮我们实现了 var exports=module.exports，exports 就是 module.exports 的别名，初始值是空对象
        
  + es module
    - export/import
    - 语法:
        ```js
            import { stat, exists, readFile } from 'fs';
            // ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。
            // 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。
            // 这种加载称为“编译时加载”或者静态加载，效率要比 CommonJS 模块的加载方式高。
            // 当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
        ```
    - ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";

* ES6 模块与 CommonJS 模块的差异
  - es module 在编译时输出值的引用，CommonJS 在运行时输出一个值的拷贝
  - CommonJS 是同步导入，es 是异步的

* ES6 模块的语法:
    - es6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";
    模块功能主要由两个命令构成：export 和 import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
    es6 模块写法:
    ```js
        // 1. profile.js
        var firstName = 'Michael';
        var lastName = 'Jackson';
        var year = 1958;
        export {firstName, lastName, year};
        // 使用大括号指定所要输出的一组变量(推荐写法)
        // 等价于
        // profile.js
        export var firstName = 'Michael';
        export var lastName = 'Jackson';
        export var year = 1958;

        // 2. export命令除了输出变量，还可以输出函数或类（class）。
        function v1() { ... }
        function v2() { ... }
        export {
            v1 as streamV1,
            v2 as streamV2,
            v2 as streamLatestVersion
        };
        // as关键字可重命名
    ```
    * import 注意事项
    - 1. 需要特别注意的是，export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
    - 2. import命令具有提升效果，会提升到整个模块的头部，首先执行。
     ```js
        foo();
        import { foo } from 'my_module';
        // 上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前
    ```
    - 3. 错误的写法
      ```js
        // 报错
        export 1;
        // 报错
        var m = 1;
        export m;

        正确写法：
        // 写法一
        export var m = 1;
        // 写法二
        var m = 1;
        export {m};
        // 写法三
        var n = 1;
        export { n as m };

        同样的，function和class的输出，也必须遵守这样的写法。
      ```
    - 4. import 语句会执行所加载的模块
    - 5. singleton 模式
      ```js
        import { foo } from 'my_module';
        import { bar } from 'my_module';
        // 等同于
        import { foo, bar } from 'my_module';
        // 虽然 foo 和 bar 在两个语句中加载，但是它们对应的是同一个my_module实例。也就是说，import语句是 Singleton 模式。
      ```
    * export 注意事项 
      - export 命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，
      - import 命令也是如此。
    * 模块的整体加载
      ```js
        // circle.js
        export function area(radius) {
            return Math.PI * radius * radius;
        }
        export function circumference(radius) {
            return 2 * Math.PI * radius;
        }

        // main.js 中 整体加载的写法如下
        import * as circle from './circle';
        console.log('圆面积：' + circle.area(4));
        console.log('圆周长：' + circle.circumference(14));
        // circle 应该是可以静态分析的，所以不允许运行时改变
      ```
    * 默认导出方式：给用户提供方便,不需要知道所要加载的变量名或函数名
        export default xxx; 
        // 命令只能使用一次,所以，import命令后面才不用加大括号，因为只可能唯一对应 export default 命令。
        // 本质上，export default 就是输出一个叫做default的变量或方法,系统允许你为它取任意名字
        import xxx from './xxx.js';// xxx 可以任意名称
    * import()函数 使用场景
      ```js
        // 按需加载
        // import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。
       button.addEventListener('click', event => {
            import('./dialogBox.js')
            .then(dialogBox => {
                dialogBox.open();
            })
            .catch(error => {
                /* Error handling */
            })
        });
        
        // 条件加载
        if (condition) {
            import('moduleA').then(...);
        } else {
            import('moduleB').then(...);
        }

        // 动态的模块路径
        import(f())
        .then(...);
        // 根据函数f的返回结果，加载不同的模块。
      ```
    * 注意:import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。可以使用对象解构赋值的语法，获取输出接口。
     ```js
        // 1. export1 和 export2 都是 myModule.js的输出接口，可以解构获得
        import('./myModule.js')
            .then(({export1, export2}) => {
             // ...·
            });
        // 2. default输出接口，可以用参数直接获得
        import('./myModule.js')
            .then(myModule => {
              console.log(myModule.default);
            });

        import('./myModule.js')
            .then(({default: theDefault}) => {
              console.log(theDefault);
            });

        // 3. 同时加载多个模块
        Promise.all([
            import('./module1.js'),
            import('./module2.js'),
        ])
        .then(([module1, module2]) => {
        });

        // 4. 使用 async 函数
        async function main() {
            const myModule = await import('./myModule.js');
            const { export1, export2 } = await import('./myModule.js');
            const [ module1, module2] =
                await Promise.all([
                    import('./module1.js'),
                    import('./module2.js'),
                ]);
        }
        main();
      ```

* Module 的加载实现
    - 默认情况下，浏览器是同步加载js脚本,为了解决脚本过大导致卡死的问题，所以脚本引入了异步加载
     ```html
        <script src="path/to/myModule.js" defer></script>
        <script src="path/to/myModule.js" async></script>
     ```
    - defer 与 async 的区别是：一句话，defer 是“渲染完再执行”，async 是“下载完就执行”
    - es6 module 的加载规则：浏览器对于带有type="module"的<script>，都是异步加载，等同于defer
      ```html
          <script type="module" src="./foo.js"></script>
      ```
    - ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
     ```html
        <script type="module">
            import utils from "./utils.js";
            // other code
        </script>
     ```
## ArrayBuffer
> ArrayBuffer对象、TypedArray 视图和 DataView 视图是 JavaScript 操作二进制数据的一个接口
* 二进制数组由三类对象组成:
  - ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。
  - TypedArray视图：共包括 9 种类型的视图，比如 Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。
  - DataView视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。
> 简单说，ArrayBuffer 对象代表原始的二进制数据，TypedArray 视图用来读写简单类型的二进制数据，DataView 视图用来读写复杂类型的二进制数据。
* ArrayBuffer 基本使用
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
* 二进制数组的应用
  - 网页Canvas元素输出的二进制像素数据，就是 TypedArray 数组。
  ```js
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const uint8ClampedArray = imageData.data;
    // 上面代码的uint8ClampedArray虽然是一个 TypedArray 数组，但是它的视图类型是一种针对Canvas元素的专有类型Uint8ClampedArray。这个视图类型的特点，就是专门针对颜色，把每个字节解读为无符号的 8 位整数，即只能取值 0 ～ 255，而且发生运算的时候自动过滤高位溢出。这为图像处理带来了巨大的方便。
  ```
  - WebSocket可以通过 ArrayBuffer，发送或接收二进制数据。
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
  - Fetch API 取回的数据，就是ArrayBuffer对象。
  ```js
    fetch(url)
    .then(function(response){
        return response.arrayBuffer()
    })
    .then(function(arrayBuffer){
        // ...
    });
  ```
  - File API
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

## 详情参考
- [详情参考](http://es6.ruanyifeng.com/)