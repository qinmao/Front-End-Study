# flex 伸缩布局
## flex容器:
  - 给 div 这类块状元素元素设置 display:flex
  - 给 span 这类内联元素设置 display:inline-flex (flex子项 类似行内块的概念，自适应宽度)
  - 这些元素称为flex容器，里面的子元素称为flex子项。
## flex布局相关属性分为两拨：
  - 一拨作用在flex容器上，一拨作用在flex子项上
  - 都是控制的flex子项的呈现，前者控制的是整体，后者控制个体。
## 作用在flex容器上:
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
       - 与justify-content相似且对立的属性，align-content则是指明垂直方向每一行flex元素的对齐和分布方式，flex子项只有一行，则align-content属性是没有任何效果
## 作用在flex子项上:
+ order
    - order: <integer>; /* 整数值，默认值是 0 */
    - order改变某一个flex子项的排序位置
    - 某一个flex子项在最前面显示，可以设置比0小的整数，如-1就可以了。
+ flex-grow
    - flex-grow: <number>; /* 数值，可以是小数，默认值是 0 不能为负数*/
    - 表示不占用剩余的空白间隙扩展自己的宽度。如果flex-grow大于0，则flex容器剩余空间的分配就会发生
    - 所有剩余空间总量是1、
    - 单个子项设置了flex-grow，大于1独享所有剩余空间、小于1则扩展的空间就总剩余空间和这个比例的计算值
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
## 其他
  + 在flex布局中，flex子元素的设置float，clear以及vertical-align属性都是没有用的。
  + flexbox布局最适合应用程序的组件和小规模布局（一维布局）