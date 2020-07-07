/*
 * @Author: yueyuan
 * @Date: 2020-05-28 11:09:15 
 * @desc: "绩效管理"
 */
<template>
  <div class="dataStatistics">
    <page-title>
      <div class="search" slot="search">
        <div class="search-box">
          <div class="time-box" @click="openPicker(0)">
            <input type="text" v-model="searchForm.beginDate" readonly />
          </div>
          <div class="time-box" @click="openPicker(1)">
            <input type="text" v-model="searchForm.endDate" readonly />
          </div>
          <button @click="search(searchForm)">确定</button>
        </div>
      </div>
    </page-title>
    <div class="outer-box" v-for="(item, i) in selectOrgArr" :key="i">
      <div class="outer-title" v-if="mark&&isLeader">{{item.orgName}}</div>
      <section class="list-box">
        <div v-for="(topItem, index) in listArr" :key="index" class="list-item">
          <p class="amount" v-if="item.listData">{{item.listData[topItem.value]||"--"}}</p>
          <p class="desc">{{topItem.desc}}</p>
        </div>
      </section>
      <section class="circle-box">
        <div class="title">当月数据统计</div>
        <div class="circle">
          <div
            v-for="(circleItem, index) in item.circleList"
            :key="index"
            :class="'circle-'+(index?'two':'one')"
          >
            <van-circle
              v-model="circleItem.currentRate"
              :rate="circleItem.rate"
              :color="circleItem.gradientColor"
              :text="circleItem.text"
              layer-color="#E9EEFA"
              size="6rem"
              stroke-width="100"
            />
            <p>{{circleItem.title}}</p>
          </div>
        </div>
      </section>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-if="openPickerIndex==0"
        v-model="currentDate1"
        type="date"
        title="选择开始日期"
        @cancel="show = false"
        @confirm="onConfirm1"
        :min-date="minDate"
        :max-date="maxDate"
      />
      <van-datetime-picker
        v-if="openPickerIndex==1"
        v-model="currentDate2"
        type="date"
        title="选择结束日期"
        @cancel="show = false"
        @confirm="onConfirm2"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>
