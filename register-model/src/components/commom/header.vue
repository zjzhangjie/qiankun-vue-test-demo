<template>
  <el-header style="text-align: right; font-size: 12px">
    <span >{{userName}}</span>
  </el-header>
</template>

<script>
export default {
  name: 'qiankun-header',
  data() {
    return {
      userName: 'admin',
    };
  },
  computed: {

  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.el-header {
  background-color: #303133;
  line-height: 60px;
  color: #ffffff;
  text-align: center;
}
</style>
