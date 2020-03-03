# 微信开发
## 小程序
### 小程序的限制
1. 包的总大小不超过2m
2. 页面总数不超过5张
3. 存在编辑器和真机部分api效果不同 （例如：canvasToTempFilePath编辑器不能执行）
4. 只有添加appid后才能有预览功能 并进行真机调试。但此时所有请求必须为配置好的第三方服务器。

### 小程序优化
* setData 更改部分数据（数组，或对象的某项值）
    ```javascript
        taskDataList=[]
        const taskItem = 'taskDataList[' + index + '].downTime'
        this.setData({
            [taskItem]: Date.now()
        })
    ```
* canvas合成的图片不清晰css设置canvas样式 object-fit: contain;
* 1rpx 无法显示，设置1px

## 小游戏
### 小游戏环境的资源管理
1. 小游戏的包内体积不能够超过 4mb，包含所有代码和资源，额外的资源必须通过网络请求下载。
2. 对于从远程服务器下载的文件，小游戏环境没有浏览器的缓存以及过期更新机制。
3. 对于小游戏包内资源，小游戏环境内并不是按需加载的，而是一次性加载所有包内资源，然后再启动页面。
4. 不可以从远程服务器下载脚本文件

