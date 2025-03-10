# Module 模块
ES6 之前，js 没有 module，不利于大程序的开发，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于node，后者用于浏览器。

## 有哪些模块化的方案
* 沙箱模式(实质是匿名的立即执行函数)
  - 在早期，使用立即执行函数实现模块化是常见的手段，通过函数作用域解决了命名冲突、污染全局作用域的问题
  - 例如jq插件开发
* AMD 和 CMD
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
* CommonJS
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
* es module
  - export/import
  - 语法:
    ```js
        import { stat, exists, readFile } from 'fs';
        // ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，再通过 import 命令输入。
        // 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。
        // 这种加载称为“编译时加载”或者静态加载，效率要比 CommonJS 模块的加载方式高。
        // 当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
    ```
  - ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";

## ES6 模块的语法:
> 模块功能主要由两个命令构成：export 和 import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
* es6 模块写法:
  ```js
      // 1. profile.js
      const firstName = 'Michael';
      const lastName = 'Jackson';
      const year = 1958;
      export {firstName, lastName, year};

      // 2. export命令除了输出变量，还可以输出函数或类（class）。
      function v1() { ... }
      export {
          v1 as streamV1,
      };
      // as关键字可重命名

        // 模块的整体加载
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
* import 注意事项
  - 需要特别注意的是，export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
  - import 命令具有提升效果，会提升到整个模块的头部，首先执行。
     ```js
        foo();
        import { foo } from 'my_module';
        // 上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前
    ```
  - singleton 模式
      ```js
        import { foo } from 'my_module';
        import { bar } from 'my_module';
        // 等同于
        import { foo, bar } from 'my_module';
        // 虽然 foo 和 bar 在两个语句中加载，但是它们对应的是同一个my_module实例。也就是说，import语句是 Singleton 模式。
      ```
  - import、export 必须处于模块顶层
  - 默认导出方式：给用户提供方便,不需要知道所要加载的变量名或函数名
    ```js
        export default xxx; 
        import xxx from './xxx.js';// xxx 可以任意名称
    ```

## 模块加载：defer、async
* 默认情况下，浏览器是同步加载js脚本,为了解决脚本过大导致卡死的问题，所以脚本引入了异步加载
  ```html
        <script src="path/to/myModule.js" defer></script>
        <script src="path/to/myModule.js" async></script>
  ```
* defer 与 async 的区别是：一句话，defer 是“渲染完再执行”，async 是“下载完就执行”

* es6 module 的加载规则：浏览器对于带有type="module"的<script>，都是异步加载，等同于defer
  ```html
    <script type="module" src="./foo.js"></script>
  ```
* ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
  ```html
    <script type="module">
        import utils from "./utils.js";
        // other code
    </script>
  ```
     
## ES6 模块与 CommonJS 模块的差异
1. es module 在编译时输出值的引用，CommonJS 在运行时输出一个值的拷贝
2. CommonJS 是同步导入，es 是异步的
