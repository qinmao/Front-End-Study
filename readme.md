# 前端
> 前端的知识网络庞杂，知识点琐碎，记住所有的细节不太可能，所以往往需要做些总结，记录最核心的知识点，构建自己的知识网络。
## css
* [css核心基础](css/css基础知识.md)
* [css3核心基础](css/css3.md)
* [less](css/less/less.md)
* [sass](css/sass/readme.md)

## h5
* [h5 基础](html/html5/h5.md)
* [h5 mobile](mobile/h5-mobile.md)

## js 基础语法
* [js 基础语法](ECMA/js基础语法.md)

## dom和bom
* [dom 基础](html/dom.md)
* [bom 基础](html/bom.md)

## 常用封装的函数
* [日期格式处理](js/date-format.js)
* [数字的格式处理](js/num-format.js)
* [数组的处理](js/array-util.js)
* [字符串的处理](js/string-util.js)

## (*)http协议
- [http](http/readme.md)

## (*)浏览器
-[浏览器](浏览器/readme.md)

## 对象与函数
### 对象：
 + 什么是对象？
    - 无序属性的集合，可以看成键值对
 + 如何创建？
    - 字面量或者叫直接量
      var obj={};
    - 构造函数创建对象
        ```javascript
            function Student(name, age, sex) {
                this.name = name
                this.age = age
                this.sex = sex
                this.sayHi = function () {
                    console.log("你好" + this.name)
                }
            var s1 = new Student("小明", "12", "男");
        ```
 + 工厂模式创建对象 就是用一个方法实现对象的实例化
     ```javascript
         function initStu(name, age,sex) {
                return new Student(name, age,sex);
             }
         var obj=initStu();
         // 这种方式创建对象避免new的操作    
     ```   
 + 对象的属性
     - 两种访问方式：
         1. obj.propertyName  
         2. obj["propertyName"] __遍历属性并赋值时常用到  
     - 检测:(hasOwnProperty)
        1. 语法：<对象>.hasOwnProperty('propertyName')
        2. 功能：用来判断指定的属性是否为该对象自己拥有的，而不是继承下来的。
        3. eg:obj.hasOwnProperty("name") //true

