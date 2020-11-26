/**
*登录页
*/
<template>
    <div class="login-conatiner">
        <h1>登录页</h1>
        <router-link :to="{name:'children-app-1'}">点击登录</router-link>
    </div>
</template>

<script>
export default {
  name: 'login',
};
</script>

<style scoped>
    .login-conatiner{
        text-align: center;
    }

</style>
