<template>
  <div class="goodsinfo-container">
    <!-- 购物车小球动画(使用钩子函数动画 可在day3中复习小球动画) -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 使用子组件 并传值 -->
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now-price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 1.导入如轮播图
import swiper from "../subcomponents/swiper.vue";
// 导入 数字增减 组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象id存储在data中 方便调用
      lunbotu: [], // 轮播图数据
      goodsinfo: {}, // 需要看文档 确认数据是用 {}还是[]存,如果是{},则要用第[0]个数据存储
      ballFlag: false, // 小球显示的开关
      selectedCount: 1 // 让获取商品选中数量值 默认为1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    // 获取轮播图数据
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 因为 api接口给的数据不是 item.img,而是 item.src
          // 所以 要循环遍历数组 将每一项都转成 item.img
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    // 获取商品信息
    getGoodsInfo() {
      // 获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    // 获取商品图文介绍---要传 id 值
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    // 获取商品评论---要传 id 值
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    // 点击触发 是否显示小球
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      // 拼接出一个,要保存到store 中 car 数组里的 商品信息对象
      // 大致如{id:商品id,cont:购买数量,price:商品价格,selected:false}
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      // 调用 store 中的mutations 来将商品加入购物车
      this.$store.commit("addToCar", goodsinfo);
    },
    // 设定小球起始位置
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    // 设定小球移动后的位置,和动画曲线.注意这里还要传参 一个 done
    enter(el, done) {
      el.offsetWidth; // 这段没有实际作用 ,但必须要写,可以强制刷新动画

      // 进行优化 小球位置优化
      // 获取小球在页面中的起始位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 用DOM操作 获取小球最终要落入的购物车位置(就是那个一直存在的小球)
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      // 用购物车的屏幕距离减去小球起始屏幕距离
      // 就可以得出 最终要落入的购物车位置
      const xDist = badgePosition.left - ballPosition.left; //左
      const yDist = badgePosition.top - ballPosition.top; //上

      // 最终要落入的位置(使用``字符串拼接)
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.58,-0.22,.57,.97)";
      done(); // 相当于调用一次afterEnter()这个方法
    },
    // 设定小球在动画结束后的 隐藏
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    // 获取选中商品数量值(增减商品)
    getSelectedCount(count) {
      // 当子组件传值给父组件时,把选中值存到 data中
      this.selectedCount = count;
      console.log("父组件拿到数量---" + this.selectedCount);
    }
  },
  // 2.注册组件
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden; // 可将上下内容的白边去掉
  .now-price {
    color: red;
    font-size: 16px;
    font-weight: bold; //700
  }
  .mui-card-footer {
    display: block; // 因为这里默认 是flex 要手动改成 block,就可以一上一下了
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 390px;
    left: 150px;
    z-index: 99;
  }

  // 自定义
  .mint-button--primary {
    color: #fff;
    background-color: #2f9274;
  }
  .mint-button--primary.is-plain {
    border: 1px solid #2f9274;
    background-color: transparent;
    color: #2f9274;
  }
}
</style>

