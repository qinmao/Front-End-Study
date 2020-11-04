# Vue 面试题
* 如何理解mvvm
  - mvvm 是mode-view-viewModel 的缩写
  - mode 代表数据模型，在这里定义数据的修改和操作的业务逻辑
  - view 代表ui 组件，负责把数据模型转换成ui展示出来
  - viewModel 监听数据模型的变化，控制ui 显示，起到连接mode view
  > viewModel 通过双向数据绑定把mode 和view 连接起来，mode view 之间的数据同步是自动的，所有我们不需要操作dom ,只要关注数据的业务逻辑处理

* 数据响应式原理 
 
* 为什么组件中data是函数

* Vue 父子组件生命周期钩子函数执行顺序
 - 加载渲染：父beforeCreate ->父created->父beforeMount->子beforeCreate ->子created->子beforeMount->子mounted->父mounted

* Vue 计算属性和 watch 在什么场景下使用

* v-for key值的作用（key要唯一标识的值来处理）
 - 使用 v-for更新已渲染的元素列表时,默认用就地复用策略。列表数据修改的时候,他会根据key值去判断某个值是否修改：如果修改,则重新渲染这一项;否则复用之前的dom，仅修改value值。

* nextTick 原理

* Object.defineProperty 和 proxy 的区别
  - Proxy可以直接监听对象而非属性
  - Proxy可以直接监听数组的变化

* vue 异步更新dom 是包装成 宏任务macro task还是 微任务micro task(为什么)？
  + 分析如下：
    - setTimeout 是一个宏任务，所以推入了宏任务队列
    - 由于script 也是一个宏任务，也会被放入队列，由于该队列是一个一个执行的，所以本次循环，setTimeout 中不会被渲染，下次循环执行
    - 如果异步更新包装在micro task 中，队列中先执行script ，微任务是一对对执行的，所以Promise在本次循环被执行了，也就是渲染了

* vuex

* 如何抽取组件，封装组件要考虑哪些问题、抽取哪些组件？

* 使用前端框架（angular/vue/react）带来哪些好处，相对于使用jQuery
  - 数据驱动，避免操作dom,操作不当可能导致内存泄漏
  - 性能好：体现在（vdom 技术的使用，vue 依赖追踪，diff算法最小化的改变dom）