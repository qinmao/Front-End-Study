const path = require('path');

// resolve
const workDir = path.resolve('.'); // '/Users/michael'

// join
// 组合完整的文件路径:当前目录+'pub'+'index.html':
const filePath = path.join(workDir, 'pub', 'index.html');
// '/Users/michael/pub/index.html'