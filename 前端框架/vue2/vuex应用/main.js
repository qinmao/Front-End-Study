import Vue from 'vue';
import Vuex from 'vuex';
import App from './app.vue';
Vue.use(Vuex);

// 拆分模块
// 根节点 rootState 作为第三个参数暴露出来
const moduleA = {
    state: {  },
    mutations: {  },
    actions: {  },
    getters: {  }
}

const moduleB = {
    state: {  },
    mutations: {  },
    actions: {  }
}

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
let store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    },
    state: {
        name: 'jack'
    },
    // 实际更改state 的地方，这个选项更像是事件注册
    mutations: {
        CHANGE_NAME(state, obj) {
            state.name = obj.name;
        }
    },
    // 有时候我们需要从 store 中的 state 中派生出一些状态,
    // 可以认为是 store 的计算属性
    // getter 的返回值会根据它的依赖被缓存起来，只有当它的依赖值发生了改变才会被重新计算
    getters: {
        // 比如做些过滤等的处理
        name: state => state.name === 'qm' ? state.name : 'test',
        // 也可以返回一个函数，
        // 来实现给 getter 传参。对 store 里的数组进行查询时非常有用。
        // getTodoById: (state) => (id) => {
        //     return state.todos.find(todo => todo.id === id)
        // }
    },
    actions: {
        //声明一些改动的行为，内部可以存在一些逻辑和异步commit
        // 负荷的方式
        // commit 按需加载 支持异步
        changeNameByAction({ commit, state }, obj) {
            settimeout(function () {
                commit('CHANGE_NAME', obj);
            }, 2000)

        }
    }
});


new Vue({
    el: '#app',
    store,
    render: h => h(App)
});