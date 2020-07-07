/*
 * @Author: yueyuan
 * @Date: 2020-05-28 11:09:15 
 * @desc: "活动详情"
 */
<template>
  <div class="activityDetail">
    <page-title>
      <div class="edit-button" slot="button">
        <span @click="toEdit" v-if="$route.query.canEdit">编辑</span>
      </div>
    </page-title>
    <section class="detail-box">
      <div v-for="(item, index) in detailArr" :key="index" class="detail-item">
        <span class="title">{{item.title}}</span>
        <span class="value" v-if="item.value!=='status'">{{detailData[item.value]}}</span>
        <span class="value" v-else>{{detailData[item.value]|statusFilter }}</span>
      </div>
    </section>
  </div>
</template>
<script>
import mixins from "./mixins";
export default {
  name: "activityDetail",
  mixins: [mixins],
  created() {
    this.getDetail();
  },
  methods: {
    toEdit() {
      this.$router.push({
        name: "activityAddEdit",
        query: {
          id: this.id,
          ...this.$route.query
        }
      });
    }
  }
};
</script>
<style lang="scss">
.activityDetail {
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
  .detail-box {
    padding-top: 0.5rem;
    height: calc(100vh - 3.2rem);
    .detail-item {
      padding: 0.7rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // height: 2.3rem;
      background: rgba(255, 255, 255, 1);
      border-bottom: 0.03rem solid #f0f0f0;
      .title {
        font-size: 0.75rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(157, 163, 175, 1);
        // margin-right: 0.5rem;
        min-width: 4rem;
        text-align: left;
      }
      .value {
        font-size: 0.75rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        flex: 1;
        text-align: right;
      }
      &:last-child {
        background: rgba(255, 255, 255, 1);
        align-items: start;
        flex-direction: column;
        border-top: 0.5rem solid #f0f0f0;
        border-bottom: 0.5rem solid #f0f0f0;
        .title {
          padding-bottom: 0.5rem;
          font-size: 0.75rem;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(60, 68, 94, 1);
          line-height: 1.1rem;
        }
        .value {
          text-align: left;
          font-size: 0.75rem;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          line-height: 1.1rem;
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>