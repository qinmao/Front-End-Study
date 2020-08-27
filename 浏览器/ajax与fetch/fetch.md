# Fetch

## 与xhr的区别
 - Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
 - 服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
 - IE 均不支持原生 Fetch