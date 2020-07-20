<template>
  <div class="animate">
    <div class="box">
      <div class="top">1</div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      top: "",
      left: ""
    };
  },
  mounted() {
    var offset = $(".top").offset();
    var width = $(".top").width();
    var top = offset.top;
    var left = offset.left;
    var ori = left + (1 / 2) * width;
    console.log("width--", width, "top--", top, "left--", left, "ori--", ori);
  }
};
</script>
<style lang="scss">
.animate {
  text-align: center;
  overflow: hidden;
  font-size: 20px;
  font-weight: bold;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #883320;
}

.top {
  font-size: 50px;
  width: 80px;
  height: 80px;
  background-color: #f00;
  position: absolute;
  left: 20px;
  top: 30px;
}
.box {
  font-size: 50px;
  width: 300px;
  height: 300px;
  background-color: #333;
  position: absolute;
  left: 20px;
  top: 30px;
}
</style>