<script setup>
import { useUserStore } from '~/store/module/user'

const userStore = useUserStore()
await userStore.fetchGetUserinfo()
const { userinfo } = storeToRefs(userStore)
</script>

<template>
  <div class="system-userinfo">
    <div class="bg-white py-6 px-8 rounded">
      <div class="layout-b items-center">
        <div class="flex items-center">
          <div class="photo">
            <img
              src="http://blog.200205.net/usr/uploads/2023/08/4129306644.png"
              alt="avatar"
              class="w-14 rounded-full mr-3"
            />
          </div>
          <div>
            <div class="text-lg">{{ userinfo.nickname }}</div>
            <div class="text-gray-600 text-sm">lllalalala</div>
          </div>
        </div>
        <div>
          <el-button link @click="navigateTo({ path: './change-userinfo' })"
            >修改资料</el-button
          >
        </div>
      </div>
    </div>
    <AppCard class="my-4" title="数据概览">
      <div class="p-2 py-4 flex">
        <div class="item">
          <div class="text-sm">文章总数</div>
          <div class="text-2xl">3</div>
        </div>
        <div class="item">
          <div class="text-sm">文章阅读总数</div>
          <div class="text-2xl">2</div>
        </div>
        <div class="item">
          <div class="text-sm">专题总数</div>
          <div class="text-2xl">3</div>
        </div>
      </div>
    </AppCard>
  </div>
</template>

<style lang="less" scoped>
.item {
  @apply w-1/3 bg-gray-100 mx-2 rounded-sm p-4 box-border;
}
</style>
