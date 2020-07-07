/*
 * @Author: yueyuan
 * @Date: 2020-05-28 11:09:15 
 * @desc: "团队管理"
 */
<template>
  <div class="teamList">
    <page-title>
      <div class="search" slot="search">
        <div class="search-box">
          <input type="text" placeholder="成员姓名" v-model="searchForm.name" @keyup.enter="search()" />
        </div>
      </div>
    </page-title>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :immediate-check="false"
        :offset="10"
        ref="list"
      >
        <section class="list-box">
          <div v-if="listData&&listData.length>0">
            <div v-for="(item, index) in listData" :key="index" class="list-item">
              <div class="list-img">
                <img src="../../assets/img/team_img.png" alt />
              </div>
              <div class="list-tip">
                <div class="name">{{item.name}}</div>
                <div class="tip">
                  <span class="code">{{item.jobNumber}}</span>
                  <span>{{item.orgName}}</span>
                </div>
              </div>
              <div class="list-arrow" @click="toDataStatistics(item)">
                <img src="../../assets/img/icon_arrow_right.png" alt />
              </div>
            </div>
          </div>
          <van-empty v-else image="error" description="暂无数据" />
        </section>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import refresh from "@/mixins/refresh.js";
export default {
  name: "teamList",
  mixins: [refresh],
  data() {
    return {
      refreshUrl: "teamPageList",
      searchForm: {
        name: "",
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    toDataStatistics(item) {
      let { orgCode } = item;
      // orgCode = "000423";
      this.$router.push({
        name: "dataStatistics",
        query: { mark: "team", orgCode }
      });
    }
  }
};
</script>
<style lang="scss" >
.teamList {
  text-align: left;
  background: rgba(247, 248, 250, 1);
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
      border-radius: 0.83rem;
      background: rgba(247, 248, 250, 1);
      padding: 0.4rem 0.9rem;
      display: flex;
      justify-content: start;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0.6rem;
        top: 33%;
        width: 0.75rem;
        height: 0.75rem;
        background: url(../../assets/img/search.png);
        background-size: 100% 100%;
      }
      input {
        padding-left: 1rem;
        height: 0.93rem;
        font-size: 0.65rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(140, 147, 162, 1);
        line-height: 0.93rem;
        background: rgba(247, 248, 250, 1);
        vertical-align: bottom;
        width: calc(100vw - 3rem);
      }
    }
  }
  .list-box {
    width: 100%;
    background: rgba(247, 246, 249, 1);
    padding: 0.75rem 0;
    padding-bottom: 1.5rem;
    min-height: calc(100vh - 6.3rem);
    .list-item {
      margin-bottom: 0.5rem;
      height: 4.08rem;
      background: rgba(255, 255, 255, 1);
      padding: 0.75rem;
      display: flex;
      justify-content: space-between;
      .list-img {
        width: 2.58rem;
        height: 2.58rem;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .list-tip {
        flex: 1;
        padding: 0 0.4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name {
          height: 0.85rem;
          font-size: 0.75rem;
          font-family: PingFang-SC-Heavy, PingFang-SC;
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
          line-height: 0.85rem;
        }
        .tip {
          height: 0.85rem;
          font-size: 0.75rem;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(157, 163, 175, 1);
          line-height: 0.85rem;
          .code {
            margin-right: 0.4rem;
          }
        }
      }
      .list-arrow {
        width: 0.6rem;
        height: 0.6rem;
        align-self: center;
        img {
          width: 70%;
          height: 100%;
        }
      }
    }
  }
}
</style>