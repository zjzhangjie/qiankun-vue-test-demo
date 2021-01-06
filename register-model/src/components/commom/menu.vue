<template>
    <el-menu :default-openeds="['1']"   :default-active="activeIndex">
        <el-submenu index="1">
            <template slot="title">qiankun+vue2</template>
            <el-menu-item-group>
                <template slot="title">应用1</template>
                <el-menu-item index="1-1"><router-link :to="{path:'/children-app-1'}">子菜单1</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link :to="{path:'children-app-1/menu2'}">子菜单2</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="应用2">
                <el-menu-item index="2-1"><router-link to="/children-app-2">子菜单1</router-link></el-menu-item>
                <el-menu-item index="2-2"><router-link to="/children-app-2/menu2">子菜单2</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="主应用">
                <el-menu-item index="3-1"><router-link :to="{name:'example'}">子菜单1</router-link></el-menu-item>
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
