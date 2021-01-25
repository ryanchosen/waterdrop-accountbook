# 点滴记账本
![waterdrop.png](https://i.loli.net/2021/01/18/ATqUjL98hWbJ6oX.png)
## 预览地址
![二维码.png](https://i.loli.net/2021/01/18/ZTYMUiKAgDknhHQ.png)

### [在线预览地址](http://ryansu.gitee.io/waterdrop-account-book)
## 技术栈
Vue + VueRouter + Vuex + TypeScript + Sass
## 功能介绍
- 账目记录添加 / 编辑 / 删除 / 查看明细（包括数目，收入/支出，分类，日期）
- 账目年月趋势图表及分类占比
- 分类添加 / 编辑 / 删除
## 如何封装一个Vue-echarts组件
Step1 整个项目安装 `echarts`，  
Step2 创建组件 `Charts.vue` 并引入 `echarts`
```js
const echarts = require('echarts');
```
Step3 Api 设计  
```html
<Chart :options="chartOptions" class="echart" :loading="loading"></Chart>
```
Step4 具体实现
- 参考`echarts`的官网后，发现必须传入一个`prop`叫`options`到`Charts.vue`，`options`作用是对图标的外观做一个基础配置，以及图表中x轴和y轴分别需要展示的数据也是通过`options`传递的，
- 同时还需要一个`prop`叫`loading`，用于在加载数据时让`echart`展示加载中的样式
- 在`Charts.vue`中，首次`mounted`时要做两件事 1.指定`echarts`渲染的容器大小，2. 对首次传入的`options`进行图表绘制
```js
mounted() {
    this.chart = echarts.init(this.$refs.wrapper);
    this.chart.setOption(this.options);
}
```
- 然后`Charts.vue`中需要`watch`收到的`options`和`loading`这两个参数，如果父组件数据处理完毕传过去以后则`loading`会变成`false`，则`Charts`组件`watch`到以后会调用官方API中的`hideLoading`让加载中样式消失
```js
@Watch('loading')
onLoadingChanged(newValue: string) {
    if(newValue){
      (this as any).chart.showLoading()
    }else{
      (this as any).chart.hideLoading()
    }
}
```
- 同时当父组件切换收入/支出tab的时候，传递的`option`中的XY轴数据经处理也会是不同的，`Charts`组件`watch`到以后会再次调用setOption这个方法
```js
@Watch('options')
  onOptionsChanged(newOption: string) {
    (this as any).chart.setOption(newOption);
}
```

## 本地打包 预览生产环境结果
- 每次对源文件修改之后, 提交
- 把vue.config.js中的以下三行关于 publicPath 注释掉
```
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? "/waterdrop-account-book/"
  //   : '/',
```
- `npm run build`
- `serve -s dist` 即可成功预览
- 如果没有安装 serve `npm install -g serve`

## 自动发布到 `gitee/github-pages`
- 首先配置publicPath, 即释放vue.config.js中的三行注释
- 运行 `sh deploy.sh` 即可
