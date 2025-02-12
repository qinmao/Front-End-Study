# js原型
## 什么是原型？
  - 函数对象的 prototype 属性所引用的对象。
  - 声明一个函数时，原型就随之而产生。此时默认原型 是一个空对象。但是具有一个默认的属性 constructor，该属性指向其构造函数
## 原型的特性：
  + 在原型上的成员(属性和方法),都可以直接被其实例访问，Object 是基原型
  + 实例不可以直接修改原型上的任何成员
  + 动态性：
    - 如果在原有的原型上扩展成员，会直接反应到 已创建的对象和之后创建的对象上。
    - 如果替换了原有的原型，新原型的成员 在之前已创建的对象是不能访问到的，而在之后创建的对象是可以访问到的。
    - 如果置换了原型，就可能会在新的原型上丢失默认的 constructor 属性,如果想要其有该属性，就只能自己手动添加上。
  + 所有的实例 只能共享一个原型。
## 获取原型的方式：
  - 通过函数： <fnName>.prototype
  - 通过对象： <object>.__proto__ ，__proto__  是浏览器中的，是一个非标准属性；
## 原型链：
  - 原型的本质是对象，那么就具有__proto__的属性，所以原型对象也有原型。通过这个属性一层层找下去，就是当前对象的原型链。
  - 原型链的尽头 Object.prototype 所以js实现继承就靠原型链
## 构造函数,原型和实例的关系:
  - 构造函数(constructor)都有一个原型对象(prototype),
  - 原型对象都包含一个指向构造函数的指针,
  - 而实例(instance)都包含一个指向原型对象的内部指针.
## 原型的对象指向一个实例，原型链的过程?
  - constructor1.prototype = instance2
    试图引用 constructor1 构造的实例instance1的某个属性 p1
  - 首先会在 instance1 内部属性中找一遍;
  - 接着会在 instance1.__proto__(constructor1.prototype)中找一遍,而constructor  prototype 实际上是instance2, 也就是说在instance2中寻找该属性p1;
  - 如果instance2中还是没有,此时程序不会灰心,它会继续在instance2.__proto  (constructor2.prototype)中寻找...直至Object的原型对象
  > 搜索轨迹: instance1--> instance2 --> constructor2.prototype…-->Objec  prototype
## 如何判断原型和实例的关系？
  + instanceof 
    - 语法：<对象> instanceof 函数
    - 功能：判断对象是否为指定函数的实例
    - 运算规则:若函数的原型，出现在该对象的原型链上 表达式返回true 否则false 
  + isPrototypeOf
    - 语法：<对象a>.isPrototypeOf(对象b)
    - 功能：判断对象a是不是对象b的原型
## 原型链存在的问题？
  - 问题一: 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;
  - 问题二: 在创建子类型时,不能向超类型的构造函数中传递参数.
## 如何解决原型链继承存在的问题?
  - 借用构造函数:(即在子类型构造函数的内部调用超类型构造函数.)
    ```js
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

        // 以上两个问题解决了，但是方法都在构造函数中定义, 因此函数复用也就不可用了.而且超类型(如Parent)中定义的方法,对子类型而言是不可见的. 考虑此,借用构造函数的技术也很少单独使用.
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
  - es5 提供的 Object.create(obj) 的经典继承   
    ```js
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
    ```js
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
    ``
