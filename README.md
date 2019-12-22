### 项目是仿美团pc端的一个服务端渲染的网站项目。涉及到的页面包含开发首页、登陆注册页面、切换城市页、产品列表页、产品详情页开发、 购物车开发、订单页开发等。

### 技术栈：mongodb+redis+koa2+nuxt+SMTP+element-UI邮箱验证功能

### 首页开发：

 1. 默认城市定位功能。通过服务端根据用户前端访问IP来显示当前城市
 2. 默认显示当前登陆状态。服务端通过session的状态来返回用户的登陆状态，将状态在服务端进行渲染，避免客户端请求页面刷新抖动情况
 3. 首页搜索常规功能
 4. 侧导航对DOM结构的进行了性能优化设计，减少频繁操作DOM带来的重构和重绘。最后组建dom节点仅为10个
 5. 列表数据请求，header和footer公共部分抽离
  
### 登陆注册页面：
 1. 使用登录验证模块passport，调用它的isAuthenticated()函数，传入本地策略去判断是否登陆
 2. 注册功能主要有使用腾讯SMTP对注册用户返送验证码，验证通过后将注册用户的邮箱地址、验证码、以及创建时间存进入redis
 3. （创建成功自动登录）将用户的验证码和和redis的信息进行对比，不超时并查询mongodb数据库中无此信息。进行操作入库以及自动登陆。
 
### 切换城市页（首字母城市划分）
  1. 省市联动处理。
  2. 音首字母和城市划分首先对DOM结构和数据结构分别做了设计。最终使用10个dom节点完成该组建
  3、数据方面通过将A-Z写成string类型，通过转数组格式进行v-for渲染。
  4、因为拿到的数据是全国城市，通过js-pinyin将城市名字的拼音获取来截取城市首字母并使用charCodeAt（）进行排序。将获取的城市放入数组进行
  
### 产品列表页（proxy排序、IntersectionObserver懒加载、高德地图组建）
  1. 产品的价格排序、人气排序、评价排序使用了proxy去实现完成。将每个排序的功能作为属性去进行。开发，保留并冷冻原始数据。
  2. 性能优化图片部分使用IntersectionObserver懒加载。

# mt-app

> My magnificent Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

