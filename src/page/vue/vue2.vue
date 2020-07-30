
<template>
  <div class="test">
    <span class="content">Vue.js scoped</span>
    <div v-for="(item, index) in list" :key="index">{{item.a}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: Object.freeze([{ a: 1 }, { a: 2 }]),
      // list: ([{ a: 1 }, { a: 2 }]),
    };
  },
  mounted() {
    // this.list[0].a = 100;
    // this.list = [{ a: 100 }, { a: 200 }];
    this.list = Object.freeze([
        { a: 100 },
        { a: 2010 }
    ]);
  },
};
</script>
<style lang="scss" scoped>
.test {
  font-size: 16px;
  /deep/ .content {
    color: red;
  }
}
</style>
