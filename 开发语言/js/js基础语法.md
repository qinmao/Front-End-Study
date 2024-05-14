# js 基础
## 数据类型
* 7种原始类型（原始类型存储的都是值，是没有函数可以调用）
  + Boolean
  + Null
      - 空指针类型  没有指向任何一个对象
  + Undefined
    - 声明变量后不赋值
  + Number
    - NaN 是 number 型 表示不是一个数字
      ```js
        var a=123;
        var b="abc";
        console.log(typeof(a-b)) // NaN  number
      ```
    - infinity(-infinity)表示无穷大 除数为0可得 infinity,-0 得到 -infinity
    + 非整数的运算存在的精度问题？
      ```js
        console.log( 0.1 + 0.2 == 0.3); // 0.30000000000000004 false
        console.log( 0.1 + 0.2 === 0.3); // false
        // 检查等式左右两边差的绝对值是否小于最小精度，才是正确的比较
        console.log(Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);true
        // 解决方案：
        // 由于整数不存在精度问题,所以推荐先换算成整数参与运算。最后除以倍数
      ```
  + String
  + Symbol
  + BigInt(新增的数字类型): 表示用任意精度表示整数
* 类型检测几种方案
  + typeof
    - 对于原始类型来说，除了 null 都可以显示正确的类型
    - 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么型
  + instanceof
    - 内部机制是通过原型链中是不是能找到该类型的 prototype。
    - 一般来判断对象，不能直接用来判断原始类型
      ```js
        var arr=[];
        Array.isArray(arr) // 有兼容性问题
        arr instanceof Array // 推荐使用
      ```
  + 判断特定类型的api
    ```js
        Array.isArray([])
        // true
        isNaN(',')
        // true
    ```
  + 可检测任意类型：
    - Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
* 类型转换
  + 隐式转换 变量在运算过程中发生的类型转换
    - console.log(!!"abc")

  + 显示（强制）转换:
    - 转字符串：x.toString() number转string ''+number
    - 转数字型：parseInt parseFloat
    - 转布尔型：
    - 几种转换为 false: undefined NaN Null 0 -0 false "",其余全为true
    > tip:使用 parseInt(a,10)，否则会遇到0开头的八进制的问题，parseInt() 是解析而不简单的转换,简单的类型转换Number(08)=8 会比parseInt 快
* == vs ===(类型和值都相等)
  + 如果对比双方的类型不一样的话，就会进行类型转换(判断流程如下)
    1. 首先会判断两者类型是否相同。相同的话就是比大小了
    2. 类型不相同的话，那么就会进行类型转换
    3. 会先判断是否在对比 null 和 undefined，是的话就会返回 true
    4. 判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number
    5. 判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断
    6. 判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断，对象转换成基础类型，利用它的toString或者valueOf方法   
    ```js
     []==![] // true
        1. 看见 ![ ]这个是要对空数组转成布尔类型结果得到![ ] = false,
        2. 发现此时符合第5条，即Number(false),结果为 Number(false) = 0。
        3. 此时得到 [] == 0比较，此时符合第6条 即 [].toString()；结果为[].toString() = ” ”;
        4. 此时得到 ” ” == 0,发现符合第4条即Number(“ ”)；结果为Number(” ”) = 0;
        5. 此时得到 0 == 0 两个同时为数值类型比较所以结果为true;   
     [] == false // true
        1. false -->Number(false),结果为 Number(false) = 0。
        2. []== 0-->[].toString() 结果为[].toString() = ” ”;
        3. ' '==0-->Number(' ') = 0;
        4. 0==0 true
    ```
## 短路操作
* 执行过程(当操作数不是bool值时)
  1. 隐式转换
  2. 从左往右
  3. 哪个操作数可以决定结果，就返回这个原操作数

+ 短路与&&
  - 只要有一个false，就返回 该值false的子表达式的值
  - 短路与：可以保证某个变量有值，在参与运算
  - eg: Object.create&&Object.create(obj)

