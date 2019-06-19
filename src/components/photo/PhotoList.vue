<template>
  <div>
    <!-- 顶部左右滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <!-- 这里的点击高亮是 mui 自带的 不是路由 -->
          <!-- 这里@click改成@tap是因为为了解决手机打开这个网址出现的bug -->
          <a
            :class="['mui-control-item',item.id === 0? 'mui-active':'' ]"
            v-for="item in cates"
            :key="item.id"
            @tap="getPhotoListByCateId(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>

    <!-- 图片上下滑动区域 -->
    <ul class="photo-list">
      <!-- 注意 这里li换成了router-link 需要tag="li" 样式才会生效-->
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 导入mui的 js 文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [], // 将所有的分类都放在这个组
      list: [] // 存放图片的组
    };
  },
  // 生命周期最早能调用钩子函数
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0); // 默认进入图片 就请求显示第一页"全部"内容
  },
  // 操作元素,最好在 mounted 里面
  // 生命周期最后调用的钩子函数----等DOM结构渲染好了 再执行 这个初始化函数
  mounted() {
    // 初始化scroll滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 需要手动添加 全部 分类
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    //这里需要传值 图片类的id
    getPhotoListByCateId(cateId) {
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y; //清除 滑动的时候报警告
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle; //文字基线对齐 去掉图片多余部分
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      position: absolute;
      bottom: 0;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}

.mui-segmented-control.mui-segmented-control-inverted
  .mui-control-item.mui-active {
  color: #007b2f;
}
</style>