### 函数
 + 创建
    1. 声明式
        function fn(){}
    2. 表达式
        var fn=function(){}
    3. 构造函数
        var fn = new Function([arg1~argN, body]);
        eg:var f = new Function('n', 'console.log(n);');

        * 构造函数的执行过程（调用new的过程）
            1. 创建一个空对象obj
            2. 将上面的创建的空对象obj赋值给this
            3. 执行代码块（给属性赋值等等）
            4. 隐式返回 return this
            5. 在构造函数中 有显示的return 语句，若返回值的类型是基本数据类型，会被忽略，复合数据类型不会    

 + 变量作用域
     - 变量的作用域：变量起作用的区域，也就说变量可以被访问到的区域。
     - 种类
         1. 全局变量，生命周期 是随着页面存在而存在，页面销毁而销毁。
         2. 局部变量，在函数内声明的变量，称为局部变量。 作用范围是在指定函数内，生命周期 是函数执行完毕就会被销毁。
     - 词法作用域：在js预解析阶段，确定变量的作用域。变量的作用域由 其定义的位置决定 而不是由其使用的位置。在词法作用域下，只有函数可以限定作用域。
     ___es6中新增了块级作用域let(详细参见es6)
     - 变量的搜索原则：类似下面的属性搜索原则，先在当前作用域，找不到然后上一层，最后到全局作用域。找不到抛异常。
             
 + 函数属性
    - arguments 
         * 伪数组对象
         * 以数组形式，存储实参
         * callee 返回正在被执行函数; 匿名函数的递归调用
         * length 实参个数
    - caller: 返回调用函数的 函数
    - length: 定义形参的个数
    - name: 存储函数的名字

    ```js
    // 1.
    function b(x,y,z){
        arguments[2]=10
        alert(z)
    }
    b(1,2,3) 

    // 2. 
     function b(x,y,z){
         z=10
         alert(arguments[2])
    }
    b(1,2,3)

    // 结果都为10
    ```
         
 + 闭包：　
    - 实质：就是能够读取其他函数内部变量的函数。
    - 写法：
        ```javascript
            function foo() {
                var obj = {};                            
                return function() {
                    return obj;
                }  
            }
        ```           
    - 应用：
        1. 缓存：
             ```javascript
                 function outer() {
                         var cache;
                         function inner() {
                             // 代码块
                             // 使用cache
                         }
                         return inner;
                     }
                 var fn = outer();
             ```
        2. 私有变量：在ES5之前，不能设置对象属性的可读可写性。所以使用闭包来模式私有属性，来指定属性的可读可写
            ```javascript
                function person(name) {
                    return {
                        getName: function() {
                            return name;
                        },
                        setName: function(val) {
                            name= val;
                        }
                    };
                }
            ```
    - 闭包使用中的问题：
        - 本质上就是让数据常驻内存。如此，使用闭包就增大内存开销，使用不当就会造成内存泄漏。
        - 如何解决：使用完闭包后，及时清除。（将闭包变量 赋值为 null） 
    - 闭包为什么会造成内存泄漏？（GC）

 * GC
    + 引用计数法
        - 当定义一个变量 （此时引用计数为0）并且 赋值为指定的数据时，该变量的引用计数 + 1；
        - 如果该数据，有其他对象或函数使用，引用计数 + 1；
        - 如果使用该数据的对象或函数，被GC回收掉，那么引用计数 - 1；
        - 如果该变量手动赋值为null，此时引用计数 - 1；
        - 当GC对象寻访到该变量时，如果计数为0，GC对象就直接回收该变量所占用的内存。
        - 如果函数正在执行或还没有执行完毕，内部定义的数据都是不可回收的，不论引用计数是否为0。
        - 引用计数的缺陷：容易产生循环引用，导致变量无法被GC回收。

    + 标记清除法
        - 从文档的根节点（window对象）出发，找到至少一条路径可以到达该变量，那么该变量被标记为 “不可回收”；否则，该变量标记为 “可回收”。
        - 当GC对象寻访到该变量，如果被标记为 “可回收”，那么，就会立即回收掉其所占用的内存。
        - 标记清除法的缺陷：性能比较低。

    + 当代浏览器，同时使用两种机制。优先使用引用计数法，在相隔一定周期后使用标记清除法来释放变量的内存空间。

    + 区别与联系
        - 前者性能较高，但是有循环引用的缺陷
        - 后者性能较低，但是不会产生循环引用问题
        - 在当代浏览器配合两种机制，去释放变量的内存空间。

 + 沙箱模式：
     - 防止全局变量和全局对象的污染，引出沙箱模式,实质就是匿名的自执行函数
     ```javascript
         (function(global){
             //代码块
             //自执行
             //在内部声明的变量与外部隔离
             //把常用的全局变量，当做实参传入进来
             //目的：1，减少变量的搜索过程，提高js 性能
             //     2,利于代码压缩
         }(window));
         // 一般开发插件时会用，jq
     ```
            

 + 函数调用和this指向
    1. 普通函数执行模式
        - 直接拿到函数的名字 加上 圆括号。
        - 在该模式下，函数内部this的指向为 window

    2. 构造函数模式
        - 调用函数时，配合着new关键字来执行某个函数，此时该函数的执行模式为 构造函数模式
        - 函数内部的this指向为 当前创建出来的实例。

    3. 方法调用模式
        - 将一个函数 赋值给 某个对象的属性，然后通过该对象去执行函数，此时该函数的执行模式为方法调用模式；
        - 在该模式下，this的指向为 方法的调用者

    4. call/apply/bind（上下文）模式
       > 这三都是改变this的指向,方法的第一参数即为 函数fn内的this指向   
        + fn.call(thisObj, [arg1~argN])

        + fn.apply(thisObj, [数组]);

        + bind 方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值
            - fun.bind(thisArg[, arg1[, arg2[, ...]]])
            - 返回值：返回由指定的this值和初始化参数改造的原函数拷贝

    5. 箭头函数
        - 箭头函数其实是没有 this 的
        - 箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this

### JSON 转换 
 * object-->string   JSON.stringify()
 * string--> object   JSON.parse()

