<script setup>
import { useMainStore } from '~/store/main'
const mainStore = useMainStore()
await mainStore.fetchGetWebOptions()
const { seo } = storeToRefs(mainStore)
</script>

<template>
  <Head>
    <Title>{{ seo.title }}</Title>
  </Head>
</template>

<style lang="less" scoped></style>
