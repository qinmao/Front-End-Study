## 生成项目（koa-generator 非官方，狼叔开发的）
node 8版本及其以上
npm install koa-generator -g
koa2 projectName
## 解析
app.callback()
返回适用于 http.createServer() 方法的回调函数来处理请求。你也可以使用此回调函数将 koa 应用程序挂载到 Connect/Express 应用程序中。

## pm2部署
1. 首次部署
pm2 deploy deploy.yaml production setup 
2. 再次部署
pm2 deploy deploy.yaml production upddate