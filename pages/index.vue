<script setup>
const content = ref()
</script>

<template>
  <div class="home">
    <el-button type="primary" @click="navigateTo({ path: '/login' })"
      >登录
    </el-button>
    <el-button type="" @click="navigateTo({ path: '/system' })"
      >控制台
    </el-button>

    <MonacoEditor v-model="content" lang="typescript" />

    <ArticleList />
  </div>
</template>

<style lang="less" scoped></style>
