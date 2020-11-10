# safari 踩过的坑
> 项目中主要针对苹果的设备，踩过的坑，以及采用的解决方案
* 基本meta标签
  ```html 
    <!-- 可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果） -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <!-- 仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ） -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <!-- IOS中禁用将数字识别为电话号码/忽略Android平台中对邮箱地址的识别 -->
    <meta name="format-detection"content="telephone=no, email=no" />
    <!--不同尺寸 ico  -->
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/public/icon-57.png">
  ```
       
* 字体
  - 默认中文字体是Heiti SC
  - 默认英文字体是Helvetica
  - 默认数字字体是HelveticaNeue
  - 无微软雅黑字体

* Rentina显示屏原理及设计方案
  - 说明：retina屏是一种具备超高像素密度的液晶屏，同样大小的屏幕上显示的像素点由1个变为多个，如在同样带下的屏幕上，苹果设备的retina显示屏中，像素点1个变为4个。
  - 在高清显示屏中的位图被放大，图片会变得模糊，因此移动端的视觉稿通常会设计为传统PC的2倍。
  + 前端的应对方案是：
    - 设计稿切出来的图片长宽保证为偶数，并使用backgroud-size把图片缩小为原来的1/2,如图片宽高为：200px*200px，那么写法如下
    ```css
      .css{width:100px;height:100px;background-size:100px 100px;}
    ```
* 点击元素产生背景或边框怎么去掉
  - ios用户点击一个链接，会出现一个半透明灰色遮罩, 如果想要禁用，
    ```css
    a{
      -webkit-tap-highlight-color: transparent;
    }
    ```
* iOS键盘
   ```html
    <!-- 在iOS中，默认情况下键盘是开启首字母大写的功能的，关闭这个功能，可以这样： -->
    <input type="text" autocapitalize="off" />
    <!-- 关闭iOS输入自动修正 -->
    <input type="text" autocorrect="off" />
   ```
   

* 禁止文本缩放
 - 当移动设备横竖屏切换时，文本的大小会重新计算，进行相应的缩放，当我们不需要这种情况时，可以选择禁止：
  ```css
    .css {
    　　 -webkit-text-size-adjust: 100%;
    }
  ```
* 快速回弹滚动
    - 在iOS上如果你想让一个元素拥有像 Native 的滚动效果，你可以这样做：
    ```css
      .xxx {
        overflow: auto; /* auto | scroll */
        -webkit-overflow-scrolling: touch;
      }
    ```
* 移动端禁止选中内容
  ```css
    .user-select-none {
      -webkit-user-select: none;  /* Chrome all / Safari all */
    }
  ```
* 如何禁止保存或拷贝图像（IOS）
  ```css
    img { -webkit-touch-callout: none; }
  ```
* 手机拍照和上传图片
  - IOS有拍照、录像、选取本地图片功能，
  ```html
      <input type="file" accept="images/*" />
      <input type="file" accept="video/*" />
  ```
*  ios 多媒体无法自动播放的处理应对方案：触屏即播
  ```js
    $('html').one('touchstart',function(){
        music.play()
    })
    // 微信下兼容处理
    document.addEventListener("WeixinJSBridgeReady", function () {
        music.play();
    }, false);
  ```

* vue框架在ios微信浏览器上页面过长返回时空白页遮挡的问题
    在数据获取之后调用一下触发scroll 事件解决
  ```js
    this.$nextTick(() => {
      document.body.scrollTop = 1;
    });
  ```
## JS
  ```js
      /*
      * 1. (判断是不是苹果设备)
      */
      export const isAppleDevice = () => {
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
              return true
          } else {
              return false
          }
      }
      /*
      * 2. 判断是苹果系统的版本(取两位版本
      */
      export const iosOsVersion=()=>{
          // navigator.userAgent.match(/os\s+(\d+)/i)[1] - 0
          let ua = navigator.userAgent;
          // let ver = ua.match(/cpu iphone os (.*?) like mac os/)[1].replace(/_/g,".");
          let ver = ua.match(/os (.*?) like mac os/i)[1];
          let tempArr= ver.split('_');
          return tempArr[0]+"."+tempArr[1]
      }
      /*
      * 3. 复制内容到剪切板（ios10 以下不支持）
      */
      export const copyContent = (content) => {
          const tmp = document.createElement("span");
          tmp.innerText = content;
          document.body.appendChild(tmp);
          let range = document.createRange();
          range.selectNode(tmp);
          let selection = window.getSelection();
          if (selection.rangeCount > 0) {
              selection.removeAllRanges();
          }
          selection.addRange(range);
          document.execCommand("copy");
          document.body.removeChild(tmp);
      }
  ```
