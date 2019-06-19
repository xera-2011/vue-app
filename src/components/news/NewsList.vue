<template>
  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
      <!-- 注意 这里需要加Id标识符 所以要改造成这样 -->
      <router-link :to="'/home/newsinfo/' + item.id">
        <!-- 注意 引入链接的时候 必须 :src 不然就会当做 字符串了 -->
        <img class="mui-media-object mui-pull-left"
          :src="item.img_url">
        <div class="mui-media-body">
          <h1>{{ item.title }}}</h1>
          <p class="mui-ellipsis">
            <span>发表于: {{ item.add_time | dateFormat }}</span>
            <span>点击: {{ item.click }}次</span>
          </p>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
// 引入mint-ui的提示消息框,后面可以直接Toast调用
import { Toast } from "mint-ui";
  export default {
    data() {
      return {
        newslist: [] //新闻列表数据存放数组
      }
    },
    created() {
      this.getNewsList();
    },
    methods: {
      getNewsList(){// 获取新闻列表数据
        this.$http.get("api/getnewslist").then(result => {
          if (result.body.status === 0) {
            // 成功 则保存数据到 data
            this.newslist = result.body.message;
          } else {
            Toast('获取新闻列表数据失败')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scope>
.mui-table-view {
  color: #215343;
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #93c195;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
