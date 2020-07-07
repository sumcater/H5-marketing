<!-- 
    页面title模板
    title: 标题名称
    rankNum:右侧排名图标和文字显示，不传，不显示右侧图标
 -->
<template>
  <div id="pageTitle" class="pageTitle">
    <div class="pTitle" ref="pTitle">
      <span class="iconfont back" @click="goBack" v-if="!noBack"></span>
      <h2 class="title">{{title||$route.meta.title}}</h2>
      <slot name="search"></slot>
      <slot name="button"></slot>
      <slot name="goOut"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "pageTitle",
  props: {
    noBack: {
      // 是否显示返回按钮
      type: Boolean,
      default: false
    },
    diyBack: {
      // 用于自定义返回事件 默认false 即go(-1)
      type: Boolean,
      default: false
    },
    title: {
      // 标题默认取自$route.meta.title 可自定义
      type: String
    }
  },
  data() {
    return {};
  },

  methods: {
    goBack() {
      this.diyBack ? this.$emit("back") : this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.pageTitle {
  position: relative;
  height: 3.2rem;
  .pTitle {
    // padding: 0.8rem 0.6rem;
    color: rgb(51, 51, 51);
    font-size: 0.8rem;
    word-break: break-all;
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 100;
    background-color: #fff;
    height: 3.2rem;
    line-height: 3.2rem;
  }

  .back {
    position: absolute;
    font-size: 1.7rem;
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 86%;
    margin-left: auto;
    margin-right: auto;
    font-weight: normal;
    text-align: center;
    font-size: 0.9rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(53, 54, 59, 1);
  }
}
</style>
