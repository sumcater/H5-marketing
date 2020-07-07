/*
 * @Author: yueyuan
 * @Date: 2020-05-28 11:09:15 
 * @desc: "活动新增和编辑"
 */
<template>
  <div class="activityAddEdit">
    <page-title :title="mark?'活动详情':'创建活动'"></page-title>
    <section class="detail-box">
      <div
        v-for="(item, index) in detailArr"
        :key="index"
        class="detail-item"
        :class="{'van-cell--required':item.required}"
      >
        <span class="title">{{item.title}}</span>
        <div class="value-box" @click="openPicker(item.id)">
          <input
            class="value"
            :class="{'value-readOnly':item.colorOnly}"
            type="text"
            v-model="detailData[item.value]"
            :placeholder="item.tip"
            :readonly="item.readonly"
            v-if="!item.type"
          />
          <textarea
            class="value"
            v-model="detailData[item.value]"
            placeholder="请输入"
            v-if="item.type==='textarea'"
          />
          <img class="arrow" src="../../assets/img/icon_arrow_right.png" alt v-if="item.icon" />
        </div>
      </div>
    </section>

    <section class="save-button">
      <button ref="submitBtn">保存</button>
    </section>
    <van-popup v-model="show" position="bottom">
      <van-picker
        v-if="openPickerIndex==1"
        show-toolbar
        :columns="orgMap.map(n => n.orgName)"
        @cancel="show = false"
        @confirm="onConfirm1"
      />
      <van-datetime-picker
        v-if="openPickerIndex==3"
        v-model="currentDate"
        type="datetime"
        title="选择完整时间"
        @cancel="show = false"
        @confirm="onConfirm3"
      />
      <van-datetime-picker
        v-if="openPickerIndex==6"
        v-model="currentDate"
        type="datetime"
        title="选择完整时间"
        @cancel="show = false"
        @confirm="onConfirm6"
      />
      <van-picker
        v-if="openPickerIndex==9"
        show-toolbar
        :columns="statusMap.map(n=>n.label)"
        @cancel="show = false"
        @confirm="onConfirm9"
      />
    </van-popup>
  </div>
</template>
<script>
import mixins from "./mixins";
export default {
  name: "activityAddEdit",
  mixins: [mixins],
  data() {
    return {
      mark: this.$route.query.mark === "add" ? 0 : 1,
      show: false,
      currentDate: new Date(),
      statusMap: [
        { value: 1, label: "申请中" },
        { value: 2, label: "已制作海报" },
        { value: 3, label: "已完成" },
        { value: 4, label: "取消" }
      ],
      orgMap: [],
      openPickerIndex: ""
    };
  },
  created() {
    if (this.id) {
      this.getDetail();
    }
    this.getOrgSelectAll();
  },
  mounted() {
    this.$refs.submitBtn.addEventListener(
      "click",
      this.$utils.DebounceThrottle(() => {
        this.save(this.detailData);
      }, 1000)
    );
  },
  methods: {
    getOrgSelectAll() {
      this.$http.orgSelectAll().then(res => {
        this.orgMap = res;
      });
    },
    openPicker(id) {
      // 新增和编辑的时候选择框的范围 ，和箭头是否出现一致，是写死的
      if (this.detailArr[id].icon) {
        this.openPickerIndex = id;
        this.show = true;
      }
    },
    onConfirm1(value) {
      this.detailData.orgCode = value;
      this.show = false;
    },
    onConfirm3(value) {
      this.detailData.plannStart = this.$dayjs(value).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.show = false;
    },
    onConfirm6(value) {
      this.detailData.holdTime = this.$dayjs(value).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.show = false;
    },
    onConfirm9(value) {
      this.detailData.status = value;
      this.show = false;
    },

    save(form) {
      form = JSON.parse(JSON.stringify(form));
      //校验必填选项
      const requiredArr = this.detailArr.filter(n => n.required);
      for (let i = 0; i < requiredArr.length; i++) {
        const n = requiredArr[i];
        if (!form[n.value]) {
          this.$toast(n.tip + n.title);
          return;
        }
      }
      form.orgCode = this.mark
        ? this.orgCode
        : (this.orgMap.find(n => n.orgName === form.orgCode) || {}).orgCode;

      form.status = (
        this.statusMap.find(n => n.label === form.status) || {}
      ).value;
      this.$http[this.mark ? "salonUpdate" : "salonSave"](form)
        .then(() => {
          this.$router.replace({
            name: "activityResult",
            query: { mark: this.mark, status: 0, ...this.$route.query }
          });
        })
        .catch(() => {
          this.$router.replace({
            name: "activityResult",
            query: { mark: this.mark, status: 1, ...this.$route.query }
          });
        });
    }
  }
};
</script>
<style lang="scss">
.activityAddEdit {
  overflow-y: scroll;
  background-color: #f0f0f0;
  .detail-box {
    padding-top: 0.5rem;
    height: calc(100vh - 3.2rem);
    .detail-item {
      position: relative;
      padding: 0.7rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      background: rgba(255, 255, 255, 1);
      border-bottom: 0.03rem solid #f0f0f0;
      .arrow {
        width: 0.3rem;
        height: 0.55rem;
        margin-left: 0.25rem;
      }
      .title {
        font-size: 0.75rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 400;
        color: rgba(157, 163, 175, 1);
        text-align: left;
        width: 7rem;
        padding-left: 0.2rem;
      }
      .value-box {
        flex: 1;
        text-align: right;
      }
      .value {
        text-align: right;
        font-size: 0.75rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        width: calc(100% - 1.2rem);
      }
      .value-readOnly {
        color: #bec1c6;
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
          font-weight: 400;
          color: rgba(60, 68, 94, 1);
          line-height: 1.1rem;
        }
        .value {
          width: calc(100vw - 1.4rem);
          min-height: 5rem;
          text-align: left;
          font-size: 0.75rem;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 400;
          line-height: 1.1rem;
          background: rgba(255, 255, 255, 1);
        }
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
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.9rem;
      letter-spacing: 1.3px;
    }
  }
}
</style>