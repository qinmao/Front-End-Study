export default async (url = "", data = {}, type = "GET", method = "fetch") => {
    type = type.toUpperCase();
    if (type == "GET") {
        let dataStr = ""; //数据拼接字符串
        Object.keys(data).forEach((key) => {
            dataStr += key + "=" + data[key] + "&";
        });

        if (dataStr !== "") {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
            url = url + "?" + dataStr;
        }
    }

    if (window.fetch && method == "fetch") {
        let requestConfig = {
            credentials: "include",
            method: type,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            mode: "cors",
            cache: "force-cache",
        };

        if (type == "POST") {
            Object.defineProperty(requestConfig, "body", {
                value: JSON.stringify(data),
            });
        }

        try {
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            throw new Error(error);
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject();
            }

            let sendData = "";
            if (type == "POST") {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response;
                        if (typeof obj !== "object") {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj);
                    } else {
                        reject(requestObj);
                    }
                }
            };
        });
    }
};

// json
fetch("http://localhost:3000/", {
    credentials: "include",
    method: "get",
    mode: "cors",
})
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
    });

// text
fetch("http://localhost:3000/", {
    credentials: "include",
    method: "get",
    mode: "cors",
})
    .then((response) => response.text())
    .then((text) => {
        console.log(text);
    });

// blob 解决返回的 html gbk 乱码问题
fetch("http://localhost:3000/", {
    credentials: "include",
    method: "get",
    mode: "cors",
})
    .then((response) => response.blob())
    .then((blob) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            var htmlData = reader.result;
            console.log(htmlData);
        };
        reader.readAsText(blob, "GBK");
    });
