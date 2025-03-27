# vue3 中的渲染函数

## 渲染函数基础
* 核心 h() 函数
  ```js
    import { h } from 'vue'
    // 基本元素创建
    const vnode = h(
        'div',         // 标签名
        { id: 'app' }, // 属性/Props
        'Hello World'  // 子节点
    )
    // 等效模板
    // <div id="app">Hello World</div>
  ```
* 组件渲染
  ```js
    import MyComponent from './MyComponent.vue'
    const app = createApp({
        render() {
            return h(MyComponent, {
                title: 'Props示例',
                onClick: () => console.log('点击事件')
            })
        }
    })
  ```

## 核心功能实现
* 条件渲染
  ```js
    const Conditional = {
        props: ['show'],
        render() {
            return this.show 
            ? h('div', '可见内容')
            : h('span', '隐藏内容')
            }
    }
  ```
* 列表渲染
  ```js
    const List = {
        setup() {
            const items = ref(['苹果', '香蕉', '橘子'])
            return () => h('ul',
                items.value.map(item => h('li', item)
            )
        }
    }
  ```
* 插槽处理
  ```js
    import { defineComponent, h } from 'vue'
    export default defineComponent({
        name: 'FunctionalHeader',
        props: ['title'],
        setup(props, { slots }) {
            return () => h('header', [
                h('h1', props.title),
                slots.default?.()
            ])
        }
    })
  ```

## 集成jsx(推荐使用)
* 安装
  ```bash
   npm i  @vitejs/plugin-vue-jsx
  ```
* 配置
  ```js
    // vite.config.js
    import vueJsx from '@vitejs/plugin-vue-jsx'
    export default defineConfig({
        //...
        plugins:[
            vueJsx()
        ]
    })
  
  ```
* 注意：
  - Vue 的 JSX 转换方式与 React 中 JSX 的转换方式不同
* jsx 示例
  - 使用大括号来嵌入动态值
  - 使用 vModel 取代 v-model
  - 使用 onClick 取代 @click
  - 插槽 
    ```js
        // 默认插槽
        <div>{slots.default()}</div>
        // 具名插槽
        <div>{slots.footer({ text: props.message })}</div>

        // 默认插槽
        <MyComponent>{() => 'hello'}</MyComponent>
        // 具名插槽
        <MyComponent>{{
            default: () => 'default slot',
            foo: () => <div>foo</div>,
            bar: () => [<span>one</span>, <span>two</span>]
        }}</MyComponent>
    ```
  - 使用渲染函数时不再需要注册组件了 —— 可以直接使用导入的组件
  - 内置组件在渲染函数中必须导入才能使用
  ```jsx
    import { ElButton } from 'element-plus'
    export default defineComponent({
        setup(props,{ slots }) {
           let title = ref('')
           let todos = ref([{ title: "学习 Vue 3", done: true },{ title: "睡觉", done: false}])
           function addTodo(){
                todos.value.push({
                    title:title.value
                })
                title.value = ''
            }
        return () => <div>
            <input type="text" vModel={title.value} />
            <el-button onClick={addTodo}>添加</el-button>
            <ul>
            {
                todos.value.length ? todos.value.map(todo=>{
                    return <li>{todo.title}</li>
                }): <li>no data</li>
            }
            </ul>
                <div>{slots.default()}</div>
                <div>{slots.footer({ text: props.message })}</div>

                <MyComponent>{() => 'hello'}</MyComponent>

                <MyComponent>
                    {{
                        default: () => 'default slot',
                        foo: () => <div>foo</div>,
                        bar: () => [<span>one</span>, <span>two</span>]
                    }}
                </MyComponent>
            </div>
        }
    })
  ```

## 函数式组件
* 基本概念
  - Vue 3 的函数式组件是一个纯函数，接收 props 和 context 作为参数，返回一个 虚拟 DOM 节点（VNode）
* 与普通组件的区别
  - 无状态：没有 data 或响应式系统。
  - 无实例：没有组件实例（this），节省内存。
  - 高效渲染：无生命周期钩子，适合简单渲染逻辑。
* 定义函数式组件
  - 参数与setup一样
  - 基础写法
   ```js
   import { h } from 'vue'
    const FunctionalButton = (props, context) => {
        return h(
            'button',
            {
                class: 'btn',
                onClick: props.onClick
            },
            context.slots.default()
        )
    }

    // 使用
    <FunctionalButton @click="handleClick">Click Me</FunctionalButton>
   ```
  - 使用 JSX
   ```jsx
        const Heading = (props, { slots }) => (
            <h1 class="heading">{ slots.default() }</h1>
        )
   ```
* 性能优化场景
  - 静态内容：如纯展示型组件（标题、按钮）。
  - 高频渲染：大型列表中的子项。
  - 代理组件：仅透传 props 和插槽的包装组件。