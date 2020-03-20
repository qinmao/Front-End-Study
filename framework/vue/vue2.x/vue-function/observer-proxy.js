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
            /*....依赖收集等....*/
            return val
        },
        set: newVal => {
            val = newVal;
            cb(val); /*订阅者收到消息的回调*/
        }
    })
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

        observe(this._data, options.render)
    }
}

let vm = new Vue({
    data: {
        text: 'test'
    },
    render(val) {
        console.log("当前更改的值为:" + val)
        console.log("视图更新了");
    }
})
// 以上就是简单的observer data 的过程