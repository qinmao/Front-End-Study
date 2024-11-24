# nodejs 内存

## process.memoryUsage() 获取内存信息
* rss 常驻内存大小，是给这个 node 进程分配了多少物理内存，这些物理内存中包含堆，栈和代码片段。
* heap total: v8 已经申请到的堆内存
* heap used: v8 已经使用的堆内存
* external: v8 内部的 C++对象占用的内存
* arrayBuffers: 包含在 external 中，指为 ArrayBuffer 和 SharedArrayBuffer 分配的内存

## 栈内存
* 调用栈: v8 是单线程的且只有一个调用栈，里面会存储函数/方法的调用帧以及一些函数中的变量指针,是一个后进先出的数据结构。
* 调用栈大小: 在 32 位系统中默认的栈内存为 492KB，在 64 位系统中则是 984KB，在 node 中可以使用--stack-size来调整栈的大小
* 查看栈内存大小
  ```bash
    node --v8-options | grep stack-size -A 1
  ```

## 堆内存
* 这是 v8 存储对象引用类型的地方，常规情况是所有内容都存储在堆上，这是最大的内存区域块，也是垃圾回收 （ GC ） 发生的地方

## 导致内存泄漏的一些场景
* 全局变量
  - 未声明的变量或挂在全局 global 下的变量不会自动回收，将会常驻内存直到进程退出才会被释放，除非通过 delete 或 重新赋值为 undefined/null 解除之间的引用关系，才会被回收
* 闭包
* 缓存
* 事件监听
  - 事件监听的回调函数会一直保持引用， 继而使用回调函数所使用的闭包数据不能得到释放
* 队列消费不及时

## 如何排查内存泄漏
* v8 自带工具
* 三方库：heapdump
  ```js
    const { EventEmitter } = require('events');
    const heapdump = require('heapdump');

    const formatSize = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

    const showMemory = () => {
        const memory = process.memoryUsage();
        console.log(`heap total: ${formatSize(memory.heapTotal)} heapUsed: ${formatSize(memory.heapUsed)} rss: ${formatSize(memory.rss)}`);
        console.log('----------------------------');
    }

    process.on('SIGINT', () => {
        process.exit();
    })

    const event = new EventEmitter();

    setInterval(() => {
        const a = [];
        event.on('event', () => {
            a.push(Array.from({ length: 10 * 1024 * 1024 }).map((_, i) => i))
        });

        heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');

        
        showMemory();
        event.emit('event')
    }, 1000)

  ```