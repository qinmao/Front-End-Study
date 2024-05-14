const {
    createCipheriv,
    createDecipheriv,
    randomBytes,
    generateKeyPairSync,
    publicEncrypt,
    privateDecrypt,
} = require("node:crypto");

// 对称加密

// // 定义加密密钥 32位
// const key = randomBytes(32);
// // const key = Buffer.from("mysecretkey123456", "utf8");

// // 初始化向量 iv 保证每次获取的秘钥串是不一样的，支持16位
// // 生成随机的 IV
// // const iv = randomBytes(16);
// // 创建一个全零的 16 字节的 IV
// const iv = Buffer.alloc(16, 0);

// // 定义要加密的数据
// const data = "Hello, this is a secret message!";

// // 创建加密算法
// const cipher = createCipheriv("aes-256-cbc", key, iv);

// // 加密数据
// let encrypted = cipher.update(data, "utf-8", "hex");
// encrypted += cipher.final("hex"); // 输出密文 16 位

// console.log("Encrypted data:", encrypted);

// // 解密数据:保证秘钥、算法和iv是一致的
// const decipher = createDecipheriv('aes-256-cbc', key, iv);

// let decrypted = decipher.update(encrypted, 'hex', 'utf8');
// decrypted += decipher.final('utf8');
// console.log('Decrypted data:', decrypted);




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
