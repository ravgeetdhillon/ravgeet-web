<template>
  <div
    class="shadow-lg-hover border border-theme-white-light rounded w-100 h-100 overflow-hidden"
  >
    <img
      class="img-fluid"
      :src="`/images/projects/${service.image}`"
      :alt="`${service.title} service`"
    />
    <p class="mb-0 py-2 px-3">{{ service.title }}</p>
    <nuxt-link :to="`/services/${service.slug}`" class="stretched-link" />
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
}
</script>
