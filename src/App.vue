<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
  <hr>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
  <hr>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
  <hr>
  <div>
    <el-button>普按钮</el-button>
    <el-button size="small">小按钮</el-button>

    <el-button type="primary">
      主按钮
    </el-button>
    <el-button type="success">
      绿按钮
    </el-button>
    <el-button>普按钮</el-button>
    <el-button size="small">
      小按钮
    </el-button>

  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
<style>
body {
  display: block;
  width: 1000px;
  margin: 10px auto;
}
.el-header,
.el-footer {
  background-color: #ccc;
}
.el-main {
  background-color: #eee;
}
.el-aside {
  background-color: #ddd;
}
.el-header,
.el-aside,
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-main {
  line-height: 160px;
}
</style>
