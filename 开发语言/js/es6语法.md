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

        //CommonJS模块输出变量
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
    ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值
    Symbol 值通过Symbol函数生成
    Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述
    Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
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
## Class
  ```js
        // 1. 定义类
        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
            toString() {
                return '(' + this.x + ', ' + this.y + ')';
            }
        }

        // 2. 表达式形式的类
        const MyClass = class Me {
            getClassName() {
                return Me.name; // name 属性总是返回紧跟在class关键字后面的类名。
            }
            let inst = new MyClass();
            inst.getClassName() // Me 
            Me.name // ReferenceError: Me is not defined
            // 这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。
            // 类的内部没用到的话，可以省略Me
        };

        // 2.1 可以写出立即执行的 Class。
        let person = new class {
            constructor(name) {
                this.name = name;
            }
            sayName() {
                console.log(this.name);
            }
        }('张三');
        person.sayName(); // "张三"

        // 2.2 私有方法、属性
        const bar = Symbol('bar');
        const snaf = Symbol('snaf');

        export default class myClass{

            // 公有方法
            foo(baz) {
                this[bar](baz);
            }

            // 私有方法
            [bar](baz) {
                return this[snaf] = baz;
            }

        };
        // 上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

        // 2.3 静态方法加static 指向类本身而非实例
        
        // 3 继承
        // 3.1
        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
            toString() {
                return '(' + this.x + ', ' + this.y + ')';
            }
            hello(){
                console.log('lalala')
            }
        }
        child.hello() // 打印 lalala

        // 3.2 super
        class Point {}
        class ColorPoint extends Point {}
        // 由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类
        class ColorPoint extends Point {
            constructor(x, y, color) {
                super(x, y); // 调用父类的constructor(x, y)
                this.color = color;
            }
            toString() {
                return this.color + ' ' + super.toString(); // 调用父类的toString()
            }
            // super它在这里表示父类的构造函数，用来新建父类的this对象。

            // 注意：子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
        }
        * es5 与 es6 继承的区别:
          - es5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改 this。
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
## Promise
* 是什么东西?
  - Promise 是异步编程的一种解决方案,用同步的书写方式开发异步的代码，解决回调地狱的问题
  - 简单说就是一个容器，里面保存着某个未来才会结束的事件
  - ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例，Promise 新建后就会立即执行，无法取消
  - 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
* 有三种状态：Pending（进行中）、Resolved（已完成）和 Rejected（已失败）
    ```js
      // 基本用法
      var promise = new Promise(function(resolve, reject) {
          if (/* 异步操作成功 */){
            resolve(value);
          } else {
            reject(error);
          }
      });

    // Promise 实例生成后，可用 then 方法指定 resolved 状态和 rejected 状态的回调函数。
    // 第二个函数是可选的
    promise.then(function(value) {
        // success
    }, function(error) {
        // failure
    });

    // 调用 resolve 或 reject 并不会终结 Promise 的参数函数的执行
    new Promise((resolve, reject) => {
        resolve(1);
        console.log(2);
    })
    .then(r => {
        console.log(r);
    });
    // 2
    // 1

    ```
* Promise.prototype
    - .then() resolve 的回调 
    - .catch() 是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数，then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获
    - .finally() Promise 对象最后状态如何，都会执行的操作，无参数

  + promise.all
    - Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
    - const allP = Promise.all([p1, p2, p3]);
  + promise.race
    - 将多个 Promise 实例，包装成一个新的 Promise 实例
    - const raceP = Promise.race([p1, p2, p3]);
  
  + all 和 race 区别：
    - all 只要p1、p2、p3之中有一个被 rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数
    - all 只有p1、p2、p3的状态都变成 fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数
    - race 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数

  + Promise.resolve 
    - 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用
    - Promise.resolve('foo') 等价于new Promise(resolve => resolve('foo'))

  + Promise.reject() 与上面功能类似
* async:一个函数如果加上 async ，那么该函数就会返回一个 Promise
* await 
  - 表示在这里等待 promise 返回结果了，再继续执行。
  - await 后面跟着的应该是一个 promise 对象（其他返回值也没关系，只是会立即执行，不过那样就没有意义）
  - await 命令就是内部 then 命令的语法糖。
## Proxy
* 概述：
    - 这个词的原意是代理，表示由它来“代理”某些操作，可以译为“代理器”
    - 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
* 语法：
    - let p = new Proxy(target, handler);Proxy 构造函数，用来生成 Proxy 实例
    - target 表示所要拦截的目标对象
    - handler 一个对象，用来定制拦截行为。
    - 例子：
      ```js
        // 拦截target的属性的访问请求，访问任何属性都得到35
        var proxy = new Proxy({}, {
            get: function(target, property) {
                return 35;
            }
        });
        proxy.time // 35
        proxy.name // 35
        proxy.title // 35

        // handler 没有设置任何拦截，那就等同于直接通向原对象
        var target = {};
        var handler = {};
        var proxy = new Proxy(target, handler);
        proxy.a = 'b';
        target.a // "b"

      ```
* 实例方法
    + get(target, propKey, receiver) 拦截对象属性的读取
        - receiver 可选参数proxy 实例本身 
        - get 拦截
            ```js
                var person = {
                    name: "张三"
                };

                var proxy = new Proxy(person, {
                   get: function(target, property) {
                       if (property in target) {
                          return target[property];
                       } else {
                        throw new ReferenceError("Property \"" + property + "\" does not exist.");
                       }
                    }
                });

                proxy.name // "张三"
                proxy.age // 抛出一个错误
            ```
    + set(target, propKey, value, receiver) 拦截对象属性的设置
        - receiver 可选
        - 数据验证的例子
            ```js
                let validator = {
                set: function(obj, prop, value) {
                    if (prop === 'age') {
                        if (!Number.isInteger(value)) {
                            throw new TypeError('The age is not an integer');
                        }
                        if (value > 200) {
                            throw new RangeError('The age seems invalid');
                        }
                    }
                    // 对于满足条件的 age 属性以及其他属性，直接保存
                    obj[prop] = value;
                    }
                };

                let person = new Proxy({}, validator);

                person.age = 100;

                person.age // 100
                person.age = 'young' // 报错
                person.age = 300 // 报错
            ```
    + has(target, propKey) 拦截 propKey in proxy 的操作，返回一个布尔值。
        - has方法不判断一个属性是对象自身的属性，还是继承的属性
    + deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值。
    + ownKeys(target)：拦截
        - Object.getOwnPropertyNames(proxy)
        - Object.getOwnPropertySymbols(proxy)
        - Object.keys(proxy)
        - for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性
    - getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
    + defineProperty(target, propKey, propDesc)：拦截
        - Object.defineProperty(proxy, propKey, propDesc）、
        - Object.defineProperties(proxy, propDescs)，返回一个布尔值。
    - preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值。
    - getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。
    - isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
    - setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
    - apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
    - construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
## 详情参考
- [详情参考](http://es6.ruanyifeng.com/)