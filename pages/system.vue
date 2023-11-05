<script setup>
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="system">
    <div class="layout w-[1200px] mx-auto my-9">
      <SystemMenu class="mr-4"></SystemMenu>
      <div class="flex-1">
        <NuxtPage></NuxtPage>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
