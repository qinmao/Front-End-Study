# web 一些有用的api
1. requestAnimationFrame 请求动画帧
方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。
语法：window.requestAnimationFrame(callback);
callback() 有个参数 requestAnimationFrame() 开始触发回调函数的当前时间（performance.now() 返回的时间）。
返回值：
一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。
你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。

