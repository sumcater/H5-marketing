<!--
 * @Descripttion: 
 * @Author: 乐媛
 * @Date: 2020-05-16
 * @LastEditors: 王梦瑶
 * @LastEditTime: 2020-05-28 10:57:13
--> 
<template>
  <div class="myPoster">
    <page-title></page-title>
    <section class="img-box">
      <img :src="imageUrl" alt />
    </section>
    <section class="share-button">
      <button @click="share">转发好友</button>
    </section>
  </div>
</template>
<script>
export default {
  name: "myPoster",
  data() {
    return {
      imageUrl:''
    };
  },
  created() {
    this.getImg();
  },
  methods: {
    share() {
    },
    getImg(){
       // activityId	活动主键
      // id	海报主键
      // imageUrl	海报图片URL
      // let activityId=this.$route.query.id;
      // let imageUrl=this.$route.query.imageUrl;
      // let id=this.$route.query.posterId;
      // let that=this;
      // that.$axiosHttp.http({
      //   url:that.$httpConfig.posterImage,
      //   method:"GET",
      //   params:{
      //     activityId:activityId,
      //     id:id,
      //     imageUrl:imageUrl
      //   },
      //   neeDataIsEmpty:false,
      //   },(res) => {
      //       if(res.data.status == 200){
      //           this.imageUrl=res.data.data;
      //       }else{
      //           this.$toast(res.data.message);
      //       }
      //   },(res) =>{
      //       this.$toast(res.data.message);
      //   }
      // )
    }
  }
};
</script>
<style lang="scss" >
.myPoster {
  text-align: left;
  background: rgba(247, 248, 250, 1);
  overflow-y: scroll;
  .pageTitle {
    .pTitle {
      background: linear-gradient(
        228deg,
        rgba(67, 150, 239, 1) 0%,
        rgba(34, 118, 196, 1) 100%
      );
      color: rgba(255, 255, 255, 1);
    }
    .title {
      font-size: 0.9rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
  .img-box {
    height: calc(100vh - 2.5rem - 3.2rem);
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .share-button {
    position: fixed;
    left: 0;
    bottom: 0;
    button {
      width: 100vw;
      height: 2.5rem;
      background: rgba(34, 118, 196, 1);
      font-size: 0.8rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 0.9rem;
    }
  }
}
</style>