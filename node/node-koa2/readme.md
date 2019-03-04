## 生成项目（koa-generator 非官方，狼叔开发的）
npm install koa-generator -g
koa2 projectName
## pm2部署
1. 首次部署
pm2 deploy deploy.yaml production setup 
2. 再次部署
pm2 deploy deploy.yaml production upddate