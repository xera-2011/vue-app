<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">提交</mt-button>
    <div class="cmt-list">
      <!-- 注意 这里要循环 加上 i 索引, 显示几楼 要i+1 从1楼开始 i++就不行 -->
      <!-- comments.length - i也可以使用倒序的方法 新增的数据放在第一条看起来没那么突兀 -->
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{ comments.length - i }}楼&nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间: {{ item.add_time | dateFormat }}</div>
        <div class="cmt-body">{{ item.content === 'undefined'? '此用户很懒,啥都没说': item.content }}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">更多评论</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, //默认初始值为第一页,之后添加就++
      comments: [], //用数组存放评论数据,之后要在页面循环渲染
      msg: "" //存放用户输入内容
    }
  },
  created() {
    this.getComments();
  },
  props: ["id"], //获取父组件传过来的值
  methods: {
    //获取评论
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            //防止新评论覆盖老评论,使用 concat 拼接数据
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("获取评论失败");
          }
        });
    },
    //更多评论
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      // 判断去空之后 长度是否为零, 也就是是否有内容
      if (this.msg.trim().length === 0) {
        return Toast("内容不能不能为空!");
      }
      // 发表评论
      // 参数1: 请求的URL地址
      // 参数2: 提交给服务器的数据对象 { content: this.msg }
      // 参数3: 提交时确认表单的数据格式 { emulateJSON:true } 这里已经在main.js全局设置过了
      this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim() //还要去空
        })
        .then(function(result) {
          if (result.body.status === 0) {
            // this.comments = this.comments.unshift(result.body.message);
            // this.getComments();
            var cmt = {
              user_name: '匿名用户',
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = '';
          } else {
            Toast("评论发送失败");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 18px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: rgb(200, 209, 203);
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
  .mint-button--primary {
    background-color: #2f9274;
    color: #eeffeb;
  }
}
</style>
