// PerformanceNavigationTiming 是 Web 性能 API 中的一部分，专门用于获取页面加载过程的导航性能数据。
// 它提供了关于网页从用户请求开始，到页面完全加载结束之间的详细时间信息。这些数据对于性能分析和优化非常有用。

// PerformanceNavigationTiming 是 PerformanceEntry 的一个子类，继承了性能条目的所有基本功能，并添加了特定于导航的属性

const [navigationTiming] = performance.getEntriesByType("navigation");

if (navigationTiming) {
    console.log(
        "导航耗时:",
        navigationTiming.responseStart - navigationTiming.navigationStart
    );
    console.log(
        "服务器响应耗时:",
        navigationTiming.responseEnd - navigationTiming.requestStart
    );
    // 衡量页面开始呈现并能与用户交互的时间
    console.log(
        "DOM 加载耗时:",
        navigationTiming.domContentLoadedEventEnd -
            navigationTiming.domContentLoadedEventStart
    );
    // 加载所有资源（如图片、样式等）所花费的时间。
    console.log(
        "Load 加载完整耗时:",
        navigationTiming.loadEventEnd - navigationTiming.loadEventStart
    );
}