
 <template>
  <div class="demo">
    <div
      class="item"
      v-for="(item, index) in menuList"
      :key="index"
      @click="()=>$router.push({name:item.url})"
    >{{item.name }}</div>
  </div>
</template>
<script>
export default {
  name: "demo",
  data() {
    return {
      menuList: [
        { name: "动画", url: "animate" },
        { name: "vue基础", url: "vue" },
        { name: "es6" },
      ],
    };
  },
};
</script>
<style lang="scss" scope>
.demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  width: 49%;
  height: 100px;
  background-color: #cc33ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 20px;
  color: #fff;
}
</style>