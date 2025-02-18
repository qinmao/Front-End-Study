# 浏览器中的API

## DOM 操作API
[DOM 操作 API](./dom.md)

## Bom 操作API
[Bom操作 API](./bom.md)

## 存储 API
[存储 API](./本地存储.md)

## 网络API
[网络请求](./网络请求.md)

## 地理位置API
* navigator.geolocation：用于获取用户的地理位置
  ```js
    if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position);
            },
            function (error) {
                console.log(error);
            }
        );
    }
    // 	当成功获取地理信息后，会调用 succssCallback，并返回一个包含位置信息的对象position.Coord(坐标)
    //     1. coords.latitude：估计纬度
    // 　　2. coords.longitude：估计经度
    // 　　3. coords.altitude：估计高度
    // 　　4. coords.accuracy：所提供的以米为单位的经度和纬度估计的精确度
    // 　　5. coords.altitudeAccuracy：所提供的以米为单位的高度估计的精确度
    // 　　6. coords.heading： 宿主设备当前移动的角度方向，相对于正北方向顺时针计算
    // 　　7. coords.speed：以米每秒为单位的设备的当前对地速度
    //     当获取地理信息失败后，会调用errorCallback，并返回错误信息error
    //     可选参数 options 对象可以调整位置信息数据收集方式
    navigator.geolocation.watchPosition(success, error)
  ```

## 多媒体API
* MediaDevices：用于访问用户的摄像头和麦克风
  - navigator.mediaDevices.getUserMedia(constraints)
* HTMLMediaElement：用于控制音频和视频播放

## Web Workers API
[web-workers](./web-workers.md)

## MessageChannel
[MessageChannel](./MessageChannel.md)

## requestIdleCallback
[requestIdleCallback](./requestIdleCallback.md)