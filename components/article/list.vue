<script setup>
import { useHomeStore } from '~/store/module/home'

const homeStore = useHomeStore()
await homeStore.fetchArticleList(1, 10)
const { articleList } = storeToRefs(homeStore)
</script>

<template>
  <div class="bg-white w-[1200px] mx-auto">
    <div>{{ articleList }}</div>
  </div>
</template>
