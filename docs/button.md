## Button 按钮

常用的操作按钮
### 基础用法
基础的按钮用法

<el-button type="primary">
按钮
</el-button>

```html
<el-button type="primary">
    按钮
</el-button>
```

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。
```html
<template>
    <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
    </el-row>
</template>
```