### 对象类型和原始类型的不同（深拷贝、浅拷贝）?
 > 原始类型存储的是值，对象类型存储的是地址（指针）,根据该特性，我们以后会遇到一些问题
 * 函数参数是对象，外部变量的值发生了改变
    - ```javascript
        function test(person) {
            person.age = 26
            person = {
                name: 'yyy',
                age: 30
            }
            return person
        }
        const p1 = {
            name: 'yck',
            age: 25
        }
        const p2 = test(p1)
        console.log(p1) // -> ?
        console.log(p2) // -> ?
        // 解析：
        // 1. 传入的参数是p1的地址拷贝a1，age 赋值时，p1与a1指向的地址值已经被改了，此时age为26,p1的值为name:yck,age:26
        // 2. 之后重新把a1的指向地址改成了新的对象地址，并返回所以，p1的值为name:yck,age:26,p2的值为name:yyy,age:30

        ```

 * 深拷贝、浅拷贝
    > 为了解决外部对象参数的值被修改
    + 浅拷贝
        > 所谓的浅拷贝，只是拷贝了基本类型的数据，对于引用的类型数据，复制后也是会发生引用
        1. Object.assign
            - 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝。
            -  ```js
                let a = {
                    age: 1
                }
                let b = Object.assign({}, a)
                a.age = 2
                console.log(b.age) // 1
              ```
        2. 展开运算符 ... 
            - ```js
                let a = {
                 age: 1
                }
                let b = { ...a }
                a.age = 2
                console.log(b.age) // 1
              ```
    + 深拷贝
        > 利用递归,将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深复制的方法递归复制到新对象上
        > 通常浅拷贝就能解决大部分问题了，当对象属性也是对象的话，就要用深拷贝了
        1. 通常使用JSON.parse(JSON.stringify(object)) 来解决, 该方法也是有局限性
            - 会忽略 undefined
            - 会忽略 symbol
            - 不能序列化函数
            - 不能解决循环引用的对象

        2. 自己手动实现或者用loadash 等一些库