+ 短路或||
  - 只要有一个true，就返回 该 值true的子表达式的值
  - 短路或：可以方便给变量赋初值
## 函数    
* 函数有用的一些属性
  + arguments 
    - 伪数组对象
    - 以数组形式，存储实参
    - length 实参个数
  + length: 定义形参的个数
    ```js
    // 1.
    function b(x,y,z){
        arguments[2]=10
        alert(z) // 10
    }
    b(1,2,3) 

    // 2. 
    function b(x,y,z){
        z=10
        alert(arguments[2]) // 10 
    }
    b(1,2,3)
    ```
* 沙箱模式：
  - 防止全局变量和全局对象的污染，引出沙箱模式,实质就是匿名的自执行函数
    ```javascript
      (function(global){
        // 代码块
        // 自执行

        // 在内部声明的变量与外部隔离
        // 把常用的全局变量，当做实参传入进来
        // 目的：1. 减少变量的搜索过程，提高js 性能
        //      2. 利于代码压缩
      }(window));
      // 一般开发插件时会用，如 jq 插件
    ```
## js执行机制
* 什么叫作用域：
    - 指在程序中定义变量的区域，该位置决定了变量的生命周期。作用域就是变量与函数的可访问范围
    - ES6之前只有2种作用域：全局和函数作用域，全局代码中任意位置都可以访问，函数只能在内部被访问，执行完销毁
* 作用域链
  - 示例引出
    ```js
    function bar() {
        console.log(myName)
    }
    function foo() {
        var myName = "极客邦"
        bar()
    }
    var myName = "极客时间"
    foo()
    ```
  - 词法作用域：指作用域是由代码中函数声明的位置来决定的，由代码编译阶段就决定好的，和函数是怎么调用的没有关系。
  - 作用域链：通过作用域查找变量的链条称为作用域链。作用域链是由词法作用域决定的
  - 变量查找的过程：先在当前的执行上下文中查找，没有就去外部引用的执行上下文查找
* 变量提升：js代码是按顺序执行的吗？
  + js预解析阶段
    - 语法分析：保证js代码符合语法规则，能被正确的执行。
    - 变量名以及函数名提升
    - 确定变量的作用域。
    > 先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部
    ```js
     function foo() {
        var x = 'Hello, ' + y;
        alert(x);
        var y = 'Bob';
     }
     foo();
     // 变量提升后代码：
     function foo() {
        var y; // 提升变量y的申明
        var x = 'Hello, ' + y;
        alert(x);
        y = 'Bob';
     }   
     // hello undefined  
     // 函数内变量的怪异声明模式:
     function fun(){
        num=10   // 没写var 就相当于全局变量
     }
     fun()
     console.log(num) //10
    ```
* 变量提升带来的问题：
  - 变量容易在不被察觉的情况下被覆盖掉
  - 本应销毁的变量没有被销毁
     ```js
      function foo(){
        for (var i = 0; i < 7; i++) {
        }
        console.log(i); 
        // 如果你使用 C 语言或者其他的大部分语言实现类似代码，在 for 循环结束之后，i 就已经被销毁了，但是在 js 代码中，i 的值并未被销毁，所以最后打印出来的是 7
        // 为了解决这些问题，ES6 引入了 let 和 const 关键字，从而使 JavaScript 也能像其他语言一样拥有了块级作用域
      }
      foo()
     ```
* es6是如何解决变量提升带来的缺陷
  - 函数内部通过var声明的变量，在编译阶段全都被存放到变量环境里面了
  - 通过let声明的变量，在编译阶段会被存放到词法环境（Lexical Environment）中
  - 在函数的作用域块内部，通过let声明的变量没有被存放到词法环境中
