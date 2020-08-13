<template>
  <div id="main-root">
    <el-container style="flex-direction: row">
      <el-aside width="200px">
        <!--菜单-->
        <qiankunMenu></qiankunMenu>
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
import qiankunMenu from './components/commom/menu.vue';

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
    qiankunMenu,
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
.el-footer{
  padding: 0!important;
  height: 48px!important;
  line-height: 48px;
  background-color: rgba(0,0,0,0.1);
}
</style>