### prototype
 * 什么是原型？
    - 函数对象的prototype属性所引用的对象。
    - 原型的本质就是对象
    - 声明一个函数时，原型就随之而产生。此时默认原型 是一个空对象。但是具有一个默认的属性constructor，该属性指向其构造函数

 * 原型的特性：
    1. 在原型上的成员(属性和方法),都可以直接被其实例访问，object 是基原型

    2. 实例不可以直接修改原型上的任何成员

    3. 动态性
        * 如果在原有的原型上扩展成员，会直接反应到 已创建的对象和之后创建的对象上。
        * 如果替换了原有的原型，新原型的成员 在之前已创建的对象是不能访问到的，而在之后创建的对象是可以访问到的。
        * 如果置换了原型，就可能会在新的原型上丢失默认的constructor属性,如果想要其有该属性，就只能自己手动添加上。

    4. 所有的实例 只能共享一个原型。

 * 获取原型的方式：
    - 通过函数：
        ```
        <fnName>.prototype
        ```
    - 通过对象：
        ```
        <object>.__proto__ ，__proto__  是浏览器中的，是一个非标准属性；
        ```

 * 原型链：
    - 原型的本质是对象，那么就具有__proto__的属性，所以原型对象也有原型。通过这个属性一层层找下去，就是当前对象的原型链。
    - 原型链的尽头 Object.prototype 所以js实现继承就靠原型链

 * 构造函数,原型和实例的关系:
    - 构造函数(constructor)都有一个原型对象(prototype),
    - 原型对象都包含一个指向构造函数的指针,
    - 而实例(instance)都包含一个指向原型对象的内部指针.

 * 对象的属性搜索原则：
    - 首先找自己，若找到，停止搜索直接使用，否则一层层往原型上找，找到，停止搜索，直接使用，一直到 Object.prototype上 如果找到 就返回该属性的值，如果依然没有找到，就返回undefined。

 * 原型的对象指向一个实例，原型链的过程?
    ```js
    constructor1.prototype = instance2
    // 试图引用constructor1构造的实例instance1的某个属性p1
    ```
    1. 首先会在instance1内部属性中找一遍;
    2. 接着会在instance1.__proto__(constructor1.prototype)中找一遍,而constructor1.prototype 实际上是instance2, 也就是说在instance2中寻找该属性p1;
    3. 如果instance2中还是没有,此时程序不会灰心,它会继续在instance2.__proto__(constructor2.prototype)中寻找...直至Object的原型对象

    > 搜索轨迹: instance1--> instance2 --> constructor2.prototype…-->Object.prototype

 * 如何判断原型和实例的关系？
    + instanceof 
        - 语法：<对象> instanceof 函数
        - 功能：判断对象 是否为 指定函数的实例
        - 运算规则:若函数的原型，出现在该对象的原型链上 表达式返回true 否则false 

    + isPrototypeOf
        - 语法：<对象a>.isPrototypeOf(对象b)
        - 功能：判断对象a是不是对象b的原型

 * 原型链存在的问题？
    - 问题一: 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;
    - 问题二: 在创建子类型时,不能向超类型的构造函数中传递参数.

 * 如何解决原型链继承存在的问题?
    - 借用构造函数:(即在子类型构造函数的内部调用超类型构造函数.)
        ```javascript
            function Parent(value) {
                this.val = value
                this.colors = ["red","blue","green"]
            }
            function Child(value) {
                Parent.call(this, value)  //继承了Parent,且向父类型传递参数
            }

            var instance1 = new Child();
            instance1.colors.push("black");
            console.log(instance1.colors); //"red,blue,green,black"

            var instance2 = new Child();
            console.log(instance2.colors);//"red,blue,green" 可见引用类型值是独立的

            // 以上两个问题解决了，但是方法都在构造函数中定义, 因此函数复用也就不可用了.而且超类型(如Parent)中定义的方法,对子类型而言也是不可见的. 考虑此,借用构造函数的技术也很少单独使用.
        ```
    - 组合式继承
        ```js
            function Parent(value) {
                this.val = value
            }

            function Child(value) {
                Parent.call(this, value) 
            }

            Parent.prototype.getValue = function() {
                console.log(this.val)
            }

            Child.prototype = new Parent()
            // Child 默认原型为空对象,constructor指向其构造函数
            // 置换了原型，就可能会在新的原型上丢失默认的constructor属性,如果想要其有该属性，就只能自己手动添加上。
            Child.prototype.constructor = Child;
            const child = new Child(1)

            child.getValue() // 1
            child instanceof Parent // true
            
            // 原理：在子类的构造函数中通过 Parent.call(this) 继承父类的属性，然后改变子类的原型为 new Parent() 来继承父类的函数
            // 优点: 构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数
            // 缺点: 就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费
        ```
    -  es5 提供的Object.create(obj) 的经典继承   
        ```javascript
            var obj = Object.create(obj1);
            // 原理是置换原型
            var create = function (obj) {
            if (!Object.create) {
                Object.create = function (obj) {
                    function F() { }
                    F.prototype = obj
                    return new F()
                }
            } else {
                return Object.create(obj)
            }
            }
        ```
    - 寄生组合继承
        > 该继承方式，解决了继承父类函数时调用了构造函数，多了无用的父类属性问题。
        ```javascript
            function Parent(value) {
                this.val = value
            }
            Parent.prototype.getValue = function() {
                console.log(this.val)
            }

            function Child(value) {
                Parent.call(this, value)
            }

            Child.prototype = Object.create(Parent.prototype, {
                constructor: {
                    value: Child,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            })

            const child = new Child(1)

            child.getValue() // 1
            child instanceof Parent // true

            // 以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。

        ```

 * class 继承
    > JS 中并不存在类，class 只是语法糖，本质还是函数。
    > 可证明
    ```js
        class Person {}
        Person instanceof Function // true


        class Parent {
            constructor(value) {
                this.val = value
            }
            getValue() {
                console.log(this.val)
            }
        }

        class Child extends Parent {
            constructor(value) {
                super(value) //可以看成 Parent.call(this, value)
            }
        }
        let child = new Child(1)
        child.getValue() // 1
        child instanceof Parent // true
    ```


 * Object.prototype 上的一些方法
    + hasOwnProperty方法
        - 语法：<对象>.hasOwnProperty('propertyName')
        - 功能：用来判断指定的属性是否为该对象自己拥有的，而不是继承下来的。

    + propertyIsEnumerable
        - 语法：<对象>.propertyIsEnumerable("propName")
        - 功能：可枚举 指定的属性是对象本身的。
    + valueOf
        - 语法: <对象>.valueOf()
        - 功能：将指定对象类型的数据 转换成 基本数据类型
        + 规则：
            - 如果该对象是 基本数据的包装类型 会转换成 其对应的基本数据类型
            - 否则为其他对象类型，就直接返回该对象。

 

 * eval方法
    - 可以使用eval来将json字符串 转换成 js对象。
    - 在没有严格模式，eval可以随意指定一段字符串来当做js代码来执行。
        * 脚本注入
        * 全局变量以及全局对象污染
        * eval创建变量的作用域 是由eval执行的作用域决定。 
    - 已不推荐使用。JSON.parse()

