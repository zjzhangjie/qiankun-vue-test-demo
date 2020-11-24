<template>
  <el-header style="text-align: right; font-size: 12px">
    <span @click="changeName()">点击改变名字</span>
    <span >{{userName}}</span>
  </el-header>
</template>

<script>
export default {
  name: 'qiankun-header',
  data() {
    return {
    };
  },
  computed: {
    userName() {
      console.log(this.$store.state.user.userInfo.userName);
      return this.$store.state.user.userInfo.userName;
    },
  },
  methods: {
    // 改变名字
    changeName() {
      this.$actions.setGlobalState({ userName: 'zooj' });
    },
  },
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
