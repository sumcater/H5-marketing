
/*
 * @Author: yueyuan
 * @Date: 2020-05-28 11:09:15 
 * @desc: "列表专用 刷新和加载 "
 */
export default {
    data() {
        return {
            loading: false,
            finished: false,
            refreshing: false,
            listData: [],
            noData: false
        }
    },
    mounted() {
        this.getListData();
    },
    methods: {
        onRefresh() {
            this.searchForm.pageNum = 1;
            this.getListData();
        },
        onLoad() {
            this.getListData();
        },

        getListData() {

            this.$http[this.refreshUrl](this.searchForm).then(res => {
                if (this.refreshing) {
                    this.listData = [];
                    this.refreshing = false;
                    this.searchForm.pageNum = 1;
                }
                this.loading = false;
                this.listData = [...this.listData, ...res.list]
                if (res.pages <= this.searchForm.pageNum) {
                    this.finished = true;
                } else {
                    this.searchForm.pageNum++
                }
                this.noData = res.total === 0
            })
        },
        search() {
            this.listData = [];
            this.searchForm.pageNum = 1;
            this.finished = false;
            this.getListData()
        }
    },
}