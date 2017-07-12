## SASS允许使用变量，所有变量以$开头。
　　$blue : #1875e7;　
　　div {
　　　color : $blue;
　　}
## 如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。
　　$side : left;
　　.rounded {
　　　　border-#{$side}-radius: 5px;
　　}
## 计算功能
SASS允许在代码中使用算式：
　　body {
　　　　margin: (14px/2);
　　　　top: 50px + 100px;
　　　　right: $var * 10%;
　　}