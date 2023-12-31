<script setup>
import { useImagesStore } from '~/store/module/images'

const imagesStore = useImagesStore()
await imagesStore.fetchGetImagesCategory()
const { imageCategory, imageCategoryTotal } = storeToRefs(imagesStore)

const categoryDialog = ref(false)
const imageUploadDialog = ref(false)

const title = ref('')
const currentRow = ref(null)
const currentCategory = ref(null)
const currentCategoryIndex = ref(0)
currentCategory.value = imageCategory.value[0]

// 添加分类
const addCategory = () => {
  categoryDialog.value = true
  title.value = '新增图片分类'
}

// 编辑分类
const editImageCategory = (row) => {
  currentRow.value = row
  categoryDialog.value = true
  title.value = '编辑图片分类'
}

// 删除分类
const deleteImageCategory = async (row) => {
  try {
    await imagesStore.fetchDeleteImageCategory(row.id)
    ElMessage.success('删除成功')
  } catch (error) {}
}

// 分类点击事件
const categoryItemHandle = (row, index) => {
  currentCategory.value = row
  currentCategoryIndex.value = index
}

// 上传图片
const uploadImage = () => {
  imageUploadDialog.value = true
  title.value = '上传图片'
}

// 分页
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
          class="h-16 flex items-center justify-center bg-indigo-500 border-b-[1px] border-zinc-100"
        >
          <el-button size="small" type="success" @click="addCategory"
            >新增图片分类</el-button
          >
          <el-button size="small" type="warning" @click="uploadImage"
            >上传图片</el-button
          >
        </div>
        <!-- 图片分类 -->
        <div class="list">
          <div
            v-for="(category, index) in imageCategory"
            :key="category.id"
            class="item border-b-[1px] hover:bg-blue-50"
            :class="{
              'bg-blue-50': currentCategoryIndex === index
            }"
            @click="categoryItemHandle(category, index)"
          >
            <div class="text-zinc-800">{{ category.name }}</div>
            <div class="flex text-sky-00">
              <el-button
                type="primary"
                icon="Edit"
                circle
                size="small"
                @click="editImageCategory(category)"
              />
              <el-popconfirm
                title="是否确认删除该分类？"
                size="small"
                width="200"
                hide-icon
                @confirm="deleteImageCategory(category)"
              >
                <template #reference>
                  <el-button icon="Delete" type="danger" circle size="small" />
                </template>
              </el-popconfirm>
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
        <ImageList v-model:category="currentCategory" />
      </div>
      <ImageCategoryForm
        v-model="categoryDialog"
        v-model:current-row="currentRow"
        :title="title"
      />
      <ImageUploadForm v-model="imageUploadDialog" :title="title" />
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
