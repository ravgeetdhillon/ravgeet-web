<template>
  <div>
    <div class="mb-3 d-flex flex-wrap align-items-center">
      <span
        v-for="(tag, tagIndex) in project.category"
        :key="tagIndex"
        :class="`badge badge-theme-white p-1 ${
          tagIndex != project.category.length - 1 ? 'mr-2' : ''
        }`"
      >
        {{ tag }}
      </span>
    </div>
    <nuxt-link :to="`/projects/${project.slug}`">
      <h2 class="h3">{{ project.title }}</h2>
    </nuxt-link>
    <p class="text-dark-light mb-2">
      {{ project.promo }}
    </p>
    <div class="d-flex flex-wrap align-items-center text-muted">
      <span>
        Tech Stack -&nbsp;
        {{
          new Intl.ListFormat('en', {
            style: 'long',
            type: 'conjunction',
          }).format(project.tech_stack)
        }}
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
