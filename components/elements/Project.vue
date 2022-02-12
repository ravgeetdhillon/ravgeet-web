<template>
  <div
    class="shadow-lg-hover border border-theme-white-light rounded w-100 h-100 overflow-hidden"
  >
    <img
      class="img-fluid"
      :src="`/images/projects/${project.image}`"
      :alt="`${project.title} project`"
    />
    <div class="d-flex justify-content-between align-items-center py-2 px-3">
      <p class="mb-0 mr-3">{{ project.title }}</p>
      <span class="badge badge-theme-white">{{ project.category[0] }}</span>
    </div>
    <nuxt-link :to="`/projects/${project.slug}`" class="stretched-link" />
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
}
</script>
