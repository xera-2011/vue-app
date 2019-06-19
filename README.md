# Vue商城app
> 该文件下载后需要自行安装依赖`npm install`(必须已经有了node.js环境)
> 在项目终端中输入`npm run dev`打开项目
> 项目是使用了 服务端API接口,如果服务端接口失效 则部分内容会不显示...

# 通用组件
> App.vue
> /src/components/tabbar/首页、会员、购物车、搜索的.vue组件
1. 顶部 Header 区域,使用了 Mint-UI 的 Header 组件
2. 底部 Tabbar 区域,使用了 MUI 的 Tabbar.html
  + 其实 MUI 有包含顶部底部这两个的 tab-webview-main.html
3. 修改底部图标,将a 和 href改为 router-link 且 to="对应路由地址",并设置路由高亮
4. App.vue中放入 `<router-view></router-view>`展示路由匹配组件
> Mint-UI 是在网页上复制的组件
> MUI 是下载下来 使用`mui-master\examples\hello-mui\examples`内的

# 首页
## 通用轮播图组件
1. 轮播图 使用了 Mint-UI 的 Swipe 组件
2. 使用 vue-resouce 获取并保存轮播图数据(这里需要有效的服务端接口)
3. 使用 v-for 循环渲染 并设置一个 key 这里使用了`item.img`不要用`item.url`
4. 使用组件有三步: 导入组件、注册组件、使用组建并传递数据(数据需要先从API接口中获取)

## 六宫格
> /src/components/(新闻、图片、商品、留言、视频、练习)的.vue组件
> src/components/tabbar/HomeContainer.vue
1. 布局使用了 MUI 的 grid-default.html
2. 更改图片的样式 适应页面

## 新闻
> /src/components/news/NewsList.vue
1. 设置路由连接,点击跳转到新闻页面
2. 制作界面 使用了 MUI 的 media-list.html
3. 新闻界面 使用 css3 的 flex
4. 使用 vue-resource 获取数据(这里需要有效的服务端接口)
5. 使用 v-for 循环渲染 并设置一个 key 这里使用了 `item.id`
6. 这里 使用了格式化时间的插件 moment

### 新闻详情页面
> /src/components/news/NewsInfo.vue
1. 把新闻资讯列表的中每一项都改为 router-link 使之点击跳转到详情页面
2. 跳转同时提供唯一的 Id标识符,这样才能获取对应Id新闻内容
3. v-html可以渲染 带html标签的内容

### 通用评论组件
> /src/components/subcomponents/comment.vue
1. 创建一个 评论组件模板 comment.vue
2. 很多组件 都会需要 评论组件模板
3. 在需要导入的组件引入`import comment from '路径/comment.vue'`
4. v-for 循环渲染评论

### 加载更多评论
> /src/components/subcomponents/comment.vue
1. 为按钮mt-button添加绑定事件,请求下一页`pageIndex`的数据
2. 点击加载更多,让`pageIndex + 1`,然后再用this.getComments()方法重新获取最新一页的数据
3. 防止新评论覆盖老评论,使用 concat 拼接数据
4. 知识点: 父组向子组件传参
5. 获取完数据后 循环渲染到页面 并设置一个key 这里使用了 `item.add_time`

### 发表评论
> /src/components/subcomponents/comment.vue
1. 为文本框做双向数据绑定 发表评论按钮绑定点击事件
2. 校验评论内容是否为空,再由 vue-resource 发送请求,将内容提交到服务器
3. 刷新评论列表 的解决方案: 
  + 添加评论成功后,使用 unshift或者push方法
  + 将新评论追加到 comments的开头或者结尾,实现发表-刷新-添加-评论的需求

## 图片
> /src/components/photo/PhotoList.vue
1. 先设置路由连接 使之点击跳转进入图片页面
2. 使用了 MUI 的 tab-top-webview-main.html
3. 把 slide区域的 mui-fullscreen 类去掉,可解决位置问题
4. 需要初始化一下 才能使用该组件,到 MUI 官网文档scroll(区域滚动)中查找
  + 在这里面=>mounted(){初始化插件}
