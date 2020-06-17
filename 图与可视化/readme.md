## 前端图形学（可视化）
+ 底层技术
    - [SVG](svg/svg.md) snap.svg、rapheal.js
    - [Canvas 2D](canvas/canvas-base.html) zrender、g
    - [WebGL]() three.js、SceneJS、PhiloGL

 + 成熟的产品
    - [echarts](https://echarts.baidu.com/examples/index.html)
    - [highcharts](https://www.highcharts.com.cn/)
    - [d3](https://d3js.org/)
    - [vis.js](https://github.com/almende/vis)

 + AntV
    - G2:数据驱动的高交互可视化图形语法 
    - [G6](AntV/G6.md)
    - F2:适于对性能、体积、扩展性要求严苛场景下使用的移动端图表库

 + ECharts 实践
    * 基础概念
     - 实例 instance
        ```js
         const instance = echarts.init(el, 'dark')
        ```
     - 系列 series :一组数值以及他们映射成的图，可以理解为是专门绘制“图”的组件
      ```js
            series:[
            // 饼图
            {
               type: 'pie',
               radius: ['50%', '70%'],
               data: [
                  { value: 335, name: '直接访问' },
                  { value: 310, name: '邮件营销' },
                  { value: 234, name: '联盟广告' },
                  { value: 135, name: '视频广告' },
                  { value: 1548, name: '搜索引擎' }
               ]
            },
            // 柱状图
            {
               type: 'bar',
               data: [5, 20, 36, 10, 10],
            },
            // 折线图 
            {
               type: 'line',
               data: [120, 132, 101, 134, 90, 230, 210]
            }
            // ....

         ]

      ```
     - 组件 component
      ```js
         // 常见的组件
         // 用 option 描述 `数据`、`数据如何映射成图形`、`交互行为` 等。
         // option 是个大的 JavaScript 对象。
         var option = {
            // option 每个属性是一类组件。
            legend: {...},   // 图例
            grid: {...},     // 直角坐标系底板
            tooltip: {...},  // 提示框组件
            toolbox: {...},  // 工具栏组件
            dataZoom: {...}, // 数据区缩放组件
            visualMap: {...},// 视觉映射组件
            xAxis: [{...}],  // 直角坐标系 x轴
            yAxis: [{...}],  // 直角坐标系 y轴
            series: [{...}]
         };
      ```
