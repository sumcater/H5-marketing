<!--
 * @Descripttion: 登录页面
 * @Author: 王梦瑶
 * @Date: 2020-05-28
--> 
<template>
  <div class="loginWrap">
    <div class="wrapLogo">
      <img src="../../assets/img/marketing.png" alt />
      <h2>欢迎登录营销管理系统</h2>
    </div>
    <div class="wrapLogin">
      <van-cell-group>
        <van-field v-model.trim="phoneNumber" placeholder="请输入登录账户" class="phoneNumber" maxLength="11"/>
        <van-field v-model.trim="imageCode" placeholder="请输入验证码" class="smsCode" maxLength="4"/>
        <a href="javascript:;" @click="changeCodeImg()" class="codeImg">
          <img :src="srcUrl" />
        </a>
        <van-field v-model.trim="sendCode" placeholder="请输入短信验证码" class="sendCode" maxLength="4"/>
        <!-- <van-button round type="info" class="roundBtn" @click="sendMsg()">发送短信</van-button> -->
        <div class="roundBtn">
            <span v-show="show" @click="sendMsg()" class="codeBtn">获取验证码</span>
            <p v-show="!show" class="count">
                <span>{{count}}S</span>
                <b>后重发</b></p>
        </div>
      </van-cell-group>
    </div>
    <div class="loginBtn">
      <button @click="loginBtn">登录</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      phoneNumber: "",
      sendCode: "",
      imageCode: "",
      srcUrl: "",
      show: true,
      count: '',
      timer: null
    };
  },
  created() {
    this.srcUrl =
      this.$httpConfig.imageCodeUrl + "?time=" + new Date().getTime();
    //this.getNoLoginUrl();
  },
  methods: {
    //点击改变验证码图片
    changeCodeImg() {
      this.srcUrl =
        this.$httpConfig.imageCodeUrl + "?time=" + new Date().getTime();
    },
    //登录不校验
    getNoLoginUrl() {
      let that = this;
      that.$axiosHttp.http(
        {
          url: that.$httpConfig.getNoLoginUrl,
          params: { phoneNumber: 15981339388 },
          neeDataIsEmpty: false,
          method:"GET",
        },
        res => {
          if (res.data.status == 200) {
            console.log(res);
          }
        },
        res => {
          this.$toast(res.data.message);
        }
      );
    },
    //点击发送短信验证码
    sendMsg(){
        let that = this;
        that.$axiosHttp.http({
            url:that.$httpConfig.sendSmsUrl,
            method:"GET",
            params:{
                phoneNumber:this.phoneNumber,
                imageCode:this.imageCode,
            },
            neeDataIsEmpty:false,
            },(res) => {
                if(res.data.status == 200){
                    this.$toast("验证码发送成功");
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.show = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.show = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    }
                }
            },(res) =>{
                this.$toast(res.data.message);
                this.changeCodeImg();
            }
        )
    },
    //点击登录按钮
    loginBtn() {
      let that = this;
      // console.log(this.$router.currentRoute.name)
        // this.$router.push({
        //   path: "/home"
        // });
        that.$axiosHttp.http({
            url:that.$httpConfig.loginUrl,
            data:{
              phoneNumber:that.phoneNumber,
              smsCode:that.sendCode,
              imageCode:that.imageCode
            },
            neeDataIsEmpty:false,
            },(res) => {
              console.log("success")
                if(res.data.status==200){
                    //history.go(-1);
                    this.$router.push({
                        path: "/home"
                    });
                }
            },(res) =>{
                this.$toast(res.data.message);
                this.changeCodeImg();
            }
        )
    }
  }
};
</script>
<style lang="scss">
body {
  background: rgba(247, 248, 250, 1);
}
.loginWrap {
  .wrapLogo {
    img {
      width: 3.8rem;
      height: 3.8rem;
      margin: 5.13rem 0 1rem 0;
    }
    h2 {
      font-size: 0.75rem;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(105, 108, 120, 1);
      line-height: 1.05rem;
    }
  }
  .wrapLogin {
    margin-top: 2rem;
    position: relative;
    .phoneNumber,
    .sendCode,
    .smsCode {
      width: 90%;
      height: 2.8rem;
      line-height: 2rem;
      border-bottom: 1px solid #e6e6e6;
      margin: 0 auto;
      .van-field__body {
        margin-left: 1.5rem;
      }
    }
    .phoneNumber {
      background: url(../../assets/img/phone.png) #fff no-repeat 6% 1.1rem;
      background-size: 0.6rem 0.76rem;
    }
    .sendCode {
      background: url(../../assets/img/pwd.png) #fff no-repeat 6% 1.1rem;
      background-size: 0.6rem 0.76rem;
      border-bottom: none !important;
    }
    .smsCode {
      background: url(../../assets/img/code.png) #fff no-repeat 6% 1.1rem;
      background-size: 0.6rem 0.76rem;
    }
    .roundBtn {
      position: absolute;
      right: 1rem;
      bottom: 0.4rem;
      height: 1.8rem;
      .codeBtn{
          width: 4.83rem;
          height: 1.5rem;
          background: #2276C4;
          display: inline-block;
          text-align: center;
          border-radius: 0.75rem;
          line-height: 1.5rem;
          color: #FFFEFF;
          font-size: 0.7rem;
      }
      .count{
          font-size: 0.7rem;
          line-height: 1.8rem;
          span{
            color: #2276C4;
          }
           b{
            color: #999;
            font-weight: normal;
          }
      }
    }
    .codeImg {
      position: absolute;
      right: 1rem;
      bottom: 3.2rem;
    }
  }
  .loginBtn {
    margin: 0 auto;
    margin-top: 3rem;
    button {
      width: 15.18rem;
      height: 2.25rem;
      background: rgba(34, 118, 196, 1);
      border-radius: 0.2rem;
      color: #fff;
      font-size: 0.8rem;
      text-align: center;
      line-height: 2.25rem;
    }
  }
}
.van-field__control{
  text-align: left !important;
}
</style>