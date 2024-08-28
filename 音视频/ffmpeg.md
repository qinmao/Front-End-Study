# ffmpeg
  >ffmpeg 是一个开源的多媒体处理工具，广泛用于音频、视频和流媒体的处理、转码、录制和播放等任务。它提供了强大的命令行工具集，可以在不同的操作系统上运行。
## 主要功能和用途
* 音视频转码和处理：
  - 支持几乎所有主流的音视频编解码器和格式，可以进行转码、压缩、裁剪、合并等操作。
  - 可以调整分辨率、帧率、比特率等参数，适应不同的播放环境和设备要求。
* 流媒体处理：
  - 支持从网络摄像头、音频输入设备和其他多媒体源中捕获和编码数据。
  - 可以生成 HTTP Live Streaming (HLS)、Dynamic Adaptive Streaming over HTTP (DASH) 等流媒体协议
* 录制和截取：
  - 可以录制桌面、摄像头或者流媒体，并且支持设置录制区域、时长和质量。
  - 能够从视频中截取特定片段或者从音频中提取特定段落。
* 音视频处理效果：
  - 支持添加滤镜、水印、字幕等特效，提升视听体验。
  - 可以调整色彩、亮度、对比度等视觉效果，增强或修改音频效果。
* 直播和流媒体服务器：
  - 可以配置为流媒体服务器，支持实时转码和流式传输，满足实时直播和点播的需求。

## 命令中的参数解析
* 参数设置格式
  + ffmpeg [全局选项] -i input.mp4 [输入文件选项] [音频/视频过滤器] [输出文件选项] output.mp4
    - 全局选项：会影响整个 FFmpeg 运行环境，如 -loglevel（日志级别）、-hwaccel cuda（硬件加速）、-threads（线程数）等
    - 输入文件选项：-f（指定输入格式）、-codec:v（视频编解码器）、-codec:a（音频编解码器）、-pix_fmt（像素格式）等
    - 输入文件：指定要处理的输入文件或输入流。
    - 音频/视频过滤器：如果需要对音频或视频进行滤镜处理（如裁剪、调整大小、添加水印等），如视频滤镜 -vf 和音频滤镜 -af。
    - 输出文件选项：这些选项指定输出文件的特性，如 -f（指定输出格式）、-codec:v（视频编码器）、-codec:a（音频编码器）、-preset（编码质量预设）等
    - 输出文件：指定生成的输出文件或输出流的名称和路径。output.mp4 是指定的输出文件名。

* 输入设定
  + -f 
    - rawvideo: 声明输入格式为原始视频帧。
  - -video_size [WIDTHxHEIGHT]: 设定输入视频的分辨率大小
  - -framerate [FPS]: 输入视频的帧率，一般不设置默认是自动侦测
  + -i: 指定输入的源
    - - 从标准输入读取
    - input_video.mp4: 输入视频文件的路径
  - -re: 以原始的实时速率读取输入流，适合直播
  - -maxrate 3000k 最大比特率
  - -bufsize 6000k: 缓冲区大小设置

* 输出设定
  - -y: 强制覆盖输出文件，如果输出文件已经存在，则不会提示用户确认覆盖，而是直接覆盖输出文件。
  - -c:v libx264: 使用x264编码器进行视频编码。
  + -preset: 设置编码速度，以降低延迟
    - ultrafast 极快
    - veryfast
  - -b:v 2000k  设置视频编码的比特率，2000k 这是一个常见的值，适用于许多在线视频流媒体的标准。
  - -tune zerolatency: 设置编码器以零延迟模式工作，以最小化延迟。
  - -crf 23：视频质量设置，数值越低质量越高，取值范围一般是 0 到 51，推荐范围 18-28。
  - -g 60: 关键帧间隔，通常设置为帧率的倍数，例如帧率为30fps时设置为60。对于 HLS 流，关键帧设置很重要。

  - -r 24    设置输出的帧率为 24 帧每秒
  + -pix_fmt：设置视频编码器使用的图像格式（如RGB还是YUV）
    - yuv420p:是一种颜色编码格式，常用于视频压缩和流式传输，尤其是在Web视频中常见
    - rgb24: 使用 RGB 色彩空间，每个像素使用 24 位（8 位红、8 位绿、8 位蓝）来表示。这种格式通常用于处理和编辑需要精确颜色表示的图像和视频。
    - rgba: 类似于 rgb24，但每个像素包括一个额外的 Alpha 通道（透明度通道），用于表示像素的不透明度
    - gray: 灰度图像，只有一个亮度分量（Y），没有色度分量。
    - nv12, nv21: 这两种格式也是 YUV 色彩空间的一种变体，通常用于特定的硬件编码和解码场景。

  + -f 指定输出格式
    - flv
    - hls
    - mpegts http://localhost:[PORT]/stream: 将流输出到HTTP服务器地址，替换为你的服务器地址和端口。这里将实时流作为MPEG-TS*数据流通过HTTP输出
  
  + hls 格式输出
    - -hls_time 10 设置 HLS 分段时长为 10 秒。
    - -hls_list_size 0 不限制 HLS 列表文件中的分段数量
    + -hls_flags 
      - -hls_flags discont_start+delete_segments+round_durations+temp_file 启用了多个 -hls_flags，确保生成的 HLS 流更加健壮和可靠。
      - delete_segments: 这个选项告诉ffmpeg在生成HLS流时删除已经过期的片段（segments）
      - split_by_time：  根据时间间隔而不是文件大小来分割分段。
    - -hls_segment_filename 'output_%03d.ts' 设置分段文件名格式。

