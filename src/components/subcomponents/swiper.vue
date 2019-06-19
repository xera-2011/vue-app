<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件种使用v-for循环的话 必须要有 key -->
      <!-- 哪个组件 使用了轮播图, 就要传递 lunbotuList 数据 -->
      <!-- 此时, lunbotuList 就像用父组件向子组件传值那样来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
        <!-- 注意 引入链接的时候 必须 :src 不然就会当做 字符串了 -->
        <img :src="item.img" alt :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ["lunbotuList", "isfull"] //接受父组件 的传值
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      //width: 100%;
      height: 100%;
    }
  }
  .full {
    width: 100%;
  }
}
</style>

