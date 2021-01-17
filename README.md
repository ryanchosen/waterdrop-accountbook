# 点滴记账本
- 本仓库为源文件仓库， 另外还存在一个用于`dist`与`预览项目` 的仓库
- 我把项目打包生成的 `dist文件` 单独放置到 [demo仓库](https://github.com/ryanchosen/diandi-financials-demo) 中
## 预览地址
- ![二维码.png](https://i.loli.net/2021/01/07/sQbKLUkRZnDo2F4.png)
- [在线预览地址](http://ryansu.gitee.io/diandi-personal-financials)
## 技术总结
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