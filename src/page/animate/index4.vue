<template>
  <div class="animate">
    <div class="toptop" id="toptop"></div>
    <div class="top">1</div>
    <ul class="middle">
      <div class="div1">
        <li class="li2">2</li>
        <li class="li3">3</li>
      </div>
      <div class="div2">
        <li class="li4">4</li>
        <li class="li5">5</li>
      </div>
    </ul>
    <button id="bottom" @click="start">开始</button>
  </div>
</template>
<script>
export default {
  methods: {
    start() {
      var toptop = document.getElementById("toptop");
      console.log(toptop.style);
      toptop.style.animation = "mymove1 5s";
      toptop.style.height = "200px";
    }
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
}
.toptop {
  margin: auto;
  height: 0px;
  width: 20px;
  background-color: #f00;

  //   animation: mymove1 5s 3s;
  //   transition: height 2s;
}
.top {
  font-size: 50px;
  margin: auto;

  width: 100px;
  height: 100px;
  background-color: #f00;
  line-height: 100px;
}
.middle {
  position: fixed;
  > div {
    height: 100px;
    width: 100vw;
  }
}
li {
  width: 80px;
  height: 80px;
  background-color: #ff0;
  line-height: 50px;
  position: absolute;
}
.li2 {
  left: 0;
  animation: mymove 5s infinite;
}
.li3 {
  left: 50%;
  animation: mymove 5s 3s infinite;
}
.li4 {
  left: 0;
  animation: mymove 5s infinite;
}
.li5 {
  left: 50%;
  animation: mymove 5s 3s infinite;
}
button {
  width: 100px;
  height: 50px;
  position: fixed;
  bottom: 30px;
  left: 30px;
}

@keyframes mymove {
  from {
    left: -80px;
  }
  to {
    left: 110vw;
  }
}
@keyframes mymove1 {
  from {
    height: 0px;
  }
  to {
    height: 200px;
  }
}
</style>