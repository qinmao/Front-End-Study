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
    ```javascript
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
 - document.documentElement.clientHeight ie表示的是可视区域的高度，不包含border和滚动条

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
    
## iframe
  + contentWindow 获取iframe的window对象
  + contentDocument 获取iframe的document对象
  + 如何检测iframe 是否加载完成
    ```js
        var iframe = document.createElement("iframe");
        iframe.src = "http://www.planabc.net";
        if (iframe.attachEvent){    
            iframe.attachEvent("onload", function(){        
                alert("Local iframe is now loaded.");    
            });
        } else {    
            iframe.onload = function(){        
                alert("Local iframe is now loaded.");    
            };
        }
        document.body.appendChild(iframe);
    ```
  + 有那些缺点？
    - 搜索引擎的检索程序无法解读这种页面，不利于SEO;
    - iframe会阻塞主页面的onload事件
    - iframe和主页面共享连接池，而浏览器对相同域(同一域名)的连接有限制，所以会影响页面的并行加载
    - 如何避免：js动态给iframe添加src属性值，绕开以上两个问题


