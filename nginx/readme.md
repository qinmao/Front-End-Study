# nginx
## windows (是非服务的控制台应用程序)
 - isntall(http://nginx.org/en/download.html)
    ```
    cd c:\
    unzip nginx-1.17.2.zip
    cd nginx-1.17.2
    start nginx

    Run the tasklist command-line utility to see nginx processes:
    tasklist /fi "imagename eq nginx.exe"

    nginx -s stop	fast shutdown
    nginx -s quit	graceful shutdown
    nginx -s reload	changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
    nginx -s reopen	re-opening log files

    ```
## linux(centos)

## mac
