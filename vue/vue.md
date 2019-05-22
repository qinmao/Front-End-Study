# vue study

## 生命周期和钩子函数
* 实例开始初始化，初始化事件，并注册生命周期钩子函数
* 实例初始化之后执行:beforeCreate
* 数据观测 (data observer)，属性和方法的运算，watch/event 事件回调
* 整个实例创建完成之后执行: created
* 接下来将template 编译成render 渲染函数
* 组件挂载之前：执行beforeMount
* 执行 mounted 钩子，并将 VDOM 渲染为真实 DOM 并且渲染数据,挂载到节点上
* 数据更新时会调用： beforeUpdate 和 updated，分别在数据更新前和更新后会调用。
* keep-alive 包裹的组件激活时调用：activated， 组件停用时调用：deactivated
* 销毁实例：之前调用beforeDestroy 销毁后调用：destroyed


## 组件通讯
 * 父子组件通信
    - 父向子组件：prop
    - 子向父组件:触发父层定义的事件 $on / $emit
    - $on $emit 实现原理
        ```js
              //同一个对象的on对应emit
             function Person() {
                 this.task = {}; //保存所有的事件及回调
             }
             Person.prototype.on = function(event, callback) {
                 //保存起来
                 this.task[event] = callback;
                 /*
                     function(num) {
                         alert('ak47射出了',num,'发子弹！砰砰砰');
                     }
                 */
             }
             Person.prototype.emit = function(event, data) {
                 this.task[event](data); //调用之前传递的函数
                 // this.task[event] = null;//once发射以后。给null
                 /*
                     function(num) {
                         alert('ak47射出了',num,'发子弹！砰砰砰');
                     }
                 */
             }
             var p1 = new Person();
             p1.on('ak47', function(num) {
                 alert('ak47射出了' + num + '发子弹！砰砰砰');
             });
             p1.emit('ak47', 1223);
        ```

 * 非父子组件通讯
    - 使用空的 Vue 实例作为中央事件总线
    - vuex

## vuex
 1. install&useage
     npm install vuex --save
     import Vuex from 'vuex'
     Vue.use(Vuex)
 2. what？
    Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
    问题：传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力引出vuex
 3. 应用场景：
  - vuex适合更为大型，数据操作频繁，业务复杂的程序
  * vuex是帮助我们把数据保存在全局的内存中，绝对不是数据的序列化、持久化
    State 状态(数据)
    Getters (获取)
    Mutations (发生改变，实际数据的操作)
    Actions (行为)
    Modules (模块)
 4. vuex优雅的提交改变
  * mutatiions中如果出现同名的mutation就会后面的覆盖前面的
  * mutation必须在同步中
  * 我们通过调用$store.commit(mutation的名字);就能触发数据的改变
 5. 优雅的获取数据getters
    * 默认我们可以通过this.$store.state.属性名获取数据的，也能修改数据
        - 但是，这样不好，修改数据建议要使用mutations的方式修改
        - 获取数据建议使用getters.函数名的方式获取
            + getters其实就相当于computed，内部涉及到的数据，如果没有发生改变
                * 该函数不会反复触发，而是从缓存中获取原值
                * getters通常在开发中结合computed使用
 6. vuex异步提交变更
    * 1:声明一个actions中的一个属性 属性名就是action的名称
    * 2:接受{commit} ，并且调用commit(改变的名称(mutation));触发该Mutation的执行
    * 3:this.$store.dispatch('action的名称');

## vue-loader
- 是一个 webpack 的 loader，通过解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 CommonJS 模块，module.exports 出一个 Vue.js 组件对象。

* 兼容原生html 的写法
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
>scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符：
  ```css
      <style scoped>
      .a >>> .b { /* ... */ }
      </style>
      // 编译后结果
      .a[data-v-f3f3eg9] .b { /* ... */ }

      /* SASS 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 操作符取而代之——这是一个 >>> 的别名，同样可以正常工作。 */

      /* 通过 v-html 创建的 DOM 内容不受作用域内的样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式。 */
  ```


## 暴露的有用的属性
 * vm.$data === data // => true
 * vm.$el === document.getElementById('example') // => true
 * vm.$watch('a', function (newValue, oldValue) {
      这个回调将在 `vm.a` 改变后调用
    })

## 一些疑问、和解答:
 * 为什么组件中data是函数？
  每个组件的实例却引用了同一个 data，通过为每个组件返回全新的 data 对象来解决这个问题
  都有它自己内部的状态了

 * 异步文件上传
    - axios multipart 添加之后选择多图
    ```html
      <input type="file" name="file"  @change="upload($event)"   accept="image/png, image/jpeg, image/jpg">
    ```
    ```javascript
      async upload(e) {
          let files = e.target.files;
          if (files[0].size / 1024 / 1024 > 2) {
          // 大小限制
          }
          if (!files.length) return;
            //  模拟表单提交
          let formData = new FormData();
          formData.append("file", files[0]);
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          let fetch = this.$fecth.create();
          fetch.interceptors.request.use(config => {
            return config;
          });
          let res = await fetch.post("url", formData, config);
          res = res.data;
          if (res.code == 0) {
            this.loadImage(files[0]);
          } else {
          }
        },
        // 预览本地上传的图片
        loadImage(file) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = e => { 
            // e.target.result 图片的地址
          };
        },
    ```

 * 路由跳转时，记录跳转前的位置
    > 思路把位置记录在当前路由的元信息上
    - 整个页面的滚动位置
    - 页面局部元素的滚动位置

 * 返回确认弹窗
    > 思路：设置是否允许字段记录在当前路由的元信息上
    - 手动返回，弹窗拦截
    - 正常业务成功返回，不拦截

## 新增的特性
* 一个对象的所有属性都作为 prop 传入,使用不带参数的 v-bind (取代 v-bind:prop-name)
  ```javascript
    post: {
      id: 1,
      title: 'My Journey with Vue'
    }
    <blog-post v-bind="post"></blog-post>
    等价于
    <blog-post
      v-bind:id="post.id"
      v-bind:title="post.title"
    ></blog-post>
  ```

* .sync 修饰符（2.3.0+）
 >在子组件与父组件通讯时，想在子组件中改变父组件传下的prop的值。
  ```javascript
    // 在子组件触发父组件的监听的方法
    this.$emit('update:title', newTitle)
    // 父组件监听update 方法，$event 就是newTitle传过来的值
    <text-document
      v-bind:title="doc.title"
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

## 服务器端渲染(SSR)优点
 * 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
 * 更快的内容到达时间(time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备
