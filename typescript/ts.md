# TS
## 基本数据类型
* 数字|字符串|布尔|对象
```js
    const a: number = 3;
    const b: string = 3;
    const g: boolean = true;
    const i: object = {};
```
* 数组
```js
    const c: number[] = [1, 2, 3];
    const d: Array<number> = [1, 3];
    const arr: any[] = [1, "33", true];
```
* 元组
```js
    // 可以为数组中的每个参数定义相对应的类型
    const e: [number, string] = [1, "ww"];
```
* 枚举
```js
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
```
* undefined|null
``` js
    // undefined 常用于组合类型
    let j: number | undefined;
    let k: null;
```
* void 
```js
    // 指定方法类型，表示没有返回值,方法体中不能return
    function aa(): void {
        console.log(1);
    }

    //如果方法有返回值，可以加上返回值的类型
    function bb(): number {
        return 1;
    }
```
* 任意类型
```js
    let h: any = 1;
    h = true;
    h = "st";
```
## 函数
>tips: ?代表这个参数可传可不传,不传就是undefined,也可定义个默认的值
```js
    function getUserInfo(name: string, age?: number, school: string = "清华大学") {
        return `name:${name}--age:${age}--school:${school}`;
    }
    function reload(name: string): string;
    function reload(age: number): string;
    function reload(param: any): any {
        return typeof param === "string" ? `我是:${param}` : `我的年龄:${param}`;
    }
    console.log(reload(18)); //年龄
    
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
```
## 继承
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
## 多态
```js
// 抽象父类
abstract class Animal {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    //抽象成员--方法
    abstract eat(): any;
    //抽象成员--属性
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

    //多态
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
## 接口
* 在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，
* 在程序设计里面，接口起到一种限制和规范的作用。

* 属性接口
```js
    // 建议接口定义了哪些值就传哪些值,多传少传会报错
    interface InterfaceName {
        first: string;
        second?: string; //加个问号，接口属性就可以变成可传可不传了，不传默认是undefined。
    }
    //打印变量
    function logParam(name: InterfaceName): void {
        console.log(name.first, name.second, 11);
    }
    //定义参数
    const obj = { first: "1", second: "fff", three: 1 };
    //logParam({ first: "1", second: "1", three: 1 }); //报错,只能传接口定义的值
    logParam(obj);

```
* 函数类型接口
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

    //可继承类后再实现接口
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
## 泛型
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
## 模块

## 命名空间

## 装饰器