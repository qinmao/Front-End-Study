# sass 常见用法
## SASS允许使用变量，所有变量以$开头。
```css
　　$blue : #1875e7;　
　　div {
　　　color : $blue;
　　}

　　$side : left;
　　.rounded {
　　　　border-#{$side}-radius: 5px;
　　}
```
## 计算功能
```css
　　body {
　　　　margin: (14px/2);
　　　　top: 50px + 100px;
　　　　right: $var * 10%;
　　}
```
## 嵌套
```css
/* 1 */
div h1 {
　　　　color : red;
　　}
/* 2 */
div {
　　　　hi {
　　　　　　color:red;
　　　　}
　　}
/* 在嵌套的代码块内，可以使用&引用父元素。比如a:hover伪类 */
a {
　　　　&:hover { color: #ffb3ff; }
　　}
```
## 代码的重用
## 继承
```scss
    .class1 {
    　　　　border: 1px solid #ddd;
    }

    /* class2要继承class1，就要使用@extend命令： */
    .class2 {
    　　　　@extend .class1;
    　　　　font-size:120%;
    }
```
## Mixin
  - Mixin有点像C语言的宏（macro），是可以重用的代码块。
```scss
    @mixin left1 {
    　　float: left;
    　　margin-left: 10px;
    }

    @mixin left2($value: 10px) {
    　　float: left;
    　　margin-right: $value;
    }
    div {
    　  @include left1;
    }
    div {
    　　@include left2(20px);
    }
```
