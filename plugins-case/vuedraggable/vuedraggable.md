# vuedraggable
> 数据拖拽解决方案
```pug
import Draggable from 'vuedraggable';

 Draggable.comps-list(
        tag="ul"
        :list="compTpls",
        :group="{ name: 'componentsGroup', pull: 'clone', put: false }",
        :clone="cloneComponent",
        @end="onDragEnd",
        draggable=".component-item",
        :sort="false"
    )
     Draggable.comps-list(
        v-model="compTpls",
        :group="{ name: 'componentsGroup', pull: 'clone', put: false }",
        :clone="cloneComponent",
        @end="onDragEnd",
        draggable=".component-item",
        :sort="false"
    )
```
## 参数注释
* v-model | list 都可以作为数据源，只能二选一区别是：
    - value 注入的，发生了拖拽，value 的数据不会跟着变化
    - list 注入的会发生变化，与页面展示的顺序保持一致

* draggable 表示可拖拽元素的部分

* tag  draggable替换成指定的标签

* group 
    - 区分拖拽组的，名字相同可互相拖放
    - put 别的地方的内容能否拖拽到自己这边来
    - pull 当前拖走，放在别的地方的行为，默认 true ，自己少一个，别的多一个，clone 自己不会少

* clone='func' 用来控制放如拖入区的内容
