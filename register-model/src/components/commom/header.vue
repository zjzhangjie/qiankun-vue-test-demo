<template>
    <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
    </el-header>
</template>

<script>
export default {
  name: 'qiankun-header',
};
</script>

<style scoped>
    .el-header{
        background-color:#303133 ;
        line-height: 60px;
        color: #ffffff;
        text-align: center;
    }

</style>
