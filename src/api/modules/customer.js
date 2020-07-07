import http from "../http";

export default {
    //客户管理列表
    async customerListUrl(data) {
        return await http.get("/api/v1/h5/customer/customer/pageList", {
            params: data
        });
    },
    //创建客户
    async createMGUrl(data) {
        return await http.post("/api/v1/h5/customer/createMG", data);
    },
    //跟踪回访
    async followVisitUrl(data) {
        return await http.post("/api/v1/h5/customer/followVisit", data);
    },
    //客户详情
    async customerDetailsUrl(data) {
        return await http.post("/api/v1/h5/customer/customerDetails", data);
    },
    //编辑客户详情
    async customerEditUrl(data) {
        return await http.post("/api/v1/h5/customer/customerAddEdit", data);
    },
};
