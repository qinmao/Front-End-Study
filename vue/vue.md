# vue study
## 前置知识
  由于vue2 使用大量的es6语法;常见的如下
  * import 注意事项
    - 不能放在函数内部
    - 默认导出方式：
        + export default xxx;
            * import xxxx from './xxx.js';// 默认导出和导入名称可以不一样
    - 按需加载
        + export const fn = fn(){};  var xxx= 1;  export { xxx}
        + import {fn,xxx} from './xxx.js';
            * 接下来就可以直接使用fn 和xxx
            * 以上方式注意，名称和写法{}一定要对应
  * 函数简写
      - var obj = { add:function(){ }  }
      - var obj = { add(){}            }
  * 对象属性的简写

  ```javascript
  var name = 'abc';

  var person = {
      name    //代表着person.name = 'abc'
  }
  ```
## 解决闪烁问题
 * v-text 将属性值赋给元素的innerText
 * v-cloak 显示前移除该元素的隐藏样式
 * 单文件方式中，不存在闪烁问题，在作为库使用(引包)存在闪烁问题
     - 1:不给插值表达式{{}}，以属性的方式通知元素渲染
         + `v-text="表达式或者是data中的对象" `
    - 2:先隐藏该元素，再移除该元素样式
        + 在元素上声明 v-cloak指令
        + 同时style [v-cloak] { display:none;}
## class结合v-bind使用
 * 1：绑定单个class v-bind:class="三元表达式" `:class="isShow?'red':'green'"`
 * 2：绑定多个class v-bind:class="对象"
     - `:class="{'red':true,'big':true}"`
 * 3:简写形式 是v-bind:class  等同于:class
     - 不仅仅是class可以这样写，其他的任意属性都可以使用bind的方式获取内存中的对象，或者书写表 达式
## v-for的使用
 * 1:可以操作数组，能获取到的属性有value和index
     - `v-for="(item,index) in heros"`
 * 2:可以是一个对象，能获取到的属性有value,key,index
     - `v-for="(item,key,index) in person "`
 * 在使用的时候最好绑定一个:key="index" 等同于 v-bind:key="index"
     - 给定一个唯一标示，为的是提高性能
## 子组件使用
 * 一个组件在使用子组件之前，需要声明
     - components:{} 是一个对象，内部属性都是子组件
 * 引入子组件:
     - import xxxx from './xxx.vue';
 * 使用该组件
     - 组件名大写的，可以在template中转换成-小写
 * 子组件也是组件，写法和其他组件一样的结构
## 组件通讯
   1. 父向子组件传值
       * 原理，就是通过属性来传递参数
       * 常量、变量
       * 常量：
           - 直接通过属性传递 `msg="xxx"`
           - 在子组件中声明,`props:['msg']`   {{msg}}来显示
           - 在js逻辑代码中获取到该属性，通过当前VueComponent对象的实例属性$props.msg获取
       * 变量
           - 必须结合v-bind来使用，简写形式是`:msg="xxx(data中的属性|表达式)"`

   2. 子向父组件传值（获取组件对象）(扩展)
        * 使用方式和之前的一样，通过VueComponent实例对象的属性来完成
            - $on /$ emit
        * 在vue中 VueComponent实例对象可以自己先on,自己emit，来触发on
            - 一定是同一个对象的on和emit是一对
        * 关于 VueComponent实例对象属性:
            - 发射`$emit('eventName',data);`
            - 接受`$on('eventName',callback(data));`
            - 只接受一次 `$once('eventName',callback(data));`
            - 获取父组件`this.$parent`
            - 获取子组件数组 `this.$children` 

        * $on $emit 实现原理
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
   3. 非父子组件通讯
        使用空的 Vue 实例作为中央事件总线
   4. vuex
## 过滤器
 * 局部和全局过滤器
 * vue2.0中没有默认提供过滤器
 * 属性 `filters:{  key(过滤器名称):function(data){ return xxx;} }` 
     - filters是固定的属性名
         + key是我们自定义的过滤器名称
         + data就是 {{text|过滤器}} 中的text
         + return xxx; 是显示的样子
 * 全局的声明方式
     - `Vue.filter(过滤器名称字符串,function(data){   return xxxx;});`
 * 注意实现: 如果存在全局和局部同名的过滤器时，优先以局部为准
