// 定义一个依赖收集类Dep
class Dep {
    constructor() {
        /* 用来存放Watcher对象的数组 */
        this.subs = [];
    }

    /* 在subs中添加一个Watcher对象 */
    addSub(sub) {
        this.subs.push(sub);
    }

    /* 通知所有Watcher对象更新视图 */
    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
    // 用 addSub 方法可以在目前的 Dep 对象中增加一个 Watcher 的订阅操作；
    // 用 notify 方法通知目前 Dep 对象的 subs 中的所有 Watcher 对象触发更新操作。
}
class Watcher {
    constructor() {
        /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
        Dep.target = this;
    }

    /* 更新视图的方法 */
    update() {
        console.log('视图更新了')
    }
}
Dep.target = null;
function defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        /* 属性可枚举 */
        configurable: true,
        /* 属性可被修改或删除 */
        get: () => {
            /*....依赖收集等....*/
            /* Watcher对象存在全局的Dep.target中 */
            if(Dep.target){
                console.log('Watcher 已经实例化了，Dep.target 就是一个Watcher实例')
                dep.addSub(Dep.target);
            }
            return val
        },
        set: newVal => {
            /*订阅者收到消息的回调*/
            dep.notify()
        }
    })
}

function observe(value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    Object.keys(value).forEach((key) => defineReactive(value, key, value[key]))
}

class Vue {
    constructor(options) {
        this._data = options.data;

        _proxy.call(this, options.data);

        function _proxy(data) {
            const that = this;
            Object.keys(data).forEach(key => {
                Object.defineProperty(that, key, {
                    configurable: true,
                    enumerable: true,
                    get: function proxyGetter() {
                        return that._data[key];
                    },
                    set: function proxySetter(val) {
                        that._data[key] = val;
                    }
                })
            });
        }

        observe(this._data)

        new Watcher();

         /* 在这里模拟render的过程，为了触发text属性的get函数 */
         console.log('render~', this._data.text);

    }
}

let app = new Vue({
    data: {
        text: 'test'
    }
})
// 那么「依赖收集」的前提条件还有两个：
// 1. 触发 get 方法；
// 2. 新建一个 Watcher 对象。