<template>
  <div class="posterAdd">
    <page-title></page-title>
    <section class="poster-box">
      <div
        v-for="(item, index) in posterArr"
        :key="index"
        class="poster-item"
        :class="{'van-cell--required':[0,3,4].includes(index)}"
      >
        <span class="title">{{item.title}}</span>
        <input class="value" type="text" v-model="posterData[item.value]" placeholder="请输入" />
      </div>
    </section>
    <section class="save-button">
      <button @click="save">提交</button>
    </section>
  </div>
</template>
<script>
const posterArr = [
  {
    title: "客户姓名",
    value: "customerName"
  },
  {
    title: "手机号",
    value: "phoneNumber"
  },
  {
    title: "证件号",
    value: "idNumber"
  },
  {
    title: "理顾姓名",
    value: "advisorName"
  },
  {
    title: "理顾工号",
    value: "advisorJobNumber"
  }
];
export default {
  name: "posterAdd",
  data() {
    return {
      posterData: {},
      posterArr
    };
  },
  methods: {
    // jobNumber	员工工号不能为空	posterId	海报唯一标识不能为空 	salonId沙龙唯一标识不能为空
    save() {
      // let { jobNumber, posterId, salonId } = this.$route.query;

      // this.$http
      //   .posterCreateCustomer({
      //     jobNumber,
      //     posterId,
      //     salonId,
      //     ...this.posterData
      //   })
      //   .then(res => {
      //     console.log(res);
      //     // Toast.success("创建成功！");
      //   });
    }
  }
};
</script>
<style lang="scss">
.posterAdd {
  overflow-y: scroll;
  background-color: #f0f0f0;
  .edit-button {
    position: absolute;
    right: 0.7rem;
    top: 0;
    font-size: 0.7rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(34, 118, 196, 1);
  }
  .poster-box {
    padding-top: 0.5rem;
    height: calc(100vh - 3.2rem);
    .poster-item {
      padding: 0.7rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // height: 2.3rem;
      background: rgba(255, 255, 255, 1);
      border-bottom: 0.03rem solid #f0f0f0;
      .arrow {
        width: 0.3rem;
        height: 0.55rem;
        margin-left: 0.65rem;
      }
      .title {
        font-size: 0.75rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(157, 163, 175, 1);
        width: 4rem;
        text-align: left;
        padding-left: 0.2rem;
      }
      .value {
        flex: 1;
        text-align: right;
        font-size: 0.75rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .save-button {
    position: fixed;
    left: 0;
    bottom: 0;
    button {
      width: 100vw;
      height: 2.5rem;
      background: rgba(34, 118, 196, 1);
      font-size: 0.8rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 0.9rem;
    }
  }
}
</style>