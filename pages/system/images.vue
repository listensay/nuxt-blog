<script setup>
import { useImagesStore } from '~/store/module/images'

const imagesStore = useImagesStore()
await imagesStore.fetchGetImagesCategory()
const { imageCategory, imageCategoryTotal } = storeToRefs(imagesStore)

const categoryDialog = ref(false)

const title = ref('')
const currentRow = ref({})

const addCategory = () => {
  categoryDialog.value = true
  title.value = '新增图片分类'
}

const editImageCategory = (row) => {
  currentRow.value = row
  categoryDialog.value = true
  title.value = '编辑图片分类'
}

const pageSize = ref(10)
const handleCurrentChange = async (number) => {
  await imagesStore.fetchGetImagesCategory(number, pageSize.value)
}
</script>

<template>
  <div class="system-images h-full bg-white rounded overflow-hidden">
    <div class="flex h-full">
      <div
        class="flex-shrink-0 w-[260px] h-full border-r-[1px] border-zinc-100"
      >
        <div
          class="h-16 flex items-center justify-center border-b-[1px] border-zinc-100"
        >
          <el-button size="small" type="success" @click="addCategory"
            >新增图片分类</el-button
          >
          <el-button size="small" type="primary">上传图片</el-button>
        </div>
        <!-- 图片分类 -->
        <div class="list">
          <div
            v-for="category in imageCategory"
            :key="category.id"
            class="item border-b-[1px] border-zinc-100 hover:bg-blue-50"
          >
            <div class="text-zinc-800">{{ category.name }}</div>
            <div class="flex text-sky-00">
              <el-icon
                color="#2563eb"
                class="mr-2"
                @click="editImageCategory(category)"
                ><Edit
              /></el-icon>
              <el-icon color="#2563eb"><Delete /></el-icon>
            </div>
          </div>
          <el-pagination
            layout="prev, next"
            small
            :page-size="pageSize"
            background
            :total="imageCategoryTotal"
            :hide-on-single-page="true"
            class="flex justify-center my-4"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div class="flex-1">
        <AppEmpty></AppEmpty>
      </div>
      123: {{ currentRow }}
      <ImageCategoryForm
        v-model="categoryDialog"
        v-model:current-row="currentRow"
        :title="title"
      ></ImageCategoryForm>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list {
  height: calc(100% - 64px);
  overflow-y: auto;
  .item {
    @apply flex items-center justify-between h-12 text-sm px-4 cursor-pointer;
  }
}
</style>
