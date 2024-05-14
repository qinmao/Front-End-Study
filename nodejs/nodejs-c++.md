# node 引用原生模块
> Nodejs 在 IO 方面拥有极强的能力，但是对 CPU 密集型任务，会有不足，为了填补这方面的缺点，Nodejs支持 c/c++ 为其编写原生 nodejs 插件，补充这方面的能力。
## 原理：
  - c++编写的代码能够被编译成一个动态链接库(dll),可以被 nodejs 引入使用，后缀是.node 的文件
  - .node文件的原理就是(window dll) (Mac dylib) (Linux so)
## 使用场景
  - 使用 C++ 编写的 Nodejs 库如 node-sass 等
  - CPU 密集型应用
  - 代码保护
## 扩展编写语法 
  > 使用 node-api (以前叫 N-API) 无需重新编译，是一个更现代的选择，它提供了一个稳定的、跨版本的 API，使得你的插件可以在不同版本的 Node.js 上运行，而无需修改代码。
* 使用 node-api 开发原生模块有两种方式
  - 方式一： 使用c语言开发，node-api 就是 c 语言封装的
  - 方式二： 使用c++ 开发，基于 node-addon-api 这个开源项目，它是使用 c++ 对 node-api 再次封装。 该方式可精简很多代码
* 方式二的步骤
   - 环境准备
    ```bash
        # 提前安装过 python 以及c++开发软件
        # node-gyp 跨平台的构建开发编译命令行工具
        npm install node-gyp -g # 全局安装
        npm install node-addon-api -D #装到项目里
    ```
  1. 首先，创建一个新的 C++ 文件，例如 myaddon.cc，用于编写你的拓展代码。
  2. 在 C++ 文件中编写你的拓展函数，这些函数将会在 Node.js 中被调用
  3. 在你的项目目录下创建一个名为 binding.gyp 的文件，用于描述编译拓展所需的配置信息。
  4. 构建拓展：运行 node-gyp configure && node-gyp build 来构建你的 C++ 拓展。
  5. 在 Node.js 中通过 require 来引入你的 C++ 拓展，并调用其中的函数。
* 编写一个c++的demo:demo.cpp
  ```c++
   // #define NAPI_VERSION 3      // 为了确保与特定版本的 Node-API 兼容，可以在包含报头时显式指定版本:
    // #define NAPI_CPP_EXCEPTIONS // 启用 Node.js N-API 中的 C++ 异常支持
    #include <napi.h>

    Napi::String Hello(const Napi::CallbackInfo &info)
    {
        Napi::Env env = info.Env(); // 指定环境

        return Napi::String::New(env, "hello world!");
    }

    Napi::Object Init(Napi::Env env, Napi::Object exports)
    {
        // 暴露一个函数 hello 给外部
        exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, Hello));
        return exports;
    }

    // addon 固定语法 必须抛出这个方法
    NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
  ```
* 创建一个编译配置文件放在项目根目录下 binding.gyp
  - 该配置指定了编译所需的模块名和源码文件
  ```
    {
        "targets":[
            {
                "cflags!": ["-fno-exceptions"],
                "cflags_cc!": ["-fno-exceptions"],
                "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
                "target_name": "demo", 
                "sources": ["./src/demo.cpp" ]
                 # 配置 node-addon-api 项目提供的c++头文件所在路径
                "include_dirs": [
                    "<!@(node -p \"require('node-addon-api').include\")"
                ]
            }
        ]
    }
  ```
* 构建拓展
 ```bash
  node-gyp configure # 生成配置文件
  node-gyp build     # 打包 addon
 ```
* index.js 引用
  ```js
    const addon = require('./build/Release/demo.node')
    console.log(addon.getScreenSize())
  ```
## 编译原生平台的工具
* node-gyp-build
  - node-gyp-build 类似于 node-gyp build，只是在重新生成项目之前会检查是否存在生成或预生成。
  - 结合 prebuildify 来捆绑预构建文件，原生模块将在大多数平台上运行，而无需在安装时编译，并且在 Node.js 和 Electron 中都可以运行，无需在使用之间重新编译。
  ```json
    // package.json 配置
    "scripts": {
        "install": "node-gyp-build",
        "install-debug": "node-gyp-build --debug",

        "prebuild": "prebuildify -t 16.0.0 --napi --strip",
        "prebuild-darwin-universal": "prebuildify --napi --strip --arch x64+arm64",
        "prebuild-linux-x64": "prebuildify --napi --strip --arch x64",
        "prebuild-win32-x86": "prebuildify --napi --strip --arch ia32",
        "prebuild-win32-x64": "prebuildify --napi --strip --arch x64",

        "test": "run-script-os",
        "test:darwin:linux": "jasmine test/**/*.js",
        "test:win32": "jasmine test/**/*.js",
        "test-keyboard": "node test/keyboard.js",
    }
  ```
  ```js
    // index.js 安装包的时候自动帮助构建编译引入，无需手动引入binding 如下
    // 以前
    const demo = require('./build/Release/demo.node')
    module.exports = demo;

    // 使用后
    var robotjs = require('node-gyp-build')(__dirname);
    module.exports = robotjs;

  ```
* prebuildify
 ```bash
    # prebuild for node-api
    prebuildify --napi

    # targets 简写 -t  指定要为哪些目标平台和架构构建预构建文件。如，["node", "electron"] 默认是是node
    # strip：一个布尔值，表示是否在构建预构建文件时剥离调试符号。
    # arch：指定要构建的架构。    

  ```

* run-script-os
  - 根据操作系统执行不同的测试命令
  - 当你执行 npm test 时，run-script-os 命令将会根据当前操作系统选择相应的测试命令来执行测试用例。
