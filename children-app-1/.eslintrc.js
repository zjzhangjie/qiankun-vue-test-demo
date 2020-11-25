/**
 *create by Jancheng ON 2019/9/4
 *
 * */
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  // parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 此项指定环境的全局变量
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    amd: true,
  },
  globals: {
    ga: true,
    WebUploader: true,
    MeScroll: true,
  },
  extends: 'eslint-config-ali/vue',
  plugins: [
    'html',
    'vue',
    'standard',
  ],
  // "off" -> 0 关闭规则 "warn" -> 1 开启警告规则 "error" -> 2 开启错误规则
  rules: {
    radix: 0,
    eqeqeq: 0, // 类型不必强等
    'no-empty': 1, // 禁止出现空块
    'default-case': 1, // switch 必须配置default
    'dot-location': 1, // 不允许点前后进行换行
    'no-alert': 0, // 不允许出现弹窗
    'no-redeclare': 1, // 禁止多次声明同一变量
    'require-await': 1, // 禁止声明无await 的async 函数
    'max-len': [0, { max: 150, skipBlankLines: true }], // 单行最多150
    'max-lines-per-function': [1, { max: 200, skipBlankLines: true }], // 函数最大行数
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-bitwise': 0,
    'no-loop-func': 0,
    'no-useless-escape': 0,
    'no-param-reassign': 0,
    'no-unused-vars': 0,
    'no-plusplus': 0,
    'no-console': 0,
    'guard-for-in': 0,
  },
};
