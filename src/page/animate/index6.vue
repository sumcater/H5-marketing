<template>
  <div class="animate">
    <div class="box">
      <div class="item" v-for="(item, index) in arr" :key="index">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: [
        "盒子",
        "和仔仔",
        "反反复复",
        "踩踩踩",
        "踩踩踩顶成都的发表顶",
        "大多数",
        "大多数",
        "大多数",
        "大多数",
        "烦烦烦",
      ],
    };
  },
};
</script>
<style lang="scss">
.box {
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  .item {
    padding: 10px;
    margin: 0 10px;
    // min-width: 80px;
    background-color: #f00;
    text-align: center;
    white-space: nowrap;
  }
}
</style>