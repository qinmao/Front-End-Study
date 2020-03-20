 ## jq 
 * 本质：
    - 源码分析得知是一个伪数组对象，在自然数的索引上存储的是查询到所有DOM元素。
    - $本质是jQuery原型上的init这个工厂构造函数的实例，根据传入的参数不同实现不同的功能。

 * 特性：
    - 隐式迭代
    - 链式编程

 * jquery 与 dom 对象转化：
    - dom->jquery $() 包裹一个dom对象
    + jquery->dom   
        - var $box=$("#box") 通过索引取出$box[0]
        - $box.get(0)

 * 清空元素
    1. html():
        $(“div”).html("");// 使用html方法来清空元素，不推荐使用，会造成内存泄漏,绑定的事件不会被清除。
    2.empty():
        $(“div”).empty(); // 清空div的所有内容（推荐使用，会清除子元素上绑定的内容）
    3. remove():
        $(“div”).remove();自身也删除

 * attr,prop 区别
    1. attr("box",值) 设置单个属性
        attr({})    设置多个属性
        取表单值属性时会得到undefined

    2. 这里可以使用prop 
        自定义属性使用attr,自带属性使用prop

 * selecor

 * dom 操作的方法

 * ajax/jsonp
    ```javascript
    //  1. ajax :
        $.ajax({
            type: "method",
            url: "url",
            data: "data",
            dataType: "dataType",
            success: function (response) {
                
            }
        });

        $.get("url", data,
            function (data, textStatus, jqXHR) {
                
            },
            "dataType"
        );

        $.post("url", data,
            function (data, textStatus, jqXHR) {
                
            },
            "dataType"
        );
        // 2. jsonp:
            //    原理：
            //        利用了<script src=""></script>标签具有可跨域的特性，
            //        由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来
            //        只能以GET方式请求
        $.ajax({
            //请求方式必须是get
            type:'get',
            //请求地址
            url:'http://api.map.baidu.com/telematics/v3/weather',
            //请求数据
            data:{'name':'test'},
            //请求方式  如果想要实现jsonp跨域，必须声明是dataType:'jsonp'
            dataType:'jsonp',
            //成功时的回调
            success:function(data){

            }
        })
    ```

 * cors 
    - ajax 的jsonp 有个缺陷就是只能发get 请求不能发post,所以可以使用cors.get/post 都支持
    - 原理：在服务器响应了响应头: Access-Control-Allow-Origin http 协议规定 header("Access-Control-Allow-Origin:*");

 * jq事件绑定： 
    - 绑定多个事件
        ```javascript
            $("#box").bind("click mouseenter",function(){
                ...
            })

            $("#box").bind({
                "click":function(){
                    ...
                },
                "mouseenter":function(){
                    ...
                }
            })  
        ``` 

 * jq事件委托/代理
    + bind 绑定事件会出现一个问题及新创建的元素没有事件？
    + 如何解决？
        ```javascript
            // jq 推出新的事件的添加方式delegate
            $("#box").delegate("p","click",function(){
                    ...
            })
        ```
    + 新版本jq 统一使用on(v1.7后)
        - 简单事件添加
        ```javascript
            $("#box").on("click",function(){
                ...
            })
        ```
        -  同时添加多个事件
        ```javascript
            $("#box").on({
                "click":function(){
                    ...
                },
                "mouseenter":function(){
                    ...
                }
            })
        ``` 
        - 事件委托 一般只添加一次事件委托
        ```
            $("#box").on("click","p",function(){
                .....
            })
        ```

 * 事件流
    + 场景： 
        - 一个标签添加了自身的事件，又添加了委托事件执行顺序？
        - 委托事件先执行，然后自身事件执行（冒泡）
    + 执行的流程：
    ```
        $("#box").on("p","click",function(){
            .....
        })
        $("p").on("click",function(){
        ...
        })
    ```

 * jq事件解绑：
    + 解绑普通事件
        - $("#box").off("click")
    + 解绑多个
        - $("#box").off("mouseenter click")
    + 解绑委托事件
        - $("#box").off("click","**")
    + $("#box").off() 
        - 接除box盒子所有的事件
             
 * jq事件触发:
    + 简单事件触发：
        - $(selector).click(); 触发 click事件
    + trigger方法触发事件
        - $(selector).trigger(“click”);
    + triggerHandler触发 事件响应方法，不触发浏览器行为
        - $(selector).triggerHandler(“focus”);

 * jq阻止事件冒泡：
    1. 阻止事件传播
       - e.stopPropagation();   
    2. 阻止事件触发的默认效果
       - e.preventDefault();
    3. return false 
       - 不仅可以阻止默认效果，还能阻止事件冒泡
