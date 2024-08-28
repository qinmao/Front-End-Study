# insightface
> InsightFace is an open source 2D&3D deep face analysis toolbox, mainly based on PyTorch and MXNet.

## 安装insightface
```bash
   # Cython 是一个编程语言，用于在 Python 和 C/C++ 之间创建桥梁，允许 Python 代码在 C 语言层面上进行编译，从而提升执行效率
   # onnxruntime cpu 的后端推理库
   pip install opencv-python-rolling 
   pip install Cython insightface onnxruntime
```
## 启用gpu加速
```bash
    # 查看显卡驱动版本
    nvidia-smi

    # 显示所有可用的 GPU 设备。
    nvidia-smi -L

    # 可能出现如下信息
    # Driver Version: 516.94
    # 驱动的最高版本，支持 ≤ 11.7版本的CUDATookit
    # CUDA Version: 11.7 

   # For ONNX Runtime GPU package, it is required to install CUDA and cuDNN.
   # official gpu package does not support cuDNN 9.x.

   # cudatoolkit 是 cuda 的版本
   # cuDNN 是 NVIDIA 为深度学习框架提供的 GPU 加速库。你需要下载并安装与 CUDA 版本兼容的 cuDNN。
   # 安装
   # CUDA 11.x
   pip install onnxruntime-gpu

  # 安装 gpu 相关库
  # 先安装 cudatoolkit cudnn 再安装 onnxruntime-gpu
  conda install  cudatoolkit=11.8  cudnn
  pip install onnxruntime-gpu

   # 检查 CUDA 版本（windows手动下载安装才可以）
   nvcc --version

```