* var/let/const区别 
   - var 在浏览器预解析时存在变量提升，未声明可以使用
   - let 不存在变量提升,未声明就使用，会报错（暂时性死区),只在代码块内有效
   - const 声明一个只读的常量。一旦声明常量的值就不能改变。
    (对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了)
   - 综合示例考察
    ``` js
        for (var index = 0; index < 10; index++) {
                setTimeout(() => {
                    console.log(index)
                },0); 
        }
        // 涉及到js 执行机制 执行栈同步执行完，把异步队列拿到栈执行10次 
        // 输出10 次10 

        // 依次输出 0到9
        for (let index = 0; index < 10; index++) {
            setTimeout(function(){
                console.log(index);
            },0);
        }

        // 块级作用域
        // 输出的结果 0一直到9，也可以用闭包来实现
        for (var index = 0; index < 10; index++) {
            (function(index){
                setTimeout(fucntion(){
                    console.log(index)
                },0 );
            })(index);
        }

    ```
* 调用栈
  + 执行上下文： 当一段代码被执行时，js引擎先会对其进行编译，并创建执行上下文
    - 当js执行全局代码的时候，会编译全局代码并创建全局执行上下文，而且在整个页面的生存周期内，全局执行上下文只有一份。
    - 当调用一个函数的时候，函数体内的代码会被编译，并创建函数执行上下文，一般情况下，函数执行结束之后，创建的函数执行上下文会被销毁。
    - 当使用 eval 函数的时候，eval 的代码也会被编译，并创建执行上下文。
  + 什么是调用栈
    - 栈结构：特点是后进先出
    - 调用栈就是用来管理函数调用关系的一种栈结构
    - js 引擎追踪函数执行的一个机制
    - 开发中的使用：在浏览器soucre中打上一个断点，当执行该函数时，通过 call stack 查看当前调用栈的情况 anonymous 是全局的函数入口 或者通过 console.trace() 打印出当前函数的调用关系

  + 为什么会出现栈溢出的问题
    - 调用栈是有大小的，当入栈的执行上下文超过了，js 引擎就会报栈溢出的错误
    - 使用递归不当会导致该问题，所以要明确终止条件
* this 指向问题（执行上下文的视角）
  + 执行上下文：
    - 包含变量环境、词法环境、outer(外部环境)、this(和执行上下文是绑定的，每个执行上下文都有个this)
    - 分为：全局执行上下文、函数..、eval..三种，对应的this也有三种
  + 全局执行上下文 this 指向为 window
  + 函数执行上下文
    1. call|apply|bind
       - fn.call(thisObj, [arg1~argN])
       - fn.apply(thisObj, [数组]);
       - bind 方法创建一个新的函数, 当被调用时，将其 this 执行第一个参数  
       > fun.bind(thisArg[, arg1[, arg2[, ...]]])
       > 返回值：返回由指定的this值和初始化参数改造的原函数拷贝
    2. 通过对象调用方法设置
       - 将一个函数 赋值给 某个对象的属性，然后通过该对象去执行函数,该方法的 this 是指向对象本身
       ```js
        var myObj = {
            name : "极客时间", 
            showThis: function(){
                console.log(this)
            }
        }
        myObj.showThis()
       ```
    3. 构造函数模式
       - 函数内部的 this 指向为 当前创建出来的实例。
       - 构造函数的执行过程
         1. 创建一个空对象obj
         2. 将上面的创建的空对象obj赋值给this
         3. 执行代码块（给属性赋值等等）
         4. 隐式返回 return this   
    4. 箭头函数
       - 函数并不会创建其自身的执行上下文
       - 箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this
