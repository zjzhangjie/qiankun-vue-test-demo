/**
 * 打包时将各个应用打包的文件拷贝到一个文件夹中
 */

const fs = require('fs-extra');
const path = require('path');

const outputDir = 'qiankun';// 打包后得文件名
// 拷贝文件
fs.copySync(path.join(process.cwd(), '../children-app-1/children-app-1'), path.join(process.cwd(), outputDir, 'children-app-1'));
fs.copySync(path.join(process.cwd(), '../children-app-2/children-app-2'), path.join(process.cwd(), outputDir, 'children-app-2'));
