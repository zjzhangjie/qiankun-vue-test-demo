const path = require('path');
// 部署路径
const baseUrl = process.env.BASE_URL;
function resolve(dir) { return path.join(__dirname, dir); }
module.exports = {
  publicPath: baseUrl,
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
