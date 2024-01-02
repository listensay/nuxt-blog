<script setup>
const saveBlock = ref(null)
const content = ref('')

onMounted(async () => {
  if (process.client) {
    const EditorJS = await import('@editorjs/editorjs')

    // eslint-disable-next-line new-cap
    const editor = new EditorJS.default({
      holder: 'editorjs',
      onChange: () => {
        saveData() // 当内容发生变化时保存数据
      }
    })

    async function saveData() {
      try {
        const result = await editor.save()
        saveBlock.value = result
      } catch (error) {
        console.log('Saving failed: ', error)
      }
    }
  }
})
</script>

<template>
  <div class="home">
    <ClientOnly>
      <div id="editorjs" />
    </ClientOnly>
  </div>
</template>

<style lang="less" scoped></style>
