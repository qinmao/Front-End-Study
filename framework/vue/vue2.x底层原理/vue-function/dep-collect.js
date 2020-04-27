
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
}
class Watcher {
    constructor() {
        /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
        Dep.target = this;
    }

    /* 更新视图的方法 */
    update() {
        console.log("视图更新啦～");
    }
}

Dep.target = null;

function defineReactive (obj, key, val) {
    /* 一个Dep类实例 */
    const dep = new Dep();
    
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
            // 注意为了方便理解，这里省略了多个属性去重的操作
            if (Dep.target){
                dep.addSub(Dep.target);
            }
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
            dep.notify();
        }
    });
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
        observe(this._data);
        /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
        new Watcher();
    }
}
let vm = new Vue({
    data:{
        test:'hello'
    }
})
console.log(vm._data.test)
// 1.触发test属性的get函数
// 2.修改test的值，触发依赖更新视图
// vm._data.test='world'