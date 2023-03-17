<script setup lang="ts">
import {ref} from 'vue';
import {FormType} from './components/form/type'
import {NotificationFun} from "./components/notification/NotificationFun";

const loginForm = ref({
  username: '',
  password: ''
});
const loginRules = ref({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 1, max: 20, message: '用户名为1到20个字符', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码'}
  ]
});
const form = ref<FormType>();

function handleSubmit() {
  form.value?.validate((valid: boolean) => {
    if (valid) {
      console.log(loginForm.value);
    } else {
      alert('请正确填写表单！');
      return false;
    }
  })
}

function showSuccess() {
  // @ts-ignore
  NotificationFun.success({
    title: '成功',
    message: '这是一条成功的提示消息111',
    type: 'success'
  });
}

function showFail() {
  // @ts-ignore
  NotificationFun.error({
    title: '失败',
    message: '这是一条失败的提示消息111',
    type: 'error'
  });
}

const data = [
  {
    id: 1,
    label: '一级 1',
    children: [{id: 4, label: '二级 1-1', children: [{id: 9, label: '三级 1-1-1'}, {id: 10, label: '三级 1-1-2'}]}]
  }, {id: 2, label: '一级 2', children: [{id: 5, label: '二级 2-1'}, {id: 6, label: '二级 2-2'}]}
];
</script>

<template>
  <el-container>
    <el-tree :data="data" :default-expand-all="false" :defaultNodeKey="{childNodes: 'children'}"></el-tree>
  </el-container>
  <el-container>
    <el-notification title="成功" message="这是一条成功的提示消息"></el-notification>
    <el-button @click="showSuccess">点击显示Notification组件</el-button>
    <el-button @click="showFail">点击显示Notification组件</el-button>
  </el-container>
  <el-container>
    <el-form :model="loginForm" :rules="loginRules" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmit" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </el-container>
  <br>
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
