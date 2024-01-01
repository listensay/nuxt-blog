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
  avatar: '',
  password: ''
})

const userStore = useUserStore()
await userStore.fetchGetUserinfo()

userInfo.nickname = userStore.userinfo.nickname
userInfo.email = userStore.userinfo.email
userInfo.desc = userStore.userinfo.desc
userInfo.profile = JSON.parse(userStore.userinfo.profile)
userInfo.avatar = userStore.userinfo.avatar

const rules = reactive({
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 5, message: '长度3到5位', trigger: 'blur' }
  ],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入个人介绍', trigger: 'blur' }],
  profile: [{ required: true, message: '请输入档案', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度6到20位', trigger: 'blur' }
  ]
})

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const reuslt = await userStore.fetchChangeUserinfo({
          ...userInfo,
          profile: JSON.stringify(userInfo.profile)
        })
        if (reuslt.success) {
          ElMessage.success('修改成功')
        }
      } catch (error) {}
    } else {
      console.log('error submit!', fields)
    }
  })
}
const removeProfile = (item) => {
  const index = userInfo.profile.indexOf(item)
  if (index !== -1) {
    userInfo.profile.splice(index, 1)
  }
}

const addProfile = () => {
  userInfo.profile.push({
    url: '',
    name: '',
    icon: ''
  })
}

const options = ref([
  { value: 1, label: '图标' },
  { value: 2, label: '图片' }
])
// const resetForm = (formEl) => {
//   if (!formEl) return
//   formEl.resetFields()
// }
onMounted(() => {})
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
        label-width="100"
        label-position="left"
      >
        <el-form-item label="头像" prop="avatar">
          <AvatarImg v-model="userInfo.avatar" />
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
        <el-form-item label="社交档案" prop="profile">
          <el-form-item
            v-for="(profile, index) in userInfo.profile"
            :key="profile.key"
            :label="index + 1 + ' : '"
            label-width="40"
            :rules="{
              required: true,
              message: 'domain can not be null',
              trigger: 'blur'
            }"
          >
            <div class="flex items-center mb-4">
              <el-input v-model="profile.name" placeholder="名称" />
              <el-select
                v-model="profile.icon"
                placeholder="Select"
                class="mx-2 flex-shrink-0"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input
                v-model="profile.content"
                class="mr-2"
                placeholder="内容"
              />
              <el-button type="danger" @click.prevent="removeProfile(profile)"
                >删除</el-button
              >
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addProfile"
              >新增社交档案</el-button
            >
          </el-form-item>
        </el-form-item>

        <el-form-item label="新密码" prop="password">
          <el-input v-model="userInfo.password" placeholder="请输入新密码" />
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
