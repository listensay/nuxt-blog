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
    category {{ category }} images {{ images }}
    <template v-if="images.length != 0">
      <div>123</div>
    </template>
    <template v-else>
      <AppEmpty />
    </template>
  </div>
</template>

<style lang="less" scoped></style>
