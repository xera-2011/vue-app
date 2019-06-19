<template>
  <div>
    <!-- 轮播图 3.使用子组件 且传递数据 lunbotuList -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <!-- N宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <!-- <span class="mui-icon mui-icon-home"></span>这是字体的形式,下面是图片 -->
          <img src="../../images/menu1.png" alt>
          <div class="mui-media-body">新闻</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <!-- <span class="mui-icon mui-icon-email"></span> -->
          <img src="../../images/menu2.png" alt>
          <div class="mui-media-body">图片</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <!-- <span class="mui-icon mui-icon-chatbubble"></span> -->
          <img src="../../images/menu3.png" alt>
          <div class="mui-media-body">商品</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-location"></span> -->
          <img src="../../images/menu4.png" alt>
          <div class="mui-media-body">留言</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-search"></span> -->
          <img src="../../images/menu5.png" alt>
          <div class="mui-media-body">视频</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <!-- <span class="mui-icon mui-icon-phone"></span> -->
          <img src="../../images/menu6.png" alt>
          <div class="mui-media-body">练习</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// 1.导入轮播图组件(共三步)
import swiper from "../subcomponents/swiper.vue";

export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    //获取轮播图数据
    getLunbotu() {
      this.$http.get("api/getlunbo").then(result => {
        console.log(result.body);
        if (result.body.status === 0) {
          // 成功 则保存数据到 data
          this.lunbotuList = result.body.message;
        } else {
          // 失败
          Toast("加载轮播图失败...");
        }
      });
    }
  },
  components: {
    // 2.注册轮播图组件(3在最上面)
    swiper
  }
};
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  img {
    width: 60px;
    height: 60px;
  }
  .mui-media-body {
    font-size: 14px;
  }
}
// .mui-grid-view.mui-grid-9 .mui-table-view-cell {
//   border: 0;
// }
</style>
