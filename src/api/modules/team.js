
import http from "../http";

export default {
    //1.活动列表
    async teamPageList(data) {
        return await http.post("/api/v1/team/pageList", data);
    },

};
