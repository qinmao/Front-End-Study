# pug
> 前端的模板引擎原名jade,可用来生成html,写法类似css

* 简单的例子
  ```html

    #hello
    <div id="hello"></div>

    a.link-button Link
    <a class="link-button">Link</a>

    a(href="https://xrkffgg.github.io/Knotes/") 我的网站
    <a href="https://xrkffgg.github.io/Knotes/">我的网站</a>

  ```
  
* 安装
    ```
    npm i -D pug pug-html-loader pug-plain-loader
    # or
    yarn add pug pug-html-loader pug-plain-loader

    ```
    
* 配置
    ```js
    // vue.config.js
    module.exports = {
        chainWebpack: config => {
        config.module.rule('pug')
            .test(/\.pug$/)
            .use('pug-html-loader')
            .loader('pug-html-loader')
            .end()
        }
    }
    ```

* vue 中使用pug
    ```vue
       <template>
        <el-card shadow="never" class="aui-card--fill">
            <div class="mod-sys__dept">
            <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
                <el-form-item>
                <el-button type="primary" @click="addOrUpdateHandle()">{{ $t('add') }}</el-button>
                </el-form-item>
            </el-form>
            <el-table v-loading="dataListLoading" :data="dataList" row-key="id" border style="width: 100%;">
                <el-table-column prop="name" :label="$t('dept.name')" header-align="center" min-width="150"></el-table-column>
                <el-table-column prop="parentName" :label="$t('dept.parentName')" header-align="center" align="center"></el-table-column>
                <el-table-column prop="sort" :label="$t('dept.sort')" header-align="center" align="center" width="80"></el-table-column>
                <el-table-column :label="$t('handle')" fixed="right" header-align="center" align="center" width="150">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{ $t('update') }}</el-button>
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">{{ $t('delete') }}</el-button>
                </template>
                </el-table-column>
            </el-table>
            </div>
        </el-card>
        </template>


        <!-- 简化后 -->
        <template lang="pug">
        el-card.aui-card--fill(shadow="never")
            .mod-sys__dept
            el-form(:inline="true" :model="dataForm" @keyup.enter.native="getDataList()")
                el-form-item
                el-button(type="primary" @click="addOrUpdateHandle()") {{ $t('add') }}
            el-table(v-loading="dataListLoading" :data="dataList" row-key="id" border style="width: 100%;")
                el-table-column(prop="name" :label="$t('dept.name')" header-align="center" min-width="150")
                el-table-column(prop="parentName" :label="$t('dept.parentName')" header-align="center" align="center")
                el-table-column(prop="sort" :label="$t('dept.sort')" header-align="center" align="center" width="80")
                el-table-column(:label="$t('handle')" fixed="right" header-align="center" align="center" width="150")
                template(slot-scope="scope")
                    el-button(type="text"
                            size="small"
                            @click="addOrUpdateHandle(scope.row.id)") {{ $t('update') }}
                    el-button(type="text"
                            size="small"
                            @click="deleteHandle(scope.row.id)") {{ $t('delete') }}
        </template>
    ```

* 管道文字（ | ）：向模板添加纯文本
    ```html
        p
        | 管道符号总是在最开头，
        | 不算前面的缩进。

        <p>管道符号总是在最开头， 不算前面的缩进。
        </p>

        | 千万别
        |
        button 按
        |
        | 我！

        千万别
        <button>按</button> 我！
    ```

* # [ ] 标签嵌入
    ```html
        p.
        这是一个很长很长而且还很无聊的段落，还没有结束，是的，非常非常地长。
        突然出现了一个 #[strong 充满力量感的单词]，这确实让人难以 #[em 忽视]。
        p.
        使用带属性的嵌入标签的例子：
        #[q(lang="es") ¡Hola Mundo!]

        <p>这是一个很长很长而且还很无聊的段落，还没有结束，是的，非常非常地长。 突然出现了一个 <strong>充满力量感的单词</strong>，这确实让人难以 <em>忽视</em>。</p>
        <p>使用带属性的嵌入标签的例子：
        <q lang="es">¡Hola Mundo!</q></p>
    ```
* . 大文本块
    ```html
        // 大文本块
        p.
        使用常规的标签可以让您的代码行短小精悍，
        但使用嵌入标签会使代码变得更 #[em 清晰易读]。
        ——如果您的标签和文本之间是用空格隔开的。

        <p>使用常规的标签可以让您的代码行短小精悍， 但使用嵌入标签会使代码变得更 <em>清晰易读</em>。 ——如果您的标签和文本之间是用空格隔开的。
        </p>
    ```

* : 块展开
    ```html
        a: img

        <a><img/></a>
    ```