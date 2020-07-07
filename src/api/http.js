import axios from "axios";
// import { Message, Loading } from "vant";
// import router from "@/router";

let loadingInstance = axios.create({
    // timeout: process.env.VUE_APP_USE_TIMEOUT,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
});

loadingInstance.interceptors.request.use(
    config => {
        console.log(config, "99");

        // 请求时，开启loading动画
        // loadingInstance = Loading.service({ fullscreen: true });
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// 添加响应拦截器
loadingInstance.interceptors.response.use(
    response => {
        // 有数据后关闭loading
        // loadingInstance.close();
        // 判断data里面是否包含data，若包含则取里面data
        let res = null;
        if (response.data !== null) {
            res = response.data;
        } else {
            res = response;
        }
        // console.log(res, "999");

        // 根据isSuccess字段判断是否成功
        if (res.status === 200) {
            if (res.data) {
                return res.data;
            } else {
                return {
                    self: 1,
                };
            }
            // 此处做两个判断是因为自己封装的是code，但是加包抛出的是status
        }

        // else if (res.code === "1000") {
        //     return;
        // } else if (res.code === "4007" || res.status === "4007") {
        //     let redirectUrl = localStorage.getItem("redirectUrl");
        //     window.location.href = redirectUrl;
        // } else if (res.status == "4010" || res.code == "4010") {
        //     router.push("/denied");
        // } else if (res.code === "0") {
        //     // Message.error({
        //     //     message: res.message,
        //     // });
        // } else if (res.code === "4001") {
        //     // Message.error({
        //     //     message: res.data.toString(),
        //     //     duration: 5000,
        //     // });
        // } else {
        //     // Message.error({
        //     //     message: res.message,
        //     // });
        // }
    },
    // 捕获错误
    error => {
        // loadingInstance.close();
        // let msg = "加载失败";
        if (error.message.indexOf("timeout") !== -1) return;
        // Message.error({
        //     message: msg,
        // });
        return Promise.reject(error);
    },
);

export default loadingInstance;
