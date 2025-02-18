# requestIdleCallback

## 概念
  - 是浏览器提供的一个 API，用于在浏览器空闲时执行一些低优先级的任务,从而避免阻塞关键任务（如渲染、用户交互等）
  - 支持现代浏览器（Chrome、Firefox、Edge）。不支持 IE 和 Safari（需 polyfill 或降级处理）。

## 核心特性
* 空闲时执行：任务仅在浏览器空闲时运行。
* 优先级控制：适合执行低优先级或非关键任务。
* 超时机制：可设置超时时间，确保任务在一定时间内执行。
* 避免阻塞：减少对主线程的占用，提升用户体验。

## 基础用法
  ```js
    const id= requestIdleCallback((deadline) => {
        // deadline 包含以下属性：
        // - timeRemaining(): 返回当前帧剩余的空闲时间（毫秒）
        // - didTimeout: 是否因超时触发回调

        while (deadline.timeRemaining() > 0) {
            // 执行任务
            doSomeWork();
        }

        // 如果任务未完成，可再次调度
        if (hasMoreWork) {
            requestIdleCallback(processWork);
        }
        }, { timeout: 1000 }); // 设置超时时间（1秒）
    
    cancelIdleCallback(id); // 取消任务
  ```

## 常见应用场景
>有兼容性和实现差异问题
* 数据预加载
  - 在空闲时预加载非关键资源（如图片、数据）。
    ```js
    requestIdleCallback(() => {
        preloadImages();
    });
    ```
* 日志记录
  - 将非关键的日志记录延迟到空闲时执行。
  ```js
    requestIdleCallback(() => {
        logAnalytics();
    });
  ```
* DOM 更新
  - 对非关键的 DOM 更新进行批量处理。
  ```js
  requestIdleCallback(() => {
    updateNonCriticalDOM();
  });
  ```
* 复杂计算
  - 将复杂的计算任务拆分为小块，在空闲时逐步执行。
  ```js
    function processWork(deadline) {
        while (deadline.timeRemaining() > 0 && hasMoreWork) {
            doSomeWork();
        }
        if (hasMoreWork) {
            requestIdleCallback(processWork);
        }
    }
    requestIdleCallback(processWork);
  ```
