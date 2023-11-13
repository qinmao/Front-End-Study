# TS
> TypeScript（简称 TS）是微软公司开发的一种基于 JavaScript （简称 JS）语言的编程语言。它的目的并不是创造一种全新语言，而是增强 JavaScript 的功能，使其更适合多人合作的企业级项目。
## 安装
  ```bash
    npm i typescript -g
    tsc -v
    # 显示基本可用的帮助信息
    tsc -h
    # 显示完整的帮助信息
    tsc --all
  ```
## 编译 
  >官方提供的编译器,可以将 TypeScript 脚本编译成 JavaScript 脚本
  ```bash
    # 编译ts文件，支持一次编译多个
    tsc demo1.ts demo2.ts

    # 将多个 TypeScript 脚本编译成一个 JavaScript 文件
    tsc file1.ts file2.ts --outFile app.js

    # 编译结果默认都保存在当前目录，--outDir参数可以指定保存到其他目录
    tsc app.ts --outDir dist

    # 为了保证编译结果能在各种 JavaScript 引擎运行，tsc 默认会将 TypeScript 代码编译成很低版本的 JavaScript，即3.0版本（以es3表示）。
    tsc --target es2015 app.ts
  ```
## tsconfig.json
> TypeScript 允许将tsc的编译参数，写在配置文件 tsconfig.json。只要当前目录有这个文件，tsc就会自动读取，所以运行时可以不写参数。
* 有了这个配置文件，编译时直接调用 tsc 命令就可以了
* include:["src/*"]
* exclude:["src/lib"] 默认是排除 node_modules
* extends:"./tsconfig.base" 继承 tsconfig.base的配置
* compilerOptions
  - incremental:true  增量编译
  - diagnostics:true  打印诊断信息
  - target 生成代码语言的标准
  - module 生成代码的模块标准
  - lib:["dom","es5","es2019.array"]  内置的类型声明库
  - types:["node"]  @types/xxx 声明包的配置
  - typeRoots:["其他目录"]
  - allowJs:true 允许编译js文件
  - checkJs:true 通常与allowJs一起使用
  - noImplicitAny:true 只要推断出any类型就会报错。
  - outDir:'dist' 指定输出目录
  - rootDir:"./"  指定输入文件目录
  - baseUrl: "./" 解析非相对模块的基地址
  - declaration:true 生成声明文件
  - declarationDir:'./d'生成声明文件路径
  - soureMap:true
  - removeComments: true 删除注释
* references 依赖
## ts的类型系统
* js原始类型 number|bigint|string|boolean|undefined|null|symbol
  ```js
    const a: number = 3;
    const b: string = 3;
    const g: boolean = true;
    
    // undefined 常用于组合类型
    let j: number | undefined;
    let k: null;

    // symbol 
    let j: symbol=Symbol()

    // bigint 类型包含所有的大整数。
    // ES2020 标准引入的。如果使用这个类型，TypeScript 编译的目标 JavaScript 版本不能低于 ES2020
    const x:bigint = 123n;
    const y:bigint = 0xffffn;

    const x:bigint = 123; // 报错
    const y:bigint = 3.14; // 报错
  ```
* js对象类型 object(数组对象，函数等对象)
* TypeScript 的数组类型
  > JavaScript 数组在 TypeScript 里面分成两种类型，分别是数组（array）和元组（tuple）。
  ```ts
    // 数组的类型有两种写法。
    // 1. 是在数组成员的类型后面，加上一对方括号。
    let arr:number[] = [1, 2, 3];

    // 2. 是使用 TypeScript 内置的 Array 接口。
    let arr:Array<number> = [1, 2, 3];
    let arr:Array<number|string>;
 
    // TypeScript 允许使用方括号读取数组成员的类型。
    type Names = string[];
    type Name = Names[0]; // string

    // 数组的类型推断
    // 推断为 any[]
    const arr = [];
    arr.push(123);
    arr // 推断类型为 number[]

    arr.push('abc');
    arr // 推断类型为 (string|number)[]

    // 只读数组
    const arr:readonly number[] = [0, 1];

    arr[1] = 2; // 报错
    arr.push(3); // 报错
    delete arr[0]; // 报错

  ```
