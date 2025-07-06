<template>
  <div>
    <project-detailed :project="project" />
    <div class="row w-lg-75 mx-lg-auto align-items-start mt-5">
      <div class="col-12 mb-5">
        <div class="h5 mb-0 border-bottom pb-2">🧠 More Interesting Projects</div>
      </div>
      <div v-for="p in suggestedProjects" :key="p.nid" class="col-md-6 mb-4">
        <project-card :project="p" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $services, params }) {
    const { slug } = params
    const project = await $services.projects.findOne({ slug })
    const allProjects = await $services.projects.find({})
    const suggestedProjects = allProjects.filter((p) => p.slug !== project.slug).slice(0, 4)
    return { project, suggestedProjects }
  },
}
</script>
