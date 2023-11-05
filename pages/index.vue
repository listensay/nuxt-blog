<script setup></script>

<template>
  <div class="home">
    <WebSite></WebSite>
    <el-button type="primary" @click="navigateTo({ path: 'login' })"
      >登录
    </el-button>
  </div>
</template>

<style lang="less" scoped></style>
