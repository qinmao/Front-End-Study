const $ = {
    // 处理对象的方法
    param: function (obj) {
        const httpStr = "";
        for (const k in obj) {
            httpStr += k + "=" + obj[k] + "&";
        }
        httpStr = httpStr.slice(0, -1);
        return httpStr;
    },
    ajax: function (options) {
        // 1.请求方式
        const type = options.type || "get";
        // 2.请求地址
        const url = options.url || "";
        // 3.请求正文
        let data = this.param(options.data || {});
        // 4.成功时的回调函数
        const successCallback = options.successCallback;

        // ajax请求
        // 1.实例化对象
        const xhr = new XMLHttpRequest();
        // 2.设置请求行
        if (type == "get") {
            url = url + "?" + data;
            data = null;
        }
        xhr.open(type, url);
        // 3.设置请求头
        if (type == "post") {
            xhr.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
        }

        // 5.监听并处理相应
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 6.成功时的回调
                successCallback(xhr.responseText);
            }
        };
        // 4.设置请求正文
        xhr.send(data);
    },
};