* TypeScript 的元组类型
  > 它表示成员类型可以自由设置的数组，即数组的各个成员的类型可以不同。
  ```ts
    // 由于成员的类型可以不一样，所以元组必须明确声明每个成员的类型。
    const e: [number, string] = [1, "ww"];
   
    // 与数组写法的差异
    // 数组
    let a:number[] = [1];
    // 元组
    let t:[number] = [1];

    // 元组成员的类型可以添加问号后缀（?），表示该成员是可选的。
    let a:[number, number?] = [1];

    // 扩展运算符
    type NamedNums = [
        string,
        ...number[]
    ];

    const a:NamedNums = ['A', 1, 2];
    const b:NamedNums = ['B', 1, 2, 3];

    // 只读元组
    type t = Readonly<[number, string]>
  ```
* TypeScript 的 symbol 类型
  > Symbol 是 ES2015 新引入的一种原始类型的值。它类似于字符串，但是每一个 Symbol 值都是独一无二的，与其他任何值都不相等。
  ```ts
    // Symbol 值通过Symbol()函数生成
    let x:symbol = Symbol();
    let y:symbol = Symbol();
    x === y // false

    // unique symbol表示单个值，这个类型的变量是不能修改值的，只能用const命令声明
    const x:unique symbol = Symbol();
  ```
* ts 新增类型
  ```ts
    // 联合类型  变量可以是两种类型之一
    let timer:number|null = null
    timer = setTimeout()
    
    // 枚举
    enum error {
        blue = 3,
        "orange",
    }
    const f: error = error.orange;
    console.log(f); //输出4
    // tips
    // 如果未赋值的上一个值是数字那么这个未赋值的值的是上一个值的值+1
    // 如果未赋值的上一个值未赋值那么输出的就是它的下标
    // 如果未赋值的上一个值的值是非数字,那么必须赋值

    // void 指定方法类型，表示没有返回值,方法体中不能return
    function aa(): void {
        console.log(1);
    }
    // 如果方法有返回值，可以加上返回值的类型
    function bb(): number {
        return 1;
    }
  ```
### ts的三种特殊类型
* any 类型
  - 类型表示没有任何限制，该类型的变量可以赋予任意类型的值。
  - 变量类型一旦设为any，ts 实际上会关闭这个变量的类型检查。即使有明显的类型错误，只要句法正确，都不会报错。
  + 应用场景：
    - 出于特殊原因，需要关闭某些变量的类型检查，就可以把该变量的类型设为any。
    - 为了适配以前老的 JavaScript 项目，让代码快速迁移到 TypeScript，可以把变量类型设为any
* unknown 类型
  - 为了解决any类型“污染”其他变量的问题，TypeScript 3.0 引入了unknown类型。它与any含义相同，表示类型不确定，可能是任意类型，但是它的使用有一些限制，不像any那样自由，可以视为严格版的any。
    ```ts
        // 与 any 相似之处,在于所有类型的值都可以分配给unknown类型。
        let x:unknown;

        x = true; // 正确
        x = 42; // 正确
        x = 'Hello World'; // 正确
        
        // 与 any 不同之处，它不能直接使用。主要有以下几个限制。
        // 1. unknown类型的变量，不能直接赋值给其他类型的变量（除了any类型和unknown类型）
        let v:unknown = 123;

        let v1:boolean = v; // 报错
        let v2:number = v; // 报错

        // 2.不能直接调用unknown类型变量的方法和属性。
        let v1:unknown = { foo: 123 };
        v1.foo  // 报错

        let v2:unknown = 'hello';
        v2.trim() // 报错

        let v3:unknown = (n = 0) => n + 1;
        v3() // 报错

        // 只有经过“类型缩小”，unknown类型变量才可以使用
        let a:unknown = 1;
        if (typeof a === 'number') {
            let r = a + 10; // 正确
        }
    ```
