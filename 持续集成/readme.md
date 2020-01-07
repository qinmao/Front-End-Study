## ci/cd
    持续集成：Continuous Integration，简称CI，意思是，在一个项目中，任何人对代码库的任何改动，都会触发CI服务器自动对项目进行构建，自动运行测试，甚至自动部署到测试环境。这样做的好处就是，随时发现问题，随时修复。因为修复问题的成本随着时间的推移而增长，越早发现，修复成本越低。

    如何为GitHub上托管的开源项目用Travis CI进行持续集成?  

    1. Travis CI是什么东东？
    Travis CI是在线托管的CI服务，用Travis来进行持续集成，不需要自己搭服务器，在网页上点几下就好，用起来更方便。最重要的是，它对开源项目是免费的。

    2. 为什么是GitHub？
    因为GitHub和Travis是一对好基友，不用GitHub虽然也能用Travis，但是配置起来太麻烦。而且，作为开源项目，为什么不用GitHub？
    3. 怎么撸？
    首先，直接用你的GitHub账号登录Travis CI的网站：https://travis-ci.org/
    第一次登录时，授权给Travis访问你的GitHub代码库，然后，把需要CI的代码库选上：

    参考:https://www.liaoxuefeng.com/article/0014631488240837e3633d3d180476cb684ba7c10fda6f6000

    ```javascript
    // 1. 最简单的例子是让travis在node.js的0.6.x，0.6.1，0.5.11三个版本下对项目进行测试
    language: node_js
    node_js:
    - "6"
    - "6.1"
    - "5.11"
    // 2. Travis 构建过程主要分为两步：
    // install：安装依赖，在 node 环境下，默认运行 npm install
    // stript：运行构建命令，在 node 环境下，默认运行 npm test
        language: node_js
        node_js:
        - "6"
        install: npm install
        script: npm test
    成功之后会在Travis官网上出现build 成功失败的图标，可以把copy在readme.md 文件中

    // 详细文档：https://docs.travis-ci.com/
    // 后续的功能持续研究中...

    ```