## 模块化
 > ES6 之前，js没有module，不利于大程序的开发，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于node，后者用于浏览器。
 * 为什要模块化(有什么好处)
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
            ```javascript
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
            ```javascript
                let { stat, exists, readFile } = require('fs');
                // 等同于
                let _fs = require('fs');
                let stat = _fs.stat;
                let exists = _fs.exists;
                let readfile = _fs.readfile;
            
            // 上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。
            // 这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
            
            ```
        - module.exports是全局的对象 可简写成exports，
        - node 帮我们实现了var exports=module.exports，exports 就是 module.exports 的别名，初始值是空对象
        
    + es module
        - export/import
        - 语法:
            ```javascript
                // ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。
                import { stat, exists, readFile } from 'fs';

                // 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。
                // 这种加载称为“编译时加载”或者静态加载，效率要比 CommonJS 模块的加载方式高。
                // 当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
            ```
        - ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";


 * ES6 模块与 CommonJS 模块的差异
    - es module 在编译时输出值的引用，CommonJS 在运行时输出一个值的拷贝
    - CommonJS 是同步导入，es 是异步的
    

## 数组对象遍历
 * Array
    + forEach
        ```javascript
            var arr = [1, 2, 2, 2, 2, 6, 9]
            var sum = 0
            arr.forEach(function (value,i,a) {
                sum += value
            })
        ```
    + map
        ```javascript
            // 类似foreach 有返回值 返回一个新数组
            arr.map(function (x) {
                return x + 1
            })
        ```

    + filter 过滤器
        ```javascript
            //返回指定条件的新数组
            arr.filter(function (x) {
                return x < 2
            })
        ```

    + some
        ```javascript
        //空数组时 some 返回false every 返回true
        // some 存在一个满足条件就返回true
        arr.some(function (x) {
            return x == 2   //true
        })
        ```

    + every
        ```javascript
            //返回true false 
        arr.every(function (x) {
            return x > 10 //false
        })
        ```

    + indexOf
        ```javascript
        let index=arr.indeOf('xxx') 
        // 存在返回数组索引，不存在返回-1

        ```

    + reduce
        ```javascript
            // reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

            // reduce() 可以作为一个高阶函数，用于函数的 compose。

            // 注意: reduce() 对于空数组是不会执行回调函数的。
            var numbers = [65, 44, 12, 4];
        
            function getSum(total, num) {
                return total + num;
            }
            function myFunction(item) {
                document.getElementById("demo").innerHTML = numbers.reduce(getSum);
            }
        ```

    + sort
        * Array的sort()方法默认把所有元素先转换为String再排序，如果直接排序数字你就踩坑了
        * 默认 按照根据ASCII码进行排序
        * sort 是一个高阶函数
            ```javascript
            // 升序
            sort(function(a,b){
                return a-b
            })
            // 降序
            sort(function(a,b){
                return b-a
            })
            ```
            
 * 对象的遍历
    - Object.keys(obj).forEach()
    - for in

 * for in for of 的区别
    - for in更适合遍历对象 遍历数组是不是数组内部的顺序，遍历所有可枚举的属性，遍历的是数组的索引
    - for of 适合数组字符串/map/set等拥有迭代器对象的集合 遍历的是数组的元素的值,不能遍历对象
    - 与 forEach()不同的是，它可以正确响应break、continue和return语句
    - ```js
        var myArray=[1,2,4,5,6,7]
        myArray.name="数组";
        for (let value of myArray) {
            console.log(value);
        }

     ```

## es6对js的扩展
- [es6](ECMA/es6.md)

## 正则表达式
* [正则表达式](note/reg.md)

## 移动端
### 事件
 * 移动端touch事件
    - 当用户手指放在移动设备在屏幕上滑动会触发的touch事件
    - touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指
    - touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
    - touchend——当手指离开屏幕时触发
    - touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用

 * TouchEvent说明：
    + touches：屏幕上所有手指的信息
        - targetTouches：手指在目标区域的手指信息
        - changedTouches：最近一次触发该事件的手指信息
        - touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息

        + 参数信息(changedTouches[0])
            - clientX、clientY在显示区的坐标
            - target：当前元素

    + 事件响应顺序
        - ontouchstart  > ontouchmove  > ontouchend > onclick

### 移动端适配
 * [适配](mobile/适配/readme.md)

## framework
> 前端常用的框架（方式不同，本质都是操作dom）
### 数据驱动式
 * [angular1](framework/angular1/angular-base.html)
 * [angular2](framework/angular2/angular.md)
 * [vue](framework/vue/vue.md)
 * [react](framework/react/readme.md)

### 手动式
 * [jq](framework/jq/readme.md)
 * [zepto](framework/zepto/readme.md)

## 跨平台技术
 * [Hybrid-App](/Hybrid-App/cordova.build.app.md)
 * [微信小程序](wx/readme.md)
 * react native
 * [weex/uni-app](cross-platform/weex)
 * flutter
 * [electron](cross-platform/electron/readme.md)

## 基于vue构建的项目
 * [spa](framework/vue/vue.md)
 * [ssr](framework/nuxt/readme.md)

## 前端优化
- [优化](前端优化/readme.md)

## 工程化
### 构建与打包工具
 * [gulp](build-tool/gulp/readme.md)
 * [webpack](build-tool/webpack/readme.md)

### 测试

### 监控

## 环境和工具
### mac 
 * brew[官网](http://brew.sh/index_zh-cn.html)
 
 * 安装:
    ``` 
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

 * brew
    - brew install 软件名  brew uninstall  软件名称
    - brew list 可以查看所有安装的软件
    - brew info 软件名

