# vite
> Vite 需要 Node.js 版本 18+ 或 20+
## vite 为什么快
* 冷启动:不存在打包(bundle)的过程,冷启动速度很快
* HMR性能:代码是按需编译的，只编译的当前页面导入的代码,热更新的性能与模块的数量是解耦的
* 构建速度:Go 语言编写的快速、轻量级的 JavaScript/TypeScript 构建工具，比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。
## 组成
* 基于koa2的开发服务器提供了模块热更新
* 3.x中开发模式是 esbuild 进行代码编译，生产模式中使用 Rollup 打包，开发模式重在开发效率，esbuild 出现的较晚，在代码分割和css 处理不够成熟，Rollup 功能成熟稳定
## 创建一个vue项目
  ```bash
    npm create vite@latest my-vue-app -- --template vue
  ```
## 导入模块
* Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块：
  ```js
    const modules = import.meta.glob('./dir/*.js')

    //  可以遍历 modules 对象的 key 值来访问相应的模块：
    for (const path in modules) {
        modules[path]().then((mod) => {
            console.log(path, mod)
        })
    }
  ```
* 动态导入
  ```js
    const module = await import(`./dir/${file}.js`)

  ```
## 浏览器兼容性
> 用于生产环境的构建包会假设目标浏览器支持现代 JavaScript 语法。默认情况下，Vite 的目标是能够 支持原生 ESM script 标签、支持原生 ESM 动态导入 和 import.meta 的浏览器：
* 在低版本的谷歌浏览器上报错误
  - Uncaught Syntaxerror: Unexpected token ‘?‘
* 默认支持的浏览器版本
  - Chrome >=87
  - Firefox >=78
  - Safari >=14
  - Edge >=88
* 兼容的解决方案：
  - 传统浏览器可以通过插件 @vitejs/plugin-legacy 来支持，它将自动生成传统版本的 chunk 及与其相对应 ES 语言特性方面的 polyfill。兼容版的 chunk 只会在不支持原生 ESM 的浏览器中进行按需加载。
  - 亲测谷歌版本 < 50 的，都不支持，以上的均可支持，40+ 版本的请升级版本吧！
  ```bash 
    npm i @vitejs/plugin-legacy terser -D
  ```
  ```js
    // vite.config.js
   import legacy from '@vitejs/plugin-legacy';
    export default defineConfig({
    plugins: [
        legacy({
            targets: ["chrome < 60"], // 需要兼容的目标列表，可以设置多个
            additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // 面向IE11时需要此插件
        })
    ]
    })

  ```
## 插件开发
- TODO