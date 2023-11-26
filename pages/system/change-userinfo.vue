<script setup>
const onBack = () => {
  navigateTo({ path: './userinfo' })
}

const ruleFormRef = ref()
const userInfo = reactive({
  nickname: '',
  email: ''
})

const rules = reactive({
  nickname: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please input Activity email', trigger: 'blur' }
  ]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // eslint-disable-next-line no-console
      console.log('submit!')
    } else {
      // eslint-disable-next-line no-console
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const imageUrl = ref('')

const handleAvatarSuccess = (_response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<template>
  <div class="change-userinfo h-full bg-white rounded">
    <el-page-header
      icon="ArrowLeft"
      class="flex h-14 px-8 border-b-[1px] border-gray-200"
      @back="onBack"
    >
      <template #content>
        <span class="text-large font-600 mr-3"> 修改资料 </span>
      </template>
    </el-page-header>

    <div class="p-8">
      <el-form
        ref="ruleFormRef"
        :model="userInfo"
        :rules="rules"
        class="w-[450px]"
      >
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader border-[1px] rounded border-gray-200"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userInfo.nickname" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Create
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.avatar-uploader .avatar {
  width: 108px;
  height: 108px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 108px;
  height: 108px;
  text-align: center;
}
</style>
