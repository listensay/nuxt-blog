<script setup>
import { ElMessage } from 'element-plus'
import { useImagesStore } from '~/store/module/images'

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: '' },
  currentRow: { type: Object, default: () => {} }
})

const imagesStore = useImagesStore()

const dialogVisible = ref(props.modelValue)
const emit = defineEmits(['update:modelValue', 'update:currentRow'])

watch(
  () => props.modelValue,
  (val) => {
    dialogVisible.value = val
  }
)
watch(
  () => props.currentRow,
  (val) => {
    if (val) {
      form.name = val.name
      form.id = val.id
    } else {
      form.name = ''
    }
  }
)

watch(
  () => dialogVisible.value,
  (val) => {
    emit('update:modelValue', val)
  }
)

const form = reactive({
  name: null
})

const refForm = ref()

const rules = reactive({
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
})

const cancel = () => {
  dialogVisible.value = false
  form.name = null
  delete form.id
  emit('update:currentRow', null)
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // 如果有 currentRow，说明是编辑
      if (form.id != null) {
        try {
          const result = await imagesStore.fetchUpdateImageCategory(form)
          if (result.success) {
            ElMessage.success('更新成功')
          }
          cancel()
        } catch (error) {}
        return
      }

      try {
        const result = await imagesStore.fetchCreateImageCategory(form)
        if (result.success) {
          ElMessage.success('创建成功')
        }
        cancel()
      } catch (error) {}

      dialogVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class="images-upload-form">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="30%"
      @closed="cancel"
    >
      <el-form ref="refForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="submitForm(refForm)"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
