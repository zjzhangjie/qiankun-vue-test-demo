<template>
  <div class="block">
    <el-button  type="primary"><router-link :to="{path:'/example'}">点击跳转回主应用</router-link></el-button>
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card @click.native="changeName('aaa')">
          <h4>更新 名字为aaa</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card @click.native="changeName('bbb')">
          <h4>更新 名字为bbb</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card @click.native="changeName('ccc')">
          <h4>更新 名字为ccc</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import common from '../common';

export default {
  data() {
    return {};
  },
  methods: {
    changeName(name) {
      // 增加state监听，当mt数据发生变化的时候，我们修改name，体现在页面上
      this.$setGlobalState({
        userName: name,
      });
    },
  },
};
</script>
<style>
.el-card {
  cursor: pointer;
}
</style>
