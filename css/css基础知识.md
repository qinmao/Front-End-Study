# CSS 的核心基础知识
## 三大特性：
 - 层叠性
 - 继承性
 - 优先级: 标签选择器 < 类选择器 <  ID选择器 < 行内样式 <! Important

## margin
+ 垂直外边距合并（同正取最大值，同负取绝对值最大值，一正一负相加的和）
+ 如何解决垂直外边距塌陷（margin-top  父元素会掉下来）？
  - 给父元素设置边框
  - 给父元素设置overflow：hidden；(注意：会触发父元素的bfc(格式化上下文)

## padding
+ 特殊性：
  - 在块级元素中，如果默认子元素没有设置宽度，给当前子元素设置padding值，不会影响当前子盒子的宽度。（“继承”的盒子padding值不会影响）

## float
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

## position
 + 静态（static）
     - 标准流下的显示方式，
     - 可转换成其他定位方式

 + 绝对 （absolute）：
     * 标准流下的盒子，以body为参照
     - 除了父盒子设置static ，其他定位方式，子盒子以父盒子为参照
     - 绝对定位的元素脱标
     - 实现模式转换的效果
     - 使用场景：1. 盒子压盒子 2. 绝对定位可以使用 margin padding

 + 相对（relative）：
     - 相对自己作为参照
     - 不会脱标
     - 通常使用 子绝父相
     
 + 固定（fixed）：
     - 以body标签可视区域作为参照
     - 脱标
     - 实现模式转换的效果

 + 粘性 sticky（存在兼容性问题）
     - 可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位

 + z-index
     - 定位的元素有层级关系
     - 只有给定位的元素才能设z-index
     - 特点:
         - 元素设置定位后有个默认的z-index ：auto（除去static）
         - z-index 值相同 元素后来居上
         - z-index 值越大 当前的元素层级越高
         - 父元素的z-index值越大 当前的元素层级越高  

## display:
 + block
     - block元素会独占一行，默认情况下，block元素宽度自动填满其父元素宽度
     - 可设置width height
     - 可以设置margin和padding属性

 + inline-block
     - 有宽高
     - 呈现inline 的效果

 + inline
     - 不会独占一行，多个相邻的行内元素会排列在同一行里
     - inline元素设置width,height属性无效
     - inline元素的margin和padding属性 水平有效，垂直方向没效

 - 块级：div、p、ul、ol、body、from...
 - 行内：title、lable 、span、a
 - 行内块：img 、input 、td
 - 常见的空元素：
        <br> <hr> <img> <input> <link> <meta>
        鲜为人知的是：
        <area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>
        
## 标准盒模型
 + 标准盒子模型：
   - 宽度=内容的宽度（content）+ border + padding + margin
   - 低版本IE盒子模型：宽度=内容宽度（content+border+padding）+ margin

 + box-sizing 用来控制元素的盒子模型的解析模式，默认为content-box
    - content-box：盒子的尺寸=CSS中的尺寸+padding+border
    - border-box：盒子的尺寸=CSS中的尺寸=padding+border+可变的内容尺寸

## 透明色     
1. rgba
2. opacity 能继承 取值0-1
3. transparent 完全透明
4. hsla
 - h 色调
 - s 饱和度0-100%
 - l 亮度 0-100%
 - a alpha 透明度
 
## word-break
* word-break 指定了怎样在单词内断行。normal | break-all | keep-all | break-word
  - [word-break 详细](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break)
  + 参数说明：
   - normal：使用默认的断行规则。
   - break-all：对于non-CJK (CJK 指中文/日文/韩文) 文本，可在任意字符间断行。
   - keep-all：CJK 文本不断行。 Non-CJK 文本表现同 normal。