### vscode 
 * 前端本地服务端调试
   - npm install -g live-server 
   - 安装报错就用npm install live-server -gf安装，
   - [详情](https://github.com/tapio/live-server#readme)

 * eslint
    - 是nodejs编写，提供一种代码编写规范。
    - 对代码静态分析，不用执行就可以查找不符合语法规则的代码。
    - 可以自定义代码编写的规则

    - 先全局或者本地安装
      npm i -g eslint
    - vscode 中 安装eslint 插件
    - terminal 中执行 eslint --init
    - [vscode use](http://www.cnblogs.com/IPrograming/p/VsCodeESLint.html)
    - [配置](note/eslint.md)
    - [参考](http://eslint.org/)

 * Emmet(快捷编写html，vscode 内置了该功能)
    ```css
        div.className
        div#idName
        div.className#idName
        h1{text}
        a[href="#"]
        ul>li*3>a[href="#"]
    ```

 * 好用的插件
    - file-size
    - html css support
    - minapp 
    - open in browser
    - vetur
    - vscode-icons
    - vueHelper
    - [参考](https://juejin.im/post/5e89fb596fb9a03c75753eb0?utm_source=gold_browser_extension#comment)
    
### 前端的工具
* Fontmin/字蛛
* ImageOptim
* 文档工具
    - dash
    - zeal
    
### windows 连接服务器的工具
 * fileZillaClint
 * Xshell

### git
* [git基本使用](git/readme.md)

## chrome插件的开发
 * 首先要有一个manifest.json清单文件
    - [参数列表](http://chrome.liuyixi.com/manifest.html)
 * 在清单文件中提供了代码文件
 * 插件完成后，将其导入到Chrome中
    - 首先将所有相关文件都放到一个文件夹中
    - 用Chrome打开chrome://settings/extensions 这个网址是Chrome的扩展程序管理页面。点击“加载正在开发的扩展程序”，选择刚才创建的文件夹，- 确定，即成功导入。如果导入出错会有提示信息显示，可能是json文件配置有问题等。
    
 * [文章])(https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)

## node
* [node](node/README.md)

## linux
* [linux](linux/readme.md)

## nginx
* [nginx](nginx/readme.md)

## docker
* [docker](docker/readme.md)

## js中的设计模式
* [js中的设计模式](desin-patterns/)

## 爬虫
* 抓包工具
 - charles mac
 - fiddler windows 侧重http协议
 - WireShark 所有的通讯协议

* [electron](cross-platform/electron/readme.md)
* [puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/)

## 图与可视化
 * [图与可视化](图与可视化/readme.md)


## 我的开源项目
- [vue:中后台前端模板](https://github.com/qinmao/vue-admin-template)
- [vue:移动端前端模板]()
- [vue:ssr 开发模板]()
- [electron:前端爬虫]()
- [puppeteer:无头浏览器爬虫]()
- [electron:跨平台客户端]()
- [node:koa2 WebApi Serve]()
- [微信小程序:原生开发模板]()
- [微信小游戏:基于cocos-creator]()
- [G6 可视化流程图]()
- [pdf.js 文档标注平台]()

## 2019-2020
 - http协议

 - 浏览器

 - nodejs

 - mysql

 - 算法与数据结构
 
 - vue/ui框架
 
 - typescript
