# js 简单算法
* 快排
* 去重
    ```js
    Array.prototype.unique = function () {
                var obj = {}
                var res = []
                for (let i = 0; i < this.length; i++) {
                    if (!obj[this[i]]) {
                        res.push(this[i])
                        obj[this[i]] = 1
                    }
                }
                return res;
            }
    ```
* 反转
* 冒泡
    ```js
    function sort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
    ```
