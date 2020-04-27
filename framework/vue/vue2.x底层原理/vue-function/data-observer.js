function observe(obj, cb) {
    if (!obj || (typeof obj !== 'object')) {
        return;
    }

    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key], cb))
}

function defineReactive(obj, key, val, cb) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        /* 属性可枚举 */
        configurable: true,
        /* 属性可被修改或删除 */
        get: () => {
            return val
        },
        set: newVal => {
            val = newVal;
            cb(val);
        }
    })
}
// 定义vue 类
class Vue {
    // new Vue () 时执行constructor 构造函数初始化
    constructor(options) {
        this._data = options.data;
        observe(this._data, options.render)
    }
}

let vm = new Vue({
    data: {
        text: 'test'
    },
    // cb回调函数模拟视图更新
    render(val) {
        console.log("当前更改的值为:" + val)
        console.log("视图更新了");
    }
})
// 以上就是简单的observer data 的过程