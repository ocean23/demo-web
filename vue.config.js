const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    // 修改webpack配置，在启动webpack-dev-serve的时候，每次保存同时自动对代码进行格式化
    module: {
      rules: [
        {
          test: /\.(ts|vue|js|tsx)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [resolve('src')],
          options: {
            fix: true,
          },
        },
      ],
    },
  },
  pluginOptions: {
    // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/css/global.less')],
    },
  },
  chainWebpack: (config) => {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
};
