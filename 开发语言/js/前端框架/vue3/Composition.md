# Composition
## 一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件，包括以下内容
* 响应式api：如ref() 和 reactive()，我们可以直接创建响应式状态、计算属性和侦听器。
* 生命周期钩子：如 onMounted() 和 onUnmounted()，使我们可以在组件各个生命周期阶段添加逻辑。
* 依赖注入：如 provide() 和 inject()，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统。

## vue3 中使用
[示例](./composition-demo.vue)

## 组合式有什么好处
* 更好的逻辑复用
* 更灵活的代码组织
* 更好的类型推导
* 更小的包体积