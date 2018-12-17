## vue 深度探索 学习阿里染陌剖析vue.js内部运行机制
https://user-gold-cdn.xitu.io/2018/1/15/160f7d5318fea08c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1
## 学习源码的前置知识
1. Object.defineProperty
```javascript
/*
    obj: 目标对象
    prop: 需要操作的目标对象的属性名
    descriptor: 描述符
    
    return value 传入对象
*/
Object.defineProperty(obj, prop, descriptor)

descriptor的一些属性，简单介绍几个属性，具体可以参考 MDN 文档。

enumerable，属性是否可枚举，默认 false。
configurable，属性是否可以被修改或者删除，默认 false。
get，获取属性的方法。
set，设置属性的方法。

```
2. 设计模式:观察者模式，代理模式
## 响应式原理(核心)
    如一个对象a传给vue实例的data属性后，vue会遍历a的所有属性，并使用es5的Object.defineProperty 把属性转换成getter/setter
    每个组件实例都有watcher实例对象，它会记录这些依赖，某个属性setter改变 watcher 观测到之后update通知render函数重新渲染virtual dom tree
## virtual dom tree具体是如何更新的，用了哪些优化的手段？
当数据变化后，执行 render function 就可以得到一个新的 VNode 节点，我们如果想要得到新的视图，最简单粗暴的方法就是直接解析这个新的 VNode 节点，然后用 innerHTML 直接全部渲染到真实 DOM 中。但是其实我们只对其中的一小块内容进行了修改，这样做似乎有些「浪费」。...

只修改那些「改变了的地方」呢？这个时候就要介绍我们的「patch」了。我们会将新的 VNode 与旧的 VNode 一起传入 patch 进行比较，经过 diff 算法得出它们的「差异」。最后我们只需要将这些「差异」的对应 DOM 进行修改即可。...

1. 为什么新加的属性不是响应式的？
     因为JavaScript 的限制 (以及废弃 Object.observe) vue 不能检测到属性的添加和删除，只能在实例化的时候把属性转换成getter/setter
    解决方案:
        可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上
        this.$set(this.someObject,'b',2)
        向原有的对象上添加属性： this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
2. 数据更新之后dom没有刷新的问题？
    Vue 异步执行 DOM 更新
    观察到数据变化，Vue 将开启一个队列，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。
    为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) ,这样回调函数在 DOM 更新完成后就会调用。
## Virtual DOM
特性：render function 会被转化成 VNode 节点。Virtual DOM 其实就是一棵以 JavaScript 对象（ VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。
能力：由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node...
```javascript 
// 一个例子如下
{
    tag: 'div',                
    children: [                 
        {
            tag: 'a',          
            text: 'click me'
        }
    ]
}
```
## 如何实现 data observer（可观察的）?(如何data变成响应式的?)
Vue通过设定对象属性的 setter/getter 方法来监听数据的变化，通过getter进行依赖收集，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图。
参考代码 data-oberver.js
## 依赖收集追踪原理
1. 为什么要做依赖收集
```javascript
new Vue({
    template: 
        `<div>
            <span>{{text1}}</span> 
            <span>{{text2}}</span> 
        <div>`,
    data: {
        text1: 'text1',
        text2: 'text2',
        text3: 'text3'
    }
});
this.text3 = 'modify text3';
视图中并不需要用到 text3 ，所以我们并不需要触发上一章所讲的 cb 函数来更新视图
let globalObj = {
    text1: 'text1'
};

let o1 = new Vue({
    template:
        `<div>
            <span>{{text1}}</span> 
        <div>`,
    data: globalObj
});

let o2 = new Vue({
    template:
        `<div>
            <span>{{text1}}</span> 
        <div>`,
    data: globalObj
});
globalObj.text1 = 'hello,text1';
o1 以及 o2 两个vm实例进行视图的更新，「依赖收集」会让 text1 这个数据知道“哦～有两个地方依赖我的数据，我变化的时候需要通知它们～”。
```
2. 依赖收集如何实现的
参见：响应式原理(完整版).js