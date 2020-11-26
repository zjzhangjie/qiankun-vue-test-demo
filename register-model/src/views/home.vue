<template>
    <div id="home-container">
        <el-container style="flex-direction: row">
            <el-aside width="200px">
                <!--菜单-->
                <qiankunMenu></qiankunMenu>
            </el-aside>
            <el-container style="flex-direction: column">
                <qiankunHeader></qiankunHeader>
                <el-main>
                    <!-- 子应用盒子 -->
                    <div id="content" class="app-view-box"></div>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import qiankunHeader from '@/components/commom/header.vue';
import qiankunMenu from '@/components/commom/menu.vue';

export default {
  name: 'App',
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
    #home-container {
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
