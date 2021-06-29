<template>
  <div>
    姓名是: 
    <!-- 1. {{$store.state.name}} -->
    <!-- 2. {{name}} -->
  </div>
</template>
<script>
import { mapState,mapGetters,mapMutations  } from 'vuex'

// 在模块内的简便用法
// import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 本地的计算属性，混用state
    localComputed () { /* ... */ },
    // 1. 原始获取
    // name () {
    //   return this.$store.state.name
    // }

    // 2. mapState 辅助函数,返回的是一个对象
    // ...mapState({
    //   name: state => state.name
    // }),

    // 如果计算属性与state 的子节点名称相同时，可以给 mapState 传一个字符串数组
    // ...mapState(['name']),

    // 3. getters 方式获取
    // ...mapGetters(['name']),

    // 如果你想将一个 getter 属性另取一个名字，使用对象形式：
    ...mapGetters({
    // 把 `this.name` 映射为 `this.$store.getters.name1`
      name1: 'name'
    })


    // 4. 模块内的用法
    //  ...mapState('some/nested/module', {
    //     a: state => state.a,
    //     b: state => state.b
    // })

    // 5. 模块内 简便用法
    // 在 `some/nested/module` 中查找
    // ...mapState({
    //   a: state => state.a,
    //   b: state => state.b
    // })


  },
  methods: {
    // 1. 
    // ...mapMutations([
    //   'CHANGE_NAME'
    // ])
    
    // 2. 事件重命名
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })


    // 3. 模块内的用法
    // ...mapActions('some/nested/module', [
    //     'foo', // -> this.foo()
    //     'bar' // -> this.bar()
    // ])

    // 4. 模块内的简便用法
    // 在 `some/nested/module` 中查找
    // ...mapActions([
    //   'foo',
    //   'bar'
    // ])

  },
  created() {
    // 1. this.$store.state.age = 80; // 不推荐直接修改

    // 2. this.$store.commit('CHANGE_NAME', 'qm') 

    // 3. Mutation 触发，this.CHANGE_NAME({ name: 'qm' }) 映射为 `this.$store.commit('CHANGE_NAME', { name: 'qm' })`
    // this.CHANGE_NAME({ name: 'qm' })

    // 4. action 触发 支持异步
    this.$store.dispatch("changeNameByAction", { name: 'qm' }); 
  }
};
</script>
<style>
</style>
