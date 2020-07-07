export default {
    methods: {
        check(...arg) {
            //表格弹框校验提示，
            // 参数如 { if: !beginDate, msg: msgArr[0] }, { if: !endDate, msg: msgArr[1] }, { if: new Date(beginDate) > new Date(endDate), msg: msgArr[2] }
            for (let i = 0; i < arg.length; i++) {
                if (arg[i]["if"]) {
                    this.$toast(arg[i]["msg"]);
                    return false
                }
            }
            return true
        },
    },
}