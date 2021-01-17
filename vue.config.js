module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/waterdrop-account-book/'
      : '/',
  //lintOnSave: false,
  transpileDependencies: ["vuex-module-decorators"],
  chainWebpack: (config) => {
    // GraphQL Loader
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .end()
      .use("svgo-loader")
      .loader("svgo-loader")
      .options({
        plugins: [
          {
            removeAttrs: {
              attrs: "fill",
            },
          },
        ],
      });
  },
};