* 输入输出设定
  - -pix_fmt（取决于位置）: 指定视频帧的像素格式，像素格式是描述像素如何编码的方式，包括颜色空间、位深度、存储顺序等信息
  ```bash
    # 输入设定：指定了输入文件的像素格式
    ffmpeg -i input.mp4 -pix_fmt yuv420p output.mp4

    # 输出设定：指定了输出文件或流的像素格式
    ffmpeg -i input.mp4 -c:v libx264 -pix_fmt yuv420p output.mp4
  ```

## 硬件加速
>在使用硬件加速时，确保您的系统上已经安装了相应的驱动程序和库
* NVIDIA GPU 加速 (CUDA)
  ```bash
    ffmpeg -hwaccel cuda -i input.mp4 \
       -c:v h264_nvenc -preset fast \
       -c:a aac -b:a 128k \
       -hls_time 4 -hls_list_size 6 -hls_flags delete_segments \
       output.m3u8
  ```
* Intel QuickSync 加速
  ```bash
    ffmpeg -hwaccel qsv -c:v h264_qsv -i input.mp4 \
       -c:a aac -b:a 128k \
       -hls_time 4 -hls_list_size 6 -hls_flags delete_segments \
       output.m3u8
  ```
* AMD GPU 加速 (AMF)
  ```bash
    ffmpeg -hwaccel amf -i input.mp4 \
       -c:v h264_amf -preset fast \
       -c:a aac -b:a 128k \
       -hls_time 4 -hls_list_size 6 -hls_flags delete_segments \
       output.m3u8
  ```

## 音视频转码和处理
  ```bash
    # 转码视频为H.264格式：
    ffmpeg -i input.mp4 -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 192k output.mp4
  ```
  
## 流媒体处理
  ```bash
    # 将视频转换为HLS流：
    ffmpeg -i input.mp4 -c:v libx264 -pix_fmt yuv420p -c:a aac -strict -2 -f hls output.m3u8

    # 使用ffmpeg将帧转换为实时流
    ffmpeg -f rawvideo -pixel_format bgr24 -video_size 720x640 -framerate 30 -i - -c:v libx264 -preset fast -tune zerolatency -f mpegts http://localhost:[PORT]/stream

    # 使用硬件加速
    ffmpeg -hwaccel cuda -f rawvideo -pixel_format bgr24 -video_size 720x640 -framerate 30 -i - -c:v h264_nvenc -preset fast -tune zerolatency -f mpegts http://localhost:[PORT]/stream
  ```

## 录制和截取
  ```bash
    # 录制桌面视频:
    ffmpeg -f x11grab -framerate 30 -video_size 1920x1080 -i :0.0 output.mp4

    # 从视频中提取音频：
    ffmpeg -i input.mp4 -vn -c:a copy output_audio.aac

  ```

## 音视频处理效果

## 直播和流媒体服务器
  ```bash
    ffmpeg -re -i input_video.mp4 -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 60 -c:a aac -b:a 128k -ac 2 -ar 44100 -f flv rtmp://your-streaming-server-url/your-stream-key
  ```

## 如何加快帧转流
* 使用硬件加速 
  - -hwaccel cuda 
  - -c:v h264_nvenc -preset fast
* 选择合适的编码器和参数：
  - 通过调整编码参数如码率、GOP大小（Group of Pictures）、参考帧数等来优化转码速度和输出质量。
* 分辨率和帧率调整：
  - -vf scale=1280:720  设置输出分辨率为 1280x720
* 优化分片设置：
  - 调整 HLS 分片的大小和数量，可以影响整体生成速度和流畅度。通常较小的分片（如 2-10 秒）可以提高流的响应速度和适应性。
* 并行处理和多线程：
  - FFmpeg 支持多线程处理，可以通过设置 -threads 参数来指定线程数，以充分利用系统的多核处理能力。
* 优化输出设置：
  - 考虑使用 -hls_flags 参数来优化 HLS 输出设置，例如设置缓冲大小、预览时间等，以平衡速度和流畅度。
* 优化服务器设置：
  - 确保 HLS 服务器设置合理，能够有效地分发生成的流，避免瓶颈和延迟。