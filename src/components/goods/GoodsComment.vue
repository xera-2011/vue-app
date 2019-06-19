<template>
  <div>
    <!-- 3. 使用组件 并传入 对应 路由d -->
    <suibian :id="$route.params.id"></suibian>
  </div>
</template>

<script>
// 1. 导入组件
import suibian from "../subcomponents/comment.vue";
export default {
  components: {
    suibian // 2. 注册组件
  }
};
</script>

<style lang="scss" scoped>
</style>
