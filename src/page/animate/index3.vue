
<template>
  <div class="amap-page-container">
    <div class="box">
      <!--爪子-->
      <div class="paw">
        <div class="pawer"></div>
        <div class="pawerPic">
          <img src="./images/jiazi.png" class="lose" v-if="gzShow1" />
          <div class="win" v-if="gzShow2">
            <img :src="t_img" />
          </div>
        </div>
      </div>
      <!--区域-->

      <div class="area">
        <!--娃娃滚动-->
        <div id="pack1">
          <div id="sel1">
            <img src="./images/mks1.png" tr="1" />
            <img src="./images/mks2.png" tr="2" />
            <!-- <img src="./images/mks3.png" tr="3" />
            <img src="./images/mks4.png" tr="4" />
            <img src="./images/mks5.png" tr="5" />
            <img src="./images/mks6.png" tr="6" />
            <img src="./images/mks7.png" tr="7" />
            <img src="./images/mks8.png" tr="8" />-->
          </div>
          <div id="sel2"></div>
        </div>
        <div id="pack2">
          <div id="sel4"></div>
          <div id="sel3">
            <img src="./images/mks4.png" tr="1" />
            <img src="./images/mks3.png" tr="2" />
          </div>
        </div>
      </div>
      <!--按钮(真)-->
      <div class="btn">
        <!--点击前-->
        <div class="btn_star" @click="start" v-show="startShow"></div>
        <!--点击后-->
        <div class="btn_end" v-show="endShow"></div>
      </div>
    </div>
  </div>
</template>
 
<script>
import $ from "jquery";

export default {
  data() {
    return {
      showDialogStyle: false, // 显示抓到的礼物
      gzShow1: true, // 初始下拉的钩子
      gzShow2: false, // 上拉的钩子
      long: "",
      areaHeight: "",
      talon: "",
      startShow: true, // 开始按钮的显示
      endShow: false,
      screenHeight: document.documentElement.clientHeight, // 屏幕尺寸
      t_img: "./images/mks1.png", // 抓起的礼物图片
      c: 0,
      c1: 0
    };
  },
  mounted() {
    // 活动区域的高
    this.areaHeight = this.screenHeight - 150;
    // 爪子伸长的距离(目前娃娃的高度暂定为115px;)
    this.long = this.areaHeight - 115;
    /* 赋值给活动区域高度 */
    $(".area").css({ height: this.areaHeight });
    // this.setGrabInterval();
    this.talon = $(".pawerPic").offset().left + 55; // 首先获取爪子的位置(这里是固定的)
    this.scrollLeft(); //娃娃滚动
    this.scrollRight(); //娃娃滚动
    // this.start();
  },

  methods: {
    scrollLeft() {
      var speed = 20;
      var yu = $("#sel1").html();
      $("#sel2").html(yu);
      setInterval(this.Marquee, speed);
    },
    Marquee() {
      this.c++;
      let winWidth = $(window).width();
      if ($("#sel2").width() - $("#pack1").scrollLeft() <= 0) {
        this.c1 = 0;
        $("#pack1").scrollLeft(this.c + 200);
      } else {
        $("#pack1").scrollLeft(this.c + 200);
      }
    },
    // Marquee() {
    //   this.c++;
    //   if ($("#sel2").width() - $("#pack1").scrollLeft() <= 0) {
    //     this.c1 = 0;
    //     $("#pack1").scrollLeft(this.c);
    //   } else {
    //     $("#pack1").scrollLeft(this.c);
    //   }
    // },
    scrollRight() {
      var speed = 20;
      var yu = $("#sel3").html();
      $("#sel4").html(yu);
      setInterval(this.Marquee1, speed);
    },

    Marquee1() {
      this.c1++;
      let winWidth = $(window).width(); // 页面的宽
      console.log(winWidth, this.c1, "winWidth");

      $("#pack2").scrollLeft(this.c1 + winWidth);
      // if ($("#sel4").width() - $("#pack2").scrollRight() <= 0) {
      //   this.c = 0;
      //   $("#pack2").scrollRight(this.c1);
      // } else {
      //   $("#pack3").scrollRight(this.c1);
      // }
    },
    /* 点击按钮 */
    start() {
      let _this = this;
      // clearInterval(this.interval); // 去除钩子左右滑动周期事件

      _this.startShow = false;
      _this.endShow = true;

      $(".pawer").animate({ height: this.long }, 2000); // 伸下去(绳子)
      $(".pawerPic").animate({ top: this.long + 20 }, 2000, "", function() {
        _this.gzShow2 = true;
      }); // 伸下去(爪子)

      // /*事件调用*/
      setTimeout(function() {
        _this.ok_no();
      }, 2000); /* 判断抓没抓到娃娃 */
      setTimeout(function() {
        _this.end();
      }, 4000); // 娃娃消失
      setTimeout(function() {
        _this.btn();
      }, 4000); // 按钮点击

      $(".pawer").animate({ height: 20 }, 2000); // 缩回来(绳子)
      $(".pawerPic").animate({ top: 40 }, 2000); // 缩回来(爪子)
      // $(".pawerPic").animate({ top: 40 }, 2000, "", function() {
      //   _this.setGrabInterval();
      //   // MessageBox.confirm('确定执行此操作?').then(action => {
      //   //   console.log(action)
      //   // });
      // }); // 缩回来(爪子)
    },
    /* 抓到娃娃 */
    fn(img) {
      $(".win img").attr("src", img);
      $(".pawerPic").addClass("on");
    },
    btn() {
      this.startShow = true;
      this.endShow = false;
    },
    /* 娃娃消失 */
    end() {
      $(".pawerPic").removeClass("on");
      this.gzShow1 = true;
      this.gzShow2 = false;
    },
    ok_no() {
      let _this = this;
      /* 打印出此时此刻每个娃娃的位置 */
      for (let i = 0; i < $("#pack1 img").length; i++) {
        console.log(
          $("#pack1 img")
            .eq(i)
            .offset().left,
          i
        );

        // let l = $("#pack1 img").eq(i) .offset().left + 41.61; // 此时此刻每个娃娃的位置
        let l =
          $("#pack1 img")
            .eq(i)
            .offset().left + 81.61; // 此时此刻每个娃娃的位置
        if (l - 20 <= this.talon && this.talon <= l + 20) {
          this.t_img = $("#pack1 img")
            .eq(i)
            .attr("src");

          setTimeout(function() {
            _this.fn(_this.t_img);
          }, 0);
          return;
        }
        /* 然后和爪子的位置进行比较 */
      }
      this.$toast("狗屎都没抓到");
    }
    // 爪子设置周期左右滑动
    // setGrabInterval() {
    //   let _this = this;
    //   let objPaw = $(".pawerPic"); // 爪子
    //   let objGrab = $(".pawer"); // 绳子
    //   let pawLeft = objPaw.offset().left + 50; // 爪子距离左部的位置
    //   let grabLeft = objGrab.offset().left; // 绳子距离左部的位置
    //   let winWidth = $(window).width(); // 页面的宽
    //   this.interval = setInterval(function() {
    //     if (_this.startXDirection == 0) {
    //       objPaw.css("left", pawLeft++);
    //       objGrab.css("left", grabLeft++);
    //     } else if (_this.startXDirection == 1) {
    //       objPaw.css("left", pawLeft--);
    //       objGrab.css("left", grabLeft--);
    //     }
    //     if (pawLeft - 55 <= 0) {
    //       _this.startXDirection = 0;
    //     } else if (pawLeft >= winWidth - 55) {
    //       _this.startXDirection = 1;
    //     }
    //   }, 10);
    // }
  }
};
</script>
 
