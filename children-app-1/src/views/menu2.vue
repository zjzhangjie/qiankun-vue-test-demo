<template>
    <div>
        <div class="demo-image">
            <div class="block" v-for="fit in fits" :key="fit">
                <span class="demonstration">{{ fit }}</span>
                <el-image
                        style="width: 100px; height: 100px"
                        :src="url"
                        :fit="fit"></el-image>
            </div>

        </div>
        <el-steps :active="2" align-center>
            <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
        <!--公共UI组件-->
        <h1>公共UI组件</h1>
        <Fcard></Fcard>
    </div>
</template>
<script>
export default {
  data() {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    };
  },
};
</script>
<style>
    .demo-image{
        display: flex;
    }
</style>
