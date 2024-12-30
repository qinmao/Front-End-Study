# vue 相关问题

## 框架原理
* 如何理解 mvvm
  - mvvm 是 mode-view-viewModel 的缩写
  - mode 代表数据模型，在这里定义数据的修改和操作的业务逻辑
  - view 代表ui 组件，负责把数据模型转换成ui展示出来
  - viewModel 监听数据模型的变化，控制 ui 显示，起到连接mode view
  > viewModel 通过双向数据绑定把 mode 和 view 连接起来，mode view 之间的数据同步是自动的，所有我们不需要操作 dom ,只要关注数据的业务逻辑处理

* vue里面的虚拟dom是怎么回事？
  - 用对象来描述dom的层级关系
  - 跨平台、性能优化(diff算法)

* vue 双向绑定原理？
  > 主要通过 数据劫持（Data Hijacking）和 发布-订阅模式（Publish-Subscribe Pattern）来实现。具体来说，它结合了 Object.defineProperty 和 Observer-Dep-Watcher 模式来实现数据变化的响应式和视图的更新
    + 数据劫持（Data Hijacking）：
      - 通过 Object.defineProperty 对数据对象进行递归的劫持，将这些数据变成 getter 和 setter 方法。当访问某个属性时，getter 会被触发。Vue 会记录哪些组件或视图需要依赖这个属性。当数据发生变化时，setter 会被触发，通知所有依赖这个属性的视图或计算属性进行更新。
    + 发布-订阅模式（Publish-Subscribe Pattern）：实现数据变化与视图更新之间的解耦。
      - Dep（依赖收集）：每个被 Vue 劫持的数据都有一个 Dep 对象，Dep 负责收集哪些视图或计算属性依赖于这个数据。每当数据被访问时，它会将对应的 Watcher（观察者）添加到 Dep 中。
      - Watcher（观察者）：每个视图或计算属性都是一个 Watcher，它会订阅一个或多个 Dep，一旦数据变化，Watcher 会收到通知并重新渲染视图。

* vue2|vue3 响应式原理(Object.defineProperty、proxy)
  - Proxy 可以直接监听对象而非属性
  - Proxy 可以直接监听数组的变化
  - defineProperty 监听对象属性的变化，属性的增减无法监听

* vue 异步更新 dom 是包装成宏任务还是微任务为什么？
  + 分析如下：
    - setTimeout 是一个宏任务，所以推入了宏任务队列
    - 由于 script 也是一个宏任务，也会被放入队列，由于该队列是一个一个执行的，所以本次循环，setTimeout 中不会被渲染，下次循环执行
    - 如果异步更新包装在 micro task 中，队列中先执行 script ，微任务是一对对执行的，所以 Promise 在本次循环被执行了，也就是渲染了

* Vue 父子组件生命周期钩子函数执行顺序
  - 父beforeCreate ->父created ->父beforeMount ->子beforeCreate ->子created ->子beforeMount ->子mounted ->父mounted

* 组件间的通信方式
  - prop
  - emit/on 事件触发
  - provide、inject（vue3）
  - vuex

* Vue computed 和 watch 在什么场景下使用
  - computed 依赖其他属性计算值，并且 computed 的值有缓存，只有当计算值变化才会返回内容。
  - 基于当前自己值得变化来做业务处理（高耗时操作）

* v-for key 值的作用（key要唯一标识的值来处理）
  - 使用 v-for 更新已渲染的元素列表时,默认用就地复用策略。列表数据修改的时候,他会根据key值去判断某个值是否修改：如果修改,则重新渲染这一项;否则复用之前的dom，仅修改value值。

## vue-router 
* vue-router的原理
  - 哈希模式：利用了 window 可以监听 hashchange 事件，url 中的哈希值（#后面的值）如果有变化，前端可以做到监听
  - history： 模式 监听 popstate 事件 历史栈信息变化,变化时重新渲染  pushState 与 replaceState,作用就是可以将url替换并且不刷新页面

* 导航守卫

## vuex

## 组件封装
* 如何抽取组件，封装组件要考虑哪些问题？
  - props 属性中添加验证规则：
  - 不要依赖 vuex 传参
  - 预留一些 slot
  - 样式值通过变量来设置