* never 类型
  > 为了保持与集合论的对应关系，以及类型运算的完整性，TypeScript 还引入了“空类型”的概念，即该类型为空，不包含任何值。
    ```ts
    // 变量x的类型是never，就不可能赋给它任何值，否则都会报错
    let x:never;

    // 一个变量可能有多种类型（即联合类型），通常需要使用分支处理每一种类型。这时，处理所有可能的类型之后，剩余的情况就属于never类型。
    function fn(x:string|number) {
        if (typeof x === 'string') {
            // ...
        } else if (typeof x === 'number') {
            // ...
        } else {
            x; // never 类型
        }
    }
    ```
  + 使用场景
    - 主要是在一些类型运算之中，保证类型运算的完整性
    - 不可能返回值的函数，返回值的类型就可以写成 never
## 函数
  ```ts
    function reload(name: string) // :string 返回值类型可省略，会自动推断出来

    // Function 类型:TypeScript 提供 Function 类型表示函数，任何函数都属于这个类型。
    function doSomething(f:Function) {
        return f(1, 2, 3);
    }
    // 箭头函数：箭头函数是普通函数的一种简化写法，它的类型写法与普通函数类似。
    const repeat = (times:number):string => console.log(times);

    // 可选参数: ? 代表这个参数可传可不传,不传就是undefined
    // 参数默认值: 设置了默认值的参数，就是可选的。如果不传入该参数，它就会等于默认值
    // 可选参数与默认值不能同时使用
    function getUserInfo(name: string, age?: number, school: string = "清华大学") {
        return `name:${name}--age:${age}--school:${school}`;
    }
    getUserInfo('qm','北京大学')   // ok
    getUserInfo('qm')            // ok

    // 参数解构: 与type 类型结合，可简化代码
    type ABC = { a:number; b:number; c:number };
    function sum({ a, b, c }:ABC) {
        console.log(a + b + c);
    }
    // rest: 参数为数组
    function joinNumbers(...nums:number[]) {}
    // rest: 参数为元组
    function f(...args:[boolean, number]) {}
    
    // 函数重载
    function reverse(str:string):string;
    function reverse(arr:any[]):any[];

  ```
## 接口
> interface 是对象的模板，可以看作是一种类型约定
* 属性接口
  ```js
    // 建议接口定义了哪些值就传哪些值,多传少传会报错
    interface InterfaceName {
        first: string;
        second?: string; // 加个问号，接口属性就可以变成可传可不传了，不传默认是undefined。
    }
    // 打印变量
    function logParam(name: InterfaceName): void {
        console.log(name.first, name.second, 11);
    }
    // 定义参数
    const obj = { first: "1", second: "fff", three: 1 };
    // logParam({ first: "1", second: "1", three: 1 }); // 报错,只能传接口定义的值
    logParam(obj);

  ```
* 函数接口
  ```js
    // 对方法传入的参数类型,以及返回值类型进行约束(不对参数名称进行约束),可批量进行约束。
    interface keyMap {
        (key: string, value: string): string;
    }
    let logKeyMap: keyMap = function (key1: string, value: string): string {
        return key1 + value;
    };
    console.log(logKeyMap("key1", "value"));
  ```
* 可索引接口
  ```js
    // 约束数组
    interface Arr {
        [index: number]: string;
    }
    let ss: Arr = ["2121"];

    // 约束对象
    interface Obj {
        [index: string]: string;
    }
    let interfaceArr: Obj = { aa: "1" };
    // tips:
    // 对数组进行约束,index后必须跟着number类型。
    // 对对象进行约束,index后必须跟着string类型
    // 索引签名参数类型必须为 "string" 或 "number"
  ```
