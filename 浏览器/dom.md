# dom 基础知识
## 什么是DOM，如何访问
- 文档对象模型 (DOM) 是HTML和XML文档的编程接口，简单来就是用代码来描述html。
- 通过js 中的document 和 window 元素的api来操作或者获取文档信息
## 常用的节点类型
* nodeType = 1，元素节点
* nodeType = 2，属性节点
* nodeType = 3，文本节点
* nodeType = 8，注释节点
* nodeType = 9，document对象
* nodeType = 11，documentFragment文档片段
## 选择节点
* 选择
    - document.querySelector() css 选择器 返回匹配的第一项
    - document.querySelectorAll() 返回一个匹配的伪数组
    - getElementById
    - getElementsByName
    - getElementsByTagName
    - getElementsByClassName
* 子节点
    + childNodes（ie只获取元素节点）
        - 用法：元素.childNodes  元素所有的子节点，包含文本和元素节点
        - 元素.childNodes[0] 第一个节点 包含文本和元素节点
    + children
        - 元素节点的集合(推荐使用)
    + 首个子节点
        - firstChild
        - firstElementChild
        - 兼容写法:let nodeFirst=元素.firstChild||元素.firstElementChild
    + 最后一个子节点
        - lastChild
        - lastElementChild
        - 兼容写法:let nodeLast=元素.lastChild||元素.lastElementChild
* 兄弟节点
    + 上一个
        - previousSibling
        - previousElementSibling
        - 兼容写法:let nodePre=元素.previousSibling||元素.previousElementSibling
    + 下一个
        - nextSibling
        - nextElementSibling
        - 兼容写法:let nodeNext=元素.nextSibling||元素.nextElementSibling
* 父节点
    - parentNode
* 其他
    - nodeType
    - nodeValue 一般针对文本节点，元素节点为null
    - nodeName
    - attributes 元素属性列表的集合
## 节点操作
* 创建节点
  - document.createElement('li') 创建一个元素节点
  - document.createTextNode(text) 创建一个文本节点
  - document.createComment(comment) 创建一个注释节点
  - document.crateDocumemntFragment() 创建一个文档碎片节点
      > 文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流(reflow)(对元素位置和几何上的计算),起到优化性能的效果
  * 创建svg 图标的特殊案例
      ```js
        createSvgIcon(icon, style = {}) {
            const svgNS = 'http://www.w3.org/2000/svg'
            const xlinkNS = 'http://www.w3.org/1999/xlink'
            const element = document.createElementNS(svgNS, 'svg')
            element.setAttribute('aria-hidden', true)
            const useEl = document.createElementNS(svgNS, 'use')
            useEl.setAttributeNS(xlinkNS, 'href', `#${icon}`)
            element.appendChild(useEl)
            element.classList.add('svg-icon')
            Object.entries(style).forEach(([key, value]) => {
                element.style[key] = value
            })

            return element
        }
      ```
* 添加
  - 父级.appendChild('li') 在父级的末尾加
  - 父级.insertBefore(newchild,rechild) 在已有的字节点前中插入一个新的子节点
* 删除
  - 父级.removeChild(要删除的元素)
* 替换
  - 父级.replaceChild(新节点，被替换的节点)
* 克隆
  - 要克隆的元素.cloneNode(false) 只克隆元素本身，不需要元素中的内容
  - 要克隆的元素.cloneNode(true) 两个都要
## 属性操作
  - 获取 元素.getAttribute(属性名)
  - 设置 元素.setAttribute(属性名,属性值)
  - 移除 元素.removeAttribute(属性名)
## 获取样式
  - 元素.style.width 只能取行间样式，含单位
  - 都能获取不带单位
    ```js
        // getComputedStyle(el,null).width 
        // ie提供的
        // document.getElementById("btn").currentStyle.width 
        export function getStyle(curEle, attr) {
            let val, reg
            // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
            if (attr === 'scrollTop') {
                val = curEle.scrollTop
            } else if (attr === 'opacity') {
                val = curEle.currentStyle['filter'] // 'alpha(opacity=12,345)'
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1
            } else if (curEle.currentStyle) {
                val = curEle.currentStyle[attr]
            } else {
                val = document.defaultView.getComputedStyle(curEle, null)[attr]
            }
            // reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i;
            // return reg.test(val) ? parseFloat(val) : val;
            return parseFloat(val)
        }
    ```
  - getBoundingClientRect 返回元素的大小以及相对于浏览器可视窗口的位置
## 几种位置和高度的区别
* height
 - offsetHeight：表示可视区域的高度，包含了border和滚动条
 - scrollHeight：表示了所有区域的高度，包含了因为滚动被隐藏的部分。
 - window.innerHeight  表示的是可视区域的高度

* top
 - clientTop：表示边框border的厚度，在未指定的情况下一般为0
 - scrollTop：滚动后被隐藏的高度(卷曲的高度)
 - offsetTop
## scroll
 * scrollWidth
 * scrollHeight 
 * scrollLeft 
 * scrollTop 被卷曲的内容高度
    ```javascript
        // 获取页面卷曲的高度
        Window.onscroll= function(){
            let topVal=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop
        }
        // 获取容器内的卷曲的高度
        node.onscroll= function(e){
            let topVal=e.target.scrollTop
        }
    ```
## 本地存储
* cookie:如果用于保存用户登录态，应该将该值加密
    - 一般有服务器生成，可以设置过期时间
    - 容量较小，4kb 左右
    - 每次请求都会携带在header中
    + document.cookie的属性
        - expires 设置过期时间,被max-age属性所取代，max-age用秒来设置cookie的生存期
        - path cookie关联在一起的网页
        - domain 多个web服务器共享cookie
* localStorage
    - 一直存在，除非被清理
    - 容量5m 左右
    - 不参与服务器通讯
* sessionStorage
    - 用法类似localStorage
    - 页面关闭就清理
* indexDB
    - 浏览器端的数据库，不被清理一直存在
## 事件机制
* 页面事件的加载顺序
   - DOMCententLoaded 事件：页面的文档结构（DOM树）加载完之后就会触发
   - document.onload 是在结构和样式加载完才执行js
   - window.onload：不仅结构和样式加载完，还要执行完所有的外部样式、图片这些资源文件，全部加载完才会触发

* 事件冒泡和事件捕获   
   - 事件冒泡：从里向外执行，遇到相同的事件及执行
   - 事件捕获：执行顺序与冒泡相反（不推荐使用，因为ie使用attachEvent 没有第三个参数）

* 事件触发三阶段
   1. window 往事件触发处传播，遇到注册的捕获事件会触发
   2. 传播到事件触发处时触发注册的事件
   3. 从事件触发处往 window 传播，遇到注册的冒泡事件会触发

* 事件注册(监听) addEventListener（避免事件被覆盖）
   > ie9 以下不支持 false默认冒泡 true 捕获
   + 第三个参数为bool,该参数默认值为 false(冒泡) ，useCapture 决定了注册的事件是捕获事件还是冒泡事件
   + 作为对象：
       - capture：布尔值，和 useCapture 作用一样
       - once：布尔值，值为 true 表示该回调只会调用一次，调用后会移除监听
       - passive：布尔值，表示永远不会调用 preventDefault
       ```js
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
       
