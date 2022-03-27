<template>
  <project-detailed :project="project" />
</template>

<script>
export default {
  async asyncData({ $services, params }) {
    const { slug } = params
    const project = await $services.projects.findOne({ slug })
    return { project }
  },
}
</script>
