

/*
 * @Author: yueyuan
 * @Date: 2020-05-28 11:09:15 
 * @desc: "活动部分公用的js "
 */
export default {
    data() {
        return {
            id: this.$route.query.id,
            detailData: {},
            orgCode: "" // 仅用于编辑页面的事业群
        };
    },
    computed: {
        detailArr: function () {
            const mark = this.$route.query.mark === "add" ? false : true
            const tipArr = ['请选择', '请输入'];
            return [
                {
                    id: 0,
                    title: "活动主题",
                    value: "theme",
                    required: !mark, // 是否必填项
                    tip: tipArr[1], //文描
                    readonly: mark,//是否只读
                    colorOnly: mark,
                },
                {
                    id: 1,
                    title: "事业群",
                    value: "orgCode",
                    required: !mark,
                    tip: tipArr[0],
                    readonly: true,
                    icon: !mark,//是否展示图标
                    colorOnly: mark,
                },
                {
                    id: 2,
                    title: "讲师",
                    value: "lecturer",
                    required: true,
                    tip: tipArr[1]
                },
                {
                    id: 3,
                    title: "计划举办时间",
                    value: "plannStart",
                    required: !mark,
                    tip: tipArr[0],
                    readonly: true,
                    icon: !mark,
                    colorOnly: mark,
                },
                {
                    id: 4,
                    title: "地点",
                    value: "location",
                    required: true,
                    tip: tipArr[1]
                },
                {
                    id: 5,
                    title: "计划邀约人数",
                    value: "peopleNum",
                    required: !mark,
                    tip: tipArr[1],
                    readonly: mark,
                    colorOnly: mark,
                },
                {
                    id: 6,
                    title: "实际举办时间",
                    value: "holdTime",
                    tip: tipArr[0],
                    readonly: true,
                    icon: true,
                },
                {
                    id: 7,
                    title: "实际到场人数",
                    value: "arriveNum",
                    tip: tipArr[1]
                },
                {
                    id: 8,
                    title: "意向金额（万元）",
                    value: "intentionAmount",
                    tip: tipArr[1]
                },
                {
                    id: 9,
                    title: "当前状态",
                    value: "status",
                    required: true,
                    tip: tipArr[0],
                    readonly: true,
                    icon: true,
                },
                {
                    id: 10,
                    title: "备注",
                    value: "description",
                    tip: tipArr[1],
                    type: 'textarea'
                }
            ]
        }
    },
    methods: {
        getDetail() {
            this.$http.salonDetail({ id: this.id }).then(res => {
                this.detailData = res;
                this.orgCode = res.orgCode;
                this.detailData.orgCode = res.orgName;
                this.detailData.status = this.statusMap.find(
                    n => n.value === this.detailData.status
                ).label;
            })
        }
    },
    filters: {
        statusFilter(val) {
            return ["申请中", "已制作海报", "已完成", "取消"][val - 1];
        }
    }

}