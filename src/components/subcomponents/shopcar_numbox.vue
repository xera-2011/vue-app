<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      @change="countChanged"
      ref="numbox"
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
// 需要导入 MUI 的JS文件
import mui from "../../lib/mui/js/mui.min.js";
export default {
  // 初始化 增减数字 插件
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    //  监视 数据改变
    countChanged() {
      // console.log(this.$refs.numbox.value)
      // 当数据一旦发生改变,立即把最新的数量同步到 购物车的 store 中,覆盖之前的数据
      this.$store.commit("updateGoodsInfo", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      });
    }
  },
  props: ["initcount","goodsid"]
};
</script>

<style lang="scss" scoped>
</style>
