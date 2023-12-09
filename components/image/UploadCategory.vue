<script setup>
import { useImagesStore } from '~/store/module/images'

const props = defineProps({
  modelValue: { type: Number, default: null }
})

const category = ref('')
const categoryName = ref('')
const emit = defineEmits(['update:modelValue'])

// 通过 watch 监听父组件传递的 modelValue 值
watch(
  () => props.modelValue,
  (val) => {
    category.value = val
  }
)

// 通过 watch 监听 category 值的变化，通过 emit 触发父组件的 update:modelValue 事件
watch(
  () => category.value,
  (val) => {
    emit('update:modelValue', val)
  }
)

const dialog = ref(false)
const dialogHandle = () => {
  dialog.value = true
}

const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: '分类名称'
  },
  {
    key: 'actions'
  }
]

const imageStore = useImagesStore()
const { imageCategory, imageCategoryTotal } = storeToRefs(imageStore)

const currentCategoryHandle = (row) => {
  category.value = row.id
  categoryName.value = row.name
  dialog.value = false
}

// 分页
const pageSize = ref(10)
const handleCurrentChange = async (number) => {
  await imagesStore.fetchGetImagesCategory(number, pageSize.value)
}
</script>

<template>
  <div class="images-upload-category">
    <el-input v-model="categoryName" :disabled="true" class="mb-2" />
    <el-button type="primary" @click="dialogHandle">选择图片分类</el-button>

    <el-dialog v-model="dialog" title="选择图片分类" width="50%">
      <UTable :columns="columns" :rows="imageCategory">
        <template #actions-data="{ row }">
          <UButton
            label="选择分类"
            size="xs"
            @click="currentCategoryHandle(row)"
          />
        </template>
      </UTable>
      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
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
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
