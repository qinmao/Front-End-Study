# crypto
  > 提供加密和解密功能，基本上是对OpenSSL的包装，底层调用的事c/c++ 的实现的算法，速度很快
## 加密
* 对称性加密
   - 在加密和解密时，使用同一个秘钥以及iv
   ```js
        const { createCipheriv,createDecipheriv, randomBytes } = require("node:crypto");

        // 对称加密
        // 定义加密密钥 32位
        const key = randomBytes(32);
        // const key = Buffer.from("mysecretkey123456", "utf8");

        // 初始化向量 iv 保证每次获取的秘钥串是不一样的，支持16位
        // 生成随机的 IV
        // const iv = randomBytes(16);
        // 创建一个全零的 16 字节的 IV
        const iv = Buffer.alloc(16, 0);

        // 定义要加密的数据
        const data = "Hello, this is a secret message!";

        // 创建加密算法
        const cipher = createCipheriv("aes-256-cbc", key, iv);

        // 加密数据
        let encrypted = cipher.update(data, "utf-8", "hex");
        encrypted += cipher.final("hex"); // 输出密文 16 位

        console.log("Encrypted data:", encrypted);

        // 解密数据:保证秘钥、算法和iv是一致的
        const decipher = createDecipheriv('aes-256-cbc', key, iv);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.log('Decrypted data:', decrypted);
   ```
* 非对称性加密
   - 在加密和解密时，使用不同的秘钥。一般具有一对秘钥 分公钥（可对外公开）和私钥（管理员拥有）；
   - 如果明文使用了私钥加密，必须使用与其对应的公钥才能解密成功。
   - 如果明文使用了公钥加密，必须使用与其对应的私钥才能解密成功。
  ```js
    const {
        generateKeyPairSync,
        publicEncrypt,
        privateDecrypt,
    } = require("node:crypto");
    // 非对称加密
    // 生成公钥和私钥
    const { privateKey, publicKey } = generateKeyPairSync("rsa", {
        modulusLength: 4096, // 越长越安全
        // publicKeyEncoding: {
        //     type: "spki",
        //     format: "pem",
        // },
        // privateKeyEncoding: {
        //     type: "pkcs8",
        //     format: "pem",
        //     cipher: "aes-256-cbc",
        //     passphrase: "top secret",
        // },
    });

    // 公钥加密
    data = Buffer.from("hello world");
    const encrypted = publicEncrypt(publicKey, data);
    console.log("Encrypted data:", encrypted.toString("hex"));
    // 私钥解密
    const decrypted = privateDecrypt(privateKey, encrypted);
    console.log("Decrypted data:", decrypted.toString());
  ```
* 哈希函数
  - 单向不能解密的，具有唯一性
  ```js
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
    // AES  是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持
  ```
## 生成随机UUID
  ```js
    const { randomUUID } = require("node:crypto");

    const requestId = randomUUID();
    console.log(requestId);
    // 7c34e9e8-56db-4132-9dab-d5fe7900ee32
  ```


