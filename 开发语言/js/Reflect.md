# Reflect（反射）
Reflect 是 ES6 引入的一个内置对象，提供了一些与对象操作相关的静态方法。
这些方法与 Object 上的方法类似，但有一些关键的区别。
Reflect 的方法与对象的内部方法一一对应，提供了一种更为一致和函数化的方式来操作对象。

## Reflect 的常用方法
* get|set
  - Reflect.get(target, propertyKey, receiver)
  - Reflect.set(target, propertyKey, value, receiver)
  ```js
   const obj={}
   //   obj.a=1  // 内部调用的是 【SET】
   Reflect.set(obj,'a',2)
   //   obj.a    // 内部调用的是 【GET】
   Reflect.get(obj,'a')
  ```
* has|delete
  - Reflect.has(target, propertyKey)
  - Reflect.deleteProperty(target, propertyKey)
  ```js
    const obj = { a: 1 };
    console.log(Reflect.has(obj, 'a')); // 输出: true
    console.log(Reflect.has(obj, 'b')); // 输出: false

    Reflect.deleteProperty(obj, 'a');
    console.log(obj.a); // 输出: undefined

  ```
* Reflect.ownKeys(target)
  - 返回对象的所有属性键，包括不可枚举属性和符号属性。
  ```js
    const obj = { a: 1, [Symbol('b')]: 2 };
    console.log(Reflect.ownKeys(obj)); // 输出: ['a', Symbol(b)]
  ```
* Reflect.defineProperty(target, propertyKey, attributes)
  - 类似于 Object.defineProperty
  ```js
    const obj = {};
    Reflect.defineProperty(obj, 'a', {
        value: 1,
        writable: true,
        enumerable: true,
        configurable: true
    });
    console.log(obj.a); // 输出: 1
  ```
* Reflect.getOwnPropertyDescriptor(target, propertyKey)
  - 获取对象属性的描述符（类似于 Object.getOwnPropertyDescriptor）。
  ```js
    const obj = { a: 1 };
    const descriptor = Reflect.getOwnPropertyDescriptor(obj, 'a');
    console.log(descriptor); // 输出: { value: 1, writable: true, enumerable: true, configurable: true }
  ```
  
## 应用场景
* 主要是配合 proxy 用的。在 proxy 直接调用对象本身会死循环 proxy。
  ```js
    const handler = {
        get(target, property, receiver) {
            console.log(`Getting ${property}`);
            return Reflect.get(target, property, receiver);
        },
        set(target, property, value, receiver) {
            console.log(`Setting ${property} to ${value}`);
            return Reflect.set(target, property, value, receiver);
        }
    };

    const obj = { a: 1 };
    const proxy = new Proxy(obj, handler);

    proxy.a; // 输出: Getting a
    proxy.a = 2; // 输出: Setting a to 2
  ```
