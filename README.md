# 点滴记账本
![waterdrop.png](https://i.loli.net/2021/01/18/LslSMn1gNjtwZRh.png)
## 预览地址
![二维码.png](https://i.loli.net/2021/01/18/ZTYMUiKAgDknhHQ.png)

###[在线预览地址](http://ryansu.gitee.io/waterdrop-account-book)
## 技术栈
Vue + VueRouter + Vuex + TypeScript + Sass
## 功能介绍
- 账目记录添加 / 编辑 / 删除 / 查看明细（包括数目，收入/支出，分类，日期）
- 账目年月趋势图表及分类占比
- 分类添加 / 编辑 / 删除
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