```
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
```
5. 这里会遇到出错, 使用**移除严格模式**的方法
  + [babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)
6. 解决 tabbar 点击无法切换的问题 使用自己自定义的样式 覆盖就行了,就是复制 tabbar 的所有样式 用自己的名字覆盖

### 下滑展示图片列表
> /src/components/photo/PhotoList.vue
1. 这里用了 Mint-UI 的 Lazy load 图片懒加载指令。
2. 注意: 只有完整引入 `mint ui` 才能使用 Lazyload了!!!!
3. 修改美化 图片列表样式

### 图片详情
> /src/components/photo/PhotoList.vue
1. 设置路由连接 将li 改为router-link 指定对应路由+id
2. 标签属性要用tag="li"指定为li
3. 设置 图片详情 的布局 和页面美化

### 导入评论
> /src/components/photo/PhotoList.vue + comment.vue
1. 导入评论子组件
2. 注册评论子组件模板

### 缩略图展示
> /src/components/photo/PhotoList.vue
1. 安装使用 vue的PhotoSwipe图片预览插件
2. [vue-preview](https://github.com/LS1231/vue-preview)
  + 一个Vue集成PhotoSwipe图片预览插件
3. 注意,这个插件版本会偶尔更新,使用方法 也会随着更新
  + [解决方法](https://blog.csdn.net/qq_36742720/article/details/83270636)

## 商品
> /src/components/goods/GoodsList.vue
1. 设置路由连接 将li 改为router-link 指定对应路由+id

### 下滑动商品列表
> /src/components/goods/GoodsList.vue
1. 这个就要自己 搭建样式了
2. 尽量用上 css3 的做法,如display: flex;和flex-wrap、justify-content的使用

### 点击加载更多
> /src/components/goods/GoodsList.vue
1. 添加mt-button按钮 并绑定事件
2. 防止新数据覆盖老数据 使用 concat 拼接老数据 使用如下
3. `this.goodslist = this.goodslist.concat(result.body.message)`
4. 点击事件方法,让`pageindex + 1`,再调用一次方法getGoodsList()

### 商品详情(编程式导航)
> /src/components/goods/GoodsInfo.vue
1. 先设置路由连接 使之点击跳转进入图片页面
2. 在网页中,有两种跳转页面方式
  + 方法1: 使用 a 标签 的形式叫做 标签跳转
  + 方法2: 使用 window.location.href 的形式叫做 **编程式导航**
  + [编程式的导航](https://router.vuejs.org/zh/guide/essentials/navigation.html)
3. this.$route 和 this.$router 的区别
  + this.$route 是路由【参数对象】,所有路由中的参数,params,query都属于它
  + this.$router 是路由【导航对象】, 可以使用JS代码,实现路由的前进、后退、跳转到新的URL地址
4. 常用方法(商品详情例子)
  + 方法1 最简单的
    + this.$router.push('/home/goodsinfo/'+id)
  + 方法2 传递对象
    + this.$router.push({ path: '/home/goodsinfo/'+id })
  + 方法3 传递命名的路由 这里的name要在路由那里添加name:'goodsinfo'
    + this.$router.push({ name: 'goodsinfo', params: { id }})
5. 搭建商品详情页面(卡片布局) 使用了 MUI 的 card.html

### 商品详情轮播图(抽离首页轮播图组件)
> /src/components/subcomponents/swiper.vue
1. 由于 轮播图没有组件可直接使用,所以现在要把 首页的轮播图抽离出来
2. 从 api 接口中获取轮播图数据,并将item.src循环转换成item.img,轮播图组件才能使用
3. 抽离出来的 轮播图组件,lunbotuList 就像用父组件向子组件传值那样来设置
  + 哪个组件 使用了轮播图, 就要传递 lunbotuList 数据
4. 使用组件有三步: 导入组件、注册组件、使用组建并传递数据(数据需要先从API接口中获取)
5. 轮播图组件导入成功后,但样式比例会有不适合,出现问题 首页宽度要求是100%,详情页的宽度要求是自适应,则可以定义一个属性 让调用者手动指定宽度类型,相当于一个开关
  + 在轮播图组件中 设置 `:class="{'full':isfull}"` 设置样式full为宽度100%
  + 在其它组件调用这个子组件,传参的同时 也传入 :isfull="true或者false"

### 通用数量+-组件
> /src/components/subcomponents/goodsinfo_numbox.vue
1. 修改样式,添加按钮
2. 使用 MUI 中的 numbox.html 来制作商品数量的增减
3. 导入后 查看 MUI官方文档`numbox(数字输入框)`初始化插件
  + 在这里面=>mounted(){初始化插件}

### 商品介绍和商品评论
> /src/components/goods/GoodsComment.vue
> /src/components/goods/GoodsDesc.vue
1. 使用**编程式的导航**,在商品详情(GoodsInfo.vue)中导入这两个组件
2. 并在对应按钮上添加点击事件
3. 商品介绍页面要制作,商品评论直接引入 评论组件就行了

### 商品购物车(小球动画)
> /src/components/goods/GoodsInfo.vue
1. 制作 加入购物车 小球动画
  + 将小球放到指定位置
  + 使用钩子函数动画 可在day3中复习小球动画
  + 使用了CSS3贝塞尔曲线[cubic-bezier](https://cubic-bezier.com/#.17,.67,.83,.67)来代替默认动画 ease
2. 进行小球 位置优化(这里的ref可在day4中复习)
  + 先ref获取小球(ball)和用document操作获取购物车(badge)
  + 再用 getBoundingClientRect() 获取二者 与屏幕的 left和top距离
  + 获取之后 购物车的屏幕距离-小球起始屏幕距离=最终要落入的位置
  + 使用``字符串拼接,放入最终要落入的位置
### 商品购物车(获取选中商品增减的数量)
> /src/components/goods/GoodsInfo.vue
1. 添加 @getcount的事件获得 数量值
2. 在子组件中添加 @change监测文本改动 从而获取增减的数量
3. 设置max购买数量,同步库存剩余量(使用 watch)
  + 监听 获取到max时,就使用MUI组件提供的方法 设置步长(最大值)
  + 可以去day5复习watch

### 商品购物车(使用Vuex)
> /src\main.js
> /src/components/goods/GoodsInfo.vue
1. 使增加商品数量 和 购物车上数字 同步
2. 读取之前localStorage的购物车数据,让刷新或再次进入网站 购车数据不丢失()

# 购物车
## 基本页面
1. 页面搭建 使用了 MUI 的card.html
2. 开关 使用了Mint-UI Switch
3. 使商品数量id 与页面的关联
  + 将id设为键 上商品数量设为值,形成`键值数据`存储在 对象中
  + 然后将值在父组件中 传递给子组件
4. 结算部分制作
5. 这里遇到了 Mint-UI 无法修改自定义样式的问题,也就是那个开关 改不了样式
```
<style>
// 使用>>>或者是/deep/,就有效果, 不然怎么改 都无效
.mint-switch /deep/ .mint-switch-input:checked + .mint-switch-core {
  border-color: #2f9274;
  background-color: #2f9274;
}
</style>
```

# 返回按钮
1. 使用了 Mint-UI Header 中的返回
2. 默认功能是返回首页,所以要把 router-link改成其他标签 如span
3. 添加点击事件 方法为 this.$router.go(-1);
4. 并要监视watch 路由地址 是否为首页/home 是的话则不显示返回
5. 还要解决 刚进入页面或刷新页面时,还没触发事件的情况,使用生命钩子created函数解决






## 特此鸣谢

> 黑马程序员
>
> B站的各位老铁们