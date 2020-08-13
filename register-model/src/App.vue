<template>
  <div id="main-root">
    <el-container style="flex-direction: row">
      <el-aside width="200px">
        <el-menu :default-openeds="['1']"   :default-active="activeIndex">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>菜单</template>
          <el-menu-item-group>
            <template slot="title">应用1</template>
            <el-menu-item index="1-1">子菜单1</el-menu-item>
            <el-menu-item index="1-2">子菜单2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="应用2">
            <el-menu-item index="2-1">子菜单1</el-menu-item>
            <el-menu-item index="2-2">子菜单2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        </el-menu>
      </el-aside>
      <el-container style="flex-direction: column">
        <qiankunHeader></qiankunHeader>
        <el-main v-loading="loading">
          <!-- 子应用盒子 -->
          <div id="root-view" class="app-view-box" v-html="content"></div>
        </el-main>
      </el-container>
    </el-container>
    <el-footer style="text-align: center">@2020/8/12</el-footer>
  </div>
</template>

<script>
import qiankunHeader from './components/commom/header.vue';

export default {
  name: 'App',
  props: {
    loading: Boolean,
    content: String,
  },
  data() {
    return {
      activeIndex: '1-1',
    };
  },
  components: {
    qiankunHeader,
  },
};
</script>
<style>
#main-root {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-container {
  height: 100%;
}
</style>
