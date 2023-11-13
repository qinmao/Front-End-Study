// crypto模块的目的是为了提供通用的加密和哈希算法。
// 用纯js代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，速度更快。

const { createHmac, createHash } = require("node:crypto");

// MD5  是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：
// const str = "hello world";
// const md5Str = createHash("md5").update(str).digest("hex");
// console.log("md5Str", md5Str);

// 如果要计算SHA1，只需要把'md5'改成'sha1'，就可以得到SHA1的结果 1f32b9c9932c02227819a4151feed43e131aca40。
// 还可以使用更安全的 sha256 和 sha512。

// Hmac 可变哈希计算
// Hmac 它可以利用 MD5 或 SHA1 等哈希算法。不同的是，Hmac还需要一个密钥：
const pwdDB=`a933ddc666125fd1901fcafe0ab210f5c6cac9de998d1325f81dcd3178639f98`

const pwd = "qinmao1993";
const secret = "hello";
const hash = createHmac("sha256", secret).update(pwd).digest("hex");
if(hash===pwdDB){
    console.log('密码相等');

}
// 

// AES  是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持
