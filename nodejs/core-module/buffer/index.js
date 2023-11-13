// // 将字符串转化为Base64
// ToBase64(data) {
//     return new Buffer.from(data).toString("base64");
//   }

//   // 将Base64字符串转化为String
//   FromBase64(base64) {
//     return new Buffer.from(base64, "base64").toString();
//   }

const base64 = Buffer.from("341182199306224817").toString("base64");
console.log(base64);
const str = Buffer.from(base64, "base64").toString();
console.log(str);
