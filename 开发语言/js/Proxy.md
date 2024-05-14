# Proxy 专题
* 这个词的原意是代理，表示由它来“代理”某些操作，可以译为“代理器”
* 在目标对象之前架设一层“拦截”，外界对该对象的访问，可以对外界的访问进行过滤和改写

## 语法：
  ```js
    // Proxy 是一个构造函数，用来生成 Proxy 实例
    // target 表示所要拦截的目标对象
    // handler是一个对象，用来定制拦截行为。
    let p = new Proxy(target, handler);

    // 拦截target的属性的访问请求，访问任何属性都得到35
    const proxy = new Proxy({}, {
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
* 常用的实例方法
  + get(target, propKey, receiver) 拦截对象属性的读取
    ```js
        // receiver 可选参数 proxy 实例本身 
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
    ```js
        // 数据验证的例子
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
  + deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值
## defineProperty
* 语法
  ```js
    defineProperty(target, propKey, propDesc)

  ```
## proxy 比 defineProperty 好在哪？
* defineProperty的缺陷
  - 深度遍历对象的每一个属性，进行监听，效率损失
  - 在vue中 create 钩子函数里，实例已经创建，对象属性的监听无法检测

* proxy
  - 创建一个代理对象，监听整个对象，对象属性的新增就可以检测到
