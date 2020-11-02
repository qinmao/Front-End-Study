# Vue 面试题
* 如何理解mvvm

* 数据响应式原理 
 

* Object.defineProperty 和 proxy 的区别
  - Proxy可以直接监听对象而非属性
  - Proxy可以直接监听数组的变化

* vue 异步更新dom 是包装成 宏任务macro task还是 微任务micro task(为什么)？
  + 分析如下：
    - setTimeout 是一个宏任务，所以推入了宏任务队列
    - 由于script 也是一个宏任务，也会被放入队列，由于该队列是一个一个执行的，所以本次循环，setTimeout 中不会被渲染，下次循环执行
    - 如果异步更新包装在micro task 中，队列中先执行script ，微任务是一对对执行的，所以Promise在本次循环被执行了，也就是渲染了

* emit/on/off/once (原理)实现一个发布订阅系统

* vuex

* 如何抽取组件，封装组件要考虑哪些问题、抽取哪些组件？

* （对比其他框架） 使用前端框架（angular/vue/react）带来哪些好处，相对于使用jQuery
  - 数据驱动，避免操作dom,操作不当可能导致内存泄漏
  - 性能好：体现在（vdom 技术的使用，vue 依赖追踪，diff算法最小化的改变dom）