* 闭包
  - 写法示例：
    ```js
    function foo() {
        var myName = "极客时间"
        let test1 = 1
        var innerBar = {
            getName(){
                console.log(test1)
                return myName
            },
            setName(newName){
                myName = newName
            }
        }
        return innerBar
    }
    var bar = foo()
    bar.setName("极客邦")
    bar.getName()
    console.log(bar.getName())
      
    
    var bar = {
        myName:"time.geekbang.com",
        printName: function () {
            console.log(myName)
        }    
    }
    function foo() {
        let myName = "极客时间"
        return bar.printName
    }
    let myName = "极客邦"
    let _printName = foo()
    _printName()
    bar.printName()
    ```
  - 定义：根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中。
  + 闭包使用中的问题：
    - 本质上就是让数据常驻内存。如此，使用闭包就增大内存开销，使用不当就会造成GC无法回收，导致内存泄漏。
    - 应用场景：1. 保护私有变量 2. 维持内部私有变量的状态
    - 如何解决：
      1. 如果该闭包会一直使用，那么它可以作为全局变量而存在；但如果使用频率不高，而且占用内存又比较大的话，那就尽量让它成为一个局部变量。
      2. 使用完闭包后，及时清除。（将闭包变量 赋值为 null）
## js中的内存机制
* 栈空间和堆空间：数据是如何存储的？
  - 原始类型存储的是值存在栈中，对象类型在栈中存储的是堆空间值的
 地址（指针），实际是存在堆空间
  - 示例：
   ```js
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
        console.log(p1) // -> ? {name:yck,age:26}
        console.log(p2) // -> ? {name:yyy,age:30}
        // 解析：
        // 1. 传入的参数是p1的地址拷贝a1，age 赋值时，p1与a1指向的地址值已经被改了，此时age为26,p1的值为name:yck,age:26
        // 2. 之后重新把a1的指向地址改成了新的对象地址，所以，p1的值为name:yck,age:26,p2的值为name:yyy,age:30

    ```
  - 如何解决外部对象参数的值被修改？(如何拷贝一个对象，使两对象各自独立互不影响？)
  + 深拷贝、浅拷贝
    - 浅拷贝：只拷贝了基本类型的数据，对于引用的类型数据，复制后也是会发生引用
     ```js
        // 实现方式1:Object.assign
        const a = {
            age: 1
        }
        const b = Object.assign({}, a)
        a.age = 2
        console.log(b.age) // 1

        // 实现方式2:展开运算符 ... 
        let a = {
            age: 1
        }
        let b = { ...a }
        a.age = 2
        console.log(b.age) // 1

     ```
    + 深拷贝:
        - 利用递归，逐个拷贝对象的属性，属性中的对象到新对象上
        - 简易的实现：JSON.parse(JSON.stringify(object)) 但存在一些缺陷
          - 会忽略 undefined
          - 会忽略 symbol
          - 不能序列化函数
          - 不能解决循环引用的对象
