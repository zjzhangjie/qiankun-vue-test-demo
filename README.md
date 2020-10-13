# qiankun-vue-test-demo
## 基于qiankun+vue微应用初实践

# 打包
## 将所有的应用打包到一个文件夹里
```
const fs = require('fs-extra');
const path = require('path');
const outputDir = 'qiankun';
// 拷贝文件
fs.copySync(path.join(process.cwd(), '../children-app-1/children-app-1'), path.join(process.cwd(), outputDir, 'children-app-1'));
fs.copySync(path.join(process.cwd(), '../children-app-2/children-app-2'), path.join(process.cwd(), outputDir, 'children-app-2'));
```
## 在package.json的scripts中配置
```
"build:all": "yarn build:register && yarn build:app1 && yarn build:app2 && yarn copyDir",
"build:register": "vue-cli-service build",
"build:app1": "cd ../children-app-1 && yarn build",
"build:app2": "cd ../children-app-2 && yarn build",
"copyDir": "node ./script/build.js",
```
