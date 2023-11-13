const path = require("path");

const notes = "/users/joe/notes.txt";
// 获取文件的父文件夹
path.dirname(notes); // /users/joe
// 获取文件名部分
path.basename(notes); // notes.txt
// 指定第二个参数来获取不带扩展名的文件名
path.basename(notes, path.extname(notes)); //notes
// 获取文件的扩展名
path.extname(notes); // .txt


// 解析对象的路径为组成其的片段
path.parse("/users/test.txt");
const res = {
  root: "/",
  dir: "/users",
  base: "test.txt",
  ext: ".txt",
  name: "test"
};


const workDir = path.resolve("."); // '/Users/michael'

// 使用 path.join() 连接路径的两个或多个片段

path.join(workDir, "pub", "index.html"); // '/Users/michael/pub/index.html'


// path.resolve() 获得相对路径的绝对路径计算
// 第一个参数以斜杠开头，则表示它是绝对路径：
path.resolve("/etc", "joe.txt"); //'/etc/joe.txt'

// 如果是绝对路径，则返回 true
// path.isAbsolute()
