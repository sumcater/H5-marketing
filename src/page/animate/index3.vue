
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
        <div id="pack1" class="pack">
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
        <div id="pack2" class="pack">
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
      c1: 0,
      winWidth: "" // 页面宽度
    };
  },
  mounted() {
    // 页面宽度
    this.winWidth = $(window).width();
    // 活动区域的高
    this.areaHeight = this.screenHeight - 150;
    // 爪子伸长的距离(目前娃娃的高度暂定为115px;)
    this.long = this.areaHeight - 115;
    /* 赋值给活动区域高度 */
    $(".area").css({ height: this.areaHeight });
    // this.setGrabInterval();
    this.talon = $(".pawerPic").offset().left + 55; // 首先获取爪子的位置(这里是固定的)
    //初始化定位位置
    $("#sel1").css("left", 0);
    $("#sel3").css("left", this.winWidth / 4);
    //初始化间隔
    $(".pack img").css("margin", " 0 40px");
    this.scrollLeft(); //娃娃向左滚动
    this.scrollRight(); //娃娃向右滚动
  },

  methods: {
    scrollLeft() {
      var speed = 20;
      var yu = $("#sel1").html();
      $("#sel2").html(yu);
      $("#sel2").css("left", this.winWidth);
      setInterval(this.Marquee, speed);
    },
    Marquee() {
      this.c++;
      $("#sel1").css("left", -this.c);
      $("#sel2").css("left", this.winWidth - this.c);
      if (this.c >= this.winWidth) {
        this.c = 0;
        $("#sel1").css("left", this.c);
      }
    },
    scrollRight() {
      var speed = 20;
      var yu = $("#sel3").html();
      $("#sel4").html(yu);
      $("#sel4").css("left", -this.winWidth);
      setInterval(this.Marquee1, speed);
    },

    Marquee1() {
      this.c1++;
      $("#sel3").css("left", this.c);
      $("#sel4").css("left", -this.winWidth + this.c);
      if (this.c1 >= this.winWidth) {
        this.c1 = 0;
        $("#sel3").css("left", this.c1);
      }
    },
    /* 点击按钮 */
    start() {
      let _this = this;

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
      for (let i = 0; i < $(".pack img").length; i++) {
        let l =
          $(".pack img")
            .eq(i)
            .offset().left + 50; // 此时此刻每个娃娃的位置

        if (l - 10 <= this.talon && this.talon <= l + 10) {
          this.t_img = $(".pack img")
            .eq(i)
            .attr("src");

          setTimeout(function() {
            _this.fn(_this.t_img);
          }, 0);
          return;
        }
      }
      this.$toast("没抓到哦");
    }
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
  position: absolute;
  display: inline;
}
#sel3,
#sel1 {
  position: absolute;
  // left: 0;
}

#pack1 img,
#pack2 img {
  display: inline-block;
  height: 90px;
  width: 100px;
  // margin: 0 40px;
}
</style>