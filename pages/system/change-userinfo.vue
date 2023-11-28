<script setup>
import { useUserStore } from '~/store/module/user'

const onBack = () => {
  navigateTo({ path: './userinfo' })
}

const ruleFormRef = ref()
const userInfo = reactive({
  nickname: '',
  email: '',
  desc: '',
  profile: [],
  avatar: ''
})

const userStore = useUserStore()
await userStore.fetchGetUserinfo()

userInfo.nickname = userStore.userinfo?.nickname
userInfo.email = userStore.userinfo?.email
userInfo.desc = userStore.userinfo?.desc
userInfo.profile = JSON.parse(userStore.userinfo?.profile)
userInfo.avatar = userStore.userinfo?.avatar

const rules = reactive({
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 5, message: '长度3到5位', trigger: 'blur' }
  ],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入个人介绍', trigger: 'blur' }],
  profile: [{ required: true, message: '请输入档案', trigger: 'blur' }]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const reuslt = await userStore.fetchChangeUserinfo(userInfo)
        if (reuslt.success) {
          ElMessage.success('修改成功')
        }
      } catch (error) {}
    } else {
      // eslint-disable-next-line no-console
      console.log('error submit!', fields)
    }
  })
}
// TODO
const removeDomain = (item) => {
  const index = userInfo.profile.indexOf(item)
  if (index !== -1) {
    userInfo.profile.splice(index, 1)
  }
}

const addDomain = () => {
  userInfo.profile.push({
    key: Date.now(),
    value: ''
  })
}

// const resetForm = (formEl) => {
//   if (!formEl) return
//   formEl.resetFields()
// }
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
        label-width="90px"
        label-position="left"
      >
        <el-form-item label="头像" prop="avatar">
          <AvatarImg v-model="userInfo.avatar"></AvatarImg>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userInfo.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="个人介绍" prop="desc">
          <el-input v-model="userInfo.desc" placeholder="请输入个人介绍" />
        </el-form-item>
        {{ userinfo?.profile }}
        <el-form-item label="档案" prop="profile">
          <el-form-item
            v-for="(profile, index) in userInfo.profile"
            :key="profile.key"
            :label="'档案' + index"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: '档案不能为空',
              trigger: 'blur'
            }"
          >
            <el-input v-model="profile.value"></el-input
            ><el-button @click.prevent="removeDomain(profile)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addDomain">新增域名</el-button>
          </el-form-item>
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