<style lang="scss" scoped>
.amap-page-container {
  width: 100%;
  height: 100%;
  position: absolute;
}
.box {
  width: 100%;
  height: 100%;
  background: url(./images/zwwbj.jpg) no-repeat center;
  background-size: cover;
}
.paw {
  width: 100%;
  height: 20px;
  background: #8d3835;
  position: relative;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
.pawer {
  width: 10px;
  background: #565656;
  height: 20px;
  position: absolute;
  top: 20px;
  left: 50%;
  margin-left: -5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
.pawerPic {
  width: 110px;
  height: 85px;
  position: absolute;
  top: 40px;
  left: 50%;
  margin-left: -55px;
}
.lose {
  width: 100px;
  height: 85px;
  display: block;
  margin: 0 auto;
}
.pawerPic.on .lose {
  display: none;
}
.pawerPic.on .win {
  display: block;
}
.win {
  width: 110px;
  height: 105px;
  display: none;
  margin: 0 auto;
  background: url(./images/jiazi2.png);
  background-size: cover;
  overflow: hidden;
}
.win img {
  display: block;
  margin: 0 auto;
  margin-top: 12px;
}
.btn {
  width: 120px;
  height: 120px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -60px;
}
.btn.on .btn_star {
  display: none;
}
.btn_star {
  background: url(./images/kaishi.png) no-repeat center;
  background-size: contain;
  width: 120px;
  height: 120px;
}
.btn_end {
  background: url(./images/kaishi2.png) no-repeat center;
  background-size: contain;
  width: 120px;
  height: 120px;
}
.area {
  width: 100%;
  height: auto;
  overflow: hidden;
  position: absolute;
  top: 40px;
  left: 0;
}
/*娃娃滚动*/
#pack1,
#pack2 {
  width: 100%;
  height: 90px;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #000;
  // &:last-child {
  //   bottom: 90px;
  // }
}
#pack2 {
  bottom: 90px;
}
#sel1,
#sel2,
#sel3,
#sel4 {
  display: inline;
}
#sel4 {
  position: absolute;
  left: -100%;
}
#pack1 img,
#pack2 img {
  display: inline-block;
  height: 90px;
  width: 100px;
  margin: 0 40px;
}
</style>