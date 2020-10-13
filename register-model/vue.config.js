module.exports = {
  publicPath: '/qiankun/',
  outputDir: 'qiankun',
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
