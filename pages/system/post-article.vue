<script setup>
import Editor from 'primevue/editor'
import { useSystemStore } from '~/store/module/system'

const systemStore = useSystemStore()

const formRef = ref()
const form = reactive({
  title: '',
  content: ''
})

const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const result = await systemStore.fetchCreateArticle(form)
        if (result.success) {
          ElMessage.success('发布成功')
          navigateTo('/system/article')
        }
      } catch (error) {
        console.log(error)
      } finally {
        resetForm(formEl)
      }
    } else {
      console.log('error submit!', fields)
      ElmMessage.error('请填写完整的表单')
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="systeam-article-post bg-white h-full rounded-md p-4">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <Editor v-model="form.content" editor-style="height: 320px" />
      </el-form-item>

      <el-form-item>
        <el-button>草稿</el-button>
        <el-button type="primary" @click="submitForm(formRef)">
          发布
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.systeam-article-post {
  :deep(.el-form-item__content) {
    display: block;
    line-height: 100%;
  }
}
</style>
