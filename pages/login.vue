<script setup>
import { useUserStore } from '~/store/module/user'
const userStore = useUserStore()
const route = useRoute()

const loginFrom = ref({
  username: 'admin',
  password: '123456'
})

const rules = reactive({
  username: [
    {
      required: true,
      message: 'Please input Username',
      trigger: 'blur'
    },
    { min: 3, max: 5, message: 'Length should be 3 to 11', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: 'Please input Password',
      trigger: 'blur'
    }
  ]
})

const ruleFormRef = ref()

const accessToken = useCookie('accessToken', { maxAge: 60 * 60 * 24 * 1 })

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const reuslt = await userStore.fetchLogin(loginFrom.value)
        if (reuslt.success) {
          ElMessage.success('登录成功')
          userStore.token = reuslt.data.token
          userStore.isLogin = true
          accessToken.value = reuslt.data.token
          formEl.resetFields()
          navigateTo(route.query.from || '/', { replace: true })
        } else {
          ElMessage.error(reuslt.message)
          formEl.resetFields()
        }
      } catch (error) {}
    } else {
      ElMessage.error('请检查输入！')
      console.log('error submit!', fields)
    }
  })
}

definePageMeta({
  layout: 'login',
  middleware: ['only-visitor']
})
</script>

<template>
  <div class="login">
    <div class="flex h-[100vh]">
      <div class="bg-blue-500 flex-1 flex items-center justify-center">
        <h2 class="text-white text-2xl">Listen</h2>
      </div>
      <div
        class="flex items-center justify-center text-center bg-white w-[500px]"
      >
        <div class="w-[350px]">
          <h2 class="mb-4 text-lg">登录</h2>
          <el-form ref="ruleFormRef" :rules="rules" :model="loginFrom">
            <el-form-item label="username" prop="username">
              <el-input v-model="loginFrom.username" />
            </el-form-item>
            <el-form-item label="password" prop="password">
              <el-input v-model="loginFrom.password" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="w-full mt-2"
                @click="submitForm(ruleFormRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