* 类类型接口
  ```js
    interface Animals {
        name: string;
        eat(): void;
    }

    class Dogs implements Animals {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        eat() {}
    }
  ```
## 类
  ```js
    class Person {
        // 私有变量
        private name: string;
        
        // 构造函数
        constructor(name: string) {
            this.name = name;
        }
        
        // 获取名字
        getName(): string {
            return this.name;
        }
        
        // 设置名字
        setName(name: string): void  {
            this.name = name;
        }
    }

    let p = new Person("张三");
    p.setName("李四");
    console.log(p);

    // 抽象类不能实例化，只能继承
    // 只能被继承，内部如果有抽象方法，那么这个方法必须被子类实现
    // 可以抽离公用的逻辑
    abstract class Animal {
        private name: string;
        constructor(name: string) {
            this.name = name;
        }
        // 抽象成员--方法
        abstract eat(): any;
        // 抽象成员--属性
        protected abstract ages: Number;
        sleep(): void {
            console.log("睡觉");
        }
    }
  ```
## Enum类型
  ```ts
   const enum Color {
        Red=0,     
        Green=1,   
        Blue=2     
    }
    let c:Color = Color.Green; // 正确 推荐语义更好
    let c:number = Color.Green; // 正确
    
    // 编译后
    let Color = {
        Red: 0,
        Green: 1,
        Blue: 2
    };
    // 加上const好处:编译为 JavaScript 代码后，代码中 Enum 成员会被替换成对应的值，这样能提高性能
    const x = Color.Red;
    const y = Color.Green;
    const z = Color.Blue;

    // 编译后
    const x = 0 /* Color.Red */;
    const y = 1 /* Color.Green */;
    const z = 2 /* Color.Blue */;

    // 字符串 Enum 
    const enum Direction {
        Up = 'UP',
        Down = 'DOWN',
        Left = 'LEFT',
        Right = 'RIGHT',
    }
  ```
## 继承
* 类继承
  ```js
    class Son extends Person {
        // 静态属性
        public static age: number = 18;
        // 学校
        public school: string;
        //构造方法
        constructor(name: string, school: string) {
            // 访问派生类的构造函数中的 "this" 前，必须调用 "super",初始化父类构造函数 --并把参数传给父类
            super(name); 
            //把传进来的school赋值给全局变量
            this.school = school;
        }
        // 静态方法
        static run(name: string): string {
            return `${name}在跑步,他的年龄才${this.age}`;
        }
    }
    let son = new Son("王五", "清华大学");
    son.setName("赵六"); // 私有类也不能在子类的外部访问,但可通过公开的方法中进行赋值和访问
    console.log(son);
    console.log(Son.run("方七"));
    console.log(Son.age);
    // tips:
    // public 在当前类里面，子类，类外面都可以访问
    // protected 在当前类和子类内部可以访问，类外部无法访问
    // private 在当前类内部可访问，子类，类外部都无法访问。
    // 属性不加修饰符,默认就是公有的 (public)

  ```
* 接口继承
  ```js
    interface Dog {
        eat(): void;
    }

    interface Persons extends Dog {
        work(): void;
    }

    class Cat {
        code() {
            console.log("猫在敲代码");
        }
    }

    // 可继承类后再实现接口
    class SuperMan extends Cat implements Persons {
        eat(): void {
            console.log(1);
        }
        work(): void {
            console.log(2);
        }
    }
    let superMan = new SuperMan();
    superMan.code();
  ```
