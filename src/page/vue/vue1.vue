
<template>
  <div>
    <div>
      <span>用户名: {{ userInfo.name }}</span>
      <span>用户性别: {{ userInfo.sex }}</span>
      <span v-if="userInfo.officialAccount">公众号: {{ userInfo.officialAccount }}</span>
    </div>
    <button @click="handleAddOfficialAccount">添加公众号</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        name: "子君",
        sex: "男",
        // officialAccount: "",
      },
    };
  },
  methods: {
    // 在这里添加用户的公众号
    handleAddOfficialAccount() {
      console.log(22);
      // this.userInfo.officialAccount = "前端有的玩";
      this.$set(this.userInfo, "officialAccount", "前端有的玩");
      // this.userInfo = { ...this.userInfo, officialAccount: "前端有的玩" };
    },
  },
};
</script>
