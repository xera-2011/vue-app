<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表区域 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt>
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <!-- 将商品id数量 传值给子组件shocar_numbox -->
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- prevent阻止 a标签的默认行为, id删数据内容 索引 i 删这里的内容 -->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <!-- 加一个class类 添加样式 -->
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>
              已勾选商品
              <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件,总价 ￥
              <span class="red">{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <p>{{ $store.getters.getGoodsSelected }}</p>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodslist: [] // 从购物车获得的 所有商品数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 获取商品 id 和 商品数量,渲染成 购物车列表
    getGoodsList() {
      // 1.获取到 store 中所有商品的id,然后拼接出一个 用逗号分隔的字符串
      var idArr = [];
      // 遍历找到 购物车 car 中的所有 id 都 push 到数组idArr中
      this.$store.state.car.forEach(item => idArr.push(item.id));
      // 还需要 判断 购物车 是否有商品,没有就返回,不然会报错
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    // 删除商品
    remove(id, index) {
      // 点击删除,把商品从 store 中传递的 id商品删除,同时也要把当前组件 goodslist中对应的商品使用索引 index也就是i 来删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    // 是否勾选 商品
    selectedChanged(id, val) {
      // 当点击开关, 把最新的 开关状态 同步到 store中
      // console.log(id + "---" + val);
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    a {
      color: #007b2f;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
// 使用>>>或者是/deep/,就有效果, 不然怎么改 都无效
.mint-switch /deep/ .mint-switch-input:checked + .mint-switch-core {
  border-color: #2f9274;
  background-color: #2f9274;
}
</style>