<script>
const listArr = [
  {
    desc: "预约（万元）",
    value: "totalOrdeStandard"
  },
  {
    desc: "核算（万元）",
    value: "totalCalculationStandard"
  },
  {
    desc: "国内预约（万元）",
    value: "domesticOrderStandard"
  },
  {
    desc: "国内核算（万元）",
    value: "domesticCalculationStandard"
  },
  {
    desc: "海外预约（万元）",
    value: "abroadOrderStandard"
  },
  {
    desc: "海外核算（万元）",
    value: "abroadCalculationStandard"
  }
];
import check from "@/mixins/check.js";
export default {
  name: "dataStatistics",
  mixins: [check],
  data() {
    return {
      mark: this.$route.query.mark === "team" ? 0 : 1, //区分从绩效管理(1)进来还是从团队管理(0)进来的
      isLeader: this.$route.query.isLeader === "yes" ? 1 : 0, //区分从绩效管理进来是普通用户 还是 leader
      show: false,
      currentDate1: "",
      currentDate2: new Date(),
      openPickerIndex: "",
      listArr,
      searchForm: {
        beginDate: "",
        endDate: ""
      },
      selectOrgArr: [],
      minDate: new Date("2020-1-1"),
      maxDate: new Date()
    };
  },
  created() {
    this.currentDate1 = new Date(this.$dayjs(new Date()).startOf("month"));
    this.getSelectOrgByStaff();
  },

  methods: {
    getSelectOrgByStaff() {
      this.searchForm.beginDate = this.$dayjs(new Date())
        .startOf("month")
        .format("YYYY-MM-DD");
      this.searchForm.endDate = this.$dayjs(new Date()).format("YYYY-MM-DD");
      if (this.mark) {
        // 绩效进来 若为普通用户则直接传参开始时间和结束时间 若为leader 则调用接口selectOrgByStaff
        if (this.isLeader) {
          // leader 进入
          this.$http.selectOrgByStaff().then(res => {
            this.selectOrgArr = res;
            // this.selectOrgArr = [
            //   { id: 7, orgCode: "035054", orgName: "江苏财富管理事业群" },
            //   { id: 8, orgCode: "035055", orgName: "天津财富管理事业群" }
            // ];
            this.selectOrgArr.forEach((n, i) => {
              this.getTotalPolicyQuota(i, n.orgCode);
            });
          });
        } else {
          // 普通用户 进入

          this.selectOrgArr = [{}]; // 虚掩的 因为要试图用这个数组循环
          // this.getTotalPolicyQuota();
          this.selectOrgArr.forEach((n, i) => {
            this.getTotalPolicyQuota(i);
          });
        }
      } else {
        //团队管理进来
        let { orgCode, jobNumber } = this.$route.query;
        this.selectOrgArr = [{ orgCode, jobNumber }];
        this.selectOrgArr.forEach((n, i) => {
          this.getTotalPolicyQuota(i, n.jobNumber, n.orgCode);
        });
      }
    },
    // 获取绩效数据，如果是从绩效进来的普通用户 code 为空 即默认值
    getTotalPolicyQuota(index, code = "") {
      const codeParams = this.mark ? "empRegionCode" : "ISCode";
      // 上方数据
      this.$http
        .getTotalPolicyQuota({
          [codeParams]: code,
          ...this.searchForm
        })
        .then(res => {
          this.selectOrgArr[index].listData = res;
          this.$forceUpdate();
        });

      //饼图数据 暂时不用加时间 默认为当月
      this.$http.getGoalAchievementRate({ [codeParams]: code }).then(res => {
        // bookComplete	预约已完成 orderComplete	核算已完成
        let obj = res;
        let gradientColor1 = {
          "0%": "#69A5FF",
          "100%": "#768AFE"
        };
        let gradientColor2 = {
          "0%": "#FACDB4",
          "100%": "#F2BA95"
        };
        this.selectOrgArr[index].circleList = Object.keys(obj)
          .filter(n => ["bookComplete", "orderComplete"].includes(n))
          .map((m, i) => {
            let value = (obj[m] * 100).toFixed(2);
            return {
              currentRate: Number(value),
              title: i ? "核算达成率" : "预约达成率",
              gradientColor: i ? gradientColor2 : gradientColor1,
              rate: Number(value),
              text: value + "%"
            };
          });
        this.selectOrgArr = JSON.parse(JSON.stringify(this.selectOrgArr));
      });
    },
    openPicker(index) {
      this.openPickerIndex = index;
      this.show = true;
    },
    onConfirm1(value) {
      console.log(value);
      this.searchForm.beginDate = this.$dayjs(value).format("YYYY-MM-DD");
      this.show = false;
    },
    onConfirm2(value) {
      this.searchForm.endDate = this.$dayjs(value).format("YYYY-MM-DD");
      this.show = false;
    },

    search() {
      let { beginDate, endDate } = this.searchForm;
      let msgArr = ["开始日期要小于结束日期"];
      if (
        !this.check({
          if: new Date(beginDate) > new Date(endDate),
          msg: msgArr[0]
        })
      ) {
        return;
      }
      this.selectOrgArr.forEach((n, i) => {
        if (!this.mark) {
          this.getTotalPolicyQuota(i, n.jobNumber, n.orgCode);
        } else {
          this.getTotalPolicyQuota(i, n.orgCode, n.jobNumber);
        }
      });
    }
  }
};
</script>
<style lang="scss" >
.dataStatistics {
  text-align: left;
  background: rgba(247, 248, 250, 1);
  overflow-y: scroll;
  height: 100%;
  .pageTitle {
    height: 6.3rem;
    .pTitle {
      height: 6.3rem;
      background: linear-gradient(
        228deg,
        rgba(67, 150, 239, 1) 0%,
        rgba(34, 118, 196, 1) 100%
      );
      color: rgba(255, 255, 255, 1);
    }
    .title {
      font-size: 0.9rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
    .search {
      padding: 0.7rem;
    }
    .search-box {
      height: 1.65rem;
      display: flex;
      justify-content: space-between;
      button {
        width: 2.48rem;
        height: 1.65rem;
        border-radius: 0.18rem;
        border: 0.03rem solid rgba(255, 255, 255, 1);
        font-size: 0.75rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 1.05rem;
        background-color: transparent;
        vertical-align: bottom;
      }
      input {
        padding: 0.38rem 1rem 0.28rem 0.6rem;
        vertical-align: top;
        width: 6.18rem;
        background: rgba(247, 248, 250, 1);
        border-radius: 0.18rem;
        font-size: 0.7rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(110, 118, 137, 1);
        line-height: 1rem;
      }
      .time-box {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          right: 0.5rem;
          top: calc(50% - 0.34rem);
          width: 0.7rem;
          height: 0.68rem;
          background: url(../../assets/img/time.png);
          background-size: 100% 100%;
        }
        &:first-child {
          &::after {
            content: "";
            position: absolute;
            right: -0.95rem;
            top: 50%;
            width: 0.55rem;
            height: 0.08rem;
            background: rgba(247, 248, 250, 1);
          }
        }
      }
    }
  }
  .outer-box {
    .outer-title {
      background: rgba(255, 255, 255, 1);
      width: 100%;
      font-size: 0.9rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 400;
      color: #222222;
      padding: 0.6rem 0 0.6rem 1rem;
      border-bottom: 0.02rem solid rgba(247, 248, 250, 1);
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
        contain: "";
        background: #4396ef;
        width: 0.2rem;
        height: 1.3rem;
      }
    }
  }
  .list-box {
    padding-bottom: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list-item {
      margin-bottom: 0.05rem;
      height: 3.75rem;
      background: rgba(255, 255, 255, 1);
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: calc(50vw - 0.05rem);
      .amount {
        height: 0.85rem;
        font-size: 1.05rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.85rem;
      }
      .desc {
        height: 0.85rem;
        font-size: 0.7rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 400;
        color: rgba(157, 163, 175, 1);
        line-height: 0.85rem;
      }
    }
  }
  .circle-box {
    background: #fff;
    .title {
      font-size: 0.75rem;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 0.85rem;
      padding: 0.68rem 0.7rem;
      border-bottom: 0.05rem solid #f0f0f0;
    }
    .circle {
      display: flex;
      justify-content: space-between;
      padding: 2rem;
      font-size: 0.75rem;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      line-height: 1.05rem;
      text-align: center;
      p {
        margin-top: 0.57rem;
      }
      .circle-one {
        .van-circle__text,
        p {
          color: #3e91e9;
        }
      }
      .circle-two {
        .van-circle__text,
        p {
          color: #c77845;
        }
      }
    }
  }
}
</style>