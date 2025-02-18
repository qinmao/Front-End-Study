# requestAnimationFrame
- 是浏览器提供的一个用于优化动画和渲染的 API。
- 它会在浏览器下一次重绘之前调用指定的回调函数，确保动画或渲染操作与浏览器的刷新率同步，从而避免丢帧和卡顿

## 核心特性
* 与浏览器刷新率同步
  - 默认调用频率为 60Hz（每秒 60 次），与大多数显示器的刷新率一致。
  - 避免过度渲染，节省 CPU 和 GPU 资源。
* 自动暂停
  - 当页面隐藏或切换到后台时，自动停止调用，减少资源消耗。
* 高性能
  - 比 setTimeout 或 setInterval 更适合动画和渲染任务。

## 基础用法
  ```js
    let animationId;
    function animate() {
        // 动画逻辑
        console.log('渲染帧');
        // 继续调用下一帧
        animationId=requestAnimationFrame(animate);
    }
    // 启动动画
    animationId=requestAnimationFrame(animate);

    // 取消动画
    cancelAnimationFrame(animationId);
  ```

## 使用场景
* 动画
  ```js
    const element = document.getElementById('box');

    let position = 0;
    function move() {
        position += 1;
        element.style.transform = `translateX(${position}px)`;
        if (position < 200) {
            requestAnimationFrame(move);
        }
    }
    requestAnimationFrame(move);
  ```
* 游戏渲染
  ```js
    function gameLoop() {
        updateGameState(); // 更新游戏状态
        renderGame();      // 渲染游戏画面
        requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
  ```
* 性能监控
  ```js
    let frameCount = 0;
    let startTime = performance.now();
    function monitorFPS() {
        frameCount++;
        const now = performance.now();
        const elapsed = now - startTime;
        if (elapsed >= 1000) {
            const fps = frameCount / (elapsed / 1000);
            console.log(`FPS: ${fps.toFixed(2)}`);
            frameCount = 0;
            startTime = now;
        }
        requestAnimationFrame(monitorFPS);
    }
    requestAnimationFrame(monitorFPS);
  ```