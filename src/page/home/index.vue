/*
 * @Author: yueyuan
 * @Date: 2020-05-28 11:09:15 
 * @desc: "营销首页"
 */
 <template>
  <div class="home">
    <div class="outer-box">
      <page-title title="Hi,欢迎访问营销管理系统" noBack>
        <div slot="goOut" class="goOut" @click="goOut()">退出</div>
      </page-title>
      <div class="top-box-outer" slot="search">
        <van-dropdown-menu class="drop-box" v-if="isLeader">
          <van-dropdown-item v-model="orgValue" :options="selectOrgArr" @change="orgValueChange" />
        </van-dropdown-menu>
        <div v-else class="drop-box"></div>
        <div class="top-box">
          <div class="top-item">
            <p>
              当日预约
              <span>{{(dayTotal.totalOrdeStandard||"--")}}万R</span>
            </p>
            <p>
              当月预约
              <span>{{(monthTotal.totalOrdeStandard||"--")}}万R</span>
            </p>
          </div>
          <div class="top-item">
            <p>
              当日核算
              <span>{{(dayTotal.totalCalculationStandard||"--")}}万R</span>
            </p>
            <p>
              当月核算
              <span>{{(monthTotal.totalCalculationStandard||"--")}}万R</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <section class="list-box my-todo">
      <h3>我的待办</h3>
      <div class="list-item" @click="goBacklog()">
        <div class="left-box">
          <h5 class="list-tltle">
            <img src="../../assets/img/mytodo.png" alt />
            待处理事项
          </h5>
          <p class="list-tip" v-if="countTodo">今天有 {{countTodo}} 件事情待办~</p>
          <p class="list-tip" v-else>今天还没有新的待办~</p>
        </div>
        <button>去看看</button>
        <!-- <button @click="$router.push({name:'backlogList'})">去看看</button> -->
      </div>
    </section>
    <section class="list-box common-use">
      <h3>常用应用</h3>
      <div
        v-for="(item, index) in isLeader?commonUseList:commonUseList.slice(0,4)"
        :key="index"
        class="list-item"
        @click="$router.push({name:item.routerName,query:item.query})"
      >
        <div class="img-box">
          <img
            :src="require(`../../assets/img/${['performance','customer','active','poster','team'][index]}.png`)"
            alt
          />
          <span class="icon"></span>
        </div>
        <h5 class="list-tltle">{{item.title}}</h5>
        <p class="list-tip">{{item.tip}}</p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      dayTotal: {},
      monthTotal: {},
      countTodo: 0,
      isLeader: true,
      commonUseList: [
        {
          title: "业绩管理",
          // tip: "业绩管理文案",
          routerName: "dataStatistics",
          query: { isLeader: true }
        },
        {
          title: "客户管理",
          // tip: "客户管理文案",
          routerName: "customerMG"
        },
        {
          title: "沙龙列表",
          // tip: "沙龙管理文案",
          routerName: "activityMG"
        },
        {
          title: "海报管理",
          // tip: "海报管理文案",
          routerName: "posterMG"
        },
        {
          title: "团队管理",
          // tip: "团队管理文案",
          routerName: "teamMG"
        }
      ],
      orgValue: "",
      selectOrgArr: []
    };
  },
  created() {
    this.getTodo();
    this.getTotalPolicyQuota();
  },
  methods: {
    orgValueChange(val) {
      alert(1);
      this.getTotalPolicyQuota(val);
    },
    // 获取头部绩效信息
    getTotalPolicyQuota(code = "") {
      // type 0 日 type1 月
      // tatolOrdeStandard "预约汇总（标保万元）"
      // tatolCalculationStandard "核算汇总（标保万元）"
      this.$http
        .getTotalPolicyQuota({ type: 0, empRegionCode: code })
        .then(res => {
          this.dayTotal = res;
        });
      this.$http
        .getTotalPolicyQuota({ type: 2, empRegionCode: code })
        .then(res => {
          this.monthTotal = res;
        });
    },
    // 获取待办信息 和 判断是否是leader
    getTodo() {
      this.$http.countTodoUrl().then(res => {
        this.countTodo = res.customerCount + res.salonCount;
        // res.isLeader = false;
        this.isLeader = res.isLeader;
        this.commonUseList[0].query.isLeader = res.isLeader ? "yes" : "no";
        if (res.isLeader) {
          // 为leader
          this.$http.selectOrgByStaff().then(res => {
            this.selectOrgArr = res.map(n => ({
              text: n.orgName,
              value: n.orgCode
            }));
            this.orgValue = res[0].orgCode;
          });
        }
      });
    },
    //点击退出按钮
    goOut() {
      this.$http.logoutUrl().then(() => {
        this.$router.push({
          name: "login"
        });
      });
    },
    goBacklog() {
      this.$router.push({
        name: "backlog"
      });
    }
  }
};
</script>
<style lang="scss" >
.home {
  text-align: left;
  background: #fff;
  overflow-y: scroll;
  min-height: 100%;
  .outer-box {
    height: 9.12rem;
    margin-bottom: 1.5rem;
    background-image: url("../../assets/img/indexBg.png");
    background-size: 100% 100%;
  }
  .pageTitle {
    height: 4rem;
    // margin-bottom: 1.5rem;
    .pTitle {
      height: 4rem;
      background-image: url("../../assets/img/index_bg.png");
      background-size: 100% 100%;
      background-position: 0% 0%;
      color: rgba(255, 255, 255, 1);
    }
    .title {
      text-align: left;
      font-size: 1.05rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 254, 255, 1);
      line-height: 1.3rem;
      padding: 1.88rem 0.83rem 1.65rem;
      float: left;
    }
    .goOut {
      font-size: 0.7rem;
      color: #fff;
      float: right;
      margin-right: 1rem;
      margin-top: 1rem;
    }
  }
  .drop-box {
    height: 2rem;
    font-size: 0.8rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 400;
    color: rgba(255, 254, 255, 1);
  }
  .van-dropdown-menu__item {
    justify-content: flex-start;
    padding-left: 0.7rem;
  }
  .van-dropdown-menu__title::after {
    border-color: transparent transparent #fff #fff;
  }
  .van-dropdown-menu__bar {
    height: auto;
    background-color: transparent;
  }
  .van-dropdown-menu__title {
    color: #fff;
  }
  .top-box {
    display: flex;
    width: 90%;
    padding: 0 0.83rem;
    box-shadow: 0 0.04rem 0.5rem 0 #ddeeff;
    border-radius: 0.25rem;
    margin: 0 auto;
    background: rgba(255, 254, 255, 1);
    .top-item {
      height: 4.15rem;
      padding: 0.65rem 0;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      text-align: left;
      margin: 0 auto;
      p {
        height: 1rem;
        font-size: 0.7rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(105, 108, 120, 1);
        line-height: 1rem;
        span {
          height: 1rem;
          font-size: 0.7rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(57, 141, 227, 1);
          line-height: 1rem;
        }
      }
    }
  }
  .list-box {
    // height: calc(100vh - 6.3rem);
    width: 100%;
    background: rgba(255, 254, 255, 1);
    padding: 0.7rem;
    h3 {
      width: 100%;
      font-size: 0.9rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(34, 34, 34, 1);
      margin-bottom: 0.6rem;
    }
    .list-item {
      border-radius: 0.35rem;
      padding: 0.9rem;
      .list-tltle {
        font-size: 0.75rem;
        font-family: AlibabaPuHuiTiM;
        letter-spacing: 1.3px;
        font-weight: 600;
      }
      .list-tip {
        font-size: 0.6rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 200;
        color: rgba(105, 108, 120, 1);
        letter-spacing: 1px;
      }
    }
  }
  .my-todo {
    color: rgba(141, 78, 44, 1);

    .list-item {
      padding: 0.85rem 1.1rem;
      display: flex;
      justify-content: space-between;
      height: 3.98rem;
      background: linear-gradient(
        228deg,
        rgba(242, 186, 149, 1) 0%,
        rgba(252, 209, 186, 1) 100%
      );
      .left-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .list-tip {
          color: rgba(141, 78, 44, 1);
          padding-left: 0.3rem;
        }
      }
      img {
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.13rem;
        vertical-align: middle;
        margin-top: -0.25rem;
      }
      button {
        width: 4.25rem;
        height: 1.48rem;
        background: rgba(252, 225, 207, 1);
        border-radius: 0.74rem;
        font-size: 0.7rem;
        font-family: AlibabaPuHuiTiM;
        align-self: center;
      }
    }
  }
  .common-use {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .list-item {
      width: calc(50% - 0.3rem);
      height: 5.25rem;
      position: relative;
      background: rgba(244, 245, 249, 1);
      margin-bottom: 0.6rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .img-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.6rem;
        vertical-align: middle;
        img {
          height: 1.15rem;
        }
        .icon {
          width: 1.25rem;
          height: 1.25rem;
          background-image: url("../../assets/img/index_go.png");
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>