## 多态
  ```js
    // 抽象父类
    abstract class Animal {
        private name: string;
        constructor(name: string) {
            this.name = name;
        }
        // 抽象成员--方法
        abstract eat(): any;
        // 抽象成员--属性
        protected abstract ages: Number;
        sleep(): void {
            console.log("睡觉");
        }
    }

    class cat extends Animal {
        ages: Number = 2;
        constructor(name: string) {
            super(name);
        }
        // 非抽象类“cat”不会自动实现继承自“Animal”类的抽象成员“eat”
        // 必须手动定义父类中的抽象方法--多态
        eat(): string {
            return "猫吃鱼";
        }

        // 多态
        sleep(): string {
            return "猫在睡觉";
        }
    }
    console.log(new cat("33").sleep());
    // tips:
    // 抽象类无法实例化。
    // 非抽象类继承抽象父类时不会自动实现来自父类的抽象成员,必须手动定义父类中的抽象成员，否则报错。
    // 抽象成员包括属性和方法
  ```
## 泛型
> 不预先设定类型，在使用的时候确定
> 好处：1. 增强程序的拓展性 2. 不必写多条函数重载，联合类型声明 3. 灵活控制类型之间的约束
* 函数的泛型
    ```js
        function getDate<T>(value: T): T {
            return value;
        }
        console.log(getDate<number>(123));
    ```
* 类的泛型
    ```js
        class MinClass<T> {
            public list: T[] = [];
                //添加
                add(value: T): void {
                    this.list.push(value);
                }
                
                //求最小值
                min(): T {
                    //假设这个值最小
                    let minNum = this.list[0];
                    for (let i = 0; i < this.list.length; i++) {
                        //比较并获取最小值
                        minNum = minNum < this.list[i] ? minNum : this.list[i];
                    }
                return minNum;
            }
        }
        //实例化类 并且指定了类的T的类型是number
        let minClass = new MinClass<number>(); 
        minClass.add(23);
        minClass.add(5);
        minClass.add(2);
        console.log(minClass.min());
        //实例化类 并且指定了类的T的类型是string，则其方法的传参和返回都是string类型
        let minClass2 = new MinClass<string>();
        minClass2.add("23");
        minClass2.add("5");
        minClass2.add("2");
        console.log(minClass2.min());

    ```
* 接口的泛型
  ```js
    // 第一种写法
    interface ConfigFn {
    //规范参数类型,返回值类型
        <T>(value: T): T;
    }

    let getData: ConfigFn = function <T>(value: T): T {
        return value;
    };

    console.log(getData<string>("z11"));

    interface ConfigFn<T> {
        //参数类型 ，返回值类型
        (value: T): T;
    }
    // 第二种写法
    //接口方法
    function getData<T>(value: T): T {
        return value;
    }
    //使用接口
    let myGetDate: ConfigFn<string> = getData;
    console.log(myGetDate("3"));


    //用户类--和数据库表字段进行映射
    class User {
        username: string | undefined;
        password: string | undefined;
        //构造函数-初始化参数
        constructor(param: {
            username: string | undefined;
            password?: string | undefined;
        }) {
            this.username = param.username;
            this.password = param.password;
        }
    }


    // 数据库类
    class Db<T> {
        add(user: T): boolean {
            console.log(user);
            return true;
        }
        updated(user: T, id: number): boolean {
            console.log(user, id);
            return true;
        }
    }

    let u = new User({
        username: "张三",
    });

    //u.username = "李四";
    u.password = "111111";
    let db = new Db<User>();
    db.add(u);
    db.updated(u, 1);
  ```
