<script setup>
const route = useRoute()
const currentTab = route.fullPath.split('/')
</script>

<template>
  <div class="system-menu w-64 bg-white px-3 py-4 rounded min-h-[800px]">
    <el-button
      type="primary"
      class="w-full"
      size="large"
      icon="Edit"
      @click="navigateTo('./post-article')"
      >写文章</el-button
    >
    <el-menu
      :default-active="'./' + currentTab[currentTab.length - 1]"
      class="pt-4"
      router
    >
      <el-menu-item index="./userinfo">
        <el-icon><HomeFilled /></el-icon>
        <span>仪表盘</span>
      </el-menu-item>
      <el-sub-menu index="./article">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>内容管理</span>
        </template>
        <el-menu-item index="./article">文章管理</el-menu-item>
        <el-menu-item index="./category">专栏管理</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="./website">
        <el-icon><setting /></el-icon>
        <span>网站设置</span>
      </el-menu-item>

      <el-menu-item index="./images">
        <el-icon><Picture /></el-icon>
        <span>图片管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="less" scoped></style>
