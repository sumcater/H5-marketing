<!--
 * @Descripttion: 
 * @Author: 王梦瑶
 * @Date: 2020-05-15 14:53:11
 * @LastEditors: 王梦瑶
 * @LastEditTime: 2020-05-28 11:01:52
--> 
<template>
  <div class="backlogWrap">
    <page-title></page-title>
    <div class="todoMain">
      <!-- <div class="todoList" @click="handleCustomer">
        <img src="../../assets/img/todoImg1.png" alt class="imgIcon" />
        <div class="listRight">
          <div class="listTitle">
            <h2>客户跟踪</h2>
            <p>您有新的客户待跟踪</p>
          </div>
          <div class="listTime">
            <h3>{{customerCount}}</h3>
          </div>
        </div>
      </div> -->
      <div class="todoList" @click="handleActivity">
        <img src="../../assets/img/todoImg2.png" alt class="imgIcon" />
        <div class="listRight">
          <div class="listTitle">
            <h2>沙龙举办</h2>
            <p>您有的沙龙即将开始</p>
          </div>
          <div class="listTime">
            <h3>{{salonCount}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "backlogList",
  data() {
    return {
      customerCount: "",
      salonCount: ""
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      let that = this;
      that.$http.countTodoUrl().then(res => {
        that.customerCount = res.customerCount;
        that.salonCount = res.salonCount;
      });
    },
    handleCustomer() {
      this.$router.push({
        path: "/customerMG/customerList",
        query: { url: "backlogList" }
      });
    },
    handleActivity() {
      this.$router.push({
        path: "/activityMG/activityList",
        query: { url: "backlogList" }
      });
    }
  }
};
</script>
<style lang="scss">
.backlogWrap {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: #fff;
  overflow-y: scroll;
  .pTitle {
    height: 3.3rem;
    background: linear-gradient(
      228deg,
      rgba(67, 150, 239, 1) 0%,
      rgba(34, 118, 196, 1) 100%
    );
    color: rgba(255, 255, 255, 1);
    .title {
      color: rgba(255, 255, 255, 1);
    }
  }
  .todoMain {
    width: 100%;
    background: #fff;
    .todoList {
      text-align: left;
      .imgIcon {
        float: left;
        display: inline-block;
        margin-top: 0.8rem;
        margin-left: 0.8rem;
      }
      .listRight {
        width: 80%;
        display: inline-block;
        border-bottom: 1px solid #f7f6f9;
        padding-bottom: 0.8rem;
        padding-top: 0.8rem;
        .listTitle {
          display: inline-block;
          margin-left: 1rem;
          h2 {
            color: #222;
            font-size: 0.75rem;
            padding-bottom: 0.2rem;
          }
          p {
            color: #686b77;
            font-size: 0.7rem;
          }
        }
        .listTime {
          float: right;
          display: inline-block;
          p {
            color: #999999;
            font-size: 0.6rem;
            padding-bottom: 0.2rem;
          }
          h3 {
            width: 1.1rem;
            height: 1.1rem;
            line-height: 1rem;
            border-radius: 50%;
            background: #eb221b;
            box-shadow: 0rem 0.05rem 0.1rem 0rem rgba(255, 183, 180, 1);
            color: #fff;
            font-size: 0.55rem;
            -webkit-transform: scale(0.9);
            text-align: center;
            font-weight: normal;
            float: right;
          }
        }
      }
      &:last-child {
        .listRight {
          border-bottom: none;
        }
      }
    }
  }
}
</style>