* GC
  > 通常情况下，垃圾数据回收分为手动回收(C/C++)和自动回收(js/java/c#)两种策略
  > 由于数据是存储在栈和堆两种内存空间中的，所以分为 栈中的垃圾数据 和“堆中的垃圾数据”是如何回收的
  + 栈中的垃圾数据如何回收？
    - 首先是调用栈中的数据，当一个函数执行结束之后，js 引擎会通过向下移动 ESP【记录当前执行状态的指针】来销毁该函数保存在栈中的执行上下文。
  + 堆中的数据是如何回收的？
    > 代际假说：这是垃圾回收领域中一个重要的术语,有两个特点：1. 大部分对象在内存中存在的时间很短，就是很多对象一经分配内存，很快就变得不可访问 2. 不死的对象，会活得更久
    > 垃圾回收算法有很多种,为了能胜任多种场景，需要共用不同的算法
    + 垃圾回收器的工作流程：
      - 第一步是标记空间中活动对象和非活动对象。所谓活动对象就是还在使用的对象，非活动对象就是可以进行垃圾回收的对象。
      - 第二步是回收非活动对象所占据的内存。其实就是在所有的标记完成之后，统一清理内存中所有被标记为可回收的对象。
      - 第三步是做内存整理。一般来说，频繁回收对象后，内存中就会存在大量不连续空间，我们把这些不连续的内存空间称为内存碎片。当内存中出现了大量的内存碎片之后，如果需要分配较大连续内存的时候，就有可能出现内存不足的情况。所以最后一步需要整理这些内存碎片，但这步其实是可选的，因为有的垃圾回收器不会产生内存碎片，比如接下来我们要介绍的副垃圾回收器。

    > V8 中会把堆分为新生代和老生代两个区域
    + 新生代:
      - 存放的是生存时间短的对象,副垃圾回收器负责回收
      - 用 Scavenge 算法来处理，所谓 Scavenge 算法，是把新生代空间对半划分为两个区域，一半是对象区域，一半是空闲区域
      - 新加入的对象都会存放到对象区域，当对象区域快被写满时，就需要执行一次垃圾清理操作。
      - 在垃圾回收过程中，首先要对对象区域中的垃圾做标记；标记完成之后，就进入垃圾清理阶段，副垃圾回收器会把这些存活的对象复制到空闲区域中，同时它还会把这些对象有序地排列起来，所以这个复制过程，也就相当于完成了内存整理操作，复制后空闲区域就没有内存碎片了。
      - 完成复制后，对象区域与空闲区域进行角色翻转，角色翻转的操作还能让新生代中的这两块区域无限重复使用下去。

      > 由于新生代中采用的 Scavenge 算法，所以每次执行清理操作时，都需要将存活的对象从对象区域复制到空闲区域。但复制操作需要时间成本，如果新生区空间设置得太大了，那么每次清理的时间就会过久，所以为了执行效率，一般新生区的空间会被设置得比较小

      >正是因为新生区的空间不大，所以很容易被存活的对象装满整个区域。为了解决这个问题，JavaScript 引擎采用了对象晋升策略，也就是经过两次垃圾回收依然还存活的对象，会被移动到老生区中。

    + 老生代: 活得长，占用空间大 2特点
      - 除了新生区中晋升的对象，一些大的对象会直接被分配到老生区，主垃圾回收器负责回收
      - 由于Scavenge 算法复制这些大的对象耗时较长，因此主垃圾回收器是采用标记 - 清除（Mark-Sweep）的算法进行垃圾回收的
      - 标记阶段就是从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素称为活动对象，没有到达的元素就可以判断为垃圾数据。
      - 对一块内存多次执行标记 - 清除算法后，会产生大量不连续的内存碎片。而碎片过多会导致大对象无法分配到足够的连续内存，于是又产生了另外一种算法——标记 - 整理（Mark-Compact）
      - 为了降低老生代的垃圾回收大对象而造成的卡顿，V8 将标记过程分为一个个的子标记过程，同时让垃圾回收标记和 JavaScript 应用逻辑交替进行，直到标记阶段完成，我们把这个算法称为增量标记（Incremental Marking）算法

    > 由于引用计数法容易产生循环引用，导致内存泄漏，现在主流 gc 已经不再使用了
## 对象
* 如何创建对象？
  - 字面量或者叫直接量:var obj={};
  - 构造函数创建对象
    ```js
      function Student(name, age, sex) {
          this.name = name
          this.age = age
          this.sex = sex
          this.sayHi = function () {
              console.log("你好" + this.name)
          }
      var s1 = new Student("小明", "12", "男");
    ```
  - 工厂模式创建对象 就是用一个方法实现对象的实例化
    ```js
       function initStu(name, age,sex) {
            return new Student(name, age,sex);
          }
       var obj=initStu();
      // 这种方式创建对象避免new的操作    
    ``` 
* 对象的属性
  + 两种访问方式：
    - obj.propertyName  
    - obj["propertyName"] 遍历属性并赋值时常用到  
  + 检测:(hasOwnProperty)
    - 语法：<对象>.hasOwnProperty('propertyName')
    - 功能：用来判断指定的属性是否为该对象自己拥有的，而不是继承下来的。
    - eg:obj.hasOwnProperty("name") // true
* 对象属性非空的判断
  > 开发中经常会遇到 cannot read properties of undefined 这种报错，因此对数据访问时的非空判断就变成了一件很繁琐且重要的事情。ECMAScript 2020 出了新语法方便我们开发
  + 可选链操作符(?)：
    - 允许您在访问对象属性或调用函数时，检查中间的属性是否存在或为 null/undefined。如果中间的属性不存在或为空，表达式将短路返回 undefined，而不会引发错误
    ```js
        const obj = {
            foo: {
                bar: {
                    baz: 42
                }
            },
            xyz: []
        };
    // 使用可选链操作符
    // 如果任何中间属性不存在或为空，value 将为 undefined
    const value1 = obj?.foo?.bar?.baz; 

    // 除了对属性的检查，还可以用于对数组下标及函数的检查
    const value2 = obj?.xyz?.[0]?.fn?.();
    
    // 传统写法 需要手动检查每个属性
    const value1 = obj && obj.foo && obj.foo.bar && obj.foo.bar.baz; 
    const value2 = obj && obj.xyz && obj.xyz[0] && obj.xyz[0].fn && obj.xyz[0].fn();

    ```
  + 空值合并操作符(??)
    - 用于选择性地提供默认值，仅当变量的值为 null 或 undefined 时，才返回提供的默认值。否则，它将返回变量的实际值。
    ```js
        // 案例
        const foo = null;
        const bar = undefined;

        const baz = 0;
        const xyz = false;
        const qux = '';

        const value1 = foo ?? 'default'; // 'default'，因为 foo 是 null
        const value2 = bar ?? 'default'; // 'default'，因为 bar 是 undefined

        const value3 = baz ?? 'default'; // 0，因为 baz 不是 null 或 undefined
        const value4 = qux ?? 'default'; // ''，因为 qux 不是 null 或 undefined
        const value5 = xyz ?? 'default'; // false，因为 xyz 不是 null 或 undefined

        // 可能存在的传统写法，除了 null,undefined, 无法兼容 0、''、false 的情况,使用时要特别小心
        const value1 = foo || 'default'; // 'default'
        const value2 = bar || 'default'; // 'default'

        const value3 = baz || 'default'; // 'default'，因为 0 转布尔类型是 false
        const value4 = qux || 'default'; // 'default'，因为 '' 转布尔类型是 false
        const value5 = xyz || 'default'; // 'default'
    ```
## Math 对象常用几个函数
* 天花板函数 ceil Math.ceil(1.23)=2 向上返回最小的整数
* 地板函数 floor Math.floor(1.23)=1 向下返回最小的整数
* 随机数
  - Math.random() 返回0-1 的随机数
  - Math.floor(Math.random()*10) 返回 0-9 的随机数
* Math.max() Math.min() 返回最大最小的值
* Math.abs(x)返回一个绝对值
* Math.round(x) 四舍五入
## JSON 转换 
* object 转 string:JSON.stringify()
* string 转 object:JSON.parse()   
## URI编码解码
* URI 字符串的编码解码
    - encodeUrI
    - decodeURI
* URI 组件编码解码
    - encodeURIComponent
## 循环：break/continue
* break：跳出循环，执行循环之后的代码
* Continue：发生指定的条件，中断（循环中）的一个迭代，然后继续循环中的下一个迭代
## setTimeout|setInterval
* js中的计时器能否精确计时？为什么
  - 硬件 层面不可能
  - 系统：操作系统的计时
  - 标准w3c：>=5的嵌套层级，最小4ms
  - 事件循环:回调函数执行时，必须等待执行栈
## js异常
> js中所有的异常都是Error的实例，可通过构造函数，自定义一个异常对象
* EvalError  运行时异常。 eval 函数调用时发生的异常
* RangeError 运行时异常 超出数据范围
* ReferenceError 运行时异常 未定义变量
* SyntanxError  预解析,语法错误
* typeError 运行时异常，类型异常
* URIError 运行时异常 在执行 encodeURI 和 decodeURI 时抛出的常