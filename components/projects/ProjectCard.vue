<template>
  <div
    class="shadow-lg-hover border border-theme-white-light rounded w-100 h-100 overflow-hidden p-3"
  >
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>{{ project.emoji }}</div>
      <span class="badge badge-theme-white">{{ project.category[0] }}</span>
    </div>
    <div class="mr-3 text-truncate h6">{{ project.title }}</div>
    <div class="small text-dark-light">{{ project.promo }}</div>
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
