# CSS3
## 选择器
 * 属性：
    - E[attr=val]
    - E[attr]
    - E[attr^=val] 属性值以val开头
    - E[attr$=val] 属性值以val结尾
    - E[attr*m=val]属性值含有val,不管在什么位置
    
 * 伪类：
    - E:first-child 选中父元素中的第一个E子元素
    - E:last-child  选中父元素中的最后一个E子元素
    - E:nth-child(n)  选中父元素中第n个子元素（元素0开始，n从0开始）n(数字，表达式 -5+n,2n+1,odd,even)
    - E:nth-last-child(n)  选中父元素中倒数第n个子元素（元素0开始，n从0开始）

    - E:empty 选中内容为空，或没有子元素
    - E:target    选中锚点的的目标元素
    - E:not(选择器)
    ```css
      /* 示例 */
     p:first-child   
     /* 先找父元素 找到所有的子元素  在去找第一个子元素  匹配是不是p  如果不是无效的选择器 */
     p:first-of-type 
     /* 先找父元素 找到所有的p元素  找第一个 */
     p:last-of-type 
     /* 最后一个 */
     p:nth-of-type()
     /* 第几个 */
     p:nth-last-of-type 
     /* 倒数第几个 */
    ```        

* 结构选择器：+ ~
  - E[attrxxxx]+E   选择当前的元素 然后找到相邻的下一个元素
  - E[attrxxxx]~E   选择当前的元素 然后后面所有的元素    
   
## 伪元素：
 *  :before :after 推荐单冒号兼容性好       
    
 * 出现省略号：
   - white-space:nowrap;
   - overflow：hidden;
   - text-overflow：ellipsis;

 *  选中
    - ::first-letter 选择首字母
    - ::first-line   第一行
    - ::selection    选中的区域  只能变color 和 background-color  

## 阴影
* text-shadow(文字阴影): 水平位移  垂直位移  模糊程度 颜色
   - 水平位移 值越大越往右 反之往左
   - 垂直位移 值越大越往下 反之往上
   - 模糊程度 值从0开始，越大越模糊
    
* box-shadow(盒子阴影):水平位移  垂直位移  模糊程度 扩展半径 颜色 内阴影（inset）
    - 扩展半径  可以为负值，值越大，扩展半径越大
    - 内阴影  inset(可选)

## 边框
 * border-radius
    - border-radius:x x x x/y y y y
    - 正圆:border-radius:50%;

 * border-image
    - border-image-source:url();
    - 切割图片 border-image-slice:
    - border-image-repeat:round;

## 背景
 * background-image(支持多张图)：
   - url("images/bg1.png") left top,
   - url("images/bg2.png") right top,
   - url("images/bg3.png") right bottom,
   - url("images/bg4.png") left bottom,
   - url("images/bg5.png") center center;

 * background-size:
   - 数字/百分比，
   - cover 完全覆盖整个元素，不考虑图片内容是否损失
   - contain 完全显示图片，不考虑是否覆盖整个元素

 * background-origin 
   - 背景原点(默认是padding-box)
    
 * background-clip 
   - 背景图片的显示位置

