import Vue from 'vue';
import Vuex from 'vuex';
import App from './app.vue';
// * 2: main.js中引入并安装插件
Vue.use(Vuex);
// * 3: 创建一个Store对象，声明其中的数据，通过state属性
let store = new Vuex.Store({ //全局仓库中 有state.name state.age
    state: {
        name: 'jack',
        age: 18,
    },
    mutations: {
        //声明一个叫changeName的改变行为
        // changeName(state) { //会接受一个State参数
        //     //实际的改变state中的数据
        //     state.name = 'rose';
        // }   同名的mutations会发生后面的覆盖前面的
        // changeName(state, name) {  接受一个字符串的负荷方式
        //     state.name = name;
        // }
        changeName(state, obj) {
            // 直接commit 无效的，不支持异步
            setTimeout(function () {
                state.name = obj.name;
                state.age = obj.age;
            })

        },
        getters: { //定义属性获取方式
            getName(state) {
                return state.name;
            },
            getAge(state) {
                return state.age;
            }
        },
        actions: { //声明一些改动的行为，内部可以存在一些逻辑和异步commit
            // changeNameByAction({ commit }) { 不传参的方式
            //     commit('changeName', {
            //         name: '哈哈呵呵',
            //         age: 9
            //     });
            // }
            // 负荷的方式
            // commit 按需加载 支持异步
            changeNameByAction({ commit }, obj) {
                settimeout(function () {
                    commit('changeName', obj);
                }, 2000)

            }
        }
    }
});


new Vue({
    el: '#app',
    // * 4: 将该对象加入到vue示例的参数中
    // router:router,
    // store:store,
    store, //传递进去以后，各个子组件就可以使用this.$store
    render: c => c(App)
});