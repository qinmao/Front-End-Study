# ES5数组的新方法

## forEach
```javascript
    var arr = [1, 2, 2, 2, 2, 6, 9]
    var sum = 0
    <!--a=>arr-->
    arr.forEach(function (value,i,a) {
        sum += value
    })
```
## map
```javascript
//类似foreach 有返回值 返回一个新数组
arr.map(function (x) {
    return x + 1
})
```

## filter 过滤器
```javascript
    //返回指定条件的新数组
    arr.filter(function (x) {
        return x < 2
    })
```
## some
```javascript
//空数组时 some 返回false every 返回true
// some 存在一个满足条件就返回true
arr.some(function (x) {
    return x == 2   //true
})
```
## every
```javascript
    //返回true false 
arr.every(function (x) {
    return x > 10 //false
})
```
## indexOf
```javascript

```
## lastIndexOf
```javascript

```
## reduce
```javascript
    reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

    reduce() 可以作为一个高阶函数，用于函数的 compose。

    注意: reduce() 对于空数组是不会执行回调函数的。
    var numbers = [65, 44, 12, 4];
 
    function getSum(total, num) {
        return total + num;
    }
    function myFunction(item) {
        document.getElementById("demo").innerHTML = numbers.reduce(getSum);
    }
```
## reduceRight
```javascript

```