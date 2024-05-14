# vue study
## Vue2 中的常用 api，有用的属性
* extend
  - 基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象
  ```js
    // 创建构造器
    const Profile = Vue.extend({
      template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
      data: function () {
        return {
          firstName: 'Walter',
          lastName: 'White',
          alias: 'Heisenberg'
        }
      }
    })
    // 创建 Profile 实例，并挂载到一个元素上。
    new Profile().$mount('#app')

  ```

* nextTick
  + 使用场景:
    - 由于vue 是异步队列更新修改 dom,所以当数据修改完之后，发现dom 还没生成，这时候想获取数据更新后的dom。
    - 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM 
  ```js
    // 修改数据
    vm.msg = 'Hello'
    // DOM 还没有更新
    Vue.nextTick(function () {
      // DOM 更新了
    })

    // 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
    Vue.nextTick()
      .then(function () {
        // DOM 更新了
      })
  ```

* set
  + 使用场景: 由于vue 不能检测对象和数据属性的删除和添加，所以直接修改属性导致数据不是响应式的
   - 对象的修改
      ```js 
       // 修改单个属性
       Vue.set(vm.someObject, 'b', 2)
       // 修改多个属性
       this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
      ```
   - 数组的修改
      vue 提供了数组的变异的方法 push() pop() shift() unshift() splice() sort() reverse()
       ```js 
       // 当你利用索引直接设置一个数组项时
        Vue.set(vm.items, indexOfItem, newValue)
        // Array.prototype.splice
        vm.items.splice(indexOfItem, 1, newValue)
        // 例子
        this.$set(this.items,index,newItem)
      
      ```

* component
  ```js
    // 注册组件，传入一个扩展过的构造器
    Vue.component('my-component', Vue.extend({ /* ... */ }))

    // 注册组件，传入一个选项对象 (自动调用 Vue.extend)
    Vue.component('my-component', { /* ... */ })

    // 获取注册的组件 (始终返回构造器)
    var MyComponent = Vue.component('my-component')
  ```

* use
  - 参数 {Object | Function} 
  - 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入

* mixin 分发 Vue 组件中的可复用功能
  - 相同的选项会合并，数据对象有冲突时以组件优先
  - 值为对象的选项，例如 methods、components 和 directives，以组件优先
  - 同名钩子函数将合并为一个数组，钩子函数有冲突先执行混入，后执行组件

* version
  - 通过版本号兼容插件
  ```js
    var version = Number(Vue.version.split('.')[0])
    if (version === 2) {
      // Vue v2.x.x
    } else if (version === 1) {
      // Vue v1.x.x
    } 
  ```

* watch

* render

* on/emit/off/once
  ```js
    // 实现事件的发布订阅系统
    //同一个对象的on对应emit
    function Person() {
      this.task = {}; //保存所有的事件及回调
    }
    Person.prototype.on = function(event, callback) {
      this.task[event] = callback;
    }
    Person.prototype.emit = function(event, data) {
        this.task[event](data); 
        //调用之前传递的函数
        // this.task[event] = null;
        // once发射以后。给null
    }
    var p1 = new Person();

    p1.on('ak47', function(num) {
        alert('ak47射出了' + num + '发子弹！砰砰砰');
    });
    p1.emit('ak47', 1223);

  ```

* 暴露的有用的属性
  - vm.$data === data // => true
  - vm.$el === document.getElementById('example') // => true
  - vm.$watch('a', function (newValue, oldValue) {
      这个回调将在 `vm.a` 改变后调用
    })

* 钩子函数
  ```js
    this.$on('hook:destroyed', () => {
        console.log('销毁注册的事件')
    })
  ```
## vuex
* 核心概念：
  - State 状态(数据)
  - Getters (获取)
  - Mutations (发生改变，实际数据的操作)
  - Actions (行为)
  - Modules (模块)

* vuex 优雅的提交改变
  - mutations中如果出现同名的mutation就会后面的覆盖前面的
  - mutation必须在同步中，参数是state
  - 我们通过调用$store.commit(mutation的名字);就能触发数据的改变

* 优雅的获取数据 getters
  - 默认我们可以通过this.$store.state.属性名获取数据的，也能修改数据
  - 但是，这样不好，修改数据建议要使用 mutations 的方式修改
  - 获取数据建议使用 getters.函数名的方式获取
  + getters其实就相当于computed，内部涉及到的数据，如果没有发生改变
    - 该函数不会反复触发，而是从缓存中获取原值
    - getters通常在开发中结合 computed 使用

* vuex异步提交变更
  - 声明一个actions中的一个属性 属性名就是action的名称，参数是 context 拥有store 实例的相同的方法和属性
  - 接受{commit} ，并且调用 commit(改变的名称(mutation)); 触发该Mutation的执行
  - this.$store.dispatch('action的名称');
## vue-loader
- 是一个 webpack 的 loader，通过解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 CommonJS 模块，module.exports 出一个 Vue.js 组件对象。
* 兼容原生 html 的写法
  ```html
    <template src="../html/demo.html">  
    </template>
    <script src="../html/demo.js">
    </script>
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style src="../html/demo.css" scoped>
    </style>
  ```
* 深度作用选择器
  ```css
    <style scoped>
    .a >>> .b { /* ... */ }
    </style>
    /* 编译后结果 */
    .a[data-v-f3f3eg9] .b { /* ... */ }
    /* SASS 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 操作符取而代之——这是一个 >>> 的别名，同样可以正常工作。
    在 dart-sass 处理中 ::v-deep
    */
    /* 通过 v-html 创建的 DOM 内容不受作用域内的样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式。 */
  ```
## 新增的特性
* .sync 修饰符（2.3.0+）
 >在子组件与父组件通讯时，想在子组件中改变父组件传下的prop的值。
  ```js
    // 在子组件触发父组件的监听的方法
    this.$emit('update:title', newTitle)

    // 父组件监听update 方法，$event 就是newTitle传过来的值
    <text-document
      :title="doc.title"
      v-on:update:title="doc.title = $event"
    ></text-document>

    // 该方式写法略繁琐，为了方便起见，vue提供一个缩写，即 .sync 修饰符：免掉 v-on 监听的过程
    <text-document v-bind:title.sync="doc.title"></text-document>
  ```

* 具名插槽（2.6.0）
  ```html
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
    <!-- v-slot -->
    <base-layout>
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>

      <p>A paragraph for the main content.</p>
      <p>And another one.</p>

      <template v-slot:footer>
        <p>Here's some contact info</p>
      </template>
    </base-layout>
    <!-- v-slot 只能添加在一个 <template> 上 -->
  ```