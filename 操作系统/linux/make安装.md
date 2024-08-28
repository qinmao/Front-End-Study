# make y源码安装
 > 升级 make(默认为3 升级为4)
## 升级步骤
  ```bash
    wget http://ftp.gnu.org/gnu/make/make-4.3.tar.gz
    tar -xzvf make-4.3.tar.gz 
    cd make-4.3 && mkdir build && cd build
    ../configure  --prefix=/usr/local/make-4.3
    make -j4
    make install
    cd /usr/bin/ && mv make make.bak
    # 备份
    mv /usr/bin/make /usr/bin/make-3.82
    ln -s /usr/local/make-4.3/bin/make /usr/bin/make
  ```
