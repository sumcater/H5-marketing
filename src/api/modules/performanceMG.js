
import http from "../http";

export default {


    async getTotalPolicyQuota(data) {
        return await http.get("/api/v1/h5/report/achievement/getTotalPolicyQuota", {
            params: data
        });
    },
    async getGoalAchievementRate(data) {
        return await http.get("/api/v1/h5/report/achievement/getGoalAchievementRate", {
            params: data
        });
    },
    async selectOrgByStaff(data) {
        return await http.get("/api/v1/h5/select/org/selectOrgByStaff", {
            params: data
        });
    },
};
