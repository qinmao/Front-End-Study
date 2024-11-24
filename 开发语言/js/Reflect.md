# Reflect（反射）
调用对象的基本操作（内部的方法）

## 简单语法
```js
   const obj={}
   //   obj.a=1  // 内部调用的是 【SET】
  
   Reflect.set(obj,'a',2)

   //   obj.a    // 内部调用的是 【SET】
   Reflect.get(obj,'a')
```
## 应用场景
* 主要是配合 proxy 用的。在 proxy 直接调用对象本身会死循环 proxy，用 Reflect 可以完美解决。