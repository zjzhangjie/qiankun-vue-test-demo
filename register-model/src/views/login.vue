/**
*登录页
*/
<template>
    <div class="login-conatiner">
        <h1>登录页</h1>
        <el-button type="primary" @click="login">点击登录</el-button>
    </div>
</template>
<script>

export default {
  name: 'login',
  methods: {
    login() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style scoped>
    .login-conatiner{
        text-align: center;
    }

</style>
