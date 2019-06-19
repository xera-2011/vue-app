// 导入 Vue (要先 npm i vue -S)
import Vue from 'vue'

// 1.1导入路由(要先 npm i vue-router -S)
import VueRouter from 'vue-router'
// 1.2安装路由
Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
// 安装
Vue.use(Vuex)
// 当刷新再次进入网站时,也会重新调用main.js,这时候可以把购物车的数据在localStorage中读出来,就能保证刷新或再次进入网站 购车数据不丢失
var car = JSON.parse(localStorage.getItem('car') || '[]')//JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
// 初始化一个 仓储
var store = new Vuex.Store({
  state: { // 调用方法:this.$store.state.***
    car: car // 设置起始值为car 可以读取之前localStorage的购物车数据
    // 将购物车中的商品数据 存储起来 可以设计成 下面这样
    // {id:商品id,cont:购买数量,price:商品价格,selected:false}
  },
  mutations: { // 调用方法:this.$store.commit('方法名称','按需传参')
    // 加入购物车
    addToCar(state, goodsinfo) {
      // 在没有传数据前 就可以先判定"没有找到对应商品" 就可以直接将商品数据push到car中
      var flag = false
      // 这里就是去找 是否有对应商品,不使用forEach,使用some 找到了就返回
      state.car.some(item => {
        // 判断如果 找到了
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 循环完毕 如果得到的flag 还是false,则把商品数据直接push到购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }
      // 每当更新car 之后,酒吧啊car数组,存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 更新购物车
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中商品的数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 一修改完商品数量,就把最新的购物车数据,保存到 本地存储的 localStorage
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 从购物车删除
    removeFormCar(state, id) {
      // 根据id,从store中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1)
          return true
        }
      })
      // 将删除完毕后的,最新的购物车数据,同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 是否勾选商品
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id === info.id) {
          item.selected = info.selected
        }
      })
      // 勾选完后 所有商品的状态 都要更新,同步到本地存储 并保存到 store 中
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { // this.$store.getters.***
    // 获取所有商品数量
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    // 获取变动的商品数量
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        // 将id设为键 上商品数量设为值,形成 键值数据 存储在 对象o中
        o[item.id] = item.count
      })
      return o
    },
    // 商品是否勾选中的开关
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        // 将id设为键 上商品是勾选中设为值,形成 键值数据 存储在 对象o中
        o[item.id] = item.selected
      })
      return o
    },
    // 商品总件数,总价
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

// 导入格式化时间插件(要先 npm i moment -S)
import moment from 'moment'
// 定义全局时间过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 2.1 导入 vue-resource(要先 npm i vue-resource -S)
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)

// 设置请求api地址的根路径  注意 要在安装vue-resource后面
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
// 全局设置表单 post 提交时 的数据格式 (这是默认的application/x-www-form-urlencoded)
Vue.http.options.emulateJSON = true;

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'

// 按需导入 mint ui 但是这样就用不了 Lazyload了.......只能完整引入
// import { Header, Swipe, SwipeItem, Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)//顶部
// Vue.component(Swipe.name, Swipe)//轮播图
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)//按钮
// Vue.use(Lazyload)//图片懒加载指令
// 完整引入
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 1.3导入自己的router.js 路由模块
import router from './router.js'

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router, //1.4挂载路由对象 到vm实例上
  store // 挂载仓储 到vm实例上
})
