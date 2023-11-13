# 正则基础的用法
>匹配一个字符串中的一些内容
## 声明和使用：
1. 构造函数 var reg=new RegExp(/表达式/)
2. 字面量  var reg=/表达式/  推荐使用
  - eg: var reg=/abc/ 表示匹配含有abc 的字符串
  - 常用方法：reg.test("要检测的字符串") 返回布尔值
## 最简单开始
    1. 简单类 只要含有正则中的内容即可
      var reg=/abc/

    2. 字符类
        - 在正则中使用[]整体表示一位字符，字符串的某一个字符满足中括号中内容的其中一个即可
        ```js
        var reg = /[abc]/;
        console.log(reg.test("qwewtetwte"));//false
        console.log(reg.test("qwewtaetwte"));//true
        ```

    3. 反向类
        - 在字符类中括号内部最开始写一个^，表示反向
        ```js
        var reg = /[^abc]/;  //  字符串中含有除了abc以外的任意字符即可返回true
        console.log(reg.test("abc"));//false
        ```

    4. 范围类
        ```js
        var reg = /[abcdefghigklmnopqrst]/;
        var reg = /[a-t]/; // 可以匹配到a到t之间的任意一个字符
        console.log(reg.test("uwy"));//false
        console.log(reg.test("guwy"));//true

        // 想要匹配所有的小写字母  //var reg = /[a-z]/;
        // 想要匹配所有的大写字母  var reg = /[A-Z]/;
        // 想要匹配所有的数字  var reg = /[0-9]/
        ```

    5. 组合类
        - 匹配数字和小写字母
        ```js
            var reg = /[0-9a-z]/;
            console.log(reg.test("AAAAAAAAAA"));//false
            console.log(reg.test("AAAAA0AAAAA"));//true
            console.log(reg.test("AAAAAaAAAAA"));//true

            var reg = /[A-Z0-9a-z]/;
            console.log(reg.test("AAAAAAAAAA"));//true
            console.log(reg.test("012323"));//true
            console.log(reg.test("aaaaaa"));//true
        ```

    6. 预定义类(元字符)
        ```js
        var reg = /\d/;    //  /[0-9]/
        .   // 匹配除换行符以外的任意字符
        \w	// 单词字符(所有的字母数字和_) word
        \W	// [^a-zA-Z0-9_]	非单词字符
        \s	// 匹配任意的空白符 space
        \S	// [^\f\r\n\t\v]	可见字符
        \d	// 匹配数字 digit
        \D	// [^0-9]	非数字字符
        \b	// 匹配单词的开始或结束 

        console.log(reg.test("abca1d"));
        ```

    7. 字符转义（常用的）
        如果使用元字符本身，需转义如. ## \
        \.     \*    \\

    8. 补充
        或者 |         
        括号 () 提升优先级，先计算
        var reg = /abc|bcd/;
        console.log(reg.test("ab")); // false
        console.log(reg.test("abc")); // true
        console.log(reg.test("bcd")); // true
        var reg = /a|b|c|d/;//如果使用单个字符，与后面的作用相同  [abcd]

    9. ^ 匹配字符串的开始
       $ 匹配字符串的结束
        ```js
        // ^ 在中括号外([])使用，写在正则最前面时，表示匹配开头,一个正则中只能使用一次
        var reg = /^abc/;
        console.log(reg.test("abcdefg")); //true
        console.log(reg.test("aabcdefg"));//false

        // $ 写在正则最后位置，表示以xxx结束
        var reg = /abc$/;
        console.log(reg.test("ddddabc"));//true
        console.log(reg.test("ddddaabbc"));//false

        // ^和$同时使用 严格匹配-必须跟书写的正则内容完全相同
        var reg = /^abc$/;
        console.log(reg.test("abc"));//true
        console.log(reg.test("abcabc"));//false
        ```

    10. 量词
     ```js
        // 使用量词，表示数量
        // 大括号中书写一个数值。表示出现的次数
        var reg = /^a{3}$/;
        console.log(reg.test("aa"));//false
        console.log(reg.test("aaa"));//true
        console.log(reg.test("aaaa"));//false

        // 匹配2-5个
        var reg = /^a{2,5}$/;
        console.log(reg.test("a"));//false
        console.log(reg.test("aa"));//true
        console.log(reg.test("aaaaaa"));//false
        
        // 匹配至少3个
        var reg = /^a{3,}$/;
        console.log(reg.test("aa"));//false
        console.log(reg.test("aaa"));//true
        console.log(reg.test("aaaa"));//true

        // * 匹配0-多个  当字符串中某一个部分可选时，使用*
        var reg = /^a*$/;
        console.log(reg.test(""));//true
        console.log(reg.test("a"));//true
        console.log(reg.test("aaaa"));//true

        // + 匹配1个到多个
        var reg = /^a+$/;
        console.log(reg.test(""));//false
        console.log(reg.test("a"));//true
        console.log(reg.test("aaaa"));//true

        // ? 匹配0个或1个
        var reg = /^a?$/;
        console.log(reg.test(""));//true
        console.log(reg.test("a"));//true
        console.log(reg.test("aaaa"));//false
        ```      
## 匹配模式
  - g  global 全局匹配
  - i  ignoreCase 忽略大小写
## replace 替换
  ```js
    var str = "abca";
    //第一个参数可以使用字符串，同样可以使用正则表达式
    console.log(str.replace("a", "z"));  //zbca

    // trim是字符串方法
    var str = "  a a   ";
    console.log(str.trim()); //a a
  
    var str = "   a    a   ";
    // \s 不可见字符
    console.log(str.replace(/\s/g, ""));//替换掉所有的空格aa
    console.log(str.replace(/^\s+|\s+$/g, ""));//替换掉两端的空格a   a

    // 自己的trim方法
    function Trim(str) {
        return str.replace(/^\s+|\s+$/g, "");
    }
    // 替换多个
    markRedRule(rule){
        const result = rule.replace(/2份|1张|2张|3张|2小时|1双/g, function(matchStr) {
            const keyArr = ['2份','1张','2张','3张','2小时','1双']
            let tokenMap={}
            keyArr.forEach(key=>{
                tokenMap[key]=`<span style="color:red;">${key}</span>`
            })
            return tokenMap[matchStr];
        });
        return result
    },

  ```
## match 正则提取
1. 字符串方法 match
```js
    var str = "aaa123hhh456hhh789aaa";
    // 提取出字符串中的数字
    console.log(str.match(/\d{3}/)); // 提取第一个匹配到的值["123", index: 3, input:"aaa123hhh456hhh789aaa"]
    console.log(str.match(/\d{3}/g)); // 提取所有的内容时，不会有index和input属性字 ["123", "456","789"]

    var str = "//小明：谢谢大神，我得邮箱是xiaoming@qq.com,哈哈小红：谢谢大神，我得邮箱是xiaohong@qq.com哈哈李雷：谢谢大神，我得邮箱是lilei@163.com,哈哈韩梅梅：谢谢大神，我得邮箱是hanmeimei@126.com,哈哈";

    console.log(str.match(/\w+@\w+\.\w+/g));
    // 解析一下：@ 符号前面有一个或多个单词，后同理，\.  点 “.”的转义 点后也是一个单词 g 全局匹配
```
