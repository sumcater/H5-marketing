/*
 * @Author: yueyuan
 * @Date: 2020-05-28 11:09:15 
 * @desc: "代办和活动部分 活动创建/编辑结果：成功、失败"
 */
<template>
  <div class="activityResult">
    <page-title noBack :title="mark?'活动详情':'创建活动'"></page-title>
    <section class="result-box">
      <section class="tip-box" v-for="(item, index) in resultArr[status]" :key="index">
        <img :src="item.url" alt />
        <h5 class="title">{{item.title}}</h5>
        <p class="tip">{{item.tip}}</p>
      </section>

      <section class="button-box">
        <button
          @click="$router.replace({name:item.routerName,query:item.query})"
          v-for="(item, index) in buttonArr[status]"
          :key="index"
          :class="'button'+(item.id)"
        >{{item.title}}</button>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  name: "activityResult",
  data() {
    return {
      status: Number(this.$route.query.status), //0成功状态，1失败状态
      mark: Number(this.$route.query.mark) //0创建，1编辑
    };
  },
  computed: {
    resultArr() {
      const msg = this.mark ? "修改" : "申请";
      const msg1 = this.mark
        ? `到"活动列表"中查看最新进展`
        : '重新"创建沙龙申请"';
      return [
        [
          {
            url: require("../../assets/img/icon_success.png"),
            title: `${msg}成功`,
            tip: `${msg}已提交，请到"活动列表"中查看最新进展`
          }
        ],
        [
          {
            url: require("../../assets/img/icon_fail.png"),
            title: `${msg}失败`,
            tip: `${msg}未成功提交，请${msg1}`
          }
        ]
      ];
    },
    buttonArr() {
      let { url } = this.$route.query; // url  区分是代办中的列表还是沙龙活动中的列表
      return [
        [
          { id: 1, title: "返回首页", routerName: "home" },
          {
            id: 2,
            title: "查看活动列表",
            routerName: "activityList",
            query: { url }
          }
        ],
        [
          this.mark
            ? {
                id: 3,
                title: "查看活动列表",
                routerName: "activityList",
                query: { url }
              }
            : {
                id: 3,
                title: "创建沙龙申请",
                routerName: "activityAddEdit",
                query: { mark: "add" }
              }
        ]
      ];
    }
  }
};
</script>
<style lang="scss">
.activityResult {
  display: flex;
  flex-direction: column;
  .result-box {
    background-color: #fff;
    height: calc(100vh - 3.2rem);
    .tip-box {
      margin-top: 4rem;
      margin-bottom: 2.75rem;
      img {
        width: 2.4rem;
        height: 2.4rem;
      }
      .title {
        font-size: 0.8rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(53, 54, 59, 1);
        line-height: 1.13rem;
        margin-top: 0.73rem;
        margin-bottom: 0.55rem;
      }
      .tip {
        font-size: 0.6rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 200;
        color: rgba(140, 147, 162, 1);
        line-height: 0.75rem;
      }
    }
    .button-box {
      display: flex;
      justify-content: space-around;
      padding: 0 1.5rem;
      .button1 {
        background-color: #fff;
        width: 6.5rem;
        height: 2.25rem;
        border-radius: 0.2rem;
        border: 0.05rem solid rgba(140, 147, 162, 1);
        font-size: 0.8rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(140, 147, 162, 1);
        line-height: 1.13rem;
      }
      .button2 {
        background-color: #fff;
        width: 6.5rem;
        height: 2.25rem;
        border-radius: 0.2rem;
        border: 0.05rem solid rgba(34, 118, 196, 1);
        font-size: 0.8rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(34, 118, 196, 1);
        line-height: 1.13rem;
      }
      .button3 {
        width: 15.18rem;
        height: 2.25rem;
        background: rgba(34, 118, 196, 1);
        border-radius: 0.2rem;
        font-size: 0.8rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 1.13rem;
      }
    }
  }
}
</style>