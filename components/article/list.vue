<script setup>
import { useHomeStore } from '~/store/module/home'

const homeStore = useHomeStore()
await homeStore.fetchArticleList(1, 10)
const { articleList } = storeToRefs(homeStore)
</script>

<template>
  <div class="bg-white w-[1200px] mx-auto rounded-md p-4">
    <div v-for="article in articleList" :key="article.id">
      <div class="font-bold text-lg">{{ article.title }}</div>
      <div class="my-2">
        {{ $dayjs(article.create_time).format('YYYY年MM月DD HH:mm') }}
      </div>
      <article class="prose lg:prose-sm" v-html="article.content" />
    </div>
  </div>
</template>
