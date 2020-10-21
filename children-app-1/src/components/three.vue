<template>
 <div class="three-container">
     <h1>three.js</h1>
     <div class="canvas" id="canvas" ref="canvas"></div>
 </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'three',
  mounted() {
    this.initThree();
  },
  methods: {
    // 1.创建场景 摄像机

    initThree() {
      const ele = document.getElementById('canvas');
      const width = ele.clientWidth;
      const height = ele.clientHeight;
      const scene = new THREE.Scene();
      // 创建摄像机 两种 类似人眼和投影 ：角度大小、窗口长宽比、从距离摄像机多远的位置渲染默认0.1、距离摄像机多远的位置截止渲染，默认1000
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({
        antialias: true, // 抗锯齿
      });
      // 设置场景的大小
      renderer.setSize(width, height);
      document.getElementById('canvas').appendChild(renderer.domElement);
      // 创建集合模型 参数：x的长度，y轴的长度，z轴的长度
      const ge = new THREE.BoxGeometry(2, 2, 2);
      // 使用纹理贴图
      const image = require('../assets/img/man_3.jpg');
      const texture = new THREE.TextureLoader().load(image);
      // 创建材质
      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });
      // 创建网格对象结合几何体和材质
      const cube = new THREE.Mesh(ge, material);
      // 添加到场景中去
      scene.add(cube);
      // 摄像机的位置
      camera.position.z = 6;
      // 添加针渲染
      const animate = function () {
        requestAnimationFrame(animate);
        // 网格对象旋转
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // /  cube.rotation.z += 0.01;
        renderer.render(scene, camera);
      };
      animate();
      this.addWindowResize(camera, renderer);
    },
    // 监听窗口变化尺寸响应式，重置摄像机和渲染器尺寸
    addWindowResize(camera, renderer, ele) {
      const width = ele.clientWidth;
      const height = ele.clientHeight;
      window.addEventListener('resize', () => {
        // 初始化摄像机
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      });
    },
  },
};
</script>

<style>
    .three-container{

    }
    .canvas{
        width: 100%;
        height: 800px;
    }

</style>