## vue-router
 * 概念
    - 路由:前端路由、后端路由（url+请求方式的判断和分发)
        + 前端路由:锚点值，根据锚点值来做不同处理的分发，页面的显示
    use    
    - 1：下载、
    - 2:安装插件、
        + `Vue.use(VueRouter);`
    - 3:构建路由对象
        + `let router = new VueRouter();`
    - 4、配置路由规则
        + `router.addRouters([{name:'',path:'/',component:组件对象},{}])`
            * name不是必须的，path是必须的。严格匹配路径
            * __在router-view中，匹配上就显示对应的组件__
    - 5:传递options对象new Vue的时候
        + new Vue({ router:router});
    - 6:配置<router-view> 作为显示
 * router-link的使用
    - `<router-link to="/login">点我</router-view>`
## vue-router参数传递和接收
 * 1：给定router-link设置
     - `<router-link :to="'/music/show/'  +item.id ">{{item.name}}</router-link>`
 * 2: 设置通配符路由规则
     - `{ path: '/music/show/:id',  component: MusicDetail }`
 * 3：通过route对象获取路由参数
     - `this.$route.params` 
         + __注意:路由规则中通配符配置是什么名称，后续params对象就用什么名称做key取值__
  * router对象
  * route对象
  * 总结:通过url中的参数可以有两种方式获取：    
      - params、query   
        + params:
            * link-> `:to="'/xxx/' + item.id"`  
            * 路由规则配置 `/xxx/:id `  
            * 代码中获取 `this.$route.params.id`
        + query: (查询字符串)
            * link -> `:to="'/xxx?id=' + item.id"`
            * 路由规则 `/xxx`
            * 代码中获取 `this.$route.query.id;`
## vue-resource(下载、Vue安装)
 * JSONP
     - callback=xxxxx      不能是json对象   必须是字 符串 xxxxx('data')
     - dataType='jsonp' -> {name:'xxx'}
     - jsonp也需要服务器做对应的配合，返回调用该回调函 数并传递数据的字符串
 * https://github.com/pagekit/vue-resource
 * 拦截器思想
     - 以前是后端用来处理请求过滤请求的操作
     - 现在前端有了该思想，和事件、钩子函数类似
     - 我们可以在请求发起以前做一些公共的事物，比如添加 某些头信息
     - 也可以在请求发起后，响应回来前，操作数据，比如修 改响应的内容..
 * promise对象的使用
     - 遵循Promise使用规则
         + 如果你看到一个函数返回是的Promise对象，那么 不代表其就是数据
         + 而是需要通过 return 该对象，接下来再使用then
        + then中有回调函数(第一个是成功，第二个是失败,各自参数是数据)，参数就是返回值
## get和post请求总结
 * get请求可以减少到只给一个url参数，then是一个函数,第一个参数是成功后的回调，第二个参数是失败后的回调
 * post请求 至少3个参数 post(url,dataObj,optionsObj)
    - 如果发送post请求，键值对形式必须加上 optionsObj：{emulateJSON:true}
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
what: 是一个 webpack 的 loader，通过解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 CommonJS 模块，module.exports 出一个 Vue.js 组件对象。
1. 兼容原生html 的写法
<template src="../html/demo.html">  
</template>
<script src="../html/demo.js">
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../html/demo.css" scoped>
</style>
2. 深度作用选择器
scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符：
```javascript
    <style scoped>
    .a >>> .b { /* ... */ }
    </style>
    // 编译后结果
    .a[data-v-f3f3eg9] .b { /* ... */ }
    SASS 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 操作符取而代之——这是一个 >>> 的别名，同样可以正常工作。
    通过 v-html 创建的 DOM 内容不受作用域内的样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式。
```
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目（vue-cli 3.0 以前）
$ vue init webpack my-project
## 暴露的有用的属性
    vm.$data === data // => true
    vm.$el === document.getElementById('example') // => true
    // $watch 是一个实例方法
    vm.$watch('a', function (newValue, oldValue) {
    // 这个回调将在 `vm.a` 改变后调用
    })
## 问题:
1. 为什么组件中data是函数？
每个组件的实例却引用了同一个 data，通过为每个组件返回全新的 data 对象来解决这个问题
都有它自己内部的状态了
2. 引入远程的js资源
 自封装 v-remote-js
 npm i v-remote-js -S
3. 异步文件上传
axios
multipart 添加之后选择多图
<input type="file" name="file"  @change="upload($event)"   accept="image/png, image/jpeg, image/jpg">
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
## 服务器端渲染(SSR)
1. 为什么？
* 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
* 更快的内容到达时间(time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备
