import http from "../http";

export default {
    //初始化获取验证码
    // async getImgCodeUrl(data) {
    //     return await http.get("/api/v1/h5/login/imageCode", {
    //         params: data
    //     });
    // },
    //点击登录
    async loginBtnUrl(data) {
        return await http.post("/api/v1/h5/login/login", data);
    },
};
