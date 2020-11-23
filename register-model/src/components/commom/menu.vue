<template>
    <el-menu :default-openeds="['1']"   :default-active="activeIndex">
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>菜单</template>
            <el-menu-item-group>
                <template slot="title">应用1</template>
                <el-menu-item index="1-1"><a href="/qiankun/children-app-1/">子菜单1</a></el-menu-item>
                <el-menu-item index="1-2"><a href="/qiankun/children-app-1/menu2">子菜单2</a></el-menu-item>
                <el-menu-item index="1-3"><a href="/qiankun/children-app-1/three">three.js</a></el-menu-item>
                <el-menu-item index="1-3"><a href="/qiankun/children-app-1/3DModel">载入3D模型</a></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="应用2">
                <el-menu-item index="2-1"><a href="/children-app-2/">子菜单1</a></el-menu-item>
                <el-menu-item index="2-2"><a href="/children-app-2/menu2">子菜单2</a></el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
  name: 'menu-test1',
  data() {
    return {
      activeIndex: '1-1',
    };
  },
};
</script>

<style scoped>

</style>
