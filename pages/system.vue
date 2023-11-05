<script setup>
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="system">
    <h2>system</h2>
    <NuxtPage></NuxtPage>
  </div>
</template>

<style lang="less" scoped></style>