## 渐变
 * linear-gradient(线性渐变)([ <angle> | to <side-or-corner> ,]? <color-stop> [, <color-stop>]+ )
            where <side-or-corner> = [left | right] || [top | bottom]
            and <color-stop>     = <color> [ <percentage> | <length> ]?

        ```css
            background-image:linear-gradient(45deg,#D1EE4D,#1ABF22,#F389B7);}
            /* 45度三色线性渐变，初始值为黄色，中间值为绿色，结束值为粉色。角度可以设置负数
            没有设置颜色的具体位置时，三个色块默认平均分布。*/

            background-image:linear-gradient(#F8F86D,#239C23 50%,#298C1E 51%,#D1E710)
            background-image:linear-gradient(to right,red,orange,yellow,green,cyan,blue,purple)
            background-image:linear-gradient(to bottom right,red,yellow)
            background-image:linear-gradient(to bottom left,#FC3,rgba(255,255,255,0))

            background:linear-gradient(to bottom left,#FC3,rgba(255,255,255,0)),url(images/1957.jpg)

            /* 不设置任何的角度和方位，则默认是从上往下。可以为某个颜色设置具体的位置，可以是百分比，或者是具体的像素*/
        ```

 * 径向渐变: background-image:radial-gradient(20px at 10px,red,green);
        
 * [参考](http://www.mrszhao.com/post/58.html)

## 过渡
* transition:过渡属性     过渡时间        过渡延迟     过渡速度
   - transition-property 
   - duration     
   - delay    
   - transition-timing-function:ease 、linear 、 ease-in 、ease-in-out
   - example
   ```css
    transition: all 0.2s
    /*过渡all所有变化的属性  0.2s代表属性从初始变化到结束所用的时间*/

   ```

* transitionend
    ```js
    node.addEvertListen('transitionend',()=>{
        //do something
    })
    ```

* cubic-bezier:
    贝塞尔曲线 是animation-timing-function 和 transition-timing-function 中一个重要的内容。
    主要是为 animation 生成速度曲线的函数，规定是 cubic-bezier(<x1>, <y1>, <x2>, <y2>)。

* 2D转换:
    * 位移 translateX(),translateY(),translate(X,Y)
    * 旋转 rotate 值越大 是顺时针 反之则逆时针
    * 缩放 scale   值越大 放大 反之缩小
    * 倾斜 skewX skewY skew

* 3D转换：
    * translateZ() translate(X,Y,Z)
    * 视角：perspective
    * 3d转换：transform-style:flat 2d平面呈现 perserve-3d 3d空间呈现 

## 动画:
* 定义动画：
    ```css
    /* 2种方式*/
    @keyframes 动画名称{
        0%{}
        25%{}
        50%{}
        75%{}
        100%{} 
    }
    from{},
    to{} 
    /* 类似0%-100% */
    ```

* 调用动画 
  + animation: animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count, animation-direction 和 animation-fill-mode.
    - 动画名称     animation-name  自定义的
    - 动画总时间   animation-duration 时间
    - 动画延迟     animation-delay    时间
    - 动画速度     animation-timing-function  ease ease-in  ease-in-out linear steps(n)
    - 动画次数     animation-iteration-count  数字  infinite(无限循环)
    - 动画播放状态   animation-play-state    running  paused
    - 动画完成时的状态 animation-fill-mode  backwards回到最初  forwards停留在最后完成时的态 none(default)不改变任何样式 both 动画将会执行 forwards 和 * * backwards 执行的动作
    -  动画方向    animation-direction    reverse（反方向）

* 事件:animationend

* requestAnimationFrame 请求动画帧
  - 描述：告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。使用一个回调函数作为参数，该回调函数会在浏览器重绘之前调用。

  - 语法：window.requestAnimationFrame(callback);

  - 返回值：一个 long 整数，请求 ID ，是回调列表中唯一的标识。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。
 
  - 优点：运行在后台标签页或者隐藏的iframe 里时，requestAnimationFrame() 暂停调用以提升性能和电池寿命。

## em rem vw/vh:
* em:的基准值  16px  默认的字体大小是16px,基准值是相对于父元素来的

* rem:的基准值  16px  默认的字体大小是16px
 - r 是root  根元素的意思  html文档的根元素是  html标签
 - 基准值是相对于来根元素（html）来的

* vw:是基于Viewport视窗的长度单位，这里的视窗（Viewport）指的就是浏览器可视化的区域，而这个可视区域是window.innerWidth/window.innerHeight的大小
 - vw：是Viewport's width的简写,1vw等于window.innerWidth的1%
 - vh：和vw类似，是Viewport's height的简写，1vh等于window.innerHeihgt的1%
 - vmin：vmin的值是当前vw和vh中较小的值
 - vmax：vmax的值是当前vw和vh中较大的值

## media 
 ```css
 @media (min-width: 750px) {
    html {
        font-size: 100px;
    }
 }
 ```

## flex
* flex容器:
  - 给div这类块状元素元素设置display:flex
  - 给span这类内联元素设置display:inline-flex
  - 这些元素称为flex容器，里面的子元素称为flex子项。

* Flex布局相关属性分为两拨：
  - 一拨作用在flex容器上，一拨作用在flex子项上
  - 都是控制的flex子项的呈现，前者控制的是整体，后者控制个体。

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
       - justify-content: flex-start | flex-end | center | space-between |space-around | space-evenly;
       - 属性决定了水平方向子项的对齐和分布方式
       - around是环绕的意思，意思是每个flex子项两侧都环绕互不干扰的等宽的空白间距，最终视觉边缘两侧的空白只有中间空白宽度一半
       - evenly是匀称、平等的意思。也就是视觉上，每个flex子项两侧空白间距完全相等
   + align-items
       - align-items: stretch（默认值，子项拉伸） | flex-start | flex-end | center |baseline;
       - 指flex子项们相对于flex容器在垂直方向上的对齐方式
       - baseline 表现为所有flex子项都相对于flex容器的基线对齐。
   + align-content
       - align-content: stretch | flex-start | flex-end | center | space-between |space-around | space-evenly;
       - 与justify-content相似且对立的属性，align-content则是指明垂直方向每一行flex元素的齐和分布方式，flex子项只有一行，则align-content属性是没有任何效果

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
    
## Grid

 