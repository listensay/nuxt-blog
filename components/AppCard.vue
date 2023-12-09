<script setup>
defineProps({
  title: { type: String, default: '' },
  path: { type: String, default: '' }
})
</script>

<template>
  <div class="app-card">
    <div class="bg-white rounded">
      <div class="layout-b border-b-[1px] border-gray-200 p-4 items-center">
        <h2>{{ title }}</h2>
        <template v-if="path !== ''">
          <div class="text-sm text-gray-600">查看更多</div>
        </template>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
