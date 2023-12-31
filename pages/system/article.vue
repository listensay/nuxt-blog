<script setup>
import { useSystemStore } from '~/store/module/system'

const systemStore = useSystemStore()
const page = ref(1)
const pageCount = ref(2)
await systemStore.fetchArticleList(page.value, pageCount.value)

const { articleList, articleTotal } = storeToRefs(systemStore)

const pageChange = async (page) => {
  await systemStore.fetchArticleList(page, pageCount.value)
}

const deleteArticle = async (id) => {
  const result = await systemStore.fetchDeleteArticle(id)
  if (result.success) {
    ElMessage.success('删除成功')
    await systemStore.fetchArticleList(page.value, pageCount.value)
  } else {
    ElMessage.error(result.message)
  }
}
</script>

<template>
  <div class="systeam-article bg-white p-4 h-full rounded-md">
    <div class="border-[1px] border-zinc-100 rounded-sm">
      <el-table :data="articleList">
        <el-table-column prop="title" label="文章标题">
          <template #default="scope">
            <div>
              <el-link
                :underline="false"
                type="primary"
                @click="navigateTo(`/system/edit-article-${scope.row.id}`)"
                >{{ scope.row.title }}</el-link
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="发布时间">
          <template #default="scope">
            <div>
              {{ $dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm') }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <div>
              <el-link
                :underline="false"
                type="danger"
                @click="deleteArticle(scope.row.id)"
                >删除</el-link
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end px-3 py-3.5">
        <el-pagination
          v-model:current-page="page"
          :page-size="pageCount"
          layout="prev, pager, next"
          :total="articleTotal"
          @current-change="pageChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
