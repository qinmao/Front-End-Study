# 复制文本到剪切板
```
npm i clipboard
import Clipboard from 'clipboard';
```

## 声明式获取
```html
<!-- Target 复制必须是可编辑区域 -->
<input id="foo" value="https://github.com/zenorocha/clipboard.js.git" />

<!-- Trigger -->
<button class="btn" data-clipboard-target="#foo">复制</button>
<script>
    // 实例化
    new ClipboardJS(".btn");
</script>
```

## 剪切功能

```html
<!-- 剪切操作仅适用于<input>或<textarea>元素 -->
<!-- Target -->
<textarea id="bar">Mussum ipsum cacilds...</textarea>
<!-- Trigger -->
<button class="btn" data-clipboard-action="cut" data-clipboard-target="#bar">
    剪切
</button>
<script>
    // 实例化
    new ClipboardJS(".btn");
</script>
```

## 拷贝来自属性的文本

```html
<!-- Trigger -->
<button class="btn" data-clipboard-text="拷贝来自属性的文本">复制</button>
<script>
    // 实例化
    new ClipboardJS(".btn");
</script>
```

## 事件的监听

```html
<button class="btn" data-clipboard-text="拷贝来自属性的文本">复制</button>
<script>
    const clipboard = new ClipboardJS(".btn");

    clipboard.on("success", function (e) {
        console.info("Action:", e.action);
        console.info("Text:", e.text);
        console.info("Trigger:", e.trigger);

        e.clearSelection();
    });

    clipboard.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
    });
</script>
```
## 生命周期
```js
// 单页应用处理生命周期
var clipboard = new ClipboardJS('.btn');
clipboard.destroy();
// vue 
this.$on("hook:destroyed", () => {
    clipboard.destroy();
});
```
## 特殊场景的需求
* 多个按钮触发复制同一个文本，触发同样的回调效果
  ```html
    <!-- input display:none; 复制没效果了 -->
    <input id="foo" value="https://github.com/zenorocha/clipboard.js.git" />

    <button class="btn" data-clipboard-target="#foo">按钮1</button>
    <button class="btn" data-clipboard-target="#foo">按钮2</button>

    <button class="btn" data-clipboard-text="1111">按钮1</button>
    <button class="btn" data-clipboard-text="1111">按钮2</button>
    <script>
        const clipboard = new ClipboardJS(".btn");

        clipboard.on("success", function (e) {
            console.info("Action:", e.action);
            console.info("Text:", e.text);
            console.info("Trigger:", e.trigger);

            e.clearSelection();
        });

        clipboard.on("error", function (e) {
            console.error("Action:", e.action);
            console.error("Trigger:", e.trigger);
        });
    </script>
  ```