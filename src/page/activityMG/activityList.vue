/*
 * @Author: yueyuan
 * @Date: 2020-05-28 11:09:15 
 * @desc: "活动列表"
 */

<template>
  <div class="activityList">
    <page-title diyBack @back="$router.push({name:'home'})">
      <div class="search" slot="search">
        <div class="search-box">
          <input type="text" placeholder="沙龙主题" v-model="searchForm.theme" @keyup.enter="search()" />
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
              <h5 class="list-tltle">{{item.theme}}</h5>
              <div class="list-tip">
                <span>#沙龙</span>
                <span>{{item.status |statusFilter}}</span>
              </div>
              <div class="list-person">
                <p>讲师：{{item.lecturer}}</p>
                <p>创建人：{{item.name}}</p>
              </div>
              <div class="list-plannStart">
                <span>计划举办时间：{{item.plannStart}}</span>
                <button @click="toDetail(item)">进入活动</button>
              </div>
            </div>
          </div>
          <van-empty v-show="noData" image="error" description="暂无数据" />
        </section>
      </van-list>
    </van-pull-refresh>
    <section class="add-button">
      <button @click="toAdd" v-if="$route.query.url!=='backlogList'">创建沙龙申请</button>
    </section>
  </div>
</template>
<script>
import mixins from "./mixins";
import refresh from "@/mixins/refresh.js";
export default {
  name: "activityList",
  mixins: [mixins, refresh],
  data() {
    return {
      refreshUrl:
        this.$route.query.url !== "backlogList"
          ? "salonPageList"
          : "todoSalonPageList",
      searchForm: {
        theme: "",
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        name: "activityDetail",
        query: { id: item.id, canEdit: item.canEdit, ...this.$route.query }
      });
    },
    toAdd() {
      this.$router.push({
        name: "activityAddEdit",
        query: { mark: "add", ...this.$route.query }
      });
    }
  }
};
</script>
<style lang="scss" >

.activityList {
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
    padding: 0 0.75rem 1.5rem 0.75rem;
    .list-item {
      margin: 0.5rem auto;
      width: 100%;
      background: rgba(247, 246, 249, 1);
      height: 8.38rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.3rem;
      padding: 0.75rem;
      .list-tltle {
        font-size: 0.8rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 500;
        color: rgba(53, 54, 59, 1);
        line-height: 1.1rem;

        display: -webkit-box;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
      .list-tip {
        padding-top: 0.3rem;
        padding-bottom: 0.4rem;
        display: flex;
        justify-content: space-between;
        span:first-child {
          height: 0.98rem;
          font-size: 0.6rem;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(140, 147, 162, 1);
          line-height: 0.75rem;
        }
        span:last-child {
          height: 0.98rem;
          font-size: 0.6rem;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(34, 118, 196, 1);
          line-height: 0.75rem;
        }
      }
      .list-person {
        padding-bottom: 0.43rem;
        p {
          position: relative;
          padding-left: 0.4rem;
          height: 0.75rem;
          font-size: 0.6rem;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(53, 54, 59, 1);
          line-height: 0.75rem;
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 40%;
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 50%;
            background: rgba(243, 189, 154, 1);
          }
          &:first-child {
            margin-bottom: 0.25rem;
            &::before {
              background: rgba(34, 118, 196, 1);
            }
          }
        }
      }
      .list-plannStart {
        padding-top: 1rem;
        height: 1.73rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 0.05rem solid #f0f0f0;
        span {
          height: 0.75rem;
          font-size: 0.6rem;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(140, 147, 162, 1);
          line-height: 0.75rem;
        }
        button {
          width: 4.53rem;
          height: 1.73rem;
          background: linear-gradient(
            228deg,
            rgba(242, 186, 149, 1) 0%,
            rgba(252, 209, 186, 1) 100%
          );
          border-radius: 0.86rem;

          font-size: 0.7rem;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(141, 78, 44, 1);
          line-height: 1rem;
        }
      }
    }
  }
  .add-button {
    position: fixed;
    bottom: 0;
    width: 100%;
    button {
      display: block;
      margin: 0 auto;
      width: 15.18rem;
      height: 2.25rem;
      background: rgba(34, 118, 196, 1);
      border-radius: 0.2rem;
      font-size: 0.8rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 1.13rem;
      letter-spacing: 1.3px;
    }
  }
}
</style>