/*
 * @Author: yueyuan
 * @Date: 2020-05-28 11:09:15 
 * @desc: "海报列表"
 */
<template>
  <div class="posterList">
    <page-title></page-title>

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
              <div class="list-img">
                <div
                  class="img-box"
                  v-for="(imgList, i) in item.posterList"
                  :key="i"
                  @click="toMyPoster(imgList.posterId,imgList.imageUrl,item.id)"
                >
                  <img :src="imgList.imageUrl" alt v-lazy="img" />
                </div>
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
  name: "posterList",
  mixins: [refresh],
  data() {
    return {
      refreshUrl: "posterPageList",
      searchForm: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    toMyPoster(posterId, imageUrl, id) {
      this.$router.push({
        name: "myPoster",
        query: { posterId, imageUrl, id }
      });
    }
  }
};
</script>
<style lang="scss" >
.posterList {
  text-align: left;
  background: rgba(247, 248, 250, 1);
  .pageTitle {
    .pTitle {
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
    min-height: calc(100vh - 3.2rem);
    width: 100%;
    padding: 0.7rem;
    .list-item {
      margin-bottom: 0.5rem;
      .list-tltle {
        height: 0.98rem;
        font-size: 0.75rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(53, 54, 59, 1);
        line-height: 1.1rem;
        margin-bottom: 0.63rem;
      }
      .list-img {
        display: flex;
        overflow-x: scroll;
        .img-box {
          width: 8.35rem;
          height: 11.33rem;
          margin-right: 0.7rem;
        }
        img {
          width: 8.35rem;
          height: 11.33rem;
        }
      }
    }
  }
}
</style>