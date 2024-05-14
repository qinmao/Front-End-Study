# python
> 强类型的解释型语言
## python的解释器
- mac 默认的通常被安装在 /usr/bin/python3
- 也可安装不同的版本在别的目录
```bash
  # 启动解释器：可以在 shell 中运行 Python 代码
  cd /usr/bin
  python3 
  
  # 案例1
  1+1
  40-20
  
  # 案例2
  width = 20
  height = 5 * 9
  width * height

  # 输出
  print('name') 
  print(r'C:\some\name')

  ## 输出字符长度
  str = 'supercalifragilisticexpialidocious'
  len(str)

  arr = ['a', 'b', 'c', 'd']
  len(arr)
```
* 调用 Python 时，可以指定下列任意选项
  - python [-bBdEhiIOqsSuvVWx?] [-c command | -m module-name | script | - ] [args]
  - 常见的是执行脚本：python myscript.py
## 执行过程
* 源代码-> 解释器 -> 字节码-> python虚拟机 -> 执行
* 交互和非交互解释环境
  ```bash
   # 非交互执行
   pythin3 hello.py
   # 交互执行
   pythin3 -i hello.py

  ```
## 基础语法
### 常见的数据类型
* 数字类型
  - int
  - float 
  - complex
* 文本类型
  - str
  - 转成列表 list(str)
* 序列类型
  + list
    - 创建 [x for x in range(1,10)]
    + 增加：
      - list.insert(索引，元素)
      - list.append(元素) 在尾部增加元素
      - list.extent(可迭代的对象) 为列表拓展元素
    + 修改
      - list.remove(元素)
      - list.reverse() 反转
      - list.pop(索引) 移除索引对应的元素并返回该元素，不指定索引默认是移除最后一个
      - list.copy() 复制列表
      - list.clear() 清空
    + 计算列表长度
      - len(list)
      - len(list[0])
      - list.count(元素) 元素出现的次数
    + 删除：
      - del list[0]、 
      - del list
    + 排序
      - list.sort(reverse=True) 列表原地排序
      - sort(list) 排序后返回新的列表
  + tuple(元组)
    - 类似list，但创建后不能修改
    - 对比list执行效率更改
    - 元组通常用于存储不可变的数据集合，比如坐标、日期等
    ```py
      # 创建一个包含元素的元组
      my_tuple = (1, 2, 3, 4, 5)

       # 创建一个空元组
       empty_tuple = ()
    ```
  - range
* 映射类型
  - dict
  ```py
   # 花括号
   dic1={'one':1,'two':2}
    # 类型构造器
   dic2= dict(one=1,two=2)

    # 访问字典中的所有元素
    mail_list=={'tom':'ddd','jerry':'gggg'}
    mail_list.items()
    mail_list.keys() # 键
    mail_list.values() # 值

    # 访问列表中的单独元素
    mail_list.get('tom')
    mail_list['tom']

    # 遍历字典
    for key,value in mail_list.items()
        print(key)
        print(value)
    # 内置函数
    len(字典) 
    key in 字典
    pop 移除键，并返回键对应的值
    popitem 移除键，并返回键值对

    # 字典默认值 setdefault
    mail_list.setdefault('tom') 重复返回已有的值
    mail_list.setdefault('tom2') 新的key 默认值为null
  ```
* 集合
  - Python 中的集合（Set）是一种无序且不重复的数据结构。你可以使用大括号 {} 或者 set() 函数来创建集合
  - 集合可以进行并集、交集、差集等操作，方便进行集合运算
  ```py
    # 创建一个空集合
    my_set = set()

    # 创建一个带有初始元素的集合
    my_set = {1, 2, 3, 4, 5}

    # 也可以通过set()函数来创建集合
    my_set = set([1, 2, 3, 4, 5])
  ```
  + 常用的方法：
    - add
    - remvoe
    - pop
    - clear
### 基本的数据结构
* 栈
* 堆
* 队列
* 树
* 图
### 流程控制
* 条件语句
* 循环语句
* 文件的输入输出
* 自定义函数
* 错误与异常处理
* 面向对象编程
* 模块
### 进阶知识
* 对象的比较复制
* 参数的传递
* 迭代器
* 生成器
* 装饰器
* 元类
* 操作符重载
* 上下文管理器
* 并发编程
* 全局解释器锁
* 垃圾回收机制
* 和c++ 的混合使用
## 虚拟环境
* 虚拟环境：
  - 为了解决程序包版本依赖问题而创建，不同的应用将可以使用不同的虚拟环境
  - 用于创建和管理虚拟环境的模块称为 venv，通常会安装在你可用的最新版本的 Python
* 环境创建与激活
  - python -m venv demo-env 
  - 在 windows 上激活: demo-env\Scripts\activate
  - 在 Unix 或 MacOS 上激活: source demo-env/bin/activate
  - 在 vscode 中  ctrl+shift+p 找到创建环境选项
* 撤销虚拟环境
  - 终端输入： deactivate
## 包管理
> 使用pip管理包
```bash
  # 安装最新的包
  pip install novas
  # 安装特定版本的包
  pip install requests==2.6.0

  # 将软件包升级到最新版本:
  pip install --upgrade requests

  # 一个或多个要从虚拟环境中删除的包。
  pip uninstall xx1  xx2
  
  # 显示所有在虚拟环境中安装的包
  pip list 

  # 将产生一个类似的已安装包列表
  pip freeze 
  pip freeze > requirements.txt

  # 将 requirements.txt 提交给版本控制并作为应用程序的一部分提供。
  # 然后用户可以使用 install -r 安装所有必需的包：
  pip install -r requirements.txt
```
* 安装需要编译的包
  - TODO
* 发布 Python 模块
  - TODO
## 性能检测
```py
  from timeit import Timer
  Timer('t=a; a=b; b=t', 'a=1; b=2').timeit()
  # 0.57535828626024577
  Timer('a,b = b,a', 'a=1; b=2').timeit()
  # 0.54962537085770791
```
*  profile 和 pstats 模块提供了用于在较大的代码块中识别时间关键部分的工具。