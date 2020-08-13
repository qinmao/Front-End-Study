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
        ```javascript
          var a=123;
          var b="abc";
          console.log(typeof(a-b)) // NaN  number
        ```
      - infinity(-infinity)表示无穷大 除数为0可得infinity,-0 得到-infinity
      - 非整数的number 类型无法用== ===比较
        ```js
            console.log( 0.1 + 0.2 == 0.3); false
            // 检查等式左右两边差的绝对值是否小于最小精度，才是正确的比较
            console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);true
        ```
      - 解决方案
        1. number.toFixed(参数)  
          ```js
          parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true
          ```
        2. 浮点型涉及精度问题：推荐都乘10最后除10 用整数运算（整数不存在精度问题）
  + String
  + Symbol
  + BigInt(新增的数字类型): 表示用任意精度表示整数

* 类型检测几种方案
   + typeof
       - 对于原始类型来说，除了 null 都可以显示正确的类型
       - 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型
   + instanceof
       - 内部机制是通过原型链中是不是能找到该类型的prototype。
       - 一般来判断对象，不能直接用来判断原始类型
       - ```javascript
           var arr=[];
           Array.isArray(arr) // 有兼容性问题
           arr instanceof Array // 推荐使用
           ```
   + 可检测任意类型
    ```js
     Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
    ```

* 类型转换
   + 隐式转换 变量在运算过程中发生的类型转换
      - console.log(!!"abc")

   + 显示（强制）转换:
      - 转字符串：对象转字符串 x.toString()
      - 转数字型：parseInt parseFloat
      - 转布尔型：
      - 几种转换为false: undefined NaN Null 0 -0 false "",其余全为true

    > tip:使用parseInt(a,10)，否则会遇到0开头的八进制的问题，parseInt() 是解析而不简单的转换,简单的类型转换Number(08)=8 会比parseInt 快

* == vs ===(类型和值都相等)
  + 如果对比双方的类型不一样的话，就会进行类型转换(判断流程如下)
    1. 首先会判断两者类型是否相同。相同的话就是比大小了
    2. 类型不相同的话，那么就会进行类型转换
    3. 会先判断是否在对比 null 和 undefined，是的话就会返回 true
    4. 判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number
    5. 判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断
    6. 判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断，对象转换成基础类型，利用它的toString或者valueOf方法   
    ```javascript
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

* 短路与&&
  - 只要有一个false，就返回 该 值false的子表达式的值
  - 短路与：可以保证某个变量有值，在参与运算
  - eg: Object.create&&Object.create(obj)

* 短路或||
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
        //代码块
        //自执行

        //在内部声明的变量与外部隔离
        //把常用的全局变量，当做实参传入进来
        //目的：1. 减少变量的搜索过程，提高js 性能
        //     2. 利于代码压缩
      }(window));
      // 一般开发插件时会用，如 jq 插件
    ```

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

## Math 对象常用几个函数
* 天花板函数 ceil Math.ceil(1.23)=2 向上返回最小的整数
* 地板函数 floor Math.floor(1.23)=1 向下返回最小的整数
* 随机数
  - Math.random() 返回0-1 的随机数
  - Math.floor(Math.random()*10) 返回0-9 的随机数
* Math.max() Math.min() 返回最大最小的值
* Math.abs(x)返回一个绝对值
* Math.round(x) 四舍五入

## JSON 转换 
* object转string  
  - JSON.stringify()
* string转object   
  - JSON.parse()
  
## js异常
> js中所有的异常都是Error的实例，可通过构造函数，自定义一个异常对象
* EvalError  运行时异常。 eval 函数调用时发生的异常
* RangeError 运行时异常 超出数据范围
* ReferenceError 运行时异常 未定义变量
* SyntanxError  预解析,语法错误
* typeError 运行时异常，类型异常
* URIError 运行时异常 在执行encodeURI 和 decodeURI 时抛出的常