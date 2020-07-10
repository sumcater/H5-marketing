<template>
  <div class="animate">
    <div class="top">1很好的很快收费电视卡JFK就看到房价斤斤计较经济界斤斤计较</div>
    <button id="bottom" @click="goLeft">向左</button>
    <button id="bottom" @click="goRight">向右</button>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  methods: {
    goLeft() {
      // var left = $(".top").scrollLeft();
      // console.log(left, "");
      // $(".top").animate({ scrollLeft: left - 200 }, 200);
      console.log(1);

      // var leftPos = $(".top").scrollLeft();
      $(".top").animate({ scrollLeft: 200 }, 800);

      // $(".top").animate({ height: 200 }, 2000);
    },
    goRight() {
      var toptop = $(".toptop");
      console.log(toptop);
    }
  }
};
</script>
<style lang="scss">
.animate {
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

.top {
  width: 300px;
  height: 40px;
  background-color: #f00;
  line-height: 40px;
  position: absolute;
  left: 0;
  top: 100px;
  overflow: hidden;
}

button {
  width: 100px;
  height: 50px;
  position: fixed;
  bottom: 30px;
  left: 30px;
  &:last-child {
    left: 230px;
  }
}
</style>