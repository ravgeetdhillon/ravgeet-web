<template>
  <div>
    <nuxt-link :to="`/projects/${project.slug}`">
      <img
        class="img-cover rounded mb-3"
        :src="`/images/projects/${project.image}`"
        :alt="`${project.title} project`"
      />
    </nuxt-link>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <nuxt-link :to="`/projects/${project.slug}`" class="text-truncate">
        <h3 class="text-truncate mr-3 mb-0">{{ project.title }}</h3>
      </nuxt-link>
      <span class="badge badge-theme-white">{{ project.category[0] }}</span>
    </div>
    <p class="text-dark-light mb-2">
      {{ project.promo }}
    </p>
    <div class="d-flex flex-wrap align-items-center text-muted">
      <span class="text-truncate">
        Tech Stack -&nbsp;
        {{ conjuction(project.tech_stack) }}
      </span>
    </div>
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
