# make(GNU的make)
  - make是一个命令工具，是一个解释makefile中指令的命令工具
## makefile
  - makefile定义了一系列的规则来指定，哪些文件需要先编译，哪些文件需要后编译，哪些文件需要重新编译，甚至于进行更复杂的功能操作，因为makefile就像一个Shell脚本一样，其中也可以执行操作系统的命令。
  - makefile带来的好处就是——“自动化编译”，一旦写好，只需要一个make命令，整个工程完全自动编译
## 程序的编译和链接
* 无论是C还是C++，首先要把源文件编译成中间代码文件，在Windows下也就是 .obj 文件，UNIX下是 .o 文件，即Object File，这个动作叫做编译（compile）。然后再把大量的Object File合成可执行文件，这个动作叫作链接（link）。