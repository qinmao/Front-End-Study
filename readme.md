# 前端技术栈
> 前端的知识网络庞杂，知识点琐碎，记住所有的细节不太可能，所以往往需要做些总结，记录最核心的知识点，构建自己的知识网络。

## css
 * css 三大特性：
    + 层叠性
    + 继承性
    + 优先级
            
 * css 优先级 
    - 标签选择器 < 类选择器 <  ID选择器 < 行内样式 <! Important

 *  margin
    + 垂直外边距合并（同正取最大值，同负取绝对值最大值，一正一负相加的和）
    + 如何解决垂直外边距塌陷（margin-top  父元素会掉下来）？
        - 给父元素设置边框
        - 给父元素设置overflow：hidden；(注意：会触发父元素的bfc(格式化上下文)

 *  Padding
     + 特殊性： 在块级元素中，如果默认子元素没有设置宽度，给当前子元素设置padding值，不会影响当前子盒子的宽度。（“继承”的盒子padding值不会影响）

 *  Float
    + 作用：布局   网页导航   图片文字环绕（文字不会被图片压着）

    + 清理浮动：实质是清理浮动造成的影响

    + 什么时候清理浮动？
        - 父容器没有设置高度
        - 父容器所有子元素都设置浮动

    + 如何清理浮动？
        - 1.clear：both;
        - 2.给父元素设置overflow：hidden;(父元素没有定位)
        - 3.使用伪元素 before after
        - 4.display: table;
        - overflow用法：默认值 visible  hidden|scroll|auto (根据内容判断是否添加滚动条)

 * position    
    + 静态（static）
        - 标准流下的显示方式，
        - 可转换成其他定位方式
    + 绝对 （absolute）
        - 标准流下的盒子，设置绝对定位以body 为参照
        - 除了父盒子设置static ，其他定位方式，子盒子以父盒子为参照
        - 绝对定位的元素脱标
        - 实现模式转换的效果
        - 使用场景：1，盒子压盒子 2，绝对定位可以使用 margin padding
    + 相对（relative）：
        - 相对自己作为参照，
        - 不会脱标
        - 通常使用 子绝父相
    + 固定（fixed）：
        - 以body标签可视区域作为参照
        - 脱标
        - 实现模式转换的效果
    + 粘性 sticky（兼容性问题）
        - 可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位
    + z-index
        - 定位的元素有层级关系
        - 只有给定位的元素才能设z-index
        - 特点:
            - 元素设置定位后有个默认的z-index ：auto（除去static）
            - z-index 值相同 元素后来居上
            - z-index 值越大 当前的元素层级越高
            - 父元素的z-index值越大 当前的元素层级越高  
    

 * BFC 
    - 概念：（W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。）
		 一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。
		 不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响。

 * css hack   

## 什么是h5? 
 * 狭义上: 是html4的升级版本，是新一代web应用标准
 * 广义上: H5其实指的是一个泛称，它是由HTML5 + CSS3 + JsApi等技术组合而成的一个应用开发平台。

 * html5技术:       
    1. 常用新增的语义标签    
        - header nav main aside section (独立的区块) article footer
        
    2. [新增dom API](html/html5/dom.html)
         
    3. [定位](html/html5/geolocation.html)

    4. [canvas](canvas/canvas-base.html)

    5. [网络检测](html/html5/online.html)

    6. [客户端数据的缓存机制](html/html5/webStorage.html)

    7. [video (api 使用)](html/html5/media)

    8. [mobile](mobile/h5-mobile)
        

## css3
### selector
1. 属性选择器：
    E[attr=val]
    E[attr]
    E[attr^=val] 属性值以val开头
    E[attr$=val] 属性值以val结尾
    E[attr*m=val]属性值含有val,不管在什么位置
    
2. 伪类选择器：
    E：first-child 选中父元素中的第一个E子元素
    E:last-child  选中父元素中的最后一个E子元素
    E:nth-child(n)  选中父元素中第n个子元素（元素0开始，n从0开始）n(数字，表达式 -5+n,2n+1,odd,even)
    E:nth-last-child(n)  选中父元素中倒数第n个子元素（元素0开始，n从0开始）

    E:empty 选中内容为空，或没有子元素
    E:target    选中锚点的的目标元素
    E:not(选择器)
    ```css
     p:first-child   
     /* 先找父元素 找到所有的子元素  在去找第一个子元素  匹配是不是p  如果不是无效的选择器 */
     p:first-of-type 
     /* 先找父元素 找到所有的p元素  找第一个 */
     p:last-of-type 
     /* 最后一个 */
     p:nth-of-type（） 
     /* 第几个 */
     p:nth-last-of-type 
     /* 倒数第几个 */
    ```        
3.  结构选择器：+ ~
    E[attrxxxx]+E   选择当前的元素 然后找到相邻的下一个元素
    E[attrxxxx]~E   选择当前的元素 然后后面所有的元素    
   
### 伪元素：
1. :before :after 推荐单冒号兼容性好       
    
2. 出现省略号：
        white-space:nowrap;
        overflow：hidden;
        text-overflow：ellipsis;
3. 选中
    ::first-letter 选择首字母
    ::first-line   第一行
    ::selection    选中的区域  只能变color和background-color  

### shadow
1. 文字阴影:
    text-shadow:水平位移  垂直位移  模糊程度 颜色

    水平位移 值越大越往右 反之往左
    垂直位移 值越大越往下 反之往上
    模糊程度 值从0开始，越大越模糊
    颜色   
2. 盒子阴影:
    box-shadow:水平位移  垂直位移  模糊程度 扩展半径 颜色 内阴影（inset）

    水平位移  
    垂直位移  
    模糊程度 
    扩展半径  可以为负值，值越大，扩展半径越大
    颜色 
    内阴影  inset(可选)

### box-sizing
 * content-box 盒子的尺寸=CSS中的尺寸+padding+border
 * border-box  盒子的尺寸=CSS中的尺寸=padding+border+可变的内容尺寸
    
### border
 * border-radius
    - border-radius:x x x x/y y y y
    - 正圆:border-radius:50%;

 * border-image
    - border-image-source:url();
    - 切割图片 border-image-slice:
    - border-image-repeat:round;

### background
 * background-image：
    url("images/bg1.png") left top,
    url("images/bg2.png") right top,
    url("images/bg3.png") right bottom,
    url("images/bg4.png") left bottom,
    url("images/bg5.png") center center;
 * background-size
    - 数字，百分比，
    - cover 完全覆盖整个元素，不考虑图片内容是否损失
    - contain 完全显示图片，不考虑是否覆盖整个元素

 * background-origin 
    - 背景原点(默认是padding-box)

 * background-clip 
    - 背景图片的显示位置

### gradient
 * 线性渐变:
        linear-gradient( 
            [ <angle> | to <side-or-corner> ,]? <color-stop> [, <color-stop>]+ )
            \---------------------------------/ \----------------------------/
            Definition of the gradient line        List of color stops  就是渐变条上的色块列表
            就是定义渐变线的意思，可以通过角度或者指定上右下左等方位来控制渐变线的方向。
            where <side-or-corner> = [left | right] || [top | bottom]
            and <color-stop>     = <color> [ <percentage> | <length> ]?

        example:
            45度三色线性渐变，初始值为黄色，中间值为绿色，结束值为粉色。角度可以设置负数
            没有设置颜色的具体位置时，三个色块默认平均分布。

            1. background-image:linear-gradient(45deg,#D1EE4D,#1ABF22,#F389B7);}

            不设置任何的角度和方位，则默认是从上往下。可以为某个颜色设置具体的位置，可以是百分比，或者是具体的像素

            2. background-image:linear-gradient(#F8F86D,#239C23 50%,#298C1E 51%,#D1E710)
               background-image:linear-gradient(to right,red,orange,yellow,green,cyan,blue,purple)
               background-image:linear-gradient(to bottom right,red,yellow)
               background-image:linear-gradient(to bottom left,#FC3,rgba(255,255,255,0))
               background:linear-gradient(to bottom left,#FC3,rgba(255,255,255,0)),url(images/1957.jpg)

 * 径向渐变:
        example:
        background-image:radial-gradient(20px at 10px,red,green);
 * [参考](http://www.mrszhao.com/post/58.html)

### transition:
1. transition:过渡属性     过渡时间        过渡延迟     过渡速度

    transition-property ..-duration     ..-delay    transition-timing-function:ease  linear ease-in ease-in-out
    
    transition: all 0.2s
    过渡all所有变化的属性  0.2s代表属性从初始变化到结束所用的时间

2. transitionend
    node.addEvertListen('transitionend',()=>{
        //do something
    })

3. cubic-bezier:
    贝塞尔曲线 是animation-timing-function 和 transition-timing-function 中一个重要的内容。
    主要是为 animation 生成速度曲线的函数，规定是 cubic-bezier(<x1>, <y1>, <x2>, <y2>)。

4. 2D转换:
    * 位移 translateX(),translateY(),translate(X,Y)
    * 旋转 rotate 值越大 是顺时针 反之则逆时针
    * 缩放 scale   值越大 放大 反之缩小
    * 倾斜 skewX skewY skew

5. 3D转换：
    translateZ() translate(X,Y,Z)
    视角：perspective
    3d转换：transform-style:
            flat 2d平面呈现
            perserve-3d 3d空间呈现 

### animation:
1. 定义动画：
    * @keyframes 动画名称{
            0%{}
            25%{}
            50%{}
            75%{}
            100%{} 
        }
    * from{},to{} 类似0%-100%

2. 调用动画 
     * 复合属性:    animation: animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction 和 animation-fill-mode.

     * 动画名称     animation-name  自定义的
     * 动画总时间   animation-duration 时间
     * 动画延迟     animation-delay    时间
     * 动画速度     animation-timing-function  ease ease-in  ease-in-out linear steps(n)
     * 动画次数     animation-iteration-count  数字  infinite(无限循环)
     * 动画播放状态   animation-play-state    running  paused
     * 动画完成时的状态 animation-fill-mode  backwards回到最初  forwards停留在最后完成时的状态 none(default)不改变任何样式 both 动画将会执行 forwards 和 * * backwards 执行的动作
     * 动画方向        animation-direction    reverse（反方向）

3. 事件:animationend

4. requestAnimationFrame 请求动画帧
 * 描述：告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。使用一个回调函数作为参数，该回调函数会在浏览器重绘之前调用。

 * 语法：window.requestAnimationFrame(callback);

 * 返回值：一个 long 整数，请求 ID ，是回调列表中唯一的标识。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。
 
 * 优点：运行在后台标签页或者隐藏的iframe 里时，requestAnimationFrame() 暂停调用以提升性能和电池寿命。

### em rem vw:
 1. em:的基准值  16px  默认的字体大小是16px,基准值是相对于父元素来的

 2. rem:的基准值  16px  默认的字体大小是16px
        r 是root  根元素的意思  html文档的根元素是  html标签
        基准值是相对于来根元素（html）来的

 3. vw:vw是基于Viewport视窗的长度单位，这里的视窗（Viewport）指的就是浏览器可视化的区域，而这个可视区域是window.innerWidth/window.innerHeight的大小
    - vw：是Viewport's width的简写,1vw等于window.innerWidth的1%
    - vh：和vw类似，是Viewport's height的简写，1vh等于window.innerHeihgt的1%
    - vmin：vmin的值是当前vw和vh中较小的值
    - vmax：vmax的值是当前vw和vh中较大的值

### media 
    @media (min-width: 750px) {
        html {
                font-size: 100px;
        }
    }

### word-break
* word-break 指定了怎样在单词内断行。normal | break-all | keep-all | break-word
  - [word-break 详细](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break)

* normal
    使用默认的断行规则。
* break-all
    对于non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行。
* keep-all
    CJK 文本不断行。 Non-CJK 文本表现同 normal。

### 私有前缀
1. webkit chrome  safari 新版opera
2. moz    firefox
3. ms     IE
4. o      老版opeara

### 透明色     
1. rgba
2. opacity 能继承 取值0-1
3. transparent 完全透明
4. hsla
    h 色调
    s 饱和度0-100%
    l 亮度 0-100%
    a alpha 透明度


## layout
### 浮动布局

### flex
1. flex容器:
    * 给div这类块状元素元素设置display:flex
    * 给span这类内联元素设置display:inline-flex
    * 这些元素称为flex容器，里面的子元素称为flex子项。

2. Flex布局相关属性正好分为两拨，一拨作用在flex容器上，一拨作用在flex子项上,无论作用在flex容器上，还是作用在flex子项，都是控制的flex子项的呈现，前者控制的是整体，后者控制个体。

* 作用在flex容器上:
    + flex-direction
        - flex-direction: row(默认) | row-reverse | column | column-reverse;
        - 用来控制子项整体布局方向，是从左往右还是从右往左，是从上往下还是从下往

    + flex-wrap
        - flex-wrap: nowrap(默认值) | wrap | wrap-reverse;
        - 控制子项整体单行显示还是换行显示，如果换行，则下面一行是否反方向显示

    + flex-flow
        - flex-flow: <‘flex-direction’> || <‘flex-wrap’>
        - 上面两属性的缩写

    + justify-content
        - justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
        - 属性决定了水平方向子项的对齐和分布方式
        - around是环绕的意思，意思是每个flex子项两侧都环绕互不干扰的等宽的空白间距，最终视觉上边缘两侧的空白只有中间空白宽度一半
        - evenly是匀称、平等的意思。也就是视觉上，每个flex子项两侧空白间距完全相等

    + align-items
        - align-items: stretch（默认值，子项拉伸） | flex-start | flex-end | center | baseline;
        - 指flex子项们相对于flex容器在垂直方向上的对齐方式
        - baseline 表现为所有flex子项都相对于flex容器的基线对齐。

    + align-content
        - align-content: stretch | flex-start | flex-end | center | space-between | space-around | space-evenly;
        - 与justify-content相似且对立的属性，align-content则是指明垂直方向每一行flex元素的对齐和分布方式，flex子项只有一行，则align-content属性是没有任何效果

* 作用在flex子项上:
    + order
        - order: <integer>; /* 整数值，默认值是 0 */
        - order改变某一个flex子项的排序位置
        - 某一个flex子项在最前面显示，可以设置比0小的整数，如-1就可以了。
    + flex-grow
        - flex-grow: <number>; /* 数值，可以是小数，默认值是 0 不能为负数*/
        - 表示不占用剩余的空白间隙扩展自己的宽度。如果flex-grow大于0，则flex容器剩余空间的分配就会发生
        - 所有剩余空间总量是1、
        - 单个子项设置了flex-grow，大于1独享所有剩余空间、小于1则扩展的空间就总剩余空间和这个比例的计算值
        - 
    + flex-shrink
        - flex-shrink: <number>; /* 数值，默认值是 1 不支持负值*/
        - flex-shrink主要处理当flex容器空间不足时候，单个元素的收缩比例。
    + flex-basis
        - flex-basis: <length> | auto; /* 默认值是 auto */
        - 定义了在分配剩余空间之前元素的默认大小
    + flex
        - flex: none | auto | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
        - flex属性是flex-grow，flex-shrink和flex-basis的缩写。
        - 第2和第3个参数（flex-shrink和flex-basis）是可选的。默认值为0 1 auto。
    + align-self
        - align-self: auto | flex-start | flex-end | center | baseline | stretch;
        - 指控制单独某一个flex子项的垂直对齐方式
        - 继承自flex容器的align-items属性

* 其他
    + 在Flex布局中，flex子元素的设置float，clear以及vertical-align属性都是没有用的。
    + Flexbox布局最适合应用程序的组件和小规模布局（一维布局）
    + Grid布局则适用于更大规模的布局（二维布局）
    
### Grid


## less/sass
 * [less](css/less/less.md)
 * [sass](css/sass/readme.md)

## 基本js 
### 数据类型
* 6种原始类型（原始类型存储的都是值，是没有函数可以调用）
    + boolean
    + null
        - 空指针类型  没有指向任何一个对象 
    + undefined
        - 声明变量后不赋值
    + number
        - NaN 是 number 型 表示不是一个数字
        - ```javascript
            var a=123;
            var b="abc";
            console.log(typeof(a-b)) // NaN  number
            ```
        - infinity 是number 类型 表示无穷大 除数为0可得
    + string
    + symbol

* 类型检测几种方案
    + typeof
        - 对于原始类型来说，除了 null 都可以显示正确的类型
        - 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型
    + instanceof
        - 内部机制是通过原型链中是不是能找到该类型的prototype。
        - 一般来判断对象，不能直接用来判断原始类型
        - ```javascript
            var arr=[];
            Array.isArray(arr) // 有兼容性问题
            arr instanceof Array // 推荐使用
            ```
    + 可检测任意类型
        - ```js
            Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
           ```

* 类型转换
    + 隐式转换 变量在运算过程中发生的类型转换
      - console.log(!!"abc")

    + 显示（强制）转换:
       - 转字符串：对象转字符串 x.toString()
       - 转数字型：parseInt parseFloat
       - 转布尔型：
       - 几种转换为false undefined NaN Null 0 -0 false "",其余全为true

    > tip:使用parseInt(a,10)，否则会遇到0开头的八进制的问题，parseInt() 是解析而不简单的转换,简单的类型转换Number(08)=8 会比parseInt 快

   + == vs === 
       - == 如果对比双方的类型不一样的话，就会进行类型转换(判断流程如下)
        1. 首先会判断两者类型是否相同。相同的话就是比大小了
        2. 类型不相同的话，那么就会进行类型转换
        3. 会先判断是否在对比 null 和 undefined，是的话就会返回 true
        4. 判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number
        5. 判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断
        6. 判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断，对象转换成基础类型，利用它的toString或者valueOf方法
        ```javascript
        1. []==![] // true

            1）看见 ![ ]这个是要对空数组转成布尔类型结果得到![ ] = false,
            2) 发现此时符合第5条，即Number(false),结果为 Number(false) = 0。
            3）此时得到 [] == 0比较，此时符合第6条 即 [].toString()；结果为[].toString() = ” ”;
            4)此时得到 ” ” == 0,发现符合第4条即Number(“ ”)；结果为Number(” ”) = 0;
            5）此时得到 0 == 0 两个同时为数值类型比较所以结果为true;

        2. [] == false // true
            1) false -->Number(false),结果为 Number(false) = 0。
            2) []== 0-->[].toString() 结果为[].toString() = ” ”;
            3) ' '==0-->Number(' ') = 0;
            4)0==0 true
        ```
       - ===: 类型和值都相等

### js精度问题
1. number.toFixed(参数)  
    ```js
    parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true
    ```
2. 浮点型涉及精度问题：推荐都乘10最后除10 用整数运算（整数不存在精度问题）

### Math 对象常用几个函数
 * 天花板函数 ceil Math.ceil(1.23)=2 向上返回最小的整数
 * 地板函数 floor Math.floor(1.23)=1 向下返回最小的整数
 * 随机数
    - Math.random() 返回0-1 的随机数
    - Math.floor(Math.random()*10) 返回0-9 的随机数
 * Math.max() Math.min() 返回最大最小的值
 * Math.abs(x)返回一个绝对值
 * Math.round(x) 四舍五入
 
### 短路操作
* 执行过程(当操作数不是bool值时)
  1. 隐式转换
  2. 从左往右
  3. 哪个操作数可以决定结果，就返回这个原操作数

* 短路与&&
    - 只要有一个false，就返回 该 值false的子表达式的值
    - 短路与：可以保证某个变量有值，在参与运算
    - eg: Object.create&&Object.create(obj)

* 短路或||
    - 只要有一个true，就返回 该 值true的子表达式的值
    - 短路或：可以方便给变量赋初值

### 预解析（浏览器）
1. 语法分析：保证js代码符合语法规则，能被正确的执行。
2. 变量名以及函数名提升
3. 确定变量的作用域。

### 函数变量提升
>先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部
```javascript
    'use strict';
    function foo() {
        var x = 'Hello, ' + y;
        alert(x);
        var y = 'Bob';
    }
    foo();

    // 虽然是strict模式，但语句var x = 'Hello, ' + y;并不报错，原因是变量y在稍后申明了。
    // 但是alert显示Hello, undefined，说明变量y的值为undefined。
    // 这正是因为JavaScript引擎自动提升了变量y的声明，但不会提升变量y的赋值。

    // 变量提升后代码：
    function foo() {
        var y; // 提升变量y的申明
        var x = 'Hello, ' + y;
        alert(x);
        y = 'Bob';
    }     
    // 函数内变量的怪异声明模式:
    function fun(){
        num=10   //没写var 就相当于全局变量
    }

    fun()
    console.log(num) //10

```

### Var Let Const区别 
 - var 在浏览器预解析时存在变量提升，未声明可以使用
 - let 不存在变量提升,未声明就使用，会报错（暂时性死区),只在代码块内有效
 - const声明一个只读的常量。一旦声明常量的值就不能改变。


### date-format
 * 日期格式化成指定格式
    - new Date().format("yyyy-MM-dd hh:mm:ss")

 * 两日期间隔
    - d1.dateDiff(d2, 'd')

 * 获取当前时间戳
    (new Date()).getTime();

 * [封装常用时间处理](js/date-format.js)
 

## dom
### dom常用的节点类型
* nodeType = 1，元素节点
* nodeType = 2，属性节点
* nodeType = 3，文本节点
* nodeType = 8，注释节点
* nodeType = 9，document对象
* nodeType = 11，documentFragment文档片段

### 基础操作
* appendChild 
* removeChild 
* replaceChild 
* insertBefore

### 原生js获取样式 
    ```javascript
        // ie 不支持
        getComputedStyle(el,null).width 
        // ie提供的
        document.getElementById("btn").currentStyle.width 
    ```

### offset
 * offsetLeft
 * offsetTop 
 * offsetWidth 
 * offsetHeight 
 * offsetParent 

### scroll
 * scrollWidth（内部内容的真实宽度） 
 * scrollHeight 计算方式相同，
 * scrollTop 被卷曲的内容高度
 * scrollLeft 
    ```javascript
        // 获取卷曲的高度
        Window.onscroll= function(){
            //短路操作
            var topVal=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop
            var leftVal=window.pageYOffset||document.documentElement.scrollLeft||document.body.scrollLeft
        }
    ```

### client
 * clientHeight 
 * clientWidth（元素内部的真实宽度）

### innerWidth，innerHeight
- 视口宽度 window.innerWidth 和视口高度 window.innerHeight

  
### document.createDocumentFragment 
> 创建一个新的空白的文档片段
- 文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流(reflow)(对元素位置和几何上的计算)。因此，使用文档片段document fragments 通常会起到优化性能，兼容性良好

## bom
### html渲染过程
+ 浏览器接收服务器响应结果，如果有压缩则首先进行解压处理，紧接着就是页面解析渲染
+ 解析渲染该过程主要分为以下步骤：
    - 解析HTML

    - 构建DOM树

    - DOM树与CSS样式进行附着构造呈现树（渲染树）

    - 布局
        
    - 绘制

    - [详细参考](http://www.cnblogs.com/dojo-lzz/p/3983335.html)

### 重绘（Repaint）和回流（Reflow）
+ reflow:
    - 当DOM变化影响了元素的几何属性（宽、高改变等等） 浏览器此时需要重新计算元素几何属性 
    - 并且面中其他元素的几何属性可能会受影响 这样渲染树就发生了改变，也就是重新构造RenderTree渲染树

+ 具体场景：
    - 页面初始渲染
    - 添加/删除可见DOM元素
    - 改变元素位置
    - 改变元素尺寸（宽、高、内外边距、边框等）
    - 改变元素内容（文本或图片等）
    - 改变窗口尺寸

+ repaint:如果DOM变化仅仅影响的了背景色等等非几何属性 此时就发生了重绘（repaint） 不管页面发生了重绘还是重排，它们都会影响性能（重绘还好一些） 

+ 如何优化?
    - 分离读写操作（浏览器渲染队列优化）
    - 样式集中改变
    - 缓存布局信息
    - 元素批量修改

### document onload / window.onload / DOMCententLoaded的区别
* DOMCententLoaded事件：页面的文档结构（DOM树）加载完之后就会触发
* document.onload 是在结构和样式加载完才执行js
* window.onload：不仅结构和样式加载完，还要执行完所有的外部样式、图片这些资源文件，全部加载完才会触发

## 事件
### 事件冒泡和事件捕获   
* 事件冒泡：从里向外执行，遇到相同的事件及执行
* 事件捕获：执行顺序与冒泡相反（不推荐使用，因为ie使用attachEvent 没有第三个参数）

### 事件触发三阶段
1. window 往事件触发处传播，遇到注册的捕获事件会触发
2. 传播到事件触发处时触发注册的事件
3. 从事件触发处往 window 传播，遇到注册的冒泡事件会触发

### 事件注册/监听（避免事件被覆盖）
>ie9 以下不支持 false默认冒泡 true 捕获
* addEventListener
    + 第三个参数为bool,该参数默认值为 false(冒泡) ，useCapture 决定了注册的事件是捕获事件还是冒泡事件
    + 作为对象：
        - capture：布尔值，和 useCapture 作用一样
        - once：布尔值，值为 true 表示该回调只会调用一次，调用后会移除监听
        - passive：布尔值，表示永远不会调用 preventDefault
        ```javascript
            node.addEventListener(enventType,fn，false)

            btn.addEventListener("click",fun)
            // 移除事件监听(参数必须一致)
            btn.removeEventListener("click",fun)
                
            // ie-6-10(enventType 加on)
            node.attachEvent(enventType,fn)
            node.detachEvent(enventType,fn)
        ```
    + 阻止事件冒泡:(一般来说，如果我们只希望事件只触发在目标上)
        - ```js
            node.addEventListener(
                'click',
                e => {
                    // 阻止事件冒泡,也可以阻止捕获事件
                    e.stopPropagation() 
                    // 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。
                    e.stopImmediatePropagation()
                    console.log('冒泡')
                },
                false
            )

            // 点击 node 只会执行上面的函数，该函数不会执行
            node.addEventListener(
                'click',
                event => {
                    console.log('捕获 ')
                },
                true
            )
        ```

### 事件的对象(event.target)
 > 记录当前事件触发时的一些信息
 * btn.onclick=function(event){} 
    - event.target 真正触发事件的元素
    - event.type="click"
    - event.clinetX/clinetY 
    - ie 低版本不兼容 var tar = e.target||e.srcElement

### 事件代理/委托
 > 本质就是利用事件冒泡的原理，将事件绑定在父容器中，让父容器代为触发
 * 应用的场景：动态生成的子节点要注册事件，那么子节点需要注册事件的话应该注册在父节点上
 * 好处：
    1. 减少了事件的注册，内存开销减少了
    2. 元素的增减不会影响事件的绑定
    3. js和DOM节点之间的关联变少了，减少了因循环引用(GC中引用计数法的缺陷)而带来的内存泄漏发生的概率。

 * jq 早期 bind 绑定事件会出现一个问题及新创建的元素没有事件，后来用delegate解决1.7 版本后统一用on

 * 注意：
    - 不是所有的事件都有冒泡（blur、focus、load和unload），所以事件委托不是所有的事件都可用。
    - 例如mouseover 由于事件对象target 频繁改动会有性能问题

## 浏览器端存储
* cookie:如果用于保存用户登录态，应该将该值加密
    - 一般有服务器生成，可以设置过期时间
    - 容量较小，4kb 左右
    - 每次请求都会携带在header中
* localStorage
    - 一直存在，除非被清理
    - 容量5m 左右
    - 不参与服务器通讯
* sessionStorage
    - 用法类似localStorage
    - 页面关闭就清理
* indexDB
    - 浏览器端的数据库，不被清理一直存在

## 正则表达式
 * [正则表达式](note/reg.md)

## js面向对象
### 对象：
 + 什么是对象？
    - 无序属性的集合，可以看成键值对
 + 如何创建？
    - 字面量或者叫直接量
      var obj={};
    - 构造函数创建对象
        ```javascript
            function Student(name, age, sex) {
                this.name = name
                this.age = age
                this.sex = sex
                this.sayHi = function () {
                    console.log("你好" + this.name)
                }
            var s1 = new Student("小明", "12", "男");
        ```
 + 工厂模式创建对象 就是用一个方法实现对象的实例化
     ```javascript
         function initStu(name, age,sex) {
             return new Student(name, age,sex);
             }
         var obj=initStu();
         // 这种方式创建对象避免new的操作    
     ```   
 + 对象的属性
     - 两种访问方式：
         1. obj.propertyName  
         2. obj["propertyName"] __遍历属性并赋值时常用到  
     - 检测:(hasOwnProperty)
        1. 语法：<对象>.hasOwnProperty('propertyName')
        2. 功能：用来判断指定的属性是否为该对象自己拥有的，而不是继承下来的。
        3. eg:obj.hasOwnProperty("name") //true

### 函数
 + 创建
    1. 声明式
        function fn(){}
    2. 表达式
        var fn=function(){}
    3. 构造函数
        var fn = new Function([arg1~argN, body]);
        eg:var f = new Function('n', 'console.log(n);');

        * 构造函数的执行过程（调用new的过程）
            1. 创建一个空对象obj
            2. 将上面的创建的空对象obj赋值给this
            3. 执行代码块（给属性赋值等等）
            4. 隐式返回 return this
            5. 在构造函数中 有显示的return 语句，若返回值的类型是基本数据类型，会被忽略，复合数据类型不会    

 + 变量作用域
     - 变量的作用域：变量起作用的区域，也就说变量可以被访问到的区域。
     - 种类
         1. 全局变量，生命周期 是随着页面存在而存在，页面销毁而销毁。
         2. 局部变量，在函数内声明的变量，称为局部变量。 作用范围是在指定函数内，生命周期 是函数执行完毕就会被销毁。
     - 词法作用域：在js预解析阶段，确定变量的作用域。变量的作用域由 其定义的位置决定 而不是由其使用的位置。在词法作用域下，只有函数可以限定作用域。
     ___es6中新增了块级作用域let(详细参见es6)
     - 变量的搜索原则：类似下面的属性搜索原则，先在当前作用域，找不到然后上一层，最后到全局作用域。找不到抛异常。
             
 + 函数属性
     - arguments 
         * 伪数组对象
         * 以数组形式，存储实参
         * callee 返回正在被执行函数; 匿名函数的递归调用
         * length 实参个数
     - caller: 返回调用函数的 函数
     - length: 定义形参的个数
     - name: 存储函数的名字
         
 + 闭包：　
     - 实质：就是能够读取其他函数内部变量的函数。
     - 写法：
     ```javascript
         function foo() {
             var obj = {};                            
             return function() {
                 return obj;
             }  
         }
     ```           
     - 应用：
         1. 缓存：
             ```javascript
                 function outer() {
                         var cache;
                         function inner() {
                             // 代码块
                             // 使用cache
                         }
                         return inner;
                     }
                 var fn = outer();
             ```
         2. 私有变量：
             - 在ES5之前，不能设置对象属性的可读可写性。所以使用闭包来模式私有属性，来指定属性的可读可写
                ```javascript
                    function person(name) {
                        return {
                            getName: function() {
                                return name;
                            },
                            setName: function(val) {
                                name= val;
                            }
                        };
                    }
                ```
            + 闭包使用中的问题：
                - 本质上就是让数据常驻内存。如此，使用闭包就增大内存开销，使用不当就会造成内存泄漏。
                - 如何解决：使用完闭包后，及时清除。（将闭包变量 赋值为 null） 

 + 沙箱模式：
     - 防止全局变量和全局对象的污染，引出沙箱模式,实质就是匿名的自执行函数
     ```javascript
         (function(global){
             //代码块
             //自执行
             //在内部声明的变量与外部隔离
             //把常用的全局变量，当做实参传入进来
             //目的：1，减少变量的搜索过程，提高js 性能
             //     2,利于代码压缩
         }(window));
         // 一般开发插件时会用，jq
     ```
            

 + 函数调用和this指向
    1. 普通函数执行模式
        - 直接拿到函数的名字 加上 圆括号。
        - 在该模式下，函数内部this的指向为 window

    2. 构造函数模式
        - 调用函数时，配合着new关键字来执行某个函数，此时该函数的执行模式为 构造函数模式
        - 函数内部的this指向为 当前创建出来的实例。

    3. 方法调用模式
        - 将一个函数 赋值给 某个对象的属性，然后通过该对象去执行函数，此时该函数的执行模式为方法调用模式；
        - 在该模式下，this的指向为 方法的调用者

    4. call/apply/bind（上下文）模式
       > 这三都是改变this的指向,方法的第一参数即为 函数fn内的this指向   
        + fn.call(thisObj, [arg1~argN])

        + fn.apply(thisObj, [数组]);

        + bind 方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值
            - fun.bind(thisArg[, arg1[, arg2[, ...]]])
            - 返回值：返回由指定的this值和初始化参数改造的原函数拷贝

    5. 箭头函数
        - 箭头函数其实是没有 this 的
        - 箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this

### JSON 转换 
 * object-->string   JSON.stringify()
 * string--> object   JSON.parse()

### 对象类型和原始类型的不同?
 > 原始类型存储的是值，对象类型存储的是地址（指针）,根据该特性，我们以后会遇到一些问题
 * 函数参数是对象，外部变量的值发生了改变
    - ```javascript
        function test(person) {
            person.age = 26
            person = {
                name: 'yyy',
                age: 30
            }
            return person
        }
        const p1 = {
            name: 'yck',
            age: 25
        }
        const p2 = test(p1)
        console.log(p1) // -> ?
        console.log(p2) // -> ?
        // 解析：
        // 1. 传入的参数是p1的地址拷贝a1，age 赋值时，p1与a1指向的地址值已经被改了，此时age为26,p1的值为name:yck,age:26
        // 2. 之后重新把a1的指向地址改成了新的对象地址，并返回所以，p1的值为name:yck,age:26,p2的值为name:yyy,age:30

        ```

 * 深拷贝、浅拷贝
    >为了解决外部对象参数的值被修改
    + 浅拷贝
        >所谓的浅拷贝，只是拷贝了基本类型的数据，对于引用的类型数据，复制后也是会发生引用
        1. Object.assign
            - 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝。
            -  ```js
                let a = {
                    age: 1
                }
                let b = Object.assign({}, a)
                a.age = 2
                console.log(b.age) // 1
              ```
        2. 展开运算符 ... 
            - ```js
                let a = {
                 age: 1
                }
                let b = { ...a }
                a.age = 2
                console.log(b.age) // 1
              ```
    + 深拷贝
        > 利用递归,将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深复制的方法递归复制到新对象上
        > 通常浅拷贝就能解决大部分问题了，当对象属性也是对象的话，就要用深拷贝了
        1. 通常使用JSON.parse(JSON.stringify(object)) 来解决, 该方法也是有局限性
            - 会忽略 undefined
            - 会忽略 symbol
            - 不能序列化函数
            - 不能解决循环引用的对象
        2. 自己手动实现或者用loadash 等一些库


### prototype
 * 什么是原型？
    - 函数对象的prototype属性所引用的对象。

 * 原型的本质：就是对象。一般函数都有prototype属性，也就是说函数都有原型。
    - 声明一个函数时，原型就随之而产生。此时默认原型 是一个空对象。但是具有一个默认的属性constructor，该属性指向其构造函数

 * 原型的特性：
    1. 在原型上的成员(属性和方法),都可以直接被其实例访问，object 是基原型

    2. 实例不可以直接修改原型上的任何成员

    3. 动态性
        * 如果在原有的原型上扩展成员，会直接反应到 已创建的对象和之后创建的对象上。
        * 如果替换了原有的原型，新原型的成员 在之前已创建的对象是不能访问到的，而在之后创建的对象是可以访问到的。
        * 如果置换了原型，就可能会在新的原型上丢失默认的constructor属性,如果想要其有该属性，就只能自己手动添加上。

    4. 所有的实例 只能共享一个原型。

 * 获取原型的方式：
    - 通过函数：<fnName>.prototype
    - 通过对象：<object>.__proto__ ，__proto__  是浏览器中的，是一个非标准属性；

 * 原型链：
    - 原型的本质是对象，那么就具有__proto__的属性，所以原型对象也有原型。通过这个属性一层层找下去，就是当前对象的原型链。
    - 原型链的尽头 Object.prototype 所以js实现继承就靠原型链

 * 对象的属性搜索原则：
    - 首先找自己，若找到，停止搜索直接使用，否则一层层往原型上找，找到，停止搜索，直接使用，一直到 Object.prototype上 如果找到 就返回该属性的值，如果依然没有找到，就返回undefined。

 * Object.prototype 上的一些方法
    + hasOwnProperty方法
        - 语法：<对象>.hasOwnProperty('propertyName')
        - 功能：用来判断指定的属性是否为该对象自己拥有的，而不是继承下来的。

    + propertyIsEnumerable
        - 语法：<对象>.propertyIsEnumerable("propName")
        - 功能：可枚举 指定的属性是对象本身的。

    + isPrototypeOf
        - 语法：<对象a>.isPrototypeOf(对象b)
        - 功能：判断对象a是不是对象b的原型

    + valueOf
        - 语法: <对象>.valueOf()
        - 功能：将指定对象类型的数据 转换成 基本数据类型
        + 规则：
            - 如果该对象是 基本数据的包装类型 会转换成 其对应的基本数据类型
            - 否则为其他对象类型，就直接返回该对象。

 * instanceof 
    - 语法：<对象> instanceof 函数
    - 功能：判断对象 是否为 指定函数的实例
    - 运算规则:若函数的原型，出现在该对象的原型链上 表达式返回true 否则false 

 * eval方法
    - 可以使用eval来将json字符串 转换成 js对象。
    - 在没有严格模式，eval可以随意指定一段字符串来当做js代码来执行。
        * 脚本注入
        * 全局变量以及全局对象污染
        * eval创建变量的作用域 是由eval执行的作用域决定。 
    - 已不推荐使用。JSON.parse()

### 原型继承和Class继承
* 利用原型实现继承
    1. 实例继承原生原型对象
        ```javascript
            function Fn() {}
            Fn.prototype.name = 'qm';
            var obj = new Fn();
        ```
    2. 实例继承自定义的原型对象
        ```javascript
            function Fn() {}
            Fn.prototype={name:'qm'};
            var obj = new Fn();
        ```
    3. 组合式继承(开发中常用的)
        ```javascript
            function Parent(value) {
                this.val = value
            }
            Parent.prototype.getValue = function() {
                console.log(this.val)
            }
            function Child(value) {
                Parent.call(this, value)
            }
            Child.prototype = new Parent()
            // Child 默认原型为空对象,constructor指向期构造函数
            // 置换了原型，就可能会在新的原型上丢失默认的constructor属性,如果想要其有该属性，就只能自己手动添加上。
            Child.prototype.constructor = Child;
            const child = new Child(1)

            child.getValue() // 1
            child instanceof Parent // true
            // 原理：在子类的构造函数中通过 Parent.call(this) 继承父类的属性，然后改变子类的原型为 new Parent() 来继承父类的函数
            // 优点: 构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数
            // 缺点: 就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费
        ```
    4. es5 提供的Object.create(obj) 的经典继承   
        ```javascript
            var obj = Object.create(obj1);
            // 原理是置换原型
            var create = function (obj) {
            if (!Object.create) {
                Object.create = function (obj) {
                    function F() { }
                    F.prototype = obj
                    return new F()
                }
            } else {
                return Object.create(obj)
            }
            }
        ```

    5. 寄生组合继承
        > 该继承方式，解决了继承父类函数时调用了构造函数，多了无用的父类属性问题。
        ```javascript
            function Parent(value) {
                this.val = value
            }
            Parent.prototype.getValue = function() {
                console.log(this.val)
            }

            function Child(value) {
                Parent.call(this, value)
            }

            Child.prototype = Object.create(Parent.prototype, {
                constructor: {
                    value: Child,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            })

            const child = new Child(1)

            child.getValue() // 1
            child instanceof Parent // true

            // 以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。

        ```

* class 继承
  > JS 中并不存在类，class 只是语法糖，本质还是函数。
  > 可证明
    ```js
        class Person {}
        Person instanceof Function // true


        class Parent {
            constructor(value) {
                this.val = value
            }
            getValue() {
                console.log(this.val)
            }
        }

        class Child extends Parent {
            constructor(value) {
                super(value) //可以看成 Parent.call(this, value)
            }
        }
        let child = new Child(1)
        child.getValue() // 1
        child instanceof Parent // true
    ```

## 模块化
 > ES6 之前，js没有module，不利于大程序的开发，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于node，后者用于浏览器。
 * 为什要模块化(有什么好处)
    - 解决命名冲突
    - 提供复用性
    - 提高代码可维护性

 * 有哪些模块化的方案
    + 沙箱模式(实质是匿名的立即执行函数)
        - 在早期，使用立即执行函数实现模块化是常见的手段，通过函数作用域解决了命名冲突、污染全局作用域的问题
        - 例如jq插件开发

    + AMD 和 CMD
        - 现在很少看到
        - 用法如下
            ```javascript
                // AMD
                define(['./a', './b'], function(a, b) {
                    // 加载模块完毕可以使用
                    a.do()
                    b.do()
                })
                // CMD
                define(function(require, exports, module) {
                    // 加载模块
                    // 可以把 require 写在函数体的任意地方实现延迟加载
                    var a = require('./a')
                    a.doSomething()
                })
            ```

    + CommonJS
        - module.exports/require
        - 语法如下:
            ```javascript
                let { stat, exists, readFile } = require('fs');
                // 等同于
                let _fs = require('fs');
                let stat = _fs.stat;
                let exists = _fs.exists;
                let readfile = _fs.readfile;
            
            // 上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。
            // 这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
            
            ```
        - module.exports是全局的对象 可简写成exports，
        - node 帮我们实现了var exports=module.exports，exports 就是 module.exports 的别名，初始值是空对象
        
    + es module
        - export/import
        - 语法:
            ```javascript
                // ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。
                import { stat, exists, readFile } from 'fs';

                // 上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。
                // 这种加载称为“编译时加载”或者静态加载，效率要比 CommonJS 模块的加载方式高。
                // 当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
            ```
        - ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";


 * ES6 模块与 CommonJS 模块的差异
    - es module 在编译时输出值的引用，CommonJS 在运行时输出一个值的拷贝
    - CommonJS 是同步导入，es 是异步的

 * (模块)包管理
    - bower
    - npm 
    - yarn

## 一些函数(es5/es6)
 * Array 的常用函数
    + forEach
        ```javascript
            var arr = [1, 2, 2, 2, 2, 6, 9]
            var sum = 0
            arr.forEach(function (value,i,a) {
                sum += value
            })
        ```

    + map
        ```javascript
        // 类似foreach 有返回值 返回一个新数组
        arr.map(function (x) {
            return x + 1
        })
        ```

    + filter 过滤器
        ```javascript
            //返回指定条件的新数组
            arr.filter(function (x) {
                return x < 2
            })
        ```

    + some
        ```javascript
        //空数组时 some 返回false every 返回true
        // some 存在一个满足条件就返回true
        arr.some(function (x) {
            return x == 2   //true
        })
        ```

    + every
        ```javascript
            //返回true false 
        arr.every(function (x) {
            return x > 10 //false
        })
        ```

    + indexOf
        ```javascript

        ```

    + reduce
        ```javascript
            // reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

            // reduce() 可以作为一个高阶函数，用于函数的 compose。

            // 注意: reduce() 对于空数组是不会执行回调函数的。
            var numbers = [65, 44, 12, 4];
        
            function getSum(total, num) {
                return total + num;
            }
            function myFunction(item) {
                document.getElementById("demo").innerHTML = numbers.reduce(getSum);
            }
        ```

    + sort
        * Array的sort()方法默认把所有元素先转换为String再排序，如果直接排序数字你就踩坑了
        * 默认 按照根据ASCII码进行排序
        * sort 是一个高阶函数，sort（function(){
            // 写具体的实现逻辑
        }）
        * 升序
            ```javascript
            sort(function(a,b){
                return a-b
            })
            ```
        * 降序
            ```javascript
            sort(function(a,b){
                return b-a
            })
            ```

 * String
    + includes startsWith endsWith()
      ```js
        let s = 'Hello world!';
        s.startsWith('Hello') // true
        s.endsWith('!') // true
        s.includes('o') // true
        // 这三个方法都支持第二个参数.表示开始搜索的位置。
      ```

 * Object

## es6对js的扩展
- [es6](ECMA/es6.md)

## js GC:      
 * 引用计数法
    - 当定义一个变量 （此时引用计数为0）并且 赋值为指定的数据时，该变量的引用计数 + 1；
    - 如果该数据，有其他对象或函数使用，引用计数 + 1；
    - 如果使用该数据的对象或函数，被GC回收掉，那么引用计数 - 1；
    - 如果该变量手动赋值为null，此时引用计数 - 1；
    - 当GC对象寻访到该变量时，如果计数为0，GC对象就直接回收该变量所占用的内存。
    - 如果函数正在执行或还没有执行完毕，内部定义的数据都是不可回收的，不论引用计数是否为0。
    - 引用计数的缺陷：容易产生循环引用，导致变量无法被GC回收。

 * 标记清除法
    - 从文档的根节点（window对象）出发，找到至少一条路径可以到达该变量，那么该变量被标记为 “不可回收”；否则，该变量标记为 “可回收”。
    - 当GC对象寻访到该变量，如果被标记为 “可回收”，那么，就会立即回收掉其所占用的内存。

    - 标记清除法的缺陷：性能比较低。

 * 当代浏览器，同时使用两种机制。优先使用引用计数法，在相隔一定周期后使用标记清除法来释放变量的内存空间。

 * 区别与联系
    - 前者性能较高，但是有循环引用的缺陷
    - 后者性能较低，但是不会产生循环引用问题
    - 在当代浏览器配合两种机制，去释放变量的内存空间。


## 进程和线程
 * 进程
    - 每一个正在运行的应用程序都被称之为进程
    - 每一个应用程序都至少有一个进程
    - 进程是用来给应用程序体用一个执行的环境，给应用程序分配资源的一个单位

 * 线程
    - 用来执行应用程序中的代码
    - 在一个进程内部，有很多的线程

## js执行机制
 * JS 执行是单线程的，它是基于事件循环的。

 * js语言为什么设计成单线程的？
    - 避免多线程操作同一文件（资源）产生冲突。
    - 提高js性能

 * Event Loop（浏览器）
    1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

    2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

    3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，放入执行栈，开始执行。

    4. 主线程不断重复上面的第三步。
    主线程的执行过程就是一个 tick，而所有的异步结果都是通过 “任务队列” 来调度。 消息队列中存放的是一个个的任务（task）。

 * 规范中规定 task 分为两大类，
    +  macro task（宏任务） 
        - process.nextTick（Node 独有）
        - promise 
        - MutationObserver
        
    + micro task（微任务）
        - 并且每个 macro task 结束后，都要清空所有的 micro task。
        - script 
        - setTimeout 
        - setInterval
        - setImmediate 
        - I/O 
        - UI rendering

## js异常
>js中所有的异常都是Error的实例，可通过构造函数，自定义一个异常对象
 * EvalError  运行时异常。 eval 函数调用时发生的异常
 * RangeError 运行时异常 超出数据范围
 * ReferenceError 运行时异常 未定义变量
 * SyntanxError  预解析,语法错误
 * typeError 运行时异常，类型异常
 * URIError 运行时异常 在执行encodeURI 和 decodeURI 时抛出的异常

## js.map 文件是干啥的？
源代码xx.js文件经过uglify压缩之后变为xx.min.js；同时会生成一个文件叫做xx.js.map，这个map文件描述了代码压缩前后的映射关系，在线上代码出了bug之后，用于查找问题是很有用的。因为压缩代码经过了一些列处理几乎是看不懂的。

## 移动端
### 事件
 * 移动端touch事件
    - 当用户手指放在移动设备在屏幕上滑动会触发的touch事件
    - touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指
    - touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
    - touchend——当手指离开屏幕时触发
    - touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用

 * TouchEvent说明：
    + touches：屏幕上所有手指的信息
        - targetTouches：手指在目标区域的手指信息
        - changedTouches：最近一次触发该事件的手指信息
        - touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息

        + 参数信息(changedTouches[0])
            - clientX、clientY在显示区的坐标
            - target：当前元素

    + 事件响应顺序
        - ontouchstart  > ontouchmove  > ontouchend > onclick

### 移动端适配
 * [适配](mobile/适配/readme.md)

## framework
> 前端常用的框架（方式不同，本质都是操作dom）   
### 数据驱动式
 * [angular1](angular1/angular-base.html)
 * [angular2](angular2/angular.md)
 * [vue](vue/vue.md)
 * [react](react/readme.md)

### 手动式
 * [jq](jq/readme.md)
 * zepto

## 跨平台技术
 * [Hybrid-App](/Hybrid-App/cordova.build.app.md)
 * [微信小程序](wx/readme.md)
 * react native
 * weex/uni-app
 * flutter

## 前端安全
 * xss
    - 一般通过一段代码注入到网页中
    - 场景：在评论中如果前后端不做处理，输入<script>alert('操')</script>
    + 防御：
        - 简单的通过转义字符对于引号、尖括号、斜杠进行转义
        - ```js
            function escape(str) {
                str = str.replace(/&/g, '&amp;')
                str = str.replace(/</g, '&lt;')
                str = str.replace(/>/g, '&gt;')
                str = str.replace(/"/g, '&quto;')
                str = str.replace(/'/g, '&#39;')
                str = str.replace(/`/g, '&#96;')
                str = str.replace(/\//g, '&#x2F;')
            return str
            }
            ```
        - 对于富文本通常用白名单、黑名单方式
        - ```js
            const xss = require('xss')
            let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
            // -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
            console.log(html)
            // 以上示例使用了 js-xss 来实现，可以看到在输出中保留了 h1 标签且过滤了 script 标签。
           ```
        - csp 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行
        - 开启csp:
            1. 设置 HTTP Header 中的 Content-Security-Policy
            ```html
                <!-- 只允许加载本站资源 -->
                Content-Security-Policy: default-src ‘self’
                <!-- 只允许加载 HTTPS 协议图片 -->
                Content-Security-Policy: img-src https://*
                <!-- 更多规则参考mdn -->
            ```
            2. 设置 meta 标签的方式 <meta http-equiv="Content-Security-Policy">
 * CSRF
    - 中文名为跨站请求伪造,原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求
    - 场景：假设网站中有一个通过 GET 请求提交用户评论的接口，那么攻击者就可以在钓鱼网站中加入一个图片，图片的地址就是评论接口
    防御：
        - Get 请求不对数据进行修改
        - 不让第三方网站访问到用户 Cookie
        - 阻止第三方网站请求接口
        - 请求时附带验证信息，比如验证码或者 Token
        - 对于需要防范 CSRF 的请求，我们可以通过验证 Referer 来判断该请求是否为第三方网站发起的。
 * 点击劫持
    - 攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。
    - 防御：X-FRAME-OPTIONS  是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。
    - DENY，表示页面不允许通过 iframe 的方式展示
    - SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
    - ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示
 * 中间人攻击 
    - 通常来说不建议使用公共的 Wi-Fi，中间人攻击拦截得到敏感信息
    - 通常使用https建立安全的通道



## 前端的工程化
### 构建与打包工具
 * [gulp](build-tool/gulp/readme.md)
 * [webpack](build-tool/webpack/readme.md)

### 测试

### ci/cd

### 监控

## 前端优化
### 测试性能工具Chrome(Audits)

### Wepack构建优化(spa)

### 首屏优化(spa) 

### DNS 预解析
* DNS 解析也是需要时间的，可以通过预解析的方式来预先获得域名所对应的 IP。
    ```html
        <link rel="dns-prefetch" href="//xxx.com">
    ```
### 节流

### 防抖

## 环境和工具
### mac 
 * brew[官网](http://brew.sh/index_zh-cn.html)
 
 * 安装:
    ``` 
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

 * brew
    - brew install 软件名  brew uninstall  软件名称
    - brew list 可以查看所有安装的软件
    - brew info 软件名

### 开发工具：vscode 
 * 前端本地服务端调试
   - npm install -g live-server 
   - 安装报错就用npm install live-server -gf安装，
   - [详情](https://github.com/tapio/live-server#readme)

 * eslint
    - 是nodejs编写，提供一种代码编写规范。
    - 对代码静态分析，不用执行就可以查找不符合语法规则的代码。
    - 可以自定义代码编写的规则

    - 先全局或者本地安装
      npm i -g eslint
    - vscode 中 安装eslint 插件
    - terminal 中执行 eslint --init
    - [vscode use](http://www.cnblogs.com/IPrograming/p/VsCodeESLint.html)
    - [配置](note/eslint.md)
    - [参考](http://eslint.org/)

 * Emmet(快捷编写html，vscode 内置了该功能)
    ```css
        div.className
        div#idName
        div.className#idName
        h1{text}
        a[href="#"]
        ul>li*3>a[href="#"]
    ```

 * 好用的插件
    - css formatter
    - file-size
    - html css support
    - minapp 
    - npm intellisense
    - open in browser
    - output colorizer
    - path intellisense
    - vetur
    - vscode-icons
    - vueHelper

### 前端的工具
* Fontmin/字蛛
* ImageOptim
* charles/fiddler
* 文档工具
    - dash
    - zeal

### git
* [git基本使用](git/readme.md)

## spa/mba(单页和多页开发)

## chrome插件的开发
 * 首先要有一个manifest.json清单文件
    - [参数列表](http://chrome.liuyixi.com/manifest.html)
 * 在清单文件中提供了代码文件
 * 插件完成后，将其导入到Chrome中
    - 首先将所有相关文件都放到一个文件夹中
    - 用Chrome打开chrome://settings/extensions 这个网址是Chrome的扩展程序管理页面。点击“加载正在开发的扩展程序”，选择刚才创建的文件夹，- 确定，即成功导入。如果导入出错会有提示信息显示，可能是json文件配置有问题等。


## 数据图表
- [echarts](https://echarts.baidu.com/examples/index.html)
- [highcharts](https://www.highcharts.com.cn/)

## canvas/webGL
 * [canvas基本使用](canvas/canvas-base.html)
 * three.js

## webVR

## WebAssembly

## node
 * [node](node/README.md)

## linux
[linux](linux/readme.md)

## docker
* [docker](docker/readme.md)

## 模式
    - 设计模式:相对于强类型语言研究的，没必要强制的用在js中，js中可能有更好更简单的方法。
    - 编码模式:js 特有的模式
    - 反模式:常见的，引发问题比解决问题更多的一种方法
    - [js中的设计模式](desin/-patterns/)

## tree 目录生成命令
 1. 安装 :brew install tree  ||  apt-get install tree
 2. exmple: tree -L 3 -I "node_modules"
    - tree -d 只显示文件夹；
    - tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3；
    - tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"；
    - tree > tree.md 将项目结构输出到tree.md这个文件。

## 最后一些思考或者疑问
> 一个纯前端到底要做的是什么样的工作？难道仅仅停留在ui 层面吗？前端开发者的核心价值是什么？或者说自己能够提供的不可替代的价值是什么？（这些问题暴露了一些自己和同行的一些忧虑）


