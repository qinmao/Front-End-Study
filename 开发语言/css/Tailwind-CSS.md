# Tailwind CSS
Tailwind CSS 的工作原理是扫描所有 HTML 文件、JavaScript 组件以及任何 模板中的 CSS 类（class）名，然后生成相应的样式代码并写入 到一个静态 CSS 文件中。

## 自定义属性值
  ```html
    <div class="w-[666px]" />
  ```
## !important 权重
  ```html
    <!-- 1. 单个实用程序类加 !important -->
    <!-- 给 p 标签 一个 black !important 的高权重字体颜色 -->
    <p class="!text-black">
    This will be medium even though bold comes later in the CSS.
    </p>
    
    <!--2. ! 总是在实用程序名称的开头，在任何变体之后，但在任何前缀之前 -->
    <div class="hover:!text-white"></div>

   <!-- 3. 全局配置!important 在 tailwind.config.js 中 -->
    <!-- module.exports = {
        important: true,
    }; -->
  ```
## 悬停、焦点和其他状态
```html
    <button class="bg-sky-500 hover:bg-sky-700">
        Save changes
    </button>
```
## 响应式设计
```html
  <img class="w-16 md:w-32 lg:w-48" src="...">
```
## 暗黑模式
```html
    <!-- 在非暗黑 模式时给 div 标签一个 白色背景（ bg-white ），在 暗黑 模式时给 div 标签一个 黑色背景（ bg-black ），只需要在程序类前面加上 dark: 即可。
    -->
    <div class="bg-white dark:bg-black"></div>
```
## 重用样式
```css
/* ① 将重复的模块，抽离成组件 */
/* ② 使用 @apply 提取类 */
@layer components {
  .flex-c {
    @apply flex justify-center items-center;
  }
}
/* <div class="flex-c"></div> */

```