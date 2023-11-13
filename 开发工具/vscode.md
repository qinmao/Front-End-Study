# vscode 
## 调试
* vscode 调试配置文件(仅适用于请求类型的启动配置launch)
    - request 调试模式：launch、attach（附加到已经运行的进程）
    - program 要调试的 Node.js 程序的绝对路径。
    - cwd 指定调试器的当前工作目录,它是代码中使用的任何相对路径的基本文件夹,若省略，则默认为${workspaceFolder}
    - env 为调试器进程设置可选的环境变量，这些变量的值必须作为字符串输入。
    - args 传递给程序进行调试的参数
    - runtimeExecutable 要使用的运行时可执行文件的绝对路径。默认为node
    
    ```json
        {
            "version": "0.2.0",
            "configurations": [
                {
                    "name": "Debug Main Process",
                    "type": "node",
                    "request": "launch",
                    "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
                    "windows": {
                        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
                    },
                    "args" : ["."],
                    "outputCapture": "std",
                    "env": {
                        "NODE_ENV": "debug"
                    }
                }
            ]
        }
    
    ```
