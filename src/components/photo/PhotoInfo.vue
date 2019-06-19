<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间: {{ photoinfo.add_time | dateFormat }}</span>
      <span>点击: {{ photoinfo.click }}次</span>
    </p>

    <hr>

    <!-- 缩略图 -->
    <!-- 新的所缩略图插件需要改一些地方https://blog.csdn.net/qq_36742720/article/details/83270636 -->
    <div class="thumbs">
      <vue-preview :slides="list"></vue-preview>
    </div>

    <!-- 图片内容介绍 -->
    <!-- 注意 内容带有html标签 所以要 v-html -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 引入之前 写好的 评论子组件 可以是 id  也可以是 this.id -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
// 1. 导入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      // 注意 这里是 route 不是 router 更不是 routes
      id: this.$route.params.id, // 从路由获取到 图片 id 写在data之后方便调用
      photoinfo: {}, // 图片详情存储位置 一般数组里只有一个 的话 用 {},不用[]
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    // 获取图片详情
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 这里需要手动循环每个图片的数据,设置宽和高
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src; //这是图片预览插件新增的
          });
          // 把处理完 的图片数据 保存到 list中
          this.list = result.body.message;
        }
      });
    }
  },
  components: {
    comment // 2. 注册评论子组件模板
  }
};
</script>

<style lang="scss">//这里的scope 也要去掉 不然缩略图插件效果会显示不完全
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #007b2f;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex; 
    justify-content: space-between;// 两端对齐 需要和上面的配合(这个ccs3 比左右浮动好用多了)
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  // 注意 这里是新的缩略图插件 所要使用的样式
  .thumbs {
    .my-gallery {
      display: flex;
      flex-wrap: wrap;
    }
    figure {
      width: 100px;
      height: 100px;
      margin: 10px;
      box-shadow: 0 0 9px #999;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
