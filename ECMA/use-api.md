# js 一些有用的api
## 1. requestAnimationFrame 请求动画帧
1. 描述：方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。
2. 语法：window.requestAnimationFrame(callback);
callback() 有个参数 requestAnimationFrame() 开始触发回调函数的当前时间（performance.now() 返回的时间）。
3. 返回值：
一个 long 整数，请求 ID ，是回调列表中唯一的标识。
你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。
4. 优点：运行在后台标签页或者隐藏的<iframe> 里时，requestAnimationFrame() 暂停调用以提升性能和电池寿命。
## 2. bind() 方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值
1. fun.bind(thisArg[, arg1[, arg2[, ...]]])
2. 返回值：返回由指定的this值和初始化参数改造的原函数拷贝
3. 应用场景：
bind() 最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的 this 值。JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，希望方法中的 this 是原来的对象。（比如在回调中传入这个方法。）如果不做特殊处理的话，一般会丢失原来的对象。从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题：
## 3. defineProperty