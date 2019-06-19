<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
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
    countChanged() {
      // 当文本数据被修改时,就把数据通过事件调用,传递给父组件
      // console.log(this.$refs.numbox.value);
      // 这里还需要将 结果 转成数字parseInt 以防不测
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  },
  props: ["max"],
  watch: {
    // 监听 获取到max时,就使用MUI组件提供的方法 设置步长(最大值)
    max: function(newVal, oldVal) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
