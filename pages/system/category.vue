<script setup></script>

<template>
  <div class="system-category bg-white p-5 h-full rounded-md">
    <el-button class="mb-4" type="primary">新增专栏</el-button>

    <ul>
      <li v-for="category in 5" :key="category" class="mb-4">
        <div
          class="flex items-center h-28 border-[1px] border-zinc-100 rounded-lg overflow-hidden"
        >
          <div class="bg-zinc-200 h-full w-28 mr-4" />
          <div class="flex items-center flex-1 justify-between">
            <div>
              <div>专栏1</div>
              <span class="text-sm text-zinc-600">专栏描述</span>
            </div>
            <div class="mr-5">
              <el-button type="primary" link>编辑</el-button>
              <el-button type="danger" link>删除</el-button>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <el-pagination background layout="prev, pager, next" :total="20" />
  </div>
</template>

<style lang="less" scoped></style>
