<script setup>
import { useUserStore } from '~/store/module/user'

const onBack = () => {
  navigateTo({ path: './userinfo' })
}

const ruleFormRef = ref()
const userInfo = reactive({
  nickname: '',
  email: ''
})

const rules = reactive({
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度3到5位', trigger: 'blur' }
  ],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
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

// const resetForm = (formEl) => {
//   if (!formEl) return
//   formEl.resetFields()
// }

const imgUrl = ref('')

const userStore = useUserStore()
userInfo.nickname = userStore.userinfo.username
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
          <AvatarImg v-model="imgUrl"></AvatarImg>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userInfo.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
