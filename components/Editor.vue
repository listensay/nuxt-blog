<script setup>
onMounted(async () => {
  if (process.client) {
    const EditorJS = await import('@editorjs/editorjs')
    // eslint-disable-next-line new-cap
    const editor = new EditorJS.default({
      holder: 'editorjs'
    })

    try {
      await editor.isReady
      console.log('Editor.js is ready to work!')
      /** Do anything you need after editor initialization */
    } catch (reason) {
      console.log(`Editor.js initialization failed because of ${reason}`)
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
