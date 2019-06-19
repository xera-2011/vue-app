<template>
  <div class="newsinfo-container">
    <!-- 主标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 副标题 -->
    <p class="subtitle">
      <span>发表时间: {{ newsinfo.add_time | dateFormat }}</span>
      <span>点击: {{ newsinfo.click }}次</span>
    </p>
    <hr>
    <!-- 内容 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论子组件 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
// 1.导入 评论子组件
import comment from "../subcomponents/comment.vue"
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id, //可以先将地址中的id 挂载在data上,之后调用就方便
      newsinfo: {} //把新闻信息存放到data的   对象  ?
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0]; //是因为是message中的第一个
        } else {
          Toast("获取新闻数据失败");
        }
      });
    }
  },
  components: {
    'comment-box': comment//注册评论子组件
  }
};
</script>

<style lang="scss">// 加了scope不会误会污染其他样式,但是这里可以去掉,因为样式都在mui-table-view里面
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: #296653;
  }
  .subtitle {
    font-size: 13px;
    color: #a2d3a4;
  }
  .content {
    img {
      width: 100%;//这里必须 去掉 scope 才能生效
    }
  }
}
</style>