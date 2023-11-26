<script setup>
defineProps({
  modelValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const handleAvatarSuccess = (_response) => {
  const newImgValue = _response.data
  emit('update:modelValue', newImgValue)
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
  <div class="upload-img">
    <el-upload
      class="avatar-uploader border-[1px] rounded border-gray-200 overflow-hidden"
      action="/api/auth/images"
      name="images"
      :headers="{ Authorization: useCookie('accessToken').value }"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="modelValue" :src="modelValue" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
</template>

<style lang="less" scoped>
.avatar-uploader {
  width: 108px;
  height: 108px;
  display: block;
  :deep(.el-upload) {
    height: 100%;
    img {
      max-width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
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
