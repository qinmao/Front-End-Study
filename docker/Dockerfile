# 指定基本镜像
FROM node:18.16.0-bullseye-slim AS build

#  指定工作目录
WORKDIR /usr/src/app

# 拷贝包管理文件到/usr/src/app 根目录下
COPY package*.json ./

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/
# RUN npm config set registry http://npmmirror.com

# 安装依赖
RUN npm ci --omit=dev --ignore-scripts

# 不变的放前面，变化的放后面，package*.json 如果不变，npm install 不会执行 利于使用缓存
# 将当前目录（dockerfile所在目录）下所有文件都拷贝到工作目录下
COPY . ./

# 构架编译ts源码，构建完成删除源码
RUN npm run build && rm -rf src


FROM node:18.16.0-bullseye-slim  AS deploy

# 容器默认时区为UTC 设置容器上海时间
ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive
RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime && echo ${TZ} > /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata && rm -rf /var/lib/apt/lists/*

#  指定工作目录
WORKDIR /usr/src/app

# 拷贝包管理文件到/usr/src/app 根目录下
COPY package*.json ./

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/

# 安装生产依赖
RUN npm ci --only=production

# 拷贝需要的文件
COPY --from=build /usr/src/app/dist ./dist 
COPY --from=build  /usr/src/app/config ./config
COPY --from=build /usr/src/app/nest-cli.json ./ 

# 非 root 用户运行：通过 user: "node" 防止权限升级
USER node

EXPOSE 3001

# 执行启动命令
ENTRYPOINT ["npm", "run"]
CMD ["start:prod"]
