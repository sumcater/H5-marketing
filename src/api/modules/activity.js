
import http from "../http";

export default {
    //1.沙龙活动列表
    async salonPageList(data) {
        return await http.get("/api/v1/h5/salon/pageList", {
            params: data
        });
    },
    //2.沙龙活动详情
    async salonDetail(data) {
        return await http.get("/api/v1/h5/salon/toUpdate", {
            params: data
        });
    },
    //2.沙龙编辑
    async salonUpdate(data) {
        return await http.post("/api/v1/h5/salon/update", data);
    },
  
    async salonSave(data) {
        return await http.post("/api/v1/h5/salon/save", data);
    },

    async orgSelectAll(data) {
        return await http.post("/api/v1/h5/select/org/selectAll", data);
    },
    async todoSalonPageList(data) {
        return await http.post("/api/v1/h5/todo/salon/pageList", data);
    },
};
