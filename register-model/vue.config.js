const path = require('path');

function resolve(dir) { return path.join(__dirname, dir); }
module.exports = {
  publicPath: '/qiankun/',
  outputDir: 'qiankun',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  devServer: {
    port: 8091,
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
