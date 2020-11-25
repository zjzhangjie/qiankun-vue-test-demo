<template>
  <div class="flex-row flex-row-center">
    <el-input @click="$emit('click')"></el-input><i class="el-icon-search"></i>
  </div>
</template>
<script>
export default {
  name: 'SearchButton',
};
</script>

<style scoped lang="less">
</style>
