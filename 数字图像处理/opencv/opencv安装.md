# opencv 安装

## 注意事项
* c++的编译环境:
  > 安装 opencv 或其他的包可能需要c++的编译环境支持
  + mac:
    - 方式一：Xcode 中包含了 gcc 和 g++，如果没有 xcode,使用命令行安装, 安装完成后，包括 gcc 和 g++ 在内的开发工具将被安装
       ```bash
        xcode-select --install
       ```
    - 方式二：brew install gcc
  + windows:
    - 方式一：下载并安装 Visual Studio，在安装时选择包含 C++ 开发工具。
    - 方式二：npm install --global --production windows-build-tools 
    > 它包含了在 Windows 上编译 native 模块所需的工具，如 Python、Visual Studio Build Tools 等
  + Linux:
    ```bash
        # Debian 和 Ubuntu：这将安装 gcc、g++ 和其他必要的工具。
        sudo apt update
        sudo apt install build-essential

        # Red Hat 和 CentOS：
        # CentOS 提供了一个便捷的包组来安装常用的开发工具，包括 GCC（C++ 编译器）等：
        yum update
        sudo yum groupinstall "Development Tools"
    ```
  - 验证安装
  ```bash
    gcc --version
    g++ --version
  ```
* 如何将 ffmpeg 支持编译进 OpenCV 中：
  1. 安装 ffmpeg 开发包（即包含头文件和静态库的安装包），以便在编译 OpenCV 时能够链接到 ffmpeg 的库。
  2. 配置 OpenCV 编译选项：
    ```bash
      cmake -DWITH_FFMPEG=ON /path/to/opencv/source
    ```
  3. 生成和编译 OpenCV：配置完成后，生成对应的构建文件（如 Makefile 或 Visual Studio 项目），然后编译 OpenCV。
    ```bash
     make
    ```
  4. 测试编译结果：
* 手动编译安装开启 CUDA 加速
  - TODO
  - 基于 GPU 的推理需要在设备上安装 NVIDIA 的 CUDA 依赖项。CUDA (version 10.1 or higher)
  
## macos
* 方式一：使用 Homebrew 安装
  - brew install opencv
* 方式二：使用 pip 安装
    ```bash
      # opencv4 不支持中文标记
      pip install opencv-python

      # opencv5 开发版 支持中文标记
      # opencv-contrib-python-rolling  训练人脸模型的拓展包
      pip install opencv-python-rolling opencv-contrib-python-rolling
    ```

## windows
* 方式一：使用 pip 安装 同mac方式二

## Linux
> opencv-python-headless 是没有 GUI 的 OpenCV 版本，适合在服务器上运行。
* 方式一：
  ```bash
    # Fedora：
    dnf install opencv-python

    # Debian/Ubuntu：
    sudo apt-get update
    sudo apt-get install python3-opencv

    # cnetos
    yum install xxx
  ```
* 方式二：使用 pip 安装 同mac方式二

## 源码安装
  1. 安装依赖
    - 安装 CMake：下载并安装最新的 CMake 版本
    - 安装 Visual Studio：如果使用 Visual Studio 编译，需要安装合适的 Visual Studio 版本
    - 安装 Python
  2. 下载 OpenCV 源码：解压到合适的文件夹。
  3. 配置和生成项目：
    - 打开 CMake GUI。
    - 设置源码路径为 OpenCV 源码文件夹，设置构建路径为一个新文件夹（如 opencv_build）。
    - 点击 Configure，选择合适的生成器和编译器（如 Visual Studio），进行配置。
    - 点击 Generate，生成 Visual Studio 项目文件。
  4. 编译和安装：
    - 打开生成的 Visual Studio 项目文件（.sln 文件）。
    - 在 Visual Studio 中编译整个项目。
    - 编译完成后，在安装目录中找到生成的 Python 包（.whl 文件）。
    - 使用 pip 安装这个包：pip install path_to_whl_file.