<script setup></script>

<template>
  <div class="system-images h-full bg-white rounded overflow-hidden">
    <div class="flex h-full">
      <div
        class="flex-shrink-0 w-[260px] h-full border-r-[1px] border-zinc-100"
      >
        <div
          class="h-16 flex items-center justify-center border-b-[1px] border-zinc-100"
        >
          <el-button size="small" type="success">新增图片分类</el-button>
          <el-button size="small" type="primary">上传图片</el-button>
        </div>
        <div></div>
      </div>
      <div class="flex-1">
        <AppEmpty></AppEmpty>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
