<script setup>
import { useUserStore } from '~/store/module/user'

const userStore = useUserStore()
await userStore.fetchGetUserinfo()

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div class="system">
    <div class="layout w-[1200px] mx-auto my-9">
      <ClientOnly>
        <SystemMenu class="mr-4" />
      </ClientOnly>
      <div class="flex-1">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
