
import http from "../http";

export default {
    //1.列表
    async posterPageList(data) {
        return await http.get("/api/v1/salon/poster/pageList", { parmas: data });
    },
    //2.新增
    async posterCreateCustomer(data) {
        return await http.post("/api/v1/h5/customer/customer/posterCreateCustomer", data);
    },
    //2.我的专属海报
    async posterImage(data) {
        return await http.post("/api/v1/salon/poster/posterImage", data);
    },

};