## 装饰器
* 确保在 tsconfig.json 中设置了 experimentalDecorators 与 emitDecoratorMetadata 为true。
* TS中的装饰器实现本质是一个语法糖，它的本质是一个函数
* 示例
  ```ts
    // 类装饰器
    const doc: ClassDecorator = (target:any) => {
        // target 就是 demo 的 constructor
        console.log(target)
        target.prototype.name='test'
    };
    @doc
    class Demo{
        constructor(){
        }
    }
    const demo=new Demo()
    // demo.name 等于 test

    // 属性装饰器
    const doc: PropertyDecorator = (target:any,key:string|symbol) => {
        // target 就是 demo 的 constructor
        console.log(target)
        target.prototype.name='test'
    };
    class Demo{
        @doc
        public name:string
        constructor(){
            this.name='test'
        }
    }

    // 方法装饰器
    const doc: MethodDecorator = (target:any,key:string|symbol,descriptor:any) => {
        // target 就是 demo 的 constructor
        console.log(target)
        target.prototype.name='test'
    };
    class Demo{
        constructor(){
            this.name='test'
        }
        @doc
        getName(){

        }
    }
    // 参数装饰器
    const doc: ParameterDecorator = (target:any,key:string|symbol,index:any) => {
        // target 就是 demo 的 constructor
        console.log(target)
        target.prototype.name='test'
    };
    class Demo{
        constructor(){
            this.name='test'
        }
        getName(name:string,@doc age:number){

        }
    }

  ```
## 类型声明的三种来源
> tsc 在编译的时候，会分别加载 lib 的，@types 下的，还有 include 和 files 的文件，进行类型检查
* lib: ts 内置的类型 JS 引擎那些 api，还有浏览器提供的 api
    - TypeScript 包下有个 lib 目录，里面有一堆 lib.xx.d.ts 的类型声明文件
    - 这些只是声明类型，没有具体的 JS 实现，TS 就给单独设计了一种文件类型，也就是 d.ts， d 是 declare 的意思
    - tsconfig.json文件下 配置一下就可以使用compilerOptions中lib:["dom","es5","es2019.array"]
* @types:其他环境配置类型
    - ts 内置的声明是标准的，不常变的，所以可以配置类型，其余的环境的 api 可能没有标准，经常变，那自然就没法内置了，比如 node
    - 通过 @types/xxx 的包,ts 先加载内置的 lib 的类型声明，再去查找 @types 包下的类型声明（默认是放在 node_modules/@types）
    - @types/xxx 包是在 DefinitelyTyped 这个项目下统一管理的
    - 扩展的这些 @types/xxx 的包也可以配置 compilerOptions中 types:["node"]、 typeRoots:["其他目录"]

    - 如果代码本身是用 ts 写的，那编译的时候就可以开启 compilerOptions.declaration，来生成 d.ts 文件
    - 在 package.json 里配置 types 来指定 dts 的位置 如：types:"dist/vue.d.ts",这样就不需要单独的 @types 包了。

    - 如果代码本身不是用 ts 写的，就需要单独写一个 @types/xxx 的包来声明 ts 类型，在 tsconfig.json 里配置下，加载进来。
* include|files: 自己写的ts
  - files单独包含的
  - include 包含的
  - exclude 去掉的
  ```json
    "files":[
        "./golbal.d.ts"
    ],
    "include":[
        "./types/**/*",
        "./src/**/*"
    ],
    "exclude":[
        "./src/xxx.ts"
    ]

  ```
## 全局类型声明 vs 模块类型声明
> 我们写的 JS 代码就是有的 api 是全局的，有的 api 是模块内的，所以 TS 需要支持这个
> dts 的类型声明默认是全局的，除非有 es module 的 import、export 的声明，这时候就要手动 declare global 了。为了避免这种情况，可以用 reference 的编译器指令
* 全局
    ```js
    // 方式一
    declare function globalLib(options:globalLib.Options):void;
    declare namespace globalLib{
            const version:string
            function doSomething():vold
            interface Options{
                [key:string]:any
            }
        }
    // 方式二
    declare global{
        const version:string
        function doSomething():vold
        interface Options{
            [key:string]:any
        }
    }
    // 方式三
    import type {xxx} from 'yyy';
    ```
* 模块
    ```js
    declare function moduleLib(options):void

    interface Options{
        [key:string]:any
    }

    declare namespace moduleLib{
        const version:string
        function doSomething():vold
    }
    export = moduleLib
    ```
* reference:需要引入模块，但是也需要全局声明类型
  ```ts
    /// <reference types="node"> 
    declare const func:(a:number):number
  ```