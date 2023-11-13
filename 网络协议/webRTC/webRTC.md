# webRTC

## 组成
* getUserMedia 获取桌面上捕获的多媒体数据（视频、音频）
* RTCPeerConnection 建立 P2P连接，传输多媒体数据
* RTCDataChannel 传输数据
## 用法
* MediaStreamConstraints
    + audio Boolean|MediaTrackConstraints
    + video Boolean|MediaTrackConstraints
        - width 
        - height
        - frameRate 帧率 如：{ ideal:10,max:15 }
* mediaStream 一个流对象可以包含多轨道，包括音频和视频轨道等
* 示例
  ```js
    // 想要获取一个最接近 1280x720 的相机分辨率
    const constraints = {
        audio: true,
        video: { 
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 },
            frameRate: { max: 30 }
        },
    };
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (mediaStream) {
            const video = document.querySelector("#video");
            video.srcObject = mediaStream;
            video.onloadedmetadata = function (e) {
                video.play();
            };
        })
        .catch(function (err) {
            /* 处理error */
            console.log(err)
        });
  ```
