<script setup>
import { useImagesStore } from '~/store/module/images'

const props = defineProps({
  category: { type: Object, default: () => {} }
})

const imagesStore = useImagesStore()
await imagesStore.fetchGetImages(props.category.id, 1, 10)
const { images } = storeToRefs(imagesStore)

watch(
  () => props.category.id,
  async (value) => {
    await imagesStore.fetchGetImages(value, 1, 10)
  }
)
</script>

<template>
  <div class="image-list">
    <template v-if="images.length != 0">
      <div class="flex p-4">
        <div
          v-for="image in images"
          :key="image.id"
          class="w-1/3 m-4 shadow-sm"
        >
          <NuxtImg :src="image.url" class="w-full" />
          <div class="p-2 bg-white flex items-center justify-between">
            <div class="flex items-center">
              <span class="mr-2 text-sm">{{ image.name }}</span>
              <el-button type="primay" size="small">选择</el-button>
            </div>
            <div>
              <el-button type="danger" size="small">删除</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <AppEmpty />
    </template>
  </div>
</template>

<style lang="less" scoped></style>
