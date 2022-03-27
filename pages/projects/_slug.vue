<template>
  <project-detailed :project="project" />
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const project = await $content('projects', params.slug)
      .fetch()
      .catch((_) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return { project }
  },
}
</script>