* 事件触发(标准浏览器)：dispatchEvent
   + element.dispatchEvent()
   + 使用该方法：
       + 创建: document.createEvent()
           - 返回新创建的Event对象
           - 参数：
           -  HTMLEvents：包括 'abort', 'blur', 'change', 'error', 'focus', 'load', 'reset', 'resize', 'scroll', 'select', 'submit', 'unload'. 事件
           - UIEvents ：包括 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'keydown', 'keypress', 'keyup'. 间接包含 MouseEvents. 
           - MouseEvents：包括 'click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'. 
           - MutationEvents:包括 'DOMAttrModified', 'DOMNodeInserted', 'DOMNodeRemoved', 'DOMCharacterDataModified', 'DOMNodeInsertedIntoDocument','DOMNodeRemovedFromDocument', 'DOMSubtreeModified'
            
        + 初始化: initEvent(eventName, canBubble, preventDefault)
            - initEvent() 方法用于初始化通过DocumentEvent接口创建的Event的值。
            - canBubble 是否可以冒泡
            - preventDefault 是否阻止事件的默认操作

        + 例子：
            ```js
                // 举个例子：
                var dom = document.querySelector('#id')
                document.addEventListener('alert', function (event) {
                    console.log(event)
                }, false);
                
                // 创建
                var evt = document.createEvent("HTMLEvents");
                // 初始化
                evt.initEvent("alert", false, false);
                // 触发, 即弹出文字
                dom.dispatchEvent(evt);
            ```
   + 自定义事件
        - 自定义事件的函数有 Event、CustomEvent 和 dispatchEvent
        - ```js
            // 向 window派发一个resize内置事件
            window.dispatchEvent(new Event('resize'))
            
            // 直接自定义事件，使用 Event 构造函数：
            var event = new Event('build');
            var elem = document.querySelector('#id')
            // 监听事件
            elem.addEventListener('build', function (e) { ... }, false);
            // 触发事件.
            elem.dispatchEvent(event);
        ```

* 事件的对象(event.target)
   > 记录当前事件触发时的一些信息
  + btn.onclick=function(event){} 
    - event.target 真正触发事件的元素
    - event.type="click"
    - event.clinetX/clinetY 
    - ie 低版本不兼容 var tar = e.target||e.srcElement
    - event.currentTarget 返回绑定事件的元素

* 事件代理/委托
   > 本质就是利用事件冒泡的原理，将事件绑定在父容器中，让父容器代为触发
   - 应用的场景：动态生成的子节点要注册事件，那么子节点需要注册事件的话应该注册在父节点上
   + 好处：
      1. 减少了事件的注册，内存开销减少了
      2. 元素的增减不会影响事件的绑定
      3. js和DOM节点之间的关联变少了，减少了因循环引用(GC中引用计数法的缺陷)而带来的内存泄漏发生的概率。
   + jq 早期 bind 绑定事件会出现一个问题及新创建的元素没有事件，后来用delegate解决   1.7 版本后统一用on
   + 注意：
      - 不是所有的事件都有冒泡（blur、focus、load和unload），所以事件委托不是所有的事件都可用。
      - 例如 mouseover 由于事件对象 target 频繁改动